"use client";

import React from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { Sprout } from "lucide-react";

export default function CoopCropCyclesPage() {
  const cycles = [
    { id: "cc-1", farmer: "Jose Reyes", crop: "Benguet Cabbage", stage: "Head Formation", planted: "2026-06-01", estHarvest: "2026-08-30" },
    { id: "cc-2", farmer: "Maria Santos", crop: "Atok Carrots", stage: "Root Maturation", planted: "2026-05-15", estHarvest: "2026-08-10" },
  ];

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Ongoing Member Crop Cycles ({cycles.length})</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cycles.map((c) => (
            <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold">{c.stage}</span>
              <h2 className="text-lg font-bold text-white">{c.crop}</h2>
              <p className="text-xs text-slate-400">Farmer: {c.farmer} • Est. Harvest: {c.estHarvest}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
