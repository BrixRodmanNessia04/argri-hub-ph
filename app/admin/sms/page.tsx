"use client";

import React from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import { MessageSquare, AlertTriangle, FileCheck, Sprout, ShoppingCart, CreditCard, BarChart3, Settings } from "lucide-react";

export default function AdminSmsPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <AdminSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">SMS Gateway Monitor &amp; Provider Logs</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-xl space-y-2">
          <p className="text-xs text-slate-400">Gateway Status: Online • 100% Delivery Success Rate</p>
        </div>
      </main>
    </div>
  );
}
