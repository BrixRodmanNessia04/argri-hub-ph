"use client";

import React from "react";
import GovShell from "@/components/shells/GovShell";
import { Landmark, ShieldCheck, FileText, BarChart3 } from "lucide-react";

export default function GovDashboardPage() {
  return (
    <GovShell>
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            DEPARTMENT OF AGRICULTURE &amp; LGU GOVERNANCE
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] flex items-center gap-2 mt-1">
            <Landmark className="w-6 h-6 text-amber-400" />
            Government &amp; Regulatory Services Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            LGU harvest monitoring, BFAR fisheries management, RSBSA producer verification, and accreditation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Registered Producers</span>
            <p className="text-2xl font-extrabold text-amber-400">124 Producers</p>
            <p className="text-slate-500 text-[11px]">RSBSA &amp; Municipal Fisherfolk Verified</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">GAP / GAqP Inspections</span>
            <p className="text-2xl font-extrabold text-white">18 Completed</p>
            <p className="text-slate-500 text-[11px]">Good Agricultural Practices certified</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Subsidy Voucher Program</span>
            <p className="text-2xl font-extrabold text-emerald-400">₱450,000 Distributed</p>
            <p className="text-slate-500 text-[11px]">Fertilizer &amp; seed assistance</p>
          </div>
        </div>
      </div>
    </GovShell>
  );
}
