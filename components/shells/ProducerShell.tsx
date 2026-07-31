"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sprout,
  Fish,
  Anchor,
  Beef,
  Egg,
  Warehouse,
  BookOpen,
  MapPin,
  Menu,
  X,
  User,
  ShieldCheck,
} from "lucide-react";

export default function ProducerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: "Producer Portal", href: "/producer", icon: Sprout },
    { label: "Farmer PWA", href: "/farmer", icon: Sprout },
    { label: "Fisheries & Vessels", href: "/producer?type=fisheries", icon: Fish },
    { label: "Aquaculture Ponds", href: "/producer?type=aquaculture", icon: Anchor },
    { label: "Livestock & Poultry", href: "/producer?type=livestock", icon: Beef },
    { label: "Storage & Warehouse", href: "/farmer/warehouse", icon: Warehouse },
    { label: "Ledger & Income", href: "/farmer/ledger", icon: BookOpen },
    { label: "Producer Profile", href: "/farmer/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Mobile & Desktop Navigation Header */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/producer" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-wide block">AgriHub PH</span>
              <span className="text-[10px] font-bold text-emerald-400 block -mt-1">Producer Value Chain</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-extrabold">
            PRODUCER HUB
          </span>
          <Link
            href="/farmer/profile"
            className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-emerald-400"
          >
            P
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex w-64 bg-slate-900 border-r border-slate-800 p-4 flex-col justify-between shrink-0">
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
              Producer Domains
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
            <span className="text-emerald-400 font-extrabold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Multi-Domain Active
            </span>
            <p className="text-[11px] text-slate-400">Crops • Fisheries • Aquaculture • Livestock</p>
          </div>
        </aside>

        {/* Main Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-72 bg-slate-900 border-r border-slate-800 p-5 space-y-6 flex flex-col justify-between z-50">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-extrabold text-sm text-white">Producer Value Chain</span>
                <button onClick={() => setDrawerOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      <Icon className="w-4 h-4 text-emerald-400" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
