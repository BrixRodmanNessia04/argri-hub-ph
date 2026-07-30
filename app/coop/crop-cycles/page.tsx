"use client";

import React from "react";
import CoopLayout from "@/components/CoopLayout";
import { Sprout } from "lucide-react";

export default function CoopCropCyclesPage() {
  const cycles = [
    { crop: "Highland Cabbage", farmer: "Jose Reyes", planted: "2026-06-10", estHarvest: "2026-08-15", status: "GROWING" },
    { crop: "Atok Carrots", farmer: "Maria Santos", planted: "2026-05-20", estHarvest: "2026-08-05", status: "HARVESTING" },
  ];

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            MEMBER CROP MONITORING
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            Active Member Crop Cycles ({cycles.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cycles.map((c, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-400 border border-teal-800 text-[10px]">
                  {c.status}
                </span>
                <span className="text-slate-400">{c.farmer}</span>
              </div>
              <h3 className="font-extrabold text-base text-white">{c.crop}</h3>
              <p className="text-xs text-slate-400 font-medium">Planted: {c.planted} • Est. Harvest: {c.estHarvest}</p>
            </div>
          ))}
        </div>
      </div>
    </CoopLayout>
  );
}
