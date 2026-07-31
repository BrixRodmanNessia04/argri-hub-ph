"use client";

import React from "react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 space-y-8">
        <div className="space-y-2 text-center">
          <span className="px-3 py-1 rounded-full bg-[#ecfdf5] text-[#047857] text-xs font-extrabold border border-[#a7f3d0]">
            TRANSPARENT PRICING
          </span>
          <h1 className="text-3xl font-extrabold text-[#163025]">Simple, Accessible Pricing Models</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-6 rounded-3xl bg-white border border-[#dce9df] space-y-4 shadow-xs">
            <h3 className="font-extrabold text-base text-[#163025]">Smallholder Producer</h3>
            <p className="text-2xl font-black text-[#059669]">Free Forever</p>
            <p className="text-[#5f7469] font-normal">For individual farmers and municipal fishers.</p>
            <ul className="space-y-2 text-[#163025] font-semibold pt-2 border-t border-[#dce9df]">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#059669]" /> Offline PWA field logging</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#059669]" /> Farm inventory &amp; costing</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#059669]" /> Crop &amp; catch performance</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#059669] space-y-4 shadow-md relative">
            <span className="px-2.5 py-0.5 rounded-full bg-[#059669] text-white text-[10px] font-black uppercase tracking-wider absolute -top-3 right-6">
              MOST POPULAR
            </span>
            <h3 className="font-extrabold text-base text-[#163025]">Cooperative Hub</h3>
            <p className="text-2xl font-black text-[#163025]">₱1,500 <span className="text-xs font-normal text-[#5f7469]">/ mo</span></p>
            <p className="text-[#5f7469] font-normal">For farmers &amp; fisherfolk cooperatives.</p>
            <ul className="space-y-2 text-[#163025] font-semibold pt-2 border-t border-[#dce9df]">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#059669]" /> Member harvest reviews</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#059669]" /> Bulk lot aggregation</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#059669]" /> B2B marketplace publishing</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#dce9df] space-y-4 shadow-xs">
            <h3 className="font-extrabold text-base text-[#163025]">Enterprise &amp; Processor</h3>
            <p className="text-2xl font-black text-[#0ea5a4]">Custom Tier</p>
            <p className="text-[#5f7469] font-normal">For processors, buyers &amp; logistics fleets.</p>
            <ul className="space-y-2 text-[#163025] font-semibold pt-2 border-t border-[#dce9df]">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#0ea5a4]" /> Food processing production lines</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#0ea5a4]" /> Cold-chain fleet telemetry</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#0ea5a4]" /> Custom API &amp; ERP sync</li>
            </ul>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
