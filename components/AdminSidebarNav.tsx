"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppRoute } from "@/lib/navigation";
import {
  ShieldCheck,
  LayoutDashboard,
  Building2,
  Users,
  Store,
  ShoppingCart,
  CreditCard,
  MessageSquare,
  AlertTriangle,
  FileCheck,
  Sprout,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebarNav() {
  const pathname = usePathname();
  const buildRoute = useAppRoute();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/admin", label: "System Overview", icon: LayoutDashboard },
    { href: "/admin/cooperatives", label: "Cooperative Verification", icon: Building2 },
    { href: "/admin/buyers", label: "B2B Buyer Verification", icon: Store },
    { href: "/admin/users", label: "Users & RBAC", icon: Users },
    { href: "/admin/listings", label: "Listing Moderation", icon: Sprout },
    { href: "/admin/orders", label: "Platform Orders", icon: ShoppingCart },
    { href: "/admin/payments", label: "PayMongo & Escrow Log", icon: CreditCard },
    { href: "/admin/sms", label: "SMS Gateway Monitor", icon: MessageSquare },
    { href: "/admin/sync-errors", label: "Sync Exceptions Log", icon: AlertTriangle },
    { href: "/admin/audit-logs", label: "Security Audit Trail", icon: FileCheck },
    { href: "/admin/taxonomy", label: "Crop Taxonomy & Grades", icon: Sprout },
    { href: "/admin/reports", label: "Platform GMV Reports", icon: BarChart3 },
    { href: "/admin/settings", label: "Platform System Keys", icon: Settings },
  ];

  const navigation = (
    <nav className="space-y-1">
      {links.map((item) => {
        const Icon = item.icon;
        const targetRoute = buildRoute(item.href);
        const isActive = pathname === targetRoute || pathname.startsWith(`${targetRoute}/`);
        return (
          <Link
            key={item.href}
            href={targetRoute}
            onClick={() => setMobileOpen(false)}
            className={`flex min-h-11 items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive ? "bg-[#059669] text-white shadow-xs" : "text-[#5f7469] hover:bg-[#f6fbf7] hover:text-[#163025]"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className={`lg:hidden fixed ${pathname.startsWith("/demo/") ? "top-20" : "top-3"} right-3 z-40 min-w-11 min-h-11 rounded-xl bg-white border border-[#dce9df] text-[#163025] shadow-lg flex items-center justify-center`}
        aria-label="Open administrator navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      <aside className="w-64 bg-white border-r border-[#dce9df] hidden lg:flex flex-col justify-between p-5 shrink-0 min-h-screen sticky top-0">
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#dce9df]">
          <div className="p-2 rounded-xl bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-[#163025]">Platform Governance</h2>
            <p className="text-[11px] text-[#059669] font-semibold">Super Admin Portal</p>
          </div>
        </div>

        <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-1">{navigation}</div>
      </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[70] flex lg:hidden">
          <button type="button" aria-label="Close administrator navigation" className="fixed inset-0 bg-[#163025]/60 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-80 max-w-[88vw] h-full bg-white p-5 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#dce9df]">
              <div>
                <p className="font-extrabold text-sm">Platform Governance</p>
                <p className="text-[11px] text-[#059669] font-semibold">Super Admin Portal</p>
              </div>
              <button type="button" onClick={() => setMobileOpen(false)} className="min-w-11 min-h-11 rounded-full bg-[#f6fbf7] flex items-center justify-center" aria-label="Close navigation">
                <X className="w-5 h-5" />
              </button>
            </div>
            {navigation}
          </aside>
        </div>
      )}
    </>
  );
}
