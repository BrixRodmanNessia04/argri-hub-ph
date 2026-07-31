"use client";

import React from "react";
import DemoBanner from "@/components/demo/DemoBanner";
import { Truck } from "lucide-react";

export default function DemoTransportPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <DemoBanner roleName="Fleet Logistics (Preview)" />
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            DEMO PREVIEW MODE
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2 mt-1">
            <Truck className="w-6 h-6 text-blue-400" />
            Refrigerated Transport Fleet Demo
          </h1>
          <p className="text-xs text-slate-400">Reefer truck dispatching, cold-chain temperature telemetry, and proof of delivery.</p>
        </div>
      </main>
    </div>
  );
}
