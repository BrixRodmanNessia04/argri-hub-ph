"use client";

import React, { useEffect, useState } from "react";
import FarmerSubNav from "@/components/FarmerSubNav";
import { syncEngine, SyncStats } from "@/lib/syncEngine";
import { RefreshCw, CheckCircle2, AlertCircle, Clock, Wifi, WifiOff } from "lucide-react";

export default function FarmerSyncPage() {
  const [stats, setStats] = useState<SyncStats>(syncEngine.getStatsSnapshot());
  const [isManualTriggering, setIsManualTriggering] = useState(false);

  useEffect(() => {
    return syncEngine.subscribe((newStats) => {
      setStats(newStats);
    });
  }, []);

  const handleForceSync = async () => {
    setIsManualTriggering(true);
    await syncEngine.triggerSync();
    setIsManualTriggering(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                Synchronization Center (Cloud Sync)
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {stats.isOnline ? (
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5" /> Online
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1">
                  <WifiOff className="w-3.5 h-3.5" /> Offline
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-600 mb-5">
            View pending local changes, inspect synchronization health, and trigger manual synchronization with Supabase cloud storage.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <p className="text-xs font-bold text-slate-600">Pending</p>
              <p className="text-2xl font-extrabold text-amber-700 mt-1">
                {stats.pendingCount}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <p className="text-xs font-bold text-slate-600">Synced</p>
              <p className="text-2xl font-extrabold text-emerald-700 mt-1">
                {stats.syncedCount}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-center">
              <p className="text-xs font-bold text-slate-600">Failed</p>
              <p className="text-2xl font-extrabold text-rose-700 mt-1">
                {stats.failedCount}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <p className="text-xs font-bold text-slate-600">Conflicts</p>
              <p className="text-2xl font-extrabold text-blue-700 mt-1">
                {stats.conflictCount}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleForceSync}
            disabled={stats.isSyncing || isManualTriggering || !stats.isOnline}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
          >
            <RefreshCw
              className={`w-4 h-4 ${stats.isSyncing || isManualTriggering ? "animate-spin" : ""}`}
            />
            <span>
              {stats.isSyncing || isManualTriggering
                ? "Synchronizing Local Records..."
                : "Force Cloud Synchronization Now"}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
