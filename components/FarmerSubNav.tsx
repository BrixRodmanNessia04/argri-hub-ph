"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Building2,
  MapPin,
  Sprout,
  Activity,
  Scissors,
  DollarSign,
  TrendingDown,
  Package,
  BookOpen,
  Calendar,
  Sparkles,
  RefreshCw,
  HelpCircle,
  Settings,
} from "lucide-react";
import FarmerBottomNav from "./FarmerBottomNav";

export default function FarmerSubNav() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/farmer", label: "Dashboard", icon: Home },
    { href: "/farmer/logs", label: "Unified Logs", icon: FileText },
    { href: "/farmer/farms", label: "Farms", icon: Building2 },
    { href: "/farmer/plots", label: "Plots", icon: MapPin },
    { href: "/farmer/crops", label: "Crops", icon: Sprout },
    { href: "/farmer/activities", label: "Activities", icon: Activity },
    { href: "/farmer/harvests", label: "Harvests", icon: Scissors },
    { href: "/farmer/sales", label: "Sales", icon: DollarSign },
    { href: "/farmer/expenses", label: "Expenses", icon: TrendingDown },
    { href: "/farmer/inventory", label: "Inventory", icon: Package },
    { href: "/farmer/ledger", label: "Ledger", icon: BookOpen },
    { href: "/farmer/calendar", label: "Calendar", icon: Calendar },
    { href: "/farmer/quick-capture", label: "Quick Capture", icon: Sparkles },
    { href: "/farmer/sync", label: "Sync Status", icon: RefreshCw },
    { href: "/farmer/settings", label: "Settings", icon: Settings },
    { href: "/farmer/help", label: "Help", icon: HelpCircle },
  ];

  return (
    <>
      <div className="bg-emerald-900 border-b border-emerald-800 text-emerald-100 hidden md:block sticky top-[57px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-white text-emerald-950 shadow-sm"
                      : "text-emerald-100 hover:bg-emerald-800/80 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <FarmerBottomNav />
    </>
  );
}
