"use client";

import React from "react";
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
} from "lucide-react";

export default function AdminSidebarNav() {
  const pathname = usePathname();
  const buildRoute = useAppRoute();

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
    <aside className="w-64 bg-white border-r border-[#dce9df] hidden lg:flex flex-col justify-between p-5 shrink-0 min-h-[calc(100vh-57px)] sticky top-[57px]">
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

        <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {links.map((item) => {
            const Icon = item.icon;
            const targetRoute = buildRoute(item.href);
            const isActive = pathname === targetRoute || pathname === item.href;

            return (
              <Link
                key={item.href}
                href={targetRoute}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#059669] text-white shadow-xs"
                    : "text-[#5f7469] hover:bg-[#f6fbf7] hover:text-[#163025]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
