"use client";

import React, { useState } from "react";
import CoopLayout from "@/components/CoopLayout";
import { ShoppingCart, CheckCircle2, Truck, CreditCard, Clock, ChevronRight, Eye } from "lucide-react";

export default function CoopOrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-901",
      buyer: "Robinsons Supermarket Procurement",
      crop: "Benguet Cabbage",
      weightKg: 300,
      total: 12000,
      orderDate: "2026-07-28",
      deliveryDate: "2026-08-01",
      status: "CONFIRMED",
      paymentStatus: "ESCROW_HELD",
      timelineStep: 2, // 1: Placed, 2: Confirmed, 3: Packing, 4: Dispatched, 5: Delivered
    },
    {
      id: "ORD-902",
      buyer: "Metro Manila Restaurant Group",
      crop: "Atok Sweet Carrots",
      weightKg: 150,
      total: 8250,
      orderDate: "2026-07-29",
      deliveryDate: "2026-08-02",
      status: "PACKING",
      paymentStatus: "ESCROW_HELD",
      timelineStep: 3,
    },
  ]);

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleUpdateStatus = (orderId: string, nextStatus: string, nextStep: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus, timelineStep: nextStep } : o))
    );
    setFeedback(`Order ${orderId} status updated to '${nextStatus}'.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const timelineSteps = [
    { step: 1, label: "Order Placed" },
    { step: 2, label: "Confirmed" },
    { step: 3, label: "Packing" },
    { step: 4, label: "Dispatched" },
    { step: 5, label: "Delivered" },
  ];

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            WHOLESALE ORDER FULFILLMENT
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            Incoming B2B Buyer Orders ({orders.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Process wholesale orders, track PayMongo escrow payments, and coordinate cold-chain dispatch.
          </p>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-6 font-semibold">Order Ref</th>
                <th className="py-3.5 px-6 font-semibold">B2B Buyer Organization</th>
                <th className="py-3.5 px-6 font-semibold">Produce &amp; Volume</th>
                <th className="py-3.5 px-6 font-semibold">Total Amount</th>
                <th className="py-3.5 px-6 font-semibold">Fulfillment Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-semibold">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-850 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-teal-400">{ord.id}</td>
                  <td className="py-4 px-6 font-bold text-white">{ord.buyer}</td>
                  <td className="py-4 px-6 text-slate-300">{ord.weightKg} kg {ord.crop}</td>
                  <td className="py-4 px-6 font-extrabold text-emerald-400">₱{ord.total.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 text-[11px] font-bold">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {ord.timelineStep === 2 && (
                      <button
                        onClick={() => handleUpdateStatus(ord.id, "PACKING", 3)}
                        className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm"
                      >
                        Start Packing
                      </button>
                    )}
                    {ord.timelineStep === 3 && (
                      <button
                        onClick={() => handleUpdateStatus(ord.id, "DISPATCHED", 4)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm"
                      >
                        Dispatch Order
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW WITH VERTICAL TIMELINE */}
        <div className="md:hidden space-y-4">
          {orders.map((ord) => (
            <div key={ord.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-mono font-extrabold text-teal-400 text-sm">{ord.id}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-extrabold border border-emerald-800">
                  {ord.paymentStatus}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-white">{ord.buyer}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{ord.weightKg} kg • {ord.crop}</p>
                <p className="text-lg font-extrabold text-emerald-400 mt-1">₱{ord.total.toLocaleString()}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Est. Delivery: {ord.deliveryDate}</p>
              </div>

              {/* Vertical Order Timeline on Mobile */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <span className="font-extrabold text-slate-400 text-[11px] uppercase tracking-wider">
                  Fulfillment Timeline
                </span>
                <div className="space-y-1.5 pl-2 border-l-2 border-slate-800">
                  {timelineSteps.map((step) => {
                    const isDone = ord.timelineStep >= step.step;
                    const isCurrent = ord.timelineStep === step.step;
                    return (
                      <div key={step.step} className="flex items-center gap-2 relative">
                        <div
                          className={`w-2.5 h-2.5 rounded-full -ml-[11px] ${
                            isCurrent
                              ? "bg-teal-400 ring-4 ring-teal-400/20"
                              : isDone
                              ? "bg-emerald-500"
                              : "bg-slate-700"
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            isCurrent
                              ? "font-extrabold text-teal-300"
                              : isDone
                              ? "font-bold text-slate-200"
                              : "text-slate-500"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-bold">
                {ord.timelineStep === 2 && (
                  <button
                    onClick={() => handleUpdateStatus(ord.id, "PACKING", 3)}
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-sm"
                  >
                    Start Packing
                  </button>
                )}
                {ord.timelineStep === 3 && (
                  <button
                    onClick={() => handleUpdateStatus(ord.id, "DISPATCHED", 4)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
                  >
                    Schedule Dispatch
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CoopLayout>
  );
}
