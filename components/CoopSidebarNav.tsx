"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  LayoutDashboard,
  Users,
  Tractor,
  Sprout,
  Scissors,
  Layers,
  Sparkles,
  Warehouse,
  Store,
  ShoppingCart,
  Truck,
  CreditCard,
  Coins,
  Tag,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  Settings,
} from "lucide-react";

export default function CoopSidebarNav() {
  const pathname = usePathname();

  const links = [
    { href: "/coop/dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/coop/farmers", label: "Member Farmers", icon: Users },
    { href: "/coop/farms", label: "Member Farms Map", icon: Tractor },
    { href: "/coop/crop-cycles", label: "Active Crop Cycles", icon: Sprout },
    { href: "/coop/harvests", label: "Harvest Approvals", icon: Scissors },
    { href: "/coop/aggregation", label: "Lot Aggregation", icon: Layers },
    { href: "/coop/forecasts", label: "Yield Forecasts", icon: Sparkles },
    { href: "/coop/inventory", label: "Coop Warehouse Stock", icon: Warehouse },
    { href: "/coop/listings", label: "Marketplace Listings", icon: Store },
    { href: "/coop/orders", label: "B2B Buyer Orders", icon: ShoppingCart },
    { href: "/coop/fulfillment", label: "Cold-Chain Dispatch", icon: Truck },
    { href: "/coop/payments", label: "PayMongo Escrow", icon: CreditCard },
    { href: "/coop/payouts", label: "Member Payouts", icon: Coins },
    { href: "/coop/pricing", label: "Base Pricing Strategy", icon: Tag },
    { href: "/coop/messages", label: "Broadcast SMS", icon: MessageSquare },
    { href: "/coop/reports", label: "Analytics & Reports", icon: BarChart3 },
    { href: "/coop/users", label: "Coop Staff & RBAC", icon: ShieldCheck },
    { href: "/coop/settings", label: "Coop Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col justify-between p-5 shrink-0 min-h-[calc(100vh-57px)] sticky top-[57px]">
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white">Benguet Farmers Coop</h2>
            <p className="text-[11px] text-teal-400 font-semibold">Coop Leader Portal</p>
          </div>
        </div>

        <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 scrollbar-none">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  isActive
                    ? "bg-teal-500/15 text-teal-300 border border-teal-500/30 font-bold"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-teal-400" : "text-slate-400"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
        <p className="text-slate-400 text-[11px]">Active Members</p>
        <p className="text-base font-extrabold text-white">24 Registered Farmers</p>
      </div>
    </aside>
  );
}
