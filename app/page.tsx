"use client";

import React from "react";
import Link from "next/link";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import {
  Sprout,
  Fish,
  Building2,
  Store,
  Factory,
  Truck,
  Landmark,
  Coins,
  ShieldCheck,
  WifiOff,
  RefreshCw,
  Play,
  ArrowRight,
  CheckCircle2,
  Layers,
  BarChart3,
  MessageSquare,
  FileText,
} from "lucide-react";

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-6">
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span>Offline-Resilient Agri-Fisheries Operating System</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          One platform for <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">agriculture and fisheries</span> operations
        </h1>

        <p className="text-slate-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          AgriHub PH connects producers, cooperatives, buyers, logistics providers, processors, government agencies, and financial institutions through offline-capable field tools and connected supply-chain workflows.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/demo"
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Try the Demo</span>
          </Link>

          <Link
            href="/register"
            className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Create an Account</span>
          </Link>

          <Link
            href="/login"
            className="px-5 py-3.5 rounded-2xl text-slate-300 hover:text-white font-bold text-xs sm:text-sm"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* ROLE SOLUTIONS SECTION */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-900 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tailored Workspaces</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Built for Every Value Chain Role</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Custom operational tools designed for specific tasks in Philippine agriculture and fisheries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Farmers", icon: Sprout, text: "Crop cycles, offline field logs, input costing, and harvest logging.", demo: "/demo/farmer", color: "emerald" },
              { title: "Fishers", icon: Fish, text: "Fishing trips, vessel logs, fuel tracking, and catch weight by species.", demo: "/demo/fisher", color: "blue" },
              { title: "Cooperatives", icon: Building2, text: "Harvest reviews, lot aggregation, stock inventory, and yield forecasts.", demo: "/demo/coop", color: "teal" },
              { title: "Commercial Buyers", icon: Store, text: "Wholesale produce marketplace, coop traceability, and escrow checkout.", demo: "/demo/buyer", color: "purple" },
              { title: "Food Processors", icon: Factory, text: "Raw intake, drying batches, packaging lines, and FDA/HACCP compliance.", demo: "/demo/processor", color: "amber" },
              { title: "Logistics Providers", icon: Truck, text: "Refrigerated van dispatching, route tracking, and 4°C cold-chain logs.", demo: "/demo/transport", color: "blue" },
              { title: "Government Agencies", icon: Landmark, text: "LGU harvest monitoring, BFAR fisheries, and subsidy voucher distribution.", demo: "/demo/government", color: "amber" },
              { title: "Financial Institutions", icon: Coins, text: "Agri-credit scoring, micro-loans, and PCIC climate insurance claims.", demo: "/demo/admin", color: "emerald" },
            ].map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.title} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-base text-white">{role.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{role.text}</p>
                  </div>

                  <Link
                    href={role.demo}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 pt-2 border-t border-slate-800/80"
                  >
                    <span>Try {role.title} Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLATFORM CAPABILITIES GRID */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Comprehensive Features</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Full-Platform Capabilities</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {[
            { title: "Offline Field Logging", icon: WifiOff, desc: "Records saved locally via Dexie IndexedDB and synced when back online." },
            { title: "Production Planning", icon: Sprout, desc: "Plot crop cycles, fishing schedules, and aquaculture stocking dates." },
            { title: "Warehouse & Inventory", icon: Layers, desc: "Automatic stock deduction and costing upon recording input or fuel usage." },
            { title: "Wholesale B2B Marketplace", icon: Store, desc: "Direct trading between verified cooperatives and supermarket buyers." },
            { title: "Cold-Chain Logistics", icon: Truck, desc: "Reefer van dispatch, temperature telemetry logging, and proof of delivery." },
            { title: "Traceability & QR", icon: ShieldCheck, desc: "Public QR verification tracing produce back to farmer, plot, and coop lot." },
            { title: "Quality Assurance", icon: CheckCircle2, desc: "Class A/B/C grading, GAP, GAqP, Organic, and HACCP compliance." },
            { title: "Supply Yield Analytics", icon: BarChart3, desc: "Predictive supply forecasts aggregated across member producers." },
            { title: "Multichannel Notifications", icon: MessageSquare, desc: "SMS alert fallback for weather warnings, order updates, and payouts." },
          ].map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-teal-400 flex items-center justify-center mb-1">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-white">{cap.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{cap.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS CONNECTED FLOW */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-900 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Value Chain Flow</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How AgriHub PH Operates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-bold">
            {[
              { step: "1", title: "Producers Record Operations", desc: "Farmers and fishers log field activities, input usage, and harvests offline." },
              { step: "2", title: "Cooperatives Aggregate Supply", desc: "Coop staff review harvest submissions and consolidate produce into wholesale lots." },
              { step: "3", title: "Buyers Place Orders", desc: "Commercial buyers order produce directly from verified cooperative listings." },
              { step: "4", title: "Logistics Handles Delivery", desc: "Reefer trucks transport temperature-controlled cargo to distribution hubs." },
              { step: "5", title: "Traceability Follows Product", desc: "Buyers and consumers scan QR codes to verify farm provenance and quality." },
              { step: "6", title: "Organizations Monitor Performance", desc: "Government agencies and lenders track national food security and credit health." },
            ].map((flow) => (
              <div key={flow.step} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl relative overflow-hidden">
                <span className="text-3xl font-black text-slate-800 absolute top-3 right-4">{flow.step}</span>
                <h3 className="font-extrabold text-sm text-white relative z-10">{flow.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed relative z-10 font-normal">{flow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFLINE-FIRST SECTION */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40">
              OFFLINE-FIRST ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Built to work deep in remote fields and at sea
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Farmers in highland plots and fishers at sea can record logs, inventory usage, and catches without an active internet connection. All records are saved securely in browser storage and synchronized automatically when signal returns.
            </p>
          </div>

          <Link
            href="/demo/farmer"
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 shrink-0"
          >
            <WifiOff className="w-4 h-4" />
            <span>Test Offline Demo</span>
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 text-center px-4 sm:px-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Ready to streamline your agricultural supply chain?</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/demo"
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-xl flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" /> Try Demo Workspace
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-xs"
          >
            Create an Account
          </Link>
          <Link
            href="/contact"
            className="px-5 py-3 rounded-2xl text-slate-400 hover:text-white font-bold text-xs"
          >
            Contact Sales
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
