"use client";

import React from "react";
import Link from "next/link";
import BuyerSidebarNav from "@/components/BuyerSidebarNav";
import { ShoppingCart, FileText, CheckCircle2, Eye } from "lucide-react";

export default function BuyerOrdersPage() {
  const orders = [
    { id: "ORD-901", produce: "Benguet Cabbage", qtyKg: 300, total: 12000, date: "2026-07-28", status: "CONFIRMED" },
    { id: "ORD-902", produce: "Atok Sweet Carrots", qtyKg: 150, total: 8250, date: "2026-07-29", status: "IN_TRANSIT" },
  ];

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <BuyerSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            WHOLESALE ORDER HISTORY
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Order Status &amp; Fulfillment Tracking ({orders.length})
          </h1>
        </div>

        <div className="bg-white border border-[#dce9df] rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#dce9df] text-xs text-slate-400 uppercase tracking-wider bg-white/60">
                <th className="py-3.5 px-6 font-semibold">Order Ref</th>
                <th className="py-3.5 px-6 font-semibold">Produce &amp; Volume</th>
                <th className="py-3.5 px-6 font-semibold">Total Cost</th>
                <th className="py-3.5 px-6 font-semibold">Date</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#f6fbf7]/40">
                  <td className="py-4 px-6 font-mono font-bold text-teal-400">{ord.id}</td>
                  <td className="py-4 px-6 font-semibold text-white">{ord.qtyKg} kg {ord.produce}</td>
                  <td className="py-4 px-6 font-extrabold text-emerald-400">₱{ord.total.toLocaleString()}</td>
                  <td className="py-4 px-6 text-xs text-slate-400">{ord.date}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 text-xs font-bold">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/buyer/orders/${ord.id}`}
                      className="px-3 py-1.5 rounded-xl bg-[#f6fbf7] hover:bg-slate-700 text-slate-200 text-xs font-bold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Order
                    </Link>
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
