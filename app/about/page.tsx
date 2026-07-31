"use client";

import React from "react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-8">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#ecfdf5] text-[#047857] text-xs font-extrabold border border-[#a7f3d0]">
            ABOUT AGRIHUB PH
          </span>
          <h1 className="text-3xl font-extrabold text-[#163025]">Transforming Philippine Agri-Fisheries Supply Chains</h1>
          <p className="text-[#5f7469] text-sm leading-relaxed font-normal">
            AgriHub PH is an offline-first digital infrastructure platform engineered specifically for the Philippine agricultural and fisheries ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
            <h3 className="text-[#163025] text-sm font-extrabold">Our Mission</h3>
            <p className="text-[#5f7469] font-normal leading-relaxed">Connect smallholder producers, fishermen, cooperatives, and commercial buyers into a transparent, fair, and resilient digital supply network.</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
            <h3 className="text-[#163025] text-sm font-extrabold">Offline-First Tech</h3>
            <p className="text-[#5f7469] font-normal leading-relaxed">IndexedDB browser storage enables zero-latency data entry in remote fields, mountain plots, and marine vessels without internet dependency.</p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
