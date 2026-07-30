"use client";

import React from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import { ShieldCheck, Building2, Users, ShoppingCart, AlertTriangle, RefreshCw } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <AdminSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            PLATFORM SUPER ADMINISTRATOR CONTROL
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            AgriHub PH Platform System Health &amp; Governance
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Monitor offline sync queues, cooperative verifications, PayMongo escrow balances, and security logs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <span className="text-xs font-medium text-slate-400">Verified Cooperatives</span>
            <p className="text-2xl font-extrabold text-white mt-3">12 Coops</p>
            <p className="text-xs text-purple-400 mt-1">Benguet, Mountain Province, Ifugao</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <span className="text-xs font-medium text-slate-400">Active B2B Buyers</span>
            <p className="text-2xl font-extrabold text-white mt-3">48 Buyers</p>
            <p className="text-xs text-blue-400 mt-1">Supermarket chains &amp; restaurants</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <span className="text-xs font-medium text-slate-400">Total Platform GMV</span>
            <p className="text-2xl font-extrabold text-emerald-400 mt-3">₱1.45M</p>
            <p className="text-xs text-emerald-400 mt-1 font-medium">Escrow Protected</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <span className="text-xs font-medium text-slate-400">Sync Exceptions Logged</span>
            <p className="text-2xl font-extrabold text-amber-400 mt-3">0 Errors</p>
            <p className="text-xs text-emerald-400 mt-1 font-medium">Sync engine healthy</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            System Administration Quick Controls
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-white">SMS Gateway Status</span>
              <p className="text-emerald-400 font-semibold">Online (Semaphore / Mock Active)</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-white">Supabase Multi-Tenant RLS</span>
              <p className="text-emerald-400 font-semibold">Enforced across 16 tables</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-white">PayMongo Webhook Listener</span>
              <p className="text-emerald-400 font-semibold">Active &amp; Listening</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
