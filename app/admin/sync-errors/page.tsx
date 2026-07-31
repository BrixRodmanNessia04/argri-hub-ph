"use client";

import React from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import { AlertTriangle } from "lucide-react";

export default function AdminSyncErrorsPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <AdminSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-[#163025]">Offline Sync Exceptions &amp; Resolution</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl p-8 text-center text-xs text-emerald-400">
          No offline sync exceptions detected across all registered devices.
        </div>
      </main>
    </div>
  );
}
