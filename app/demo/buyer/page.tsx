"use client";

import React from "react";
import DemoBanner from "@/components/demo/DemoBanner";
import { Store, ShoppingBag, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function DemoBuyerPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <DemoBanner roleName="B2B Commercial Buyer" />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            OFFLINE DEMO MODE (ISOLATED)
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2 mt-1">
            <Store className="w-6 h-6 text-purple-400" />
            B2B Wholesale Produce Marketplace Demo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Simulates wholesale produce purchasing, coop provenance traceability, cart management, and PayMongo escrow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <div className="flex items-center justify-between font-bold">
              <span className="text-white font-extrabold text-sm">Benguet Highland Cabbage</span>
              <span className="text-purple-400 font-extrabold text-sm">₱45 / kg</span>
            </div>
            <p className="text-slate-400">Supplier: Benguet Farmers Agriculture Cooperative</p>
            <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-extrabold">
              1,200 kg Available
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <div className="flex items-center justify-between font-bold">
              <span className="text-white font-extrabold text-sm">Dagupan Fresh Milkfish (Bangus)</span>
              <span className="text-purple-400 font-extrabold text-sm">₱160 / kg</span>
            </div>
            <p className="text-slate-400">Supplier: Dagupan Aquaculturists Cooperative</p>
            <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-extrabold">
              850 kg Available
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
