"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Scissors,
  ShoppingCart,
  Menu,
} from "lucide-react";

interface CoopBottomNavProps {
  onOpenDrawer: () => void;
}

export default function CoopBottomNav({ onOpenDrawer }: CoopBottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/coop/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/coop/farmers", label: "Farmers", icon: Users },
    { href: "/coop/harvests", label: "Harvests", icon: Scissors },
    { href: "/coop/orders", label: "Orders", icon: ShoppingCart },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/coop/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition-all ${
                isActive
                  ? "text-teal-400 font-extrabold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-teal-400 scale-110" : "text-slate-400"}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* More Tab -> opens Drawer */}
        <button
          onClick={onOpenDrawer}
          className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl text-slate-400 hover:text-slate-200"
        >
          <Menu className="w-5 h-5 text-slate-400" />
          <span className="text-[10px] tracking-tight">More</span>
        </button>
      </div>
    </nav>
  );
}
