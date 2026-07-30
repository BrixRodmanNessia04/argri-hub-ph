"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
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
  Bot,
  User,
  LogOut,
} from "lucide-react";

interface CoopDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoopDrawer({ isOpen, onClose }: CoopDrawerProps) {
  const pathname = usePathname();

  // Prevent background body scrolling when drawer is open
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
        { href: "/coop/inventory", label: "Coop Warehouse Stock", icon: Warehouse },
        { href: "/coop/listings", label: "Marketplace Listings", icon: Store },
        { href: "/coop/orders", label: "B2B Buyer Orders", icon: ShoppingCart },
      ],
    },
    {
      title: "Operations & AI",
      items: [
        { href: "/coop/ai", label: "AI Operations Assistant", icon: Bot, badge: "NEW" },
        { href: "/coop/forecasts", label: "Yield Forecasts", icon: Sparkles },
        { href: "/coop/fulfillment", label: "Cold-Chain Dispatch", icon: Truck },
        { href: "/coop/pricing", label: "Base Pricing Strategy", icon: Tag },
        { href: "/coop/payments", label: "PayMongo Escrow", icon: CreditCard },
        { href: "/coop/payouts", label: "Member Payouts", icon: Coins },
        { href: "/coop/messages", label: "Broadcast SMS", icon: MessageSquare },
      ],
    },
    {
      title: "Management & Profile",
      items: [
        { href: "/coop/reports", label: "Analytics & Reports", icon: BarChart3 },
        { href: "/coop/users", label: "Coop Staff & RBAC", icon: ShieldCheck },
        { href: "/coop/profile", label: "Cooperative Profile", icon: User },
        { href: "/coop/settings", label: "Coop Settings", icon: Settings },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-4/5 max-w-sm bg-slate-900 border-r border-slate-800 text-slate-100 flex flex-col justify-between h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white">Benguet Farmers Coop</h2>
              <p className="text-[11px] text-teal-400 font-semibold">Coop Manager Navigation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1.5">
              <h3 className="px-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                {section.title}
              </h3>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-semibold text-xs transition-all ${
                      isActive
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 font-extrabold"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-teal-400" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-teal-500 text-slate-950 font-extrabold text-[9px]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-2 text-xs">
          <Link
            href="/coop/profile"
            onClick={onClose}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex items-center justify-between text-slate-200"
          >
            <span className="font-bold">Cooperative Profile</span>
            <span className="text-[11px] text-teal-400 font-semibold">View</span>
          </Link>

          <Link
            href="/"
            onClick={onClose}
            className="w-full p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-950/70 border border-rose-900 text-rose-300 flex items-center justify-center gap-2 font-bold text-xs"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}
