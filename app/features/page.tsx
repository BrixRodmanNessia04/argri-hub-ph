"use client";

import React from "react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { Sprout, WifiOff, Store, Truck, ShieldCheck, BarChart3 } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 space-y-8">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#ecfdf5] text-[#047857] text-xs font-extrabold border border-[#a7f3d0]">
            PLATFORM CAPABILITIES
          </span>
          <h1 className="text-3xl font-extrabold text-[#163025]">Full-Stack Agri-Fisheries Features</h1>
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
              <div key={f.title} className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
                <Icon className="w-5 h-5 text-[#059669]" />
                <h3 className="font-extrabold text-sm text-[#163025]">{f.title}</h3>
                <p className="text-[#5f7469] font-normal leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
