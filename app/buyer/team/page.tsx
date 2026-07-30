"use client";

import React from "react";
import BuyerSidebarNav from "@/components/BuyerSidebarNav";
import { Users } from "lucide-react";

export default function BuyerTeamPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <BuyerSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Team Procurement Members</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
          <p className="text-xs text-slate-400 font-semibold font-mono">Role: Lead Procurement Officer • Approval Limit: ₱500,000</p>
        </div>
      </main>
    </div>
  );
}
