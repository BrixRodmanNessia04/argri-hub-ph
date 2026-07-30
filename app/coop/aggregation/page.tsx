"use client";

import React from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { AggregateForm } from "@/components/AggregateForm";
import { Layers } from "lucide-react";

export default function CoopAggregationPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            WHOLESALE LOT CONSOLIDATION ENGINE
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Produce Aggregation &amp; Marketplace Publishing
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Pool approved member harvest lots into bulk wholesale offerings for Metro Manila buyers.
          </p>
        </div>

        <AggregateForm availableCrops={["Cabbage", "Tomato", "Carrot", "Eggplant"]} coopId="coop-456" />
      </main>
    </div>
  );
}
