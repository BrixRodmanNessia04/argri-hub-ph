"use client";

import React from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { Truck, CreditCard, Tag, BarChart3, ShieldCheck, Settings } from "lucide-react";

export default function CoopFulfillmentPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Cold-Chain Pickup &amp; Dispatch</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
            <Truck className="w-5 h-5" />
            <span>Active Cold-Chain Shipments</span>
          </div>
          <p className="text-xs text-slate-400">
            Dispatch schedule for Metro Manila wholesale delivery (Reefer Truck #CAR-809).
          </p>
        </div>
      </main>
    </div>
  );
}
