"use client";

import React from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { Settings } from "lucide-react";

export default function CoopSettingsPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Cooperative Settings &amp; Bank Profile</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <p className="text-xs text-slate-400">Manage warehouse delivery address and PayMongo payout bank details.</p>
        </div>
      </main>
    </div>
  );
}
