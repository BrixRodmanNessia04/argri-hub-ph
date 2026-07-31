"use client";

import React from "react";
import BuyerSidebarNav from "@/components/BuyerSidebarNav";
import { FileText, Download } from "lucide-react";

export default function BuyerInvoicesPage() {
  const invoices = [
    { id: "INV-2026-001", orderRef: "ORD-901", amount: 12000, date: "2026-07-28", status: "PAID_ESCROW" },
    { id: "INV-2026-002", orderRef: "ORD-902", amount: 8250, date: "2026-07-29", status: "PAID_ESCROW" },
  ];

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <BuyerSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Procurement Tax Invoices</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#dce9df] text-xs text-slate-400 uppercase tracking-wider bg-white/60">
                <th className="py-3.5 px-6 font-semibold">Invoice No</th>
                <th className="py-3.5 px-6 font-semibold">Order Ref</th>
                <th className="py-3.5 px-6 font-semibold">Amount</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#f6fbf7]/40">
                  <td className="py-4 px-6 font-mono font-bold text-white">{inv.id}</td>
                  <td className="py-4 px-6 font-mono text-teal-400">{inv.orderRef}</td>
                  <td className="py-4 px-6 font-extrabold text-emerald-400">₱{inv.amount.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                      {inv.status}
                    </span>
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
