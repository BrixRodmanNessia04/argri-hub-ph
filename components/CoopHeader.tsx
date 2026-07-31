"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppRoute } from "@/lib/navigation";
import { Menu, Building2, Bot, User, Bell, Sparkles } from "lucide-react";

interface CoopHeaderProps {
  onOpenDrawer: () => void;
}

export default function CoopHeader({ onOpenDrawer }: CoopHeaderProps) {
  const pathname = usePathname();
  const buildRoute = useAppRoute();

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
    <header className="bg-white border-b border-[#dce9df] px-4 py-3 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Mobile Hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDrawer}
            className="lg:hidden p-2 rounded-xl bg-[#f6fbf7] text-[#163025] border border-[#dce9df] hover:bg-[#ecfdf5]"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex p-2 rounded-xl bg-[#059669] text-white shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-[#163025] tracking-tight">
                {getPageTitle(pathname)}
              </h1>
              <p className="text-[11px] font-semibold text-[#059669]">
                Benguet Farmers Cooperative
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={buildRoute("/coop/ai")}
            className="px-3 py-1.5 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] border border-[#a7f3d0] text-[#047857] text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Link>

          <Link
            href={buildRoute("/coop/profile")}
            className="p-2 rounded-xl bg-[#f6fbf7] hover:bg-[#ecfdf5] border border-[#dce9df] text-[#163025] transition-all"
            aria-label="Coop Profile"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
