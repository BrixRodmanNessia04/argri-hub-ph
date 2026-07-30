"use client";

import React from "react";
import CoopLayout from "@/components/CoopLayout";
import { Sparkles } from "lucide-react";

export default function CoopForecastsPage() {
  const forecasts = [
    { crop: "Benguet Highland Cabbage", projectedKg: 1200, period: "Next 14 Days", confidence: "94%" },
    { crop: "Atok Sweet Carrots", projectedKg: 850, period: "Next 21 Days", confidence: "91%" },
  ];

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            PREDICTIVE YIELD FORECASTING
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            Yield Supply Timeline Forecasts
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {forecasts.map((f, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-teal-400">{f.period}</span>
                <span className="text-slate-400">{f.confidence} Confidence</span>
              </div>
              <h3 className="font-extrabold text-base text-white">{f.crop}</h3>
              <p className="text-sm font-extrabold text-emerald-400">{f.projectedKg} kg Projected</p>
            </div>
          ))}
        </div>
      </div>
    </CoopLayout>
  );
}
