"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Warehouse,
  Grid,
  FileText,
  MapPin,
  Sprout,
  BookOpen,
  Calendar,
  RefreshCw,
  User,
  Settings,
  Users,
  CheckSquare,
  BarChart3,
  HelpCircle,
  X,
} from "lucide-react";
import QuickAddModal from "./QuickAddModal";

export default function FarmerBottomNav() {
  const pathname = usePathname();
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Requirement 3: Primary 5 bottom navigation items:
  // 1. Dashboard -> /farmer
  // 2. Farms -> /farmer/farms
  // 3. Add Log -> open quick-add bottom sheet
  // 4. Warehouse -> /farmer/warehouse
  // 5. More -> open Farmer menu
  const mainTabs = [
    { href: "/farmer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/farmer/farms", label: "Farms", icon: Building2 },
    { label: "Add Log", icon: PlusCircle, isAdd: true },
    { href: "/farmer/warehouse", label: "Warehouse", icon: Warehouse },
    { label: "More", icon: Grid, isMore: true },
  ];

  // Requirement 3: More menu items:
  // Logs, Plots, Crop cycles, Ledger, Calendar, Sync status, Profile, Settings, Cooperative
  const moreMenuItems = [
    { href: "/farmer/logs", label: "Logs", icon: FileText },
    { href: "/farmer/plots", label: "Plots", icon: MapPin },
    { href: "/farmer/crops", label: "Crop Cycles", icon: Sprout },
    { href: "/farmer/ledger", label: "Ledger", icon: BookOpen },
    { href: "/farmer/calendar", label: "Calendar", icon: Calendar },
    { href: "/farmer/sync", label: "Sync Status", icon: RefreshCw },
    { href: "/farmer/profile", label: "Profile", icon: User },
    { href: "/farmer/settings", label: "Settings", icon: Settings },
    { href: "/farmer/cooperative", label: "Cooperative", icon: Users },
    { href: "/farmer/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/farmer/reports", label: "Reports", icon: BarChart3 },
    { href: "/farmer/help", label: "Help", icon: HelpCircle },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
        {mainTabs.map((tab, idx) => {
          const Icon = tab.icon;

          if (tab.isAdd) {
            return (
              <button
                key={idx}
                onClick={() => setIsQuickAddOpen(true)}
                className="flex flex-col items-center justify-center p-1 text-emerald-600 focus:outline-none"
              >
                <div className="p-2 rounded-full bg-emerald-600 text-white shadow-md hover:bg-emerald-700 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold mt-0.5">{tab.label}</span>
              </button>
            );
          }

          if (tab.isMore) {
            return (
              <button
                key={idx}
                onClick={() => setIsMoreMenuOpen(true)}
                className={`flex flex-col items-center justify-center p-1 transition-colors ${
                  isMoreMenuOpen ? "text-emerald-700 font-extrabold" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold mt-0.5">{tab.label}</span>
              </button>
            );
          }

          const isActive = pathname === tab.href || (tab.href !== "/farmer" && pathname?.startsWith(tab.href || ""));

          return (
            <Link
              key={idx}
              href={tab.href || "/farmer"}
              className={`flex flex-col items-center justify-center p-1 transition-colors ${
                isActive ? "text-emerald-700 font-extrabold" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold mt-0.5">{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      <QuickAddModal isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} />

      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end justify-center p-0">
          <div className="w-full max-w-lg bg-white rounded-t-3xl p-5 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-base font-extrabold text-slate-900">
                Farmer Navigation Menu
              </h2>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {moreMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/farmer" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMoreMenuOpen(false)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      isActive
                        ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold"
                        : "bg-slate-50 border-gray-200 text-slate-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1 text-emerald-600" />
                    <span className="text-xs font-bold leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
