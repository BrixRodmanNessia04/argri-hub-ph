"use client";

import React from "react";
import LogisticsShell from "@/components/shells/LogisticsShell";
import { Truck, MapPin, Thermometer, ShieldCheck } from "lucide-react";

export default function LogisticsDashboardPage() {
  return (
    <LogisticsShell>
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            COLD-CHAIN &amp; FLEET MANAGEMENT
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2 mt-1">
            <Truck className="w-6 h-6 text-blue-400" />
            Refrigerated Fleet &amp; Transport Logistics Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Reefer truck dispatching, temperature logging (4°C), inter-island cargo shipping, and delivery tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Active Fleet Vehicles</span>
            <p className="text-2xl font-extrabold text-blue-400">6 Refrigerated Vans</p>
            <p className="text-slate-500 text-[11px]">Benguet - Bulacan DC Corridor</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Active Dispatches</span>
            <p className="text-2xl font-extrabold text-white">3 In Transit</p>
            <p className="text-slate-500 text-[11px]">3,500 kg wholesale produce</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Cold-Chain Monitoring</span>
            <p className="text-2xl font-extrabold text-emerald-400">4.2°C (Optimal)</p>
            <p className="text-slate-500 text-[11px]">Real-time telemetry logged</p>
          </div>
        </div>
      </div>
    </LogisticsShell>
  );
}
