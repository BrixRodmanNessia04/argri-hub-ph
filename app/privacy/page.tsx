"use client";

import React from "react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-6 text-xs text-[#163025]">
        <h1 className="text-3xl font-extrabold text-[#163025]">Privacy Policy</h1>
        <p className="text-[#5f7469] font-normal">Last updated: July 31, 2026</p>
        <div className="space-y-4 leading-relaxed font-normal bg-white border border-[#dce9df] rounded-3xl p-6 shadow-xs">
          <p>AgriHub PH respects the privacy of producers, cooperatives, and commercial users. Personal information and agricultural records stored offline or transmitted to our servers are encrypted and protected under Republic Act No. 10173 (Data Privacy Act of 2012).</p>
          <h3 className="font-extrabold text-sm text-[#163025] pt-2">Data Collection &amp; Offline Storage</h3>
          <p>Offline field logs are stored in your device browser IndexedDB (`AgriAppDB`) and are only synchronized with server databases upon authentication and active connection.</p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
