"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Landmark, ShieldCheck, FileText, Menu, X } from "lucide-react";

export default function GovShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => setDrawerOpen(true)} className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-200">
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/gov" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-wide block">AgriHub PH</span>
              <span className="text-[10px] font-bold text-amber-400 block -mt-1">Government &amp; Regulatory Affairs</span>
            </div>
          </Link>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-extrabold">
          GOVERNMENT PORTAL
        </span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 lg:pb-8">{children}</main>
    </div>
  );
}
