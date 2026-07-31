"use client";

import React from "react";
import ProcessorShell from "@/components/shells/ProcessorShell";
import { Factory, Package, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ProcessorDashboardPage() {
  return (
    <ProcessorShell>
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            PROCESSING &amp; VALUE ADDITION HUB
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2 mt-1">
            <Factory className="w-6 h-6 text-purple-400" />
            Food Processing &amp; Packaging Facility Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Raw produce intake, batch processing, packaging production lines, and quality assurance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Processing Batches</span>
            <p className="text-2xl font-extrabold text-purple-400">4 Active Batches</p>
            <p className="text-slate-500 text-[11px]">Vegetable drying &amp; vacuum packing</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Raw Produce Intake</span>
            <p className="text-2xl font-extrabold text-white">1,850 kg</p>
            <p className="text-slate-500 text-[11px]">Sourced from Benguet Cooperative</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Quality Compliance</span>
            <p className="text-2xl font-extrabold text-emerald-400">HACCP / FDA Registered</p>
            <p className="text-slate-500 text-[11px]">Sanitary permit verified</p>
          </div>
        </div>
      </div>
    </ProcessorShell>
  );
}
