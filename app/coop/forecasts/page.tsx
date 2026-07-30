"use client";

import React from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { Sparkles, CalendarDays, AlertCircle } from "lucide-react";

export default function CoopForecastsPage() {
  const estimatedForecasts = [
    { id: "fc-1", crop: "Benguet Highland Cabbage", weightKg: 500, timeframe: "July 21 - 27", confidence: 94, contributors: 3 },
    { id: "fc-2", crop: "Baguio Vine-Ripened Tomatoes", weightKg: 800, timeframe: "July 28 - Aug 3", confidence: 89, contributors: 5 },
    { id: "fc-3", crop: "Highland Sweet Carrots", weightKg: 350, timeframe: "Aug 4 - 10", confidence: 91, contributors: 2 },
  ];

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              ESTIMATED STATISTICAL MODEL
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Yield Projections &amp; Supply Timeline
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Statistical yield projections calculated from member planting dates and regional maturity curves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {estimatedForecasts.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs text-teal-400 font-bold">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3.5 h-3.5" /> {item.timeframe}
                </span>
                <span className="text-[11px] text-amber-400">Estimated Yield</span>
              </div>

              <h2 className="text-lg font-extrabold text-white">
                {item.weightKg} kg • {item.crop}
              </h2>
              <p className="text-xs text-slate-400">
                Expected from <strong className="text-white">{item.contributors} member farms</strong>
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400">
                Calculation based on 90-day maturity curve and recorded planting density.
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
