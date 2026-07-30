"use client";

import React, { useState } from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { Coins, CheckCircle2 } from "lucide-react";

export default function CoopPayoutsPage() {
  const payouts = [
    { id: "po-1", farmerName: "Jose Reyes", crop: "Benguet Cabbage", weightKg: 150, grossAmount: 6000, coopFee: 300, netPayout: 5700, status: "READY" },
    { id: "po-2", farmerName: "Maria Santos", crop: "Baguio Tomatoes", weightKg: 120, grossAmount: 7200, coopFee: 360, netPayout: 6840, status: "READY" },
  ];

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDisburse = (name: string, net: number) => {
    setFeedback(`Disbursed payout of ₱${net.toLocaleString()} to ${name}!`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            MEMBER REVENUE ALLOCATION
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Member Farmer Payouts ({payouts.length})
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Calculate farmer allocation and disburse revenue after buyer escrow release.
          </p>
        </div>

        {feedback && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-6 font-semibold">Farmer</th>
                <th className="py-3.5 px-6 font-semibold">Volume</th>
                <th className="py-3.5 px-6 font-semibold">Gross Amount</th>
                <th className="py-3.5 px-6 font-semibold">Coop Fee (5%)</th>
                <th className="py-3.5 px-6 font-semibold">Net Payout</th>
                <th className="py-3.5 px-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-bold text-white">{p.farmerName}</td>
                  <td className="py-4 px-6 text-slate-300">{p.weightKg} kg {p.crop}</td>
                  <td className="py-4 px-6 text-slate-300">₱{p.grossAmount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-rose-400">-₱{p.coopFee.toLocaleString()}</td>
                  <td className="py-4 px-6 font-extrabold text-emerald-400">₱{p.netPayout.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDisburse(p.farmerName, p.netPayout)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
                    >
                      Disburse Payout
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
