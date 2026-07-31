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
    { label: "Demo", href: "/demo" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md flex items-center justify-center text-slate-950">
            <Sprout className="w-5 h-5 font-black" />
          </div>
          <div>
            <span className="font-extrabold text-base text-white tracking-tight block">AgriHub PH</span>
            <span className="text-[10px] font-bold text-emerald-400 block -mt-1">Agri-Fisheries Platform</span>
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
                    ? "bg-slate-850 text-white border border-slate-750"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/demo"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-emerald-400 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-emerald-400" />
            <span>Try Demo</span>
          </Link>
          <Link
            href="/login"
            className="px-3.5 py-2 rounded-xl text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-all"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-xl bg-slate-900 text-slate-200 border border-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-80 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between z-50 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-sm text-white">AgriHub PH</span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-800">
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
                      pathname === link.href ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-800 pt-4">
              <Link
                href="/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700"
              >
                <Play className="w-4 h-4 fill-emerald-400" /> Try Demo
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
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
