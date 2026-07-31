"use client";

import React from "react";
import Link from "next/link";
import { Sprout } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base text-white">AgriHub PH</span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Empowering Philippine agriculture and fisheries operations through offline-first field management, wholesale B2B marketplace trading, cold-chain logistics, and cooperative aggregation.
          </p>
          <p className="text-slate-500 text-[11px]">© 2026 AgriHub PH. All rights reserved.</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Platform</h4>
          <ul className="space-y-1.5 font-semibold text-slate-400">
            <li><Link href="/features" className="hover:text-emerald-400">Capabilities</Link></li>
            <li><Link href="/solutions" className="hover:text-emerald-400">Role Solutions</Link></li>
            <li><Link href="/pricing" className="hover:text-emerald-400">Pricing Models</Link></li>
            <li><Link href="/about" className="hover:text-emerald-400">About Platform</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Demo Workspaces</h4>
          <ul className="space-y-1.5 font-semibold text-slate-400">
            <li><Link href="/demo/farmer" className="hover:text-emerald-400">Farmer PWA Demo</Link></li>
            <li><Link href="/demo/fisher" className="hover:text-emerald-400">Fisheries Demo</Link></li>
            <li><Link href="/demo/coop" className="hover:text-emerald-400">Cooperative Manager</Link></li>
            <li><Link href="/demo/buyer" className="hover:text-emerald-400">B2B Buyer Market</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Support &amp; Legal</h4>
          <ul className="space-y-1.5 font-semibold text-slate-400">
            <li><Link href="/help" className="hover:text-emerald-400">Help Center</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-400">Contact Us</Link></li>
            <li><Link href="/privacy" className="hover:text-emerald-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-emerald-400">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
