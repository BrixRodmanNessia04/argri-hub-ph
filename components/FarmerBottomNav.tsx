"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppRoute } from "@/lib/navigation";
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
  const buildRoute = useAppRoute();
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const mainTabs = [
    { href: "/farmer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/farmer/farms", label: "Farms", icon: Building2 },
    { label: "Add Log", icon: PlusCircle, isAdd: true },
    { href: "/farmer/warehouse", label: "Warehouse", icon: Warehouse },
    { label: "More", icon: Grid, isMore: true },
  ];

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
    { href: "/farmer/help", label: "Help Center", icon: HelpCircle },
  ];

  return (
    <>
      {/* Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg px-2 py-1.5">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {mainTabs.map((tab, idx) => {
            const Icon = tab.icon;

            if (tab.isAdd) {
              return (
                <button
                  key={idx}
                  onClick={() => setIsQuickAddOpen(true)}
                  className="flex flex-col items-center justify-center text-emerald-600 hover:text-emerald-700 active:scale-95 transition-transform"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md -mt-3 border-2 border-white">
                    <PlusCircle className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 mt-0.5">{tab.label}</span>
                </button>
              );
            }

            if (tab.isMore) {
              return (
                <button
                  key={idx}
                  onClick={() => setIsMoreMenuOpen(true)}
                  className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium mt-0.5">{tab.label}</span>
                </button>
              );
            }

            const targetRoute = buildRoute(tab.href!);
            const isActive = pathname === targetRoute || pathname === tab.href;

            return (
              <Link
                key={idx}
                href={targetRoute}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
                  isActive ? "text-emerald-600 font-bold" : "text-slate-500 hover:text-slate-900 font-medium"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Slide-Up "More" Menu Modal */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-xs md:hidden">
          <div className="w-full bg-white rounded-t-3xl p-5 space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-extrabold text-slate-900 text-sm">Farmer Menu</span>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {moreMenuItems.map((item, idx) => {
                const Icon = item.icon;
                const targetRoute = buildRoute(item.href);
                const isActive = pathname === targetRoute || pathname === item.href;

                return (
                  <Link
                    key={idx}
                    href={targetRoute}
                    onClick={() => setIsMoreMenuOpen(false)}
                    className={`flex flex-col items-center p-3 rounded-2xl border text-center transition-all ${
                      isActive
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-extrabold shadow-xs"
                        : "bg-slate-50 border-gray-200 text-slate-700 hover:bg-slate-100 font-medium"
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1.5 text-emerald-600" />
                    <span className="text-[11px] leading-tight truncate w-full">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Log Modal */}
      <QuickAddModal isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} />
    </>
  );
}
