"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, MapPin, Building2 } from "lucide-react";

export default function CooperativeProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/market" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Market
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-400">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">Benguet Farmers Cooperative</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified CDA Registered
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Cooperative ID: {resolvedParams.id} • La Trinidad, Benguet</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-xs text-slate-400">Member Farmers</p>
              <p className="text-xl font-extrabold text-white mt-1">24 Active</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-xs text-slate-400">Active Offerings</p>
              <p className="text-xl font-extrabold text-teal-400 mt-1">6 Lots</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-xs text-slate-400">Fulfillment Score</p>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">98.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
