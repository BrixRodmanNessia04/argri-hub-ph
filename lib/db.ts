import Dexie, { type EntityTable } from 'dexie';

export type SyncStatus = 'local' | 'pending' | 'syncing' | 'synced' | 'failed' | 'conflict';

export interface OfflineBaseEntity {
  localId: string;
  serverId?: string | null;
  userId: string;
  cooperativeId?: string | null;
  deviceId: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
  syncAttempts: number;
  lastSyncAttemptAt?: string | null;
  syncError?: string | null;
  version: number;
  isDeleted: boolean;
}

export interface FarmEntity extends OfflineBaseEntity {
  name: string;
  location: string;
  areaHectares: number;
  primaryCrop?: string;
  notes?: string;
}

export interface PlotEntity extends OfflineBaseEntity {
  farmId: string;
  name: string;
  areaSqMeters: number;
  soilType?: string;
  status: 'ACTIVE' | 'FALLOW' | 'PREPARATION';
}

export interface CropCycleEntity extends OfflineBaseEntity {
  plotId: string;
  farmId?: string;
  crop: string;
  variety?: string;
  plantedAt: string;
  estimatedHarvestAt: string;
  status: 'PLANTED' | 'GROWING' | 'HARVESTING' | 'COMPLETED' | 'CANCELLED';
  stage?: string;
  targetYieldKg?: number;
  expectedYieldKg?: number;
}

export interface FieldActivityEntity extends OfflineBaseEntity {
  cropCycleId: string;
  plotId?: string;
  farmId?: string;
  activityType:
    | 'PLANTING'
    | 'TRANSPLANTING'
    | 'IRRIGATION'
    | 'FERTILIZING'
    | 'PEST_CONTROL'
    | 'WEEDING'
    | 'PRUNING'
    | 'MULCHING'
    | 'TRELLISING'
    | 'INSPECTION'
    | 'LAND_PREPARATION'
    | 'HARVEST_PREPARATION'
    | 'CLEANING'
    | 'PACKING'
    | 'TRANSPORTATION'
    | 'OTHER';
  description: string;
  cost: number;
  inputsUsed?: { name: string; quantity: number; unit: string }[];
  workerCount?: number;
  durationHours?: number;
  applicationRate?: string;
  safetyIntervalDays?: number;
  reEntryDate?: string;
  preHarvestIntervalDays?: number;
  loggedAt: string;
}

export interface HarvestEntity extends OfflineBaseEntity {
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  crop: string;
  variety?: string;
  harvestType?: 'PARTIAL' | 'FINAL';
  weightKg: number;
  qualityGrade: 'Class A' | 'Class B' | 'Class C' | 'Premium';
  rejectedKg?: number;
  damagedKg?: number;
  homeUseKg?: number;
  forSaleKg?: number;
  coopSubmissionKg?: number;
  storageLocation?: string;
  expectedPricePerKg?: number;
  harvestedAt: string;
  notes?: string;
  coopApprovalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ADJUSTED';
  rejectionReason?: string;
}

export interface SaleEntity extends OfflineBaseEntity {
  farmId?: string;
  cropCycleId?: string;
  harvestId?: string;
  buyerName: string;
  buyerType?: 'COOPERATIVE' | 'TRADER' | 'PUBLIC_MARKET' | 'RESTAURANT' | 'RETAILER' | 'WHOLESALER' | 'DIRECT_CONSUMER' | 'OTHER';
  crop: string;
  variety?: string;
  weightKg: number;
  pricePerKg: number;
  grossAmount: number;
  discounts?: number;
  transportationCost?: number;
  otherDeductions?: number;
  totalAmount: number;
  paymentStatus?: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID' | 'CANCELLED';
  paymentMethod?: string;
  soldAt: string;
  deliveryDate?: string;
  invoiceNumber?: string;
  notes?: string;
}

export interface ExpenseEntity extends OfflineBaseEntity {
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  category: 'SEEDS' | 'SEEDLINGS' | 'FERTILIZER' | 'COMPOST' | 'PESTICIDE' | 'HERBICIDE' | 'LABOR' | 'EQUIPMENT_RENTAL' | 'EQUIPMENT_REPAIR' | 'FUEL' | 'TRANSPORTATION' | 'PACKAGING' | 'IRRIGATION' | 'ELECTRICITY' | 'WATER' | 'LAND_RENT' | 'STORAGE' | 'COOP_FEES' | 'OTHER';
  description: string;
  amount: number;
  quantity?: number;
  unitPrice?: number;
  unit?: string;
  supplier?: string;
  paymentMethod?: string;
  date: string;
  notes?: string;
}

export interface InventoryItemEntity extends OfflineBaseEntity {
  farmId?: string;
  crop: string;
  type: 'SEED' | 'SEEDLING' | 'FERTILIZER' | 'COMPOST' | 'PESTICIDE' | 'HERBICIDE' | 'ANIMAL_FEED' | 'PACKAGING' | 'FUEL' | 'HARVESTED' | 'TOOL' | 'SPARE_PART' | 'OTHER';
  quantityInKg: number;
  unit?: string;
  grade?: string;
  storageLocation?: string;
  unitCost?: number;
  reorderThreshold?: number;
  minStockLevel?: number;
  expiryDate?: string;
}

export interface InventoryTransactionEntity extends OfflineBaseEntity {
  inventoryItemId: string;
  farmId?: string;
  cropCycleId?: string;
  changeType: 'ADD' | 'USE' | 'TRANSFER' | 'DAMAGE' | 'EXPIRY' | 'LOSS' | 'CORRECTION';
  quantityKg: number;
  unit?: string;
  reason: string;
  date: string;
  idempotencyKey?: string;
}

export interface PestDiseaseEntity extends OfflineBaseEntity {
  farmId: string;
  plotId?: string;
  cropCycleId?: string;
  observationType: 'PEST' | 'DISEASE' | 'WEED' | 'NUTRIENT_DEFICIENCY' | 'UNKNOWN';
  name: string;
  observedAt: string;
  severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  affectedAreaSqM?: number;
  symptoms: string;
  actionTaken?: string;
  productApplied?: string;
  followUpDate?: string;
  status: 'OBSERVED' | 'MONITORING' | 'TREATMENT_APPLIED' | 'IMPROVING' | 'RESOLVED' | 'ESCALATED';
  notes?: string;
}

export interface LaborLogEntity extends OfflineBaseEntity {
  farmId: string;
  plotId?: string;
  cropCycleId?: string;
  workType: 'LAND_PREPARATION' | 'PLANTING' | 'WEEDING' | 'FERTILIZING' | 'SPRAYING' | 'IRRIGATION' | 'HARVESTING' | 'SORTING' | 'PACKING' | 'TRANSPORTATION' | 'MAINTENANCE' | 'OTHER';
  workerGroup: string;
  workerCount: number;
  date: string;
  hoursWorked: number;
  rateType: 'PER_DAY' | 'PER_HOUR' | 'PER_TASK' | 'FIXED';
  ratePerUnit: number;
  totalCost: number;
  paymentStatus: 'UNPAID' | 'PAID';
  notes?: string;
}

export interface EquipmentEntity extends OfflineBaseEntity {
  name: string;
  type: 'TRACTOR' | 'SPRAYER' | 'IRRIGATION_PUMP' | 'HARVESTER' | 'HAND_TOOL' | 'VEHICLE' | 'OTHER';
  brand?: string;
  model?: string;
  ownership: 'OWNED' | 'RENTED' | 'BORROWED' | 'COOPERATIVE_SHARED';
  acquisitionDate?: string;
  condition: 'EXCELLENT' | 'GOOD' | 'NEEDS_REPAIR' | 'OUT_OF_SERVICE';
  storageLocation?: string;
  notes?: string;
}

export interface EquipmentLogEntity extends OfflineBaseEntity {
  equipmentId: string;
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  logType: 'USAGE' | 'MAINTENANCE' | 'REPAIR' | 'FUEL' | 'RENTAL';
  date: string;
  usageHours?: number;
  fuelUsedLiters?: number;
  cost: number;
  operatorName?: string;
  activityDescription: string;
  notes?: string;
}

export interface TaskEntity extends OfflineBaseEntity {
  title: string;
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  dueDate: string;
  dueTime?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  repeatRule?: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'OVERDUE';
  notes?: string;
}

export interface GeneralLogEntity extends OfflineBaseEntity {
  farmId?: string;
  plotId?: string;
  cropCycleId?: string;
  logType: 'FARM_OBSERVATION' | 'WEATHER' | 'CROP_CONDITION' | 'SOIL_CONDITION' | 'IRRIGATION' | 'MAINTENANCE' | 'DELIVERY' | 'PICKUP' | 'COOP_VISIT' | 'BUYER_INQUIRY' | 'GENERAL_NOTE' | 'OTHER';
  title: string;
  notes: string;
  quantity?: number;
  unit?: string;
  cost?: number;
  tags?: string[];
  date: string;
}

export interface FormDraftEntity {
  key: string; // e.g. "draft_farm_new", "draft_harvest_new"
  formId: string;
  payload: Record<string, unknown>;
  updatedAt: string;
}

export interface NotificationEntity {
  localId: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'SYNC' | 'HARVEST_UPDATE';
  read: boolean;
  createdAt: string;
}

export interface SmsQueueEntity {
  localId: string;
  userId: string;
  recipientPhone: string;
  message: string;
  messageType: 'HARVEST_CONFIRMATION' | 'HARVEST_APPROVAL' | 'ANNOUNCEMENT' | 'PRICE_UPDATE' | 'PICKUP_SCHEDULE' | 'ORDER_CONFIRMATION' | 'PAYMENT_NOTIFICATION' | 'SYNC_FAILURE';
  idempotencyKey: string;
  syncStatus: SyncStatus;
  syncAttempts: number;
  lastSyncAttemptAt?: string | null;
  syncError?: string | null;
  providerMsgId?: string | null;
  providerStatus?: 'QUEUED' | 'SUBMITTED' | 'DELIVERED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface MediaQueueEntity {
  localId: string;
  entityType: 'HARVEST' | 'ACTIVITY' | 'FARM' | 'PEST_DISEASE';
  entityLocalId: string;
  fileName: string;
  fileType: string;
  fileBlob: Blob | ArrayBuffer;
  syncStatus: SyncStatus;
  createdAt: string;
}

export interface SyncQueueEntity {
  localId: string;
  entityType: string;
  entityLocalId: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  payload: Record<string, unknown>;
  createdAt: string;
  attempts: number;
}

export interface SyncConflictEntity {
  localId: string;
  entityType: string;
  entityLocalId: string;
  localRecord: Record<string, unknown>;
  serverRecord: Record<string, unknown>;
  status: 'PENDING_RESOLUTION' | 'RESOLVED_LOCAL' | 'RESOLVED_SERVER';
  detectedAt: string;
}

export interface CachedReferenceDataEntity {
  key: string;
  payload: Record<string, unknown>;
  cachedAt: string;
  expiresAt?: string;
}

export interface LocalSessionEntity {
  key: string;
  userId: string;
  role: 'FARMER' | 'COOP_LEADER' | 'BUYER' | 'ADMIN';
  cooperativeId?: string;
  name: string;
  phone: string;
  token?: string;
  lastActiveAt: string;
}

// Backwards compatibility legacy interfaces
export interface HarvestRecord {
  id?: number;
  farmerId: string;
  coopId: string;
  crop: string;
  weightKg: number;
  syncStatus: 'pending' | 'synced';
  createdAt: string;
}
export type Harvest = HarvestRecord;

export interface LogRecord {
  id?: number;
  farmerId: string;
  coopId: string;
  crop: string;
  weightKg: number;
  syncStatus: 'pending' | 'synced';
  actionType?: 'PLANTING' | 'WATERING' | 'HARVEST' | 'COST' | 'SALE';
  createdAt: string;
}

export interface InventoryRecord {
  id?: number;
  crop: string;
  type: 'SEED' | 'HARVESTED';
  quantityInKg: number;
  updatedAt: string;
}

const db = new Dexie('AgriAppDB') as Dexie & {
  harvestsLegacy: EntityTable<HarvestRecord, 'id'>;
  logsLegacy: EntityTable<LogRecord, 'id'>;
  inventoryLegacy: EntityTable<InventoryRecord, 'id'>;

  farms: EntityTable<FarmEntity, 'localId'>;
  plots: EntityTable<PlotEntity, 'localId'>;
  cropCycles: EntityTable<CropCycleEntity, 'localId'>;
  fieldActivities: EntityTable<FieldActivityEntity, 'localId'>;
  harvests: EntityTable<HarvestEntity, 'localId'>;
  sales: EntityTable<SaleEntity, 'localId'>;
  expenses: EntityTable<ExpenseEntity, 'localId'>;
  inventoryItems: EntityTable<InventoryItemEntity, 'localId'>;
  inventoryTransactions: EntityTable<InventoryTransactionEntity, 'localId'>;
  pestsDiseases: EntityTable<PestDiseaseEntity, 'localId'>;
  laborLogs: EntityTable<LaborLogEntity, 'localId'>;
  equipment: EntityTable<EquipmentEntity, 'localId'>;
  equipmentLogs: EntityTable<EquipmentLogEntity, 'localId'>;
  tasks: EntityTable<TaskEntity, 'localId'>;
  generalLogs: EntityTable<GeneralLogEntity, 'localId'>;
  formDrafts: EntityTable<FormDraftEntity, 'key'>;
  notifications: EntityTable<NotificationEntity, 'localId'>;
  smsQueue: EntityTable<SmsQueueEntity, 'localId'>;
  mediaQueue: EntityTable<MediaQueueEntity, 'localId'>;
  syncQueue: EntityTable<SyncQueueEntity, 'localId'>;
  syncConflicts: EntityTable<SyncConflictEntity, 'localId'>;
  cachedReferenceData: EntityTable<CachedReferenceDataEntity, 'key'>;
  localSession: EntityTable<LocalSessionEntity, 'key'>;
};

db.version(1).stores({
  harvests: '++id, crop, syncStatus',
});

db.version(2).stores({
  harvests: '++id, farmerId, coopId, crop, syncStatus',
});

db.version(3).stores({
  harvests: '++id, farmerId, coopId, crop, syncStatus',
  logs: '++id, farmerId, coopId, crop, syncStatus, actionType',
  inventory: '++id, crop, type, updatedAt',
});

db.version(4).stores({
  harvestsLegacy: '++id, farmerId, coopId, crop, syncStatus',
  logsLegacy: '++id, farmerId, coopId, crop, syncStatus, actionType',
  inventoryLegacy: '++id, crop, type, updatedAt',

  farms: 'localId, serverId, userId, cooperativeId, syncStatus, updatedAt',
  plots: 'localId, serverId, farmId, userId, syncStatus, updatedAt',
  cropCycles: 'localId, serverId, plotId, crop, status, syncStatus, updatedAt',
  fieldActivities: 'localId, serverId, cropCycleId, activityType, syncStatus, loggedAt',
  harvests: 'localId, serverId, cropCycleId, plotId, crop, syncStatus, harvestedAt',
  sales: 'localId, serverId, harvestId, crop, syncStatus, soldAt',
  expenses: 'localId, serverId, category, syncStatus, date',
  inventoryItems: 'localId, serverId, crop, type, syncStatus, updatedAt',
  inventoryTransactions: 'localId, serverId, inventoryItemId, changeType, syncStatus, date',
  notifications: 'localId, userId, read, createdAt',
  smsQueue: 'localId, userId, messageType, syncStatus, idempotencyKey, createdAt',
  mediaQueue: 'localId, entityLocalId, syncStatus, createdAt',
  syncQueue: 'localId, entityType, entityLocalId, operation, createdAt',
  syncConflicts: 'localId, entityType, entityLocalId, status, detectedAt',
  cachedReferenceData: 'key, cachedAt, expiresAt',
  localSession: 'key, userId, role, lastActiveAt',
});

// Version 5: Complete Farmer Module entities (Pests, Labor, Equipment, Tasks, General Logs, Form Drafts)
db.version(5).stores({
  harvestsLegacy: '++id, farmerId, coopId, crop, syncStatus',
  logsLegacy: '++id, farmerId, coopId, crop, syncStatus, actionType',
  inventoryLegacy: '++id, crop, type, updatedAt',

  farms: 'localId, serverId, userId, cooperativeId, syncStatus, updatedAt',
  plots: 'localId, serverId, farmId, userId, syncStatus, updatedAt',
  cropCycles: 'localId, serverId, plotId, crop, status, syncStatus, updatedAt',
  fieldActivities: 'localId, serverId, cropCycleId, plotId, farmId, activityType, syncStatus, loggedAt',
  harvests: 'localId, serverId, cropCycleId, plotId, farmId, crop, syncStatus, harvestedAt',
  sales: 'localId, serverId, harvestId, farmId, cropCycleId, crop, syncStatus, soldAt',
  expenses: 'localId, serverId, category, farmId, plotId, cropCycleId, syncStatus, date',
  inventoryItems: 'localId, serverId, crop, type, farmId, syncStatus, updatedAt',
  inventoryTransactions: 'localId, serverId, inventoryItemId, farmId, cropCycleId, changeType, syncStatus, date',
  pestsDiseases: 'localId, serverId, farmId, plotId, cropCycleId, observationType, severity, status, syncStatus, updatedAt',
  laborLogs: 'localId, serverId, farmId, plotId, cropCycleId, workType, paymentStatus, syncStatus, date',
  equipment: 'localId, serverId, ownership, condition, syncStatus, updatedAt',
  equipmentLogs: 'localId, serverId, equipmentId, farmId, plotId, cropCycleId, logType, syncStatus, date',
  tasks: 'localId, serverId, farmId, plotId, cropCycleId, status, priority, dueDate, syncStatus, updatedAt',
  generalLogs: 'localId, serverId, farmId, plotId, cropCycleId, logType, syncStatus, date',
  formDrafts: 'key, formId, updatedAt',
  notifications: 'localId, userId, read, createdAt',
  smsQueue: 'localId, userId, messageType, syncStatus, idempotencyKey, createdAt',
  mediaQueue: 'localId, entityLocalId, syncStatus, createdAt',
  syncQueue: 'localId, entityType, entityLocalId, operation, createdAt',
  syncConflicts: 'localId, entityType, entityLocalId, status, detectedAt',
  cachedReferenceData: 'key, cachedAt, expiresAt',
  localSession: 'key, userId, role, lastActiveAt',
});

export function generateLocalId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `local_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function getDeviceId(): string {
  if (typeof window === 'undefined') return 'server_device';
  let devId = localStorage.getItem('agrihub_device_id');
  if (!devId) {
    devId = `dev_${generateLocalId()}`;
    localStorage.setItem('agrihub_device_id', devId);
  }
  return devId;
}

export function createBaseEntity(userId: string = 'farmer-123', coopId: string = 'coop-456'): OfflineBaseEntity {
  const now = new Date().toISOString();
  return {
    localId: generateLocalId(),
    serverId: null,
    userId,
    cooperativeId: coopId,
    deviceId: getDeviceId(),
    createdAt: now,
    updatedAt: now,
    syncStatus: 'local',
    syncAttempts: 0,
    lastSyncAttemptAt: null,
    syncError: null,
    version: 1,
    isDeleted: false,
  };
}

export { db };
