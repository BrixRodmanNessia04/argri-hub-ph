"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { resetDemoDatabase } from "@/lib/demoDb";
import { resetProductionDatabase } from "@/lib/db";
import {
  Sprout,
  RefreshCw,
  UserPlus,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Fish,
  Building2,
  Store,
  Factory,
  Truck,
  Landmark,
  ShieldCheck,
  Coins,
} from "lucide-react";

export default function DemoHeader({ roleName }: { roleName: string }) {
  const pathname = usePathname();
  const [resetting, setResetting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const demoRoles = [
    { label: "Farmer PWA", href: "/demo/farmer", icon: Sprout },
    { label: "Capture Fisheries", href: "/demo/fisher", icon: Fish },
    { label: "Cooperative Manager", href: "/demo/coop", icon: Building2 },
    { label: "B2B Buyer Market", href: "/demo/buyer", icon: Store },
    { label: "Food Processor", href: "/demo/processor", icon: Factory },
    { label: "Fleet Logistics", href: "/demo/transport", icon: Truck },
    { label: "Government LGU", href: "/demo/government", icon: Landmark },
    { label: "Agri-Credit & Finance", href: "/demo/finance", icon: Coins },
    { label: "Platform Admin", href: "/demo/admin", icon: ShieldCheck },
  ];

  const handleReset = async () => {
    setResetting(true);
    await resetDemoDatabase();
    await resetProductionDatabase();
    setResetting(false);
    setFeedback("Demo data reset to original state!");
    setTimeout(() => {
      setFeedback(null);
      window.location.reload();
    }, 1000);
  };

  return (
    <header className="bg-white border-b border-[#dce9df] sticky top-0 z-50 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-[#ecfdf5] border-b border-[#a7f3d0] px-4 py-1.5 text-xs text-[#047857] flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-extrabold">
            <span className="px-2 py-0.5 rounded-md bg-[#059669] text-white text-[10px] uppercase font-black tracking-wider">
              DEMO MODE — FULL FEATURE REUSE
            </span>
            <span>Isolated fictional data. Actions do not write to production servers.</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold">
            <button
              onClick={handleReset}
              disabled={resetting}
              className="px-2.5 py-0.5 rounded-lg bg-white border border-[#a7f3d0] text-[#047857] hover:bg-[#d1fae5] flex items-center gap-1 transition-all"
            >
              <RefreshCw className={`w-3 h-3 ${resetting ? "animate-spin" : ""}`} />
              <span>Reset Demo Data</span>
            </button>
            <Link href="/register" className="text-[#059669] hover:underline font-extrabold">
              Create Real Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main Demo Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#059669] text-white flex items-center justify-center font-bold">
              <Sprout className="w-4.5 h-4.5" />
            </div>
            <span className="font-extrabold text-sm text-[#163025]">AgriHub PH</span>
          </Link>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-xs font-extrabold text-[#047857] hover:bg-[#ecfdf5]"
            >
              <span>{roleName}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {roleMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#dce9df] rounded-2xl shadow-xl p-2 z-50 space-y-1">
                <span className="px-3 text-[10px] font-black uppercase text-[#5f7469] tracking-wider block my-1">
                  Switch Demo Workspace
                </span>
                {demoRoles.map((r) => {
                  const Icon = r.icon;
                  const isActive = pathname === r.href;
                  return (
                    <Link
                      key={r.href}
                      href={r.href}
                      onClick={() => setRoleMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-[#059669] text-white"
                          : "text-[#163025] hover:bg-[#f6fbf7]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{r.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={handleReset}
            disabled={resetting}
            className="px-3 py-1.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] hover:bg-[#ecfdf5] text-xs font-bold flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#059669] ${resetting ? "animate-spin" : ""}`} />
            <span>Reset Demo Data</span>
          </button>

          <Link
            href="/demo"
            className="px-3 py-1.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#5f7469] hover:text-[#163025] text-xs font-bold flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Demo</span>
          </Link>

          <Link
            href="/register"
            className="px-3.5 py-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-extrabold flex items-center gap-1 shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="sm:hidden p-2 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <div className="fixed inset-0 bg-[#163025]/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-80 bg-white border-r border-[#dce9df] p-6 flex flex-col justify-between z-50 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
                <span className="font-extrabold text-sm text-[#163025]">Switch Demo Workspace</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-full text-[#5f7469] hover:bg-[#f6fbf7]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {demoRoles.map((r) => {
                  const Icon = r.icon;
                  return (
                    <Link
                      key={r.href}
                      href={r.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                        pathname === r.href ? "bg-[#059669] text-white" : "text-[#163025] hover:bg-[#f6fbf7]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{r.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 border-t border-[#dce9df] pt-3">
              <button
                onClick={() => { setMobileMenuOpen(false); handleReset(); }}
                className="w-full py-2.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#047857] font-extrabold text-xs flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reset Demo Data
              </button>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#059669] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <UserPlus className="w-4 h-4" /> Create Real Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
