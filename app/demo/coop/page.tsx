"use client";

import React, { useEffect } from "react";
import DemoBanner from "@/components/demo/DemoBanner";
import { seedDemoDatabase, demoDb } from "@/lib/demoDb";
import { useLiveQuery } from "dexie-react-hooks";
import { Building2, Layers, CheckCircle2, TrendingUp } from "lucide-react";

export default function DemoCoopPage() {
  useEffect(() => {
    seedDemoDatabase();
  }, []);

  const harvests = useLiveQuery(() => demoDb.demoHarvests.toArray(), []) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <DemoBanner roleName="Cooperative Manager" />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-teal-500/15 text-teal-300 border border-teal-500/30">
              OFFLINE DEMO MODE (ISOLATED)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2 mt-1">
            <Building2 className="w-6 h-6 text-teal-400" />
            Cooperative Manager Operations Demo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Simulates member harvest submissions review, lot aggregation, stock inventory, and supply forecasting.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-400" /> Member Submissions Pending Review ({harvests.length})
          </h2>

          <div className="space-y-3">
            {harvests.map((h) => (
              <div key={h.localId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-white text-sm block">{h.crop}</span>
                  <span className="text-[11px] text-slate-400">Harvested: {h.harvestedAt} • Grade: {h.qualityGrade}</span>
                </div>
                <span className="font-extrabold text-emerald-400 text-sm">{h.weightKg} kg</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
