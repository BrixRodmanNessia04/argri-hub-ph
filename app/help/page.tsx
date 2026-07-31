"use client";

import React from "react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { HelpCircle, WifiOff, RefreshCw, Phone } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-8 text-xs">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            SUPPORT &amp; HELP
          </span>
          <h1 className="text-3xl font-extrabold text-white">Help Center</h1>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-emerald-400" /> How does offline logging work?
            </h3>
            <p className="text-slate-400 font-normal">
              When you submit a log in remote areas without internet, records are stored in browser storage (Dexie IndexedDB). Once cellular signal or Wi-Fi becomes available, your records automatically upload to the cloud.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-400" /> How do I reset demo data?
            </h3>
            <p className="text-slate-400 font-normal">
              In demo mode, click the &quot;Reset Demo&quot; button in the amber banner at the top of the page. This resets your browser demo storage to its default state.
            </p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
