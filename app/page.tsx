import React from "react";
import Link from "next/link";
import { Tractor, Building2, Store, ShieldCheck, Sprout, ArrowRight } from "lucide-react";

export default function HomePortal() {
  return (
    <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 flex flex-col items-center justify-center">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4">
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span>Offline-First B2B Agritech Platform</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Welcome to <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">AgriHub PH</span>
        </h1>
        <p className="text-slate-400 mt-3 text-sm md:text-base">
          Connecting Philippine farmers, cooperatives, wholesale B2B buyers, and platform administrators in an offline-resilient digital ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {/* 1. FARMER */}
        <Link
          href="/farmer"
          className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Tractor className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              Farmer PWA
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Mobile-first offline farm operations, crop tracking, harvest logging, and automatic cloud synchronization.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
            <span>Launch Farmer App</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* 2. COOPERATIVE LEADER */}
        <Link
          href="/coop/dashboard"
          className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
              Cooperative Leader
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Review member harvest logs, aggregate produce into marketplace lots, yield forecasting, and payout management.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-teal-400 group-hover:translate-x-1 transition-transform">
            <span>Open Coop Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* 3. B2B BUYER */}
        <Link
          href="/market"
          className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
              B2B Buyer Market
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Wholesale produce catalog, coop traceability, stock checks, procurement dashboard, and PayMongo escrow checkout.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
            <span>Enter Buyer Market</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* 4. PLATFORM ADMIN */}
        <Link
          href="/admin"
          className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
              Platform Administrator
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              System governance, cooperative verification, user RBAC, SMS gateway logs, sync exception monitor, and audit trail.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
            <span>Admin Portal</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </main>
  );
}
