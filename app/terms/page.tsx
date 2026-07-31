"use client";

import React from "react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-6 text-xs text-[#163025]">
        <h1 className="text-3xl font-extrabold text-[#163025]">Terms of Service</h1>
        <p className="text-[#5f7469] font-normal">Last updated: July 31, 2026</p>
        <div className="space-y-4 leading-relaxed font-normal bg-white border border-[#dce9df] rounded-3xl p-6 shadow-xs">
          <p>By accessing AgriHub PH, creating an account, or interacting with demo workspaces, you agree to these Terms of Service.</p>
          <h3 className="font-extrabold text-sm text-[#163025] pt-2">Demo Mode Isolation</h3>
          <p>Demo workspaces (`/demo/*`) utilize local browser storage (`agrihub-demo`). Demo records are not saved to production cloud storage and do not represent verified commercial contracts.</p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
