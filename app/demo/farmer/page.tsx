"use client";

import React, { useEffect } from "react";
import DemoBanner from "@/components/demo/DemoBanner";
import { seedDemoDatabase, demoDb } from "@/lib/demoDb";
import { useLiveQuery } from "dexie-react-hooks";
import { Sprout, Plus, CheckCircle2, Warehouse, BookOpen, WifiOff } from "lucide-react";

export default function DemoFarmerPage() {
  useEffect(() => {
    seedDemoDatabase();
  }, []);

  const farms = useLiveQuery(() => demoDb.demoFarms.toArray(), []) || [];
  const harvests = useLiveQuery(() => demoDb.demoHarvests.toArray(), []) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <DemoBanner roleName="Farmer PWA" />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              OFFLINE DEMO MODE (ISOLATED)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2 mt-1">
            <Sprout className="w-6 h-6 text-emerald-400" />
            Farmer PWA Operations Demo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Simulates offline farm management, plot tracking, input deductions, and net profit ledger.
          </p>
        </div>

        {/* Demo Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Registered Farms</span>
            <p className="text-2xl font-extrabold text-white">{farms.length} Demo Farms</p>
            <p className="text-emerald-400 text-[11px]">Benguet Highland Farms</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Harvest Logged</span>
            <p className="text-2xl font-extrabold text-emerald-400">
              {harvests.reduce((sum, h) => sum + h.weightKg, 0).toLocaleString()} kg
            </p>
            <p className="text-slate-400 text-[11px]">Class A Produce</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Offline Engine</span>
            <p className="text-2xl font-extrabold text-blue-400 flex items-center gap-1.5">
              <WifiOff className="w-5 h-5 text-blue-400" /> Active
            </p>
            <p className="text-slate-400 text-[11px]">IndexedDB (`agrihub-demo` DB)</p>
          </div>
        </div>

        {/* Demo Farms List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-400" /> Demo Registered Farms ({farms.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {farms.map((f) => (
              <div key={f.localId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-sm">{f.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-extrabold">
                    {f.areaHectares} Ha
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">Location: {f.location} • Primary: {f.primaryCrop}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
