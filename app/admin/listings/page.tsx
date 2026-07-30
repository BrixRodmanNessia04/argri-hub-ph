"use client";

import React from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import { Sprout, ShoppingCart, CreditCard, BarChart3, Settings } from "lucide-react";

export default function AdminListingsPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <AdminSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Marketplace Listing Moderation</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
          <p className="text-xs text-slate-400">Content moderation and quality check for cooperative B2B listings.</p>
        </div>
      </main>
    </div>
  );
}
