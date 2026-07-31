"use client";

import React from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import { ShieldCheck, Building2, Users, ShoppingCart, AlertTriangle, RefreshCw } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] bg-[#f6fbf7] text-[#163025] flex font-sans">
      <AdminSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8 max-w-7xl mx-auto w-full">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
            PLATFORM SUPER ADMINISTRATOR CONTROL
          </span>
          <h1 className="text-2xl font-extrabold text-[#163025] tracking-tight mt-1.5">
            AgriHub PH Platform System Health &amp; Governance
          </h1>
          <p className="text-sm text-[#5f7469] mt-0.5">
            Monitor offline sync queues, cooperative verifications, PayMongo escrow balances, and security logs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-medium text-[#5f7469]">Verified Cooperatives</span>
            <p className="text-2xl font-extrabold text-[#163025] mt-3">12 Coops</p>
            <p className="text-xs text-[#059669] mt-1 font-semibold">Benguet, Mountain Province, Ifugao</p>
          </div>

          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-medium text-[#5f7469]">Active B2B Buyers</span>
            <p className="text-2xl font-extrabold text-[#163025] mt-3">48 Buyers</p>
            <p className="text-xs text-[#059669] mt-1 font-semibold">Supermarket chains &amp; restaurants</p>
          </div>

          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-medium text-[#5f7469]">Total Platform GMV</span>
            <p className="text-2xl font-extrabold text-[#059669] mt-3">₱1.45M</p>
            <p className="text-xs text-[#059669] mt-1 font-semibold">Escrow Protected</p>
          </div>

          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-medium text-[#5f7469]">Sync Exceptions Logged</span>
            <p className="text-2xl font-extrabold text-[#059669] mt-3">0 Errors</p>
            <p className="text-xs text-[#059669] mt-1 font-semibold">Sync engine healthy</p>
          </div>
        </div>

        <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#163025] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#059669]" />
            System Administration Quick Controls
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#f6fbf7] border border-[#dce9df] space-y-1">
              <span className="font-bold text-[#163025]">SMS Gateway Status</span>
              <p className="text-[#059669] font-semibold">Online (Semaphore / Mock Active)</p>
            </div>
            <div className="p-4 rounded-xl bg-[#f6fbf7] border border-[#dce9df] space-y-1">
              <span className="font-bold text-[#163025]">Supabase Multi-Tenant RLS</span>
              <p className="text-[#059669] font-semibold">Enforced across 16 tables</p>
            </div>
            <div className="p-4 rounded-xl bg-[#f6fbf7] border border-[#dce9df] space-y-1">
              <span className="font-bold text-[#163025]">PayMongo Webhook Listener</span>
              <p className="text-[#059669] font-semibold">Active &amp; Listening</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
