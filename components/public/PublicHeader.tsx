"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, Menu, X, LogIn, UserPlus, Play } from "lucide-react";

export default function PublicHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Solutions", href: "/solutions" },
    { label: "Demo Workspaces", href: "/demo" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#ffffff]/90 backdrop-blur-md border-b border-[#dce9df] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#059669] to-[#0ea5a4] p-0.5 shadow-md flex items-center justify-center text-white">
            <Sprout className="w-5 h-5 font-black" />
          </div>
          <div>
            <span className="font-extrabold text-base text-[#163025] tracking-tight block">AgriHub PH</span>
            <span className="text-[10px] font-bold text-[#059669] block -mt-1">Agri-Fisheries Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]"
                    : "text-[#5f7469] hover:text-[#163025] hover:bg-[#f6fbf7]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth & Demo Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/demo"
            className="px-3.5 py-2 rounded-xl bg-[#ecfdf5] hover:bg-[#d1fae5] border border-[#a7f3d0] text-[#047857] font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-[#047857]" />
            <span>Try Demo</span>
          </Link>
          <Link
            href="/login"
            className="px-3.5 py-2 rounded-xl text-[#163025] hover:text-[#047857] text-xs font-bold flex items-center gap-1 transition-all"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-xl bg-[#f6fbf7] text-[#163025] border border-[#dce9df]"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-[#163025]/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-80 max-w-[88vw] bg-white border-r border-[#dce9df] p-5 sm:p-6 flex flex-col justify-between z-50 space-y-6 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#dce9df] pb-4">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#059669] text-white flex items-center justify-center font-bold">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-sm text-[#163025]">AgriHub PH</span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-full text-[#5f7469] hover:bg-[#f6fbf7]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-xs font-bold ${
                      pathname === link.href ? "bg-[#059669] text-white" : "text-[#163025] hover:bg-[#f6fbf7]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-[#dce9df] pt-4">
              <Link
                href="/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#ecfdf5] text-[#047857] font-extrabold text-xs flex items-center justify-center gap-2 border border-[#a7f3d0]"
              >
                <Play className="w-4 h-4 fill-[#047857]" /> Try Demo
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#f6fbf7] text-[#163025] font-bold text-xs flex items-center justify-center gap-2 border border-[#dce9df]"
              >
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#059669] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <UserPlus className="w-4 h-4" /> Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
