"use client";

import React from "react";
import FinanceShell from "@/components/shells/FinanceShell";
import { Coins, CreditCard, ShieldCheck, TrendingUp } from "lucide-react";

export default function FinanceDashboardPage() {
  return (
    <FinanceShell>
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            AGRICULTURAL CREDIT &amp; CROP INSURANCE
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] flex items-center gap-2 mt-1">
            <Coins className="w-6 h-6 text-emerald-400" />
            Agri-Credit Scoring &amp; Insurance Claims Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Production micro-loans, PCIC climate insurance claims, and digital payout disbursement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Agri-Credit Applications</span>
            <p className="text-2xl font-extrabold text-emerald-400">14 Applications</p>
            <p className="text-slate-500 text-[11px]">Average Credit Score: 780 (Low Risk)</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Active Production Loans</span>
            <p className="text-2xl font-extrabold text-white">₱680,000 Total</p>
            <p className="text-slate-500 text-[11px]">8 active farm production cycles</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">PCIC Insurance Policy</span>
            <p className="text-2xl font-extrabold text-blue-400">Climate Protected</p>
            <p className="text-slate-500 text-[11px]">Typhoon &amp; flood damage coverage</p>
          </div>
        </div>
      </div>
    </FinanceShell>
  );
}
