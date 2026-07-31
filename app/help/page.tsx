"use client";

import React from "react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { WifiOff, RefreshCw } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-8 text-xs">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#ecfdf5] text-[#047857] text-xs font-extrabold border border-[#a7f3d0]">
            SUPPORT &amp; HELP
          </span>
          <h1 className="text-3xl font-extrabold text-[#163025]">Help Center</h1>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
            <h3 className="font-extrabold text-sm text-[#163025] flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-[#059669]" /> How does offline logging work?
            </h3>
            <p className="text-[#5f7469] font-normal leading-relaxed">
              When you submit a log in remote areas without internet, records are stored in browser storage (Dexie IndexedDB). Once cellular signal or Wi-Fi becomes available, your records automatically upload to the cloud.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
            <h3 className="font-extrabold text-sm text-[#163025] flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#059669]" /> How do I reset demo data?
            </h3>
            <p className="text-[#5f7469] font-normal leading-relaxed">
              In demo mode, click the &quot;Reset Demo&quot; button in the header bar. This resets your browser demo storage (`agrihub-demo` DB) to its default state.
            </p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
