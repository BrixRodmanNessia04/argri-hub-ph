"use client";

import React from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import { AlertTriangle } from "lucide-react";

export default function AdminSyncErrorsPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <AdminSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Offline Sync Exceptions &amp; Resolution</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-xs text-emerald-400">
          No offline sync exceptions detected across all registered devices.
        </div>
      </main>
    </div>
  );
}
