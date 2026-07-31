"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppRoute } from "@/lib/navigation";
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
  const buildRoute = useAppRoute();
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
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-[#dce9df] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-[#f6fbf7] text-[#163025] border border-[#dce9df] hover:bg-[#ecfdf5]"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href={buildRoute("/producer")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#059669] text-white flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-[#163025] tracking-wide block">AgriHub PH</span>
              <span className="text-[10px] font-bold text-[#059669] block -mt-1">Producer Value Chain</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-extrabold">
            AGRICULTURE &amp; FISHERIES
          </span>
          <Link
            href={buildRoute("/farmer/profile")}
            className="p-2 rounded-xl bg-[#f6fbf7] hover:bg-[#ecfdf5] border border-[#dce9df] text-[#163025]"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white border-r border-[#dce9df] hidden lg:flex flex-col p-5 shrink-0 min-h-[calc(100vh-64px)] sticky top-16">
          <div className="space-y-6">
            <div className="px-1">
              <h2 className="text-[10px] uppercase font-black text-[#059669] tracking-wider">
                Producer Workspaces
              </h2>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const targetRoute = buildRoute(item.href);
                const isActive = pathname === targetRoute || pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={targetRoute}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#059669] text-white shadow-xs"
                        : "text-[#5f7469] hover:bg-[#f6fbf7] hover:text-[#163025]"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-[#163025]/60 backdrop-blur-xs" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-72 bg-white border-r border-[#dce9df] p-6 flex flex-col justify-between z-50 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
                <span className="font-extrabold text-sm text-[#163025]">Producer Workspaces</span>
                <button onClick={() => setDrawerOpen(false)} className="p-1 rounded-full text-[#5f7469] hover:bg-[#f6fbf7]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const targetRoute = buildRoute(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={targetRoute}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                        pathname === targetRoute ? "bg-[#059669] text-white" : "text-[#163025] hover:bg-[#f6fbf7]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
