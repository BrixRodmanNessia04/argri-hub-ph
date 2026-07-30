"use client";

import React from "react";
import CoopLayout from "@/components/CoopLayout";

export default function CoopPricingPage() {
  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            BASE PRICING STRATEGY
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            Cooperative Base Floor Pricing
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="font-extrabold text-white">Highland Cabbage (Class A)</span>
            <span className="font-extrabold text-emerald-400 text-sm">₱40.00 / kg</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="font-extrabold text-white">Atok Carrots (Class A)</span>
            <span className="font-extrabold text-emerald-400 text-sm">₱55.00 / kg</span>
          </div>
        </div>
      </div>
    </CoopLayout>
  );
}
