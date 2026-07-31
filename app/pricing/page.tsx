"use client";

import React from "react";
import Link from "next/link";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { CheckCircle2, Sprout } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 space-y-8">
        <div className="space-y-2 text-center">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            TRANSPARENT PRICING
          </span>
          <h1 className="text-3xl font-extrabold text-white">Simple, Accessible Pricing Models</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="font-extrabold text-base text-white">Smallholder Producer</h3>
            <p className="text-2xl font-black text-emerald-400">Free Forever</p>
            <p className="text-slate-400">For individual farmers and municipal fishers.</p>
            <ul className="space-y-2 text-slate-300 font-semibold pt-2 border-t border-slate-800">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Offline PWA field logging</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Farm inventory &amp; costing</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Crop &amp; catch performance</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/50 space-y-4 shadow-xl relative">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider absolute -top-3 right-6">
              MOST POPULAR
            </span>
            <h3 className="font-extrabold text-base text-white">Cooperative Hub</h3>
            <p className="text-2xl font-black text-white">₱1,500 <span className="text-xs font-normal text-slate-400">/ mo</span></p>
            <p className="text-slate-400">For farmers &amp; fisherfolk cooperatives.</p>
            <ul className="space-y-2 text-slate-300 font-semibold pt-2 border-t border-slate-800">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Member harvest reviews</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Bulk lot aggregation</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> B2B marketplace publishing</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="font-extrabold text-base text-white">Enterprise &amp; Processor</h3>
            <p className="text-2xl font-black text-blue-400">Custom Tier</p>
            <p className="text-slate-400">For processors, buyers &amp; logistics fleets.</p>
            <ul className="space-y-2 text-slate-300 font-semibold pt-2 border-t border-slate-800">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Food processing production lines</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Cold-chain fleet telemetry</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Custom API &amp; ERP sync</li>
            </ul>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
