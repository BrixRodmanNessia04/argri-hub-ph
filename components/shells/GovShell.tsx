"use client";

import React from "react";
import Link from "next/link";
import { useAppRoute } from "@/lib/navigation";
import { Landmark, ShieldCheck, User } from "lucide-react";

export default function GovShell({ children }: { children: React.ReactNode }) {
  const buildRoute = useAppRoute();

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <header className="h-16 bg-white border-b border-[#dce9df] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <Link href={buildRoute("/gov")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#059669] text-white flex items-center justify-center font-bold">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-[#163025] block">AgriHub PH</span>
              <span className="text-[10px] font-bold text-[#059669] block -mt-1">DA &amp; LGU Governance</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-extrabold">
            GOVERNMENT &amp; REGULATORY
          </span>
          <Link href={buildRoute("/farmer/profile")} className="p-2 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]">
            <User className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="w-64 bg-white border-r border-[#dce9df] hidden lg:flex flex-col p-5 shrink-0 min-h-[calc(100vh-64px)] sticky top-16">
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase font-black text-[#059669] tracking-wider">LGU &amp; DA Controls</h2>
            <nav className="space-y-1">
              <Link href={buildRoute("/gov")} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#059669] text-white shadow-xs">
                <Landmark className="w-4 h-4 shrink-0" />
                <span>Governance Portal</span>
              </Link>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
