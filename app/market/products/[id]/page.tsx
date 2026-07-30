"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, MapPin, Sprout, Truck, Store } from "lucide-react";

export default function ProductTraceabilityPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/market" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to B2B Market
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                VERIFIED COOP TRACEABILITY
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
                Benguet Highland Cabbage (Class A)
              </h1>
              <p className="text-xs text-slate-400 mt-1">Listing ID: {resolvedParams.id}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-emerald-400">₱40.00 <span className="text-xs text-slate-400 font-normal">/ kg</span></p>
              <p className="text-xs text-slate-400 mt-1">500 kg available</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <Building className="w-4 h-4 text-teal-400" /> Cooperative Source
              </span>
              <Link href="/market/cooperatives/coop-456" className="font-extrabold text-teal-300 hover:underline block text-sm">
                Benguet Farmers Cooperative #456
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-400" /> Farm Origin
              </span>
              <p className="font-extrabold text-white text-sm">La Trinidad &amp; Atok, Benguet</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="font-bold text-sm text-white">Full Supply Chain Traceability Logs</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <span>1. Harvested by Farmer Jose Reyes (Plot 1)</span>
                <span className="text-emerald-400 font-bold">Verified</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <span>2. Inspected &amp; Class A Graded at Coop Warehouse</span>
                <span className="text-emerald-400 font-bold">Verified</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <span>3. Pre-chilled in Cold-Storage (4°C)</span>
                <span className="text-emerald-400 font-bold">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Building } from "lucide-react";
