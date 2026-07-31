"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Truck, MapPin, ShieldCheck, Menu, X } from "lucide-react";

export default function LogisticsShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => setDrawerOpen(true)} className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-200">
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/logistics" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-wide block">AgriHub PH</span>
              <span className="text-[10px] font-bold text-blue-400 block -mt-1">Cold-Chain &amp; Fleet Logistics</span>
            </div>
          </Link>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-extrabold">
          LOGISTICS PORTAL
        </span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 lg:pb-8">{children}</main>
    </div>
  );
}
