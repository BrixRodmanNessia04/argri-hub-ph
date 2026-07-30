"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Building2, Bot, User, Bell, Sparkles } from "lucide-react";

interface CoopHeaderProps {
  onOpenDrawer: () => void;
}

export default function CoopHeader({ onOpenDrawer }: CoopHeaderProps) {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path.includes("/coop/farmers")) return "Member Farmers";
    if (path.includes("/coop/harvests")) return "Harvest Approvals";
    if (path.includes("/coop/aggregation")) return "Lot Aggregation";
    if (path.includes("/coop/inventory")) return "Warehouse Storage";
    if (path.includes("/coop/listings")) return "Marketplace Listings";
    if (path.includes("/coop/orders")) return "B2B Buyer Orders";
    if (path.includes("/coop/ai")) return "AI Operations Assistant";
    if (path.includes("/coop/forecasts")) return "Yield Forecasts";
    if (path.includes("/coop/fulfillment")) return "Cold-Chain Dispatch";
    if (path.includes("/coop/payouts")) return "Member Payouts";
    if (path.includes("/coop/profile")) return "Cooperative Profile";
    if (path.includes("/coop/reports")) return "Analytics & Reports";
    return "Coop Manager Hub";
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Mobile Hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDrawer}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex p-2 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                {getPageTitle(pathname)}
              </h1>
              <p className="text-[11px] font-semibold text-teal-400">
                Benguet Farmers Cooperative
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions (AI Assistant, Profile Avatar) */}
        <div className="flex items-center gap-2">
          <Link
            href="/coop/ai"
            className="px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">AI Operations</span>
          </Link>

          <Link
            href="/coop/profile"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center gap-2 text-xs font-bold border border-slate-700"
          >
            <User className="w-4 h-4 text-teal-400" />
            <span className="hidden md:inline">Elena Santos</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
