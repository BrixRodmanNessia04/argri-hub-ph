"use client";

import React, { useEffect } from "react";
import DemoBanner from "@/components/demo/DemoBanner";
import { seedDemoDatabase, demoDb } from "@/lib/demoDb";
import { useLiveQuery } from "dexie-react-hooks";
import { Fish, Anchor, Fuel, CheckCircle2, WifiOff } from "lucide-react";

export default function DemoFisherPage() {
  useEffect(() => {
    seedDemoDatabase();
  }, []);

  const catches = useLiveQuery(() => demoDb.demoCatches.toArray(), []) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <DemoBanner roleName="Fisheries Operations" />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/15 text-blue-300 border border-blue-500/30">
              OFFLINE DEMO MODE (ISOLATED)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2 mt-1">
            <Fish className="w-6 h-6 text-blue-400" />
            Capture Fisheries Demo Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Simulates vessel trip dispatching, fuel stock deduction, fishing grounds, and species catch logging.
          </p>
        </div>

        {/* Demo Catches List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Anchor className="w-4 h-4 text-blue-400" /> Demo Logged Catches ({catches.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {catches.map((c) => (
              <div key={c.localId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-sm">{c.speciesName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-extrabold">
                    {c.weightKg} kg
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">Vessel: {c.vesselName} • Preservation: {c.preservationMethod}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
