"use client";

import React from "react";
import CoopLayout from "@/components/CoopLayout";
import { Coins, CheckCircle2 } from "lucide-react";

export default function CoopPayoutsPage() {
  const payouts = [
    { farmer: "Jose Reyes", amount: 10500, lot: "Lot #2026-07A", status: "READY_FOR_DISBURSAL" },
    { farmer: "Maria Santos", amount: 8400, lot: "Lot #2026-07B", status: "DISBURSED" },
  ];

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            MEMBER DISBURSAL ENGINE
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            Member Farmer Payouts
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
          {payouts.map((p, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white text-base font-extrabold">{p.farmer}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                  {p.status}
                </span>
              </div>
              <p className="text-slate-400">Target Lot: {p.lot}</p>
              <p className="text-lg font-extrabold text-emerald-400">₱{p.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </CoopLayout>
  );
}
