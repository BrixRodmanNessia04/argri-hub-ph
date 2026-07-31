"use client";

import React from "react";
import BuyerSidebarNav from "@/components/BuyerSidebarNav";
import { Bell, User, Settings } from "lucide-react";

export default function BuyerNotificationsPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <BuyerSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-[#163025]">Procurement Alerts &amp; Price Drops</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-xl space-y-2">
          <p className="text-xs text-slate-400">Order #ORD-902 dispatched from La Trinidad warehouse.</p>
        </div>
      </main>
    </div>
  );
}
