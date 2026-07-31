"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppRoute } from "@/lib/navigation";
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
  const buildRoute = useAppRoute();

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
    <aside className="w-64 bg-white border-r border-[#dce9df] hidden lg:flex flex-col justify-between p-5 shrink-0 min-h-screen sticky top-0">
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#dce9df]">
          <div className="p-2 rounded-xl bg-[#059669] text-white shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-[#163025]">Benguet Farmers Coop</h2>
            <p className="text-[11px] font-semibold text-[#059669]">Coop Manager Portal</p>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const targetRoute = buildRoute(link.href);
            const isActive = pathname === targetRoute || pathname === link.href;

            return (
              <Link
                key={link.href}
                href={targetRoute}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#059669] text-white shadow-xs"
                    : "text-[#5f7469] hover:bg-[#f6fbf7] hover:text-[#163025]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
