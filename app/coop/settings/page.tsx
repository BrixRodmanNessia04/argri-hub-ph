"use client";

import React from "react";
import CoopLayout from "@/components/CoopLayout";
import { Settings } from "lucide-react";

export default function CoopSettingsPage() {
  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            COOPERATIVE PREFERENCES
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1">
            Cooperative System Settings
          </h1>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 text-xs font-medium">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-extrabold text-white block">Auto SMS Broadcast Notifications</span>
              <span className="text-[11px] text-slate-400">Notify members automatically upon harvest approval</span>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-teal-500" />
          </div>
        </div>
      </div>
    </CoopLayout>
  );
}
