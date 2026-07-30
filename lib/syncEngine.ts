import { db, OfflineBaseEntity, SmsQueueEntity } from './db';

export interface SyncStats {
  isOnline: boolean;
  isSyncing: boolean;
  pendingCount: number;
  syncedCount: number;
  failedCount: number;
  conflictCount: number;
  lastSyncAt: string | null;
  lastError: string | null;
}

type SyncListener = (stats: SyncStats) => void;

class SynchronizationEngine {
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private isSyncing: boolean = false;
  private listeners: Set<SyncListener> = new Set();
  private lastSyncAt: string | null = null;
  private lastError: string | null = null;
  private syncTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isOnline = navigator.onLine;
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
      this.syncTimer = setInterval(() => {
        if (this.isOnline && !this.isSyncing) {
          this.triggerSync();
        }
      }, 30000);
    }
  }

  private handleOnline = () => {
    this.isOnline = true;
    this.notify();
    this.triggerSync();
  };

  private handleOffline = () => {
    this.isOnline = false;
    this.notify();
  };

  public subscribe(listener: SyncListener): () => void {
    this.listeners.add(listener);
    listener(this.getStatsSnapshot());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getStatsSnapshot(): SyncStats {
    return {
      isOnline: this.isOnline,
      isSyncing: this.isSyncing,
      pendingCount: 0,
      syncedCount: 0,
      failedCount: 0,
      conflictCount: 0,
      lastSyncAt: this.lastSyncAt,
      lastError: this.lastError,
    };
  }

  public async getDetailedStats(): Promise<SyncStats> {
    try {
      const farms = await db.farms.toArray();
      const plots = await db.plots.toArray();
      const cropCycles = await db.cropCycles.toArray();
      const activities = await db.fieldActivities.toArray();
      const harvests = await db.harvests.toArray();
      const sales = await db.sales.toArray();
      const expenses = await db.expenses.toArray();
      const smsQueue = await db.smsQueue.toArray();

      const allRecords: (OfflineBaseEntity | SmsQueueEntity)[] = [
        ...farms,
        ...plots,
        ...cropCycles,
        ...activities,
        ...harvests,
        ...sales,
        ...expenses,
        ...smsQueue,
      ];

      const pendingCount = allRecords.filter((r) => r.syncStatus === 'pending' || r.syncStatus === 'local').length;
      const syncedCount = allRecords.filter((r) => r.syncStatus === 'synced').length;
      const failedCount = allRecords.filter((r) => r.syncStatus === 'failed').length;
      const conflictCount = allRecords.filter((r) => r.syncStatus === 'conflict').length;

      return {
        isOnline: this.isOnline,
        isSyncing: this.isSyncing,
        pendingCount,
        syncedCount,
        failedCount,
        conflictCount,
        lastSyncAt: this.lastSyncAt,
        lastError: this.lastError,
      };
    } catch {
      return this.getStatsSnapshot();
    }
  }

  private notify() {
    this.getDetailedStats().then((stats) => {
      this.listeners.forEach((listener) => listener(stats));
    });
  }

  public async triggerSync(): Promise<boolean> {
    if (this.isSyncing) return false;
    if (!this.isOnline) {
      this.lastError = 'Device is currently offline.';
      this.notify();
      return false;
    }

    this.isSyncing = true;
    this.lastError = null;
    this.notify();

    try {
      await this.syncTable(db.farms, 'farms');
      await this.syncTable(db.plots, 'plots');
      await this.syncTable(db.cropCycles, 'crop_cycles');
      await this.syncTable(db.fieldActivities, 'field_activities');
      await this.syncTable(db.harvests, 'harvest_logs');
      await this.syncTable(db.sales, 'sales');
      await this.syncTable(db.expenses, 'expenses');
      await this.syncSmsQueue();

      this.lastSyncAt = new Date().toISOString();
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Synchronization encountered an unexpected error.';
      this.lastError = message;
      console.error('[SyncEngine] Error during sync:', err);
      return false;
    } finally {
      this.isSyncing = false;
      this.notify();
    }
  }

  private async syncTable(table: any, serverEndpoint: string) {
    if (!table) return;
    const pendingItems = await table
      .where('syncStatus')
      .anyOf(['local', 'pending', 'failed'])
      .toArray();

    for (const item of pendingItems) {
      if (item.syncAttempts >= 5 && item.syncStatus === 'failed') {
        continue;
      }

      await table.update(item.localId, {
        syncStatus: 'syncing',
        lastSyncAttemptAt: new Date().toISOString(),
        syncAttempts: (item.syncAttempts || 0) + 1,
      });

      try {
        const response = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            endpoint: serverEndpoint,
            harvests: [item],
            idempotencyKey: `${item.localId}:${item.version || 1}`,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errMsg = errorData.error || `Server HTTP ${response.status}`;

          if (response.status === 400 || response.status === 422) {
            await table.update(item.localId, {
              syncStatus: 'failed',
              syncError: `Validation Error: ${errMsg}`,
            });
          } else {
            await table.update(item.localId, {
              syncStatus: 'pending',
              syncError: `Temporary Error: ${errMsg}`,
            });
          }
          continue;
        }

        const resData = await response.json();
        await table.update(item.localId, {
          syncStatus: 'synced',
          serverId: resData.serverId || item.serverId || `srv_${item.localId}`,
          syncError: null,
          updatedAt: new Date().toISOString(),
        });
      } catch (networkErr: unknown) {
        const message = networkErr instanceof Error ? networkErr.message : 'Network request failed';
        await table.update(item.localId, {
          syncStatus: 'pending',
          syncError: message,
        });
      }
    }
  }

  private async syncSmsQueue() {
    const pendingSms = await db.smsQueue
      .where('syncStatus')
      .anyOf(['local', 'pending'])
      .toArray();

    for (const sms of pendingSms) {
      await db.smsQueue.update(sms.localId, {
        syncStatus: 'syncing',
        lastSyncAttemptAt: new Date().toISOString(),
        syncAttempts: (sms.syncAttempts || 0) + 1,
      });

      try {
        const res = await fetch('/api/sms/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipientPhone: sms.recipientPhone,
            message: sms.message,
            messageType: sms.messageType,
            idempotencyKey: sms.idempotencyKey,
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          await db.smsQueue.update(sms.localId, {
            syncStatus: 'synced',
            providerMsgId: data.providerMsgId || `sms_${Date.now()}`,
            providerStatus: data.providerStatus || 'SUBMITTED',
            syncError: null,
          });
        } else {
          await db.smsQueue.update(sms.localId, {
            syncStatus: 'failed',
            syncError: data.error || 'Failed to dispatch SMS through server gateway',
          });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Network error sending SMS';
        await db.smsQueue.update(sms.localId, {
          syncStatus: 'pending',
          syncError: message,
        });
      }
    }
  }
}

export const syncEngine = new SynchronizationEngine();
