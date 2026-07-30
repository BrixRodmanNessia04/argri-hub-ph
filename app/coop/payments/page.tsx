"use client";

import React from "react";
import CoopLayout from "@/components/CoopLayout";
import { CreditCard } from "lucide-react";

export default function CoopPaymentsPage() {
  const escrowPayments = [
    { id: "PAY-1001", buyer: "Robinsons Supermarket", amount: 12000, provider: "PayMongo Escrow", status: "FUNDS_HELD" },
    { id: "PAY-1002", buyer: "Metro Manila Restaurant", amount: 8250, provider: "PayMongo Escrow", status: "FUNDS_HELD" },
  ];

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            PAYMONGO ESCROW INTEGRATION
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            PayMongo Escrow &amp; Buyer Payments
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
          {escrowPayments.map((p) => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-teal-400 text-sm">{p.id}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                  {p.status}
                </span>
              </div>
              <h3 className="font-extrabold text-base text-white">{p.buyer}</h3>
              <p className="text-base font-extrabold text-emerald-400">₱{p.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </CoopLayout>
  );
}
