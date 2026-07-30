"use client";

import React, { useEffect, useState } from "react";
import { syncEngine, SyncStats } from "@/lib/syncEngine";
import {
  Wifi,
  WifiOff,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function SyncStatusIndicator() {
  const [stats, setStats] = useState<SyncStats>({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    isSyncing: false,
    pendingCount: 0,
    syncedCount: 0,
    failedCount: 0,
    conflictCount: 0,
    lastSyncAt: null,
    lastError: null,
  });

  useEffect(() => {
    const unsubscribe = syncEngine.subscribe((newStats) => {
      setStats(newStats);
    });
    return unsubscribe;
  }, []);

  const handleManualSync = () => {
    syncEngine.triggerSync();
  };

  if (!stats.isOnline) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm">
        <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Offline</span>
        {stats.pendingCount > 0 && (
          <span className="px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 text-[10px] font-bold">
            {stats.pendingCount} pending
          </span>
        )}
      </div>
    );
  }

  if (stats.isSyncing) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold shadow-sm animate-pulse">
        <RefreshCw className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
        <span>Synchronizing...</span>
      </div>
    );
  }

  if (stats.failedCount > 0 || stats.conflictCount > 0) {
    return (
      <button
        type="button"
        onClick={handleManualSync}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 text-rose-300 text-xs font-semibold transition-all cursor-pointer shadow-sm"
        title={stats.lastError || "Sync issues detected"}
      >
        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
        <span>Sync Error ({stats.failedCount + stats.conflictCount})</span>
        <RefreshCw className="w-3 h-3 opacity-70" />
      </button>
    );
  }

  if (stats.pendingCount > 0) {
    return (
      <button
        type="button"
        onClick={handleManualSync}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 text-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-sm"
      >
        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
        <span>{stats.pendingCount} Pending</span>
        <RefreshCw className="w-3 h-3 opacity-70" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleManualSync}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-300 text-xs font-semibold transition-all cursor-pointer shadow-sm"
      title="All data synchronized with cloud"
    >
      <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
      <span className="hidden sm:inline">Online &amp; Synced</span>
      <span className="sm:hidden">Synced</span>
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 opacity-80" />
    </button>
  );
}
