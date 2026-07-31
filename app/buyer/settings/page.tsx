"use client";

import React from "react";
import BuyerSidebarNav from "@/components/BuyerSidebarNav";
import { Settings } from "lucide-react";

export default function BuyerSettingsPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <BuyerSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-[#163025]">Procurement Settings</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-xl space-y-2">
          <p className="text-xs text-slate-400">Configure automated purchase order limits and PayMongo escrow notifications.</p>
        </div>
      </main>
    </div>
  );
}
