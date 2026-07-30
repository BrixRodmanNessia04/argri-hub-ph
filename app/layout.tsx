import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Tractor, Building2, Store, Sprout, ShieldCheck } from "lucide-react";
import SyncStatusIndicator from "@/components/SyncStatusIndicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriHub PH - Multi-Role B2B Agricultural Platform",
  description: "Offline-first PWA for farmers, cooperative dashboard, B2B marketplace, and admin portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {/* Navigation Header */}
        <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                AgriHub PH
              </span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-semibold">
              <Link
                href="/farmer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-emerald-600 hover:text-white border border-slate-700 hover:border-emerald-500 text-slate-300 transition-all shadow-sm"
              >
                <Tractor className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Farmer PWA</span>
              </Link>
              <Link
                href="/coop/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-teal-600 hover:text-white border border-slate-700 hover:border-teal-500 text-slate-300 transition-all shadow-sm"
              >
                <Building2 className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">Coop Dashboard</span>
              </Link>
              <Link
                href="/market"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 hover:border-blue-500 text-slate-300 transition-all shadow-sm"
              >
                <Store className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Buyer Market</span>
              </Link>
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-purple-600 hover:text-white border border-slate-700 hover:border-purple-500 text-slate-300 transition-all shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Admin</span>
              </Link>

              {/* Universal Connectivity & Queue Indicator */}
              <div className="ml-1">
                <SyncStatusIndicator />
              </div>
            </div>
          </div>
        </nav>

        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
