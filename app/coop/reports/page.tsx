"use client";

import React from "react";
import CoopLayout from "@/components/CoopLayout";
import { BarChart3 } from "lucide-react";

export default function CoopReportsPage() {
  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            COOPERATIVE ANALYTICS
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            Performance Analytics &amp; Reports
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400">Total Volume Aggregated This Month</span>
            <p className="text-2xl font-extrabold text-emerald-400">4,250 kg</p>
          </div>
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400">Total B2B Marketplace Gross Revenue</span>
            <p className="text-2xl font-extrabold text-white">₱191,250.00</p>
          </div>
        </div>
      </div>
    </CoopLayout>
  );
}
