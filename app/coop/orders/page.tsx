"use client";

import React, { useState } from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { ShoppingCart, CheckCircle2, Truck, CreditCard } from "lucide-react";

export default function CoopOrdersPage() {
  const [orders, setOrders] = useState([
    { id: "ORD-901", buyer: "Robinsons Supermarket Procurement", crop: "Benguet Cabbage", weightKg: 300, total: 12000, status: "CONFIRMED", paymentStatus: "ESCROW_HELD" },
    { id: "ORD-902", buyer: "Metro Manila Restaurant Group", crop: "Atok Sweet Carrots", weightKg: 150, total: 8250, status: "PACKING", paymentStatus: "ESCROW_HELD" },
  ]);

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            WHOLESALE ORDER MANAGEMENT
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Incoming B2B Buyer Orders ({orders.length})
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-6 font-semibold">Order Ref</th>
                <th className="py-3.5 px-6 font-semibold">B2B Buyer Organization</th>
                <th className="py-3.5 px-6 font-semibold">Produce &amp; Volume</th>
                <th className="py-3.5 px-6 font-semibold">Total Amount</th>
                <th className="py-3.5 px-6 font-semibold">Fulfillment Status</th>
                <th className="py-3.5 px-6 font-semibold">PayMongo Escrow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-mono font-bold text-teal-400">{ord.id}</td>
                  <td className="py-4 px-6 font-semibold text-white">{ord.buyer}</td>
                  <td className="py-4 px-6 text-slate-300">{ord.weightKg} kg {ord.crop}</td>
                  <td className="py-4 px-6 font-extrabold text-emerald-400">₱{ord.total.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 text-xs font-bold">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                      {ord.paymentStatus}
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
