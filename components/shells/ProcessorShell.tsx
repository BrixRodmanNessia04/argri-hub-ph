"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppRoute } from "@/lib/navigation";
import { Factory, Package, Layers, ShieldCheck, User, Menu, X } from "lucide-react";

export default function ProcessorShell({ children }: { children: React.ReactNode }) {
  const buildRoute = useAppRoute();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: "Processor Dashboard", href: "/processor", icon: Factory },
    { label: "Produce Intake", href: "/processor", icon: Package },
    { label: "Processing Batches", href: "/processor", icon: Layers },
    { label: "Quality Control", href: "/processor", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <header className="h-16 bg-white border-b border-[#dce9df] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-[#f6fbf7] text-[#163025] border border-[#dce9df]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href={buildRoute("/processor")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#059669] text-white flex items-center justify-center font-bold">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-[#163025] block">AgriHub PH</span>
              <span className="text-[10px] font-bold text-[#059669] block -mt-1">Food Processing Facility</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-extrabold">
            PROCESSING &amp; VALUE ADDITION
          </span>
          <Link href={buildRoute("/farmer/profile")} className="p-2 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]">
            <User className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="w-64 bg-white border-r border-[#dce9df] hidden lg:flex flex-col p-5 shrink-0 min-h-[calc(100vh-64px)] sticky top-16">
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase font-black text-[#059669] tracking-wider">Facility Operations</h2>
            <nav className="space-y-1">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const targetRoute = buildRoute(item.href);
                return (
                  <Link
                    key={idx}
                    href={targetRoute}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#059669] text-white shadow-xs"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button type="button" aria-label="Close processor navigation" className="fixed inset-0 bg-[#163025]/60 backdrop-blur-xs" onClick={() => setDrawerOpen(false)} />
          <aside className="relative w-72 max-w-[88vw] h-full bg-white p-5 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3 mb-4">
              <span className="font-extrabold text-sm">Facility Operations</span>
              <button type="button" onClick={() => setDrawerOpen(false)} className="min-w-11 min-h-11 rounded-full bg-[#f6fbf7] flex items-center justify-center" aria-label="Close navigation">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const targetRoute = buildRoute(item.href);
                return (
                  <Link key={item.label} href={targetRoute} onClick={() => setDrawerOpen(false)} className="min-h-11 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#163025] hover:bg-[#f6fbf7]">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
