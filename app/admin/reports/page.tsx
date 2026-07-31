"use client";

import React from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import { BarChart3 } from "lucide-react";

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <AdminSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Platform GMV &amp; Gross Trade Volume Reports</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-xl space-y-2">
          <p className="text-xs text-slate-400 font-extrabold text-emerald-400">Total YTD Trade Volume: ₱1,450,000.00</p>
        </div>
      </main>
    </div>
  );
}
