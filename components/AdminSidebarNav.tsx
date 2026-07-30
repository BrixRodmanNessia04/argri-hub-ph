"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

export default function AdminSidebarNav() {
  const pathname = usePathname();

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

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col justify-between p-5 shrink-0 min-h-[calc(100vh-57px)] sticky top-[57px]">
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white">Platform Governance</h2>
            <p className="text-[11px] text-purple-400 font-semibold">Super Admin Portal</p>
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
                    ? "bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-purple-400" : "text-slate-400"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
