"use client";

import React from "react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { Sprout, WifiOff, Store, Truck, ShieldCheck, BarChart3, MessageSquare } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 space-y-8">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            PLATFORM CAPABILITIES
          </span>
          <h1 className="text-3xl font-extrabold text-white">Full-Stack Agri-Fisheries Features</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          {[
            { title: "Offline PWA Logging", icon: WifiOff, desc: "Records saved locally via Dexie IndexedDB and synced when connection recovers." },
            { title: "Multi-Sector Production", icon: Sprout, desc: "Crops, capture fisheries, aquaculture ponds, livestock, and poultry management." },
            { title: "Warehouse Stock & Costing", icon: Store, desc: "Automatic inventory deduction and financial ledger updates upon input usage." },
            { title: "Cold-Chain Fleet Logistics", icon: Truck, desc: "Refrigerated van dispatching, route tracking, and 4°C temperature telemetry." },
            { title: "Traceability & QR Verification", icon: ShieldCheck, desc: "Public verification of produce provenance from farmer plot to supermarket shelf." },
            { title: "Predictive Yield Analytics", icon: BarChart3, desc: "Cooperative supply aggregation and forecast metrics across member producers." },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
                <Icon className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-sm text-white">{f.title}</h3>
                <p className="text-slate-400 font-normal leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
