"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Store,
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Building,
  Heart,
  Users,
  Bell,
  User,
  Settings,
} from "lucide-react";

export default function BuyerSidebarNav() {
  const pathname = usePathname();

  const links = [
    { href: "/market", label: "Wholesale Produce Catalog", icon: Store },
    { href: "/buyer/dashboard", label: "Procurement Dashboard", icon: LayoutDashboard },
    { href: "/buyer/orders", label: "Order History & Status", icon: ShoppingCart },
    { href: "/buyer/invoices", label: "Tax Invoices & Receipts", icon: FileText },
    { href: "/buyer/suppliers", label: "Preferred Cooperatives", icon: Building },
    { href: "/buyer/saved", label: "Saved Produce Lots", icon: Heart },
    { href: "/buyer/organization", label: "Company Profile", icon: Building },
    { href: "/buyer/team", label: "Team Buyers & Limits", icon: Users },
    { href: "/buyer/notifications", label: "Procurement Alerts", icon: Bell },
    { href: "/buyer/profile", label: "Account Profile", icon: User },
    { href: "/buyer/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#dce9df] hidden lg:flex flex-col justify-between p-5 shrink-0 min-h-screen sticky top-0">
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#dce9df]">
          <div className="p-2 rounded-xl bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-[#163025]">Metro Supermarkets</h2>
            <p className="text-[11px] text-[#059669] font-semibold">B2B Procurement Portal</p>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  isActive
                    ? "bg-[#059669] text-white font-bold shadow-xs"
                    : "text-[#5f7469] hover:bg-[#ecfdf5] hover:text-[#047857]"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-[#9db5a5]"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
