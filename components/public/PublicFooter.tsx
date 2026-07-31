"use client";

import React from "react";
import Link from "next/link";
import { Sprout } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-white border-t border-[#dce9df] text-[#5f7469] text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#059669] text-white flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base text-[#163025]">AgriHub PH</span>
          </Link>
          <p className="text-[#5f7469] text-xs leading-relaxed max-w-sm">
            Empowering Philippine agriculture and fisheries operations through offline-first field management, wholesale B2B marketplace trading, cold-chain logistics, and cooperative aggregation.
          </p>
          <p className="text-[#5f7469] text-[11px]">© 2026 AgriHub PH. All rights reserved.</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-extrabold text-[#163025] text-xs uppercase tracking-wider">Platform</h4>
          <ul className="space-y-1.5 font-semibold text-[#5f7469]">
            <li><Link href="/features" className="hover:text-[#059669]">Capabilities</Link></li>
            <li><Link href="/solutions" className="hover:text-[#059669]">Role Solutions</Link></li>
            <li><Link href="/pricing" className="hover:text-[#059669]">Pricing Models</Link></li>
            <li><Link href="/about" className="hover:text-[#059669]">About Platform</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-extrabold text-[#163025] text-xs uppercase tracking-wider">Demo Workspaces</h4>
          <ul className="space-y-1.5 font-semibold text-[#5f7469]">
            <li><Link href="/demo/farmer" className="hover:text-[#059669]">Farmer PWA Demo</Link></li>
            <li><Link href="/demo/fisher" className="hover:text-[#059669]">Fisheries Demo</Link></li>
            <li><Link href="/demo/coop" className="hover:text-[#059669]">Cooperative Manager</Link></li>
            <li><Link href="/demo/buyer" className="hover:text-[#059669]">B2B Buyer Market</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-extrabold text-[#163025] text-xs uppercase tracking-wider">Support &amp; Legal</h4>
          <ul className="space-y-1.5 font-semibold text-[#5f7469]">
            <li><Link href="/help" className="hover:text-[#059669]">Help Center</Link></li>
            <li><Link href="/contact" className="hover:text-[#059669]">Contact Us</Link></li>
            <li><Link href="/privacy" className="hover:text-[#059669]">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#059669]">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
