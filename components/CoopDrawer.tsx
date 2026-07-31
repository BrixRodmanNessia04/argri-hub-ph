"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppRoute } from "@/lib/navigation";
import {
  X,
  Building2,
  LayoutDashboard,
  Users,
  Scissors,
  Layers,
  Sparkles,
  Warehouse,
  Store,
  ShoppingCart,
  Truck,
  Coins,
  BarChart3,
  Settings,
  Bot,
  User,
  LogOut,
  Handshake,
} from "lucide-react";

interface CoopDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoopDrawer({ isOpen, onClose }: CoopDrawerProps) {
  const pathname = usePathname();
  const buildRoute = useAppRoute();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sections = [
    {
      title: "Main Operations",
      items: [
        { href: "/coop/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/coop/farmers", label: "Member Farmers", icon: Users },
        { href: "/coop/harvests", label: "Harvest Approvals", icon: Scissors },
        { href: "/coop/aggregation", label: "Lot Aggregation", icon: Layers },
      ],
    },
    {
      title: "Supply & Inventory",
      items: [
        { href: "/coop/forecasts", label: "Yield Forecasts", icon: Sparkles },
        { href: "/coop/inventory", label: "Warehouse Stock", icon: Warehouse },
        { href: "/coop/listings", label: "Market Listings", icon: Store },
      ],
    },
    {
      title: "Commerce & Logistics",
      items: [
        { href: "/coop/negotiations", label: "Commercial Negotiations", icon: Handshake },
        { href: "/coop/orders", label: "B2B Orders", icon: ShoppingCart },
        { href: "/coop/fulfillment", label: "Reefer Dispatch", icon: Truck },
        { href: "/coop/payouts", label: "Member Payouts", icon: Coins },
      ],
    },
    {
      title: "AI & Management",
      items: [
        { href: "/coop/ai", label: "AI Assistant", icon: Bot },
        { href: "/coop/reports", label: "Reports & Analytics", icon: BarChart3 },
        { href: "/coop/settings", label: "Coop Settings", icon: Settings },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#163025]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-80 max-w-[85vw] bg-white border-r border-[#dce9df] text-[#163025] flex flex-col justify-between shadow-2xl z-50 h-full">
        {/* Header */}
        <div className="p-4 border-b border-[#dce9df] flex items-center justify-between bg-[#f6fbf7]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#059669] text-white shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-[#163025]">Benguet Farmers Coop</h2>
              <p className="text-[11px] font-semibold text-[#059669]">Coop Operations Menu</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#5f7469] hover:bg-[#ecfdf5] hover:text-[#163025]"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-[10px] uppercase font-black tracking-wider text-[#059669] px-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const targetRoute = buildRoute(item.href);
                  const isActive = pathname === targetRoute || pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={targetRoute}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-[#059669] text-white shadow-xs"
                          : "text-[#163025] hover:bg-[#f6fbf7]"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#dce9df] bg-[#f6fbf7] space-y-2">
          <Link
            href={buildRoute("/coop/profile")}
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#163025] hover:bg-[#ecfdf5]"
          >
            <User className="w-4 h-4 text-[#059669]" />
            <span>Cooperative Profile</span>
          </Link>
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#5f7469] hover:text-[#163025] hover:bg-[#ecfdf5]"
          >
            <LogOut className="w-4 h-4 text-[#5f7469]" />
            <span>Exit Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
