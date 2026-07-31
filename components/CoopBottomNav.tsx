"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppRoute } from "@/lib/navigation";
import {
  LayoutDashboard,
  Users,
  Scissors,
  Handshake,
  Menu,
} from "lucide-react";

interface CoopBottomNavProps {
  onOpenDrawer: () => void;
}

export default function CoopBottomNav({ onOpenDrawer }: CoopBottomNavProps) {
  const pathname = usePathname();
  const buildRoute = useAppRoute();

  const navItems = [
    { href: "/coop/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/coop/farmers", label: "Farmers", icon: Users },
    { href: "/coop/harvests", label: "Harvests", icon: Scissors },
    { href: "/coop/negotiations", label: "Offers", icon: Handshake },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#dce9df] px-2 py-2 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const targetRoute = buildRoute(item.href);
          const isActive = pathname === targetRoute || pathname === item.href;

          return (
            <Link
              key={item.href}
              href={targetRoute}
              className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition-all ${
                isActive
                  ? "text-[#059669] font-extrabold"
                  : "text-[#5f7469] hover:text-[#163025]"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-[#059669] scale-110" : "text-[#5f7469]"}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* More Tab -> opens Drawer */}
        <button
          onClick={onOpenDrawer}
          className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl text-[#5f7469] hover:text-[#163025]"
        >
          <Menu className="w-5 h-5 text-[#5f7469]" />
          <span className="text-[10px] tracking-tight">More</span>
        </button>
      </div>
    </nav>
  );
}
