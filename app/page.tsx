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
  Play,
  ArrowRight,
  CheckCircle2,
  Layers,
  BarChart3,
  MessageSquare,
} from "lucide-react";

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] text-xs font-extrabold mb-6 shadow-xs">
          <Sprout className="w-4 h-4 text-[#059669]" />
          <span>Offline-Resilient Agri-Fisheries Operating System</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#163025] max-w-4xl mx-auto leading-tight">
          One platform for <span className="bg-gradient-to-r from-[#059669] via-[#047857] to-[#0ea5a4] bg-clip-text text-transparent">agriculture and fisheries</span> operations
        </h1>

        <p className="text-[#5f7469] mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
          AgriHub PH connects producers, cooperatives, buyers, logistics providers, processors, government agencies, and financial institutions through offline-capable field tools and connected supply-chain workflows.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/demo"
            className="px-6 py-3.5 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Try the Demo</span>
          </Link>

          <Link
            href="/register"
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-extrabold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
            <span>Create an Account</span>
          </Link>

          <Link
            href="/login"
            className="px-5 py-3.5 rounded-2xl text-[#5f7469] hover:text-[#163025] font-bold text-xs sm:text-sm"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* ROLE SOLUTIONS SECTION */}
      <section className="py-16 bg-white border-y border-[#dce9df] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#059669] uppercase tracking-wider">Tailored Workspaces</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163025]">Built for Every Value Chain Role</h2>
            <p className="text-xs sm:text-sm text-[#5f7469] max-w-xl mx-auto font-normal">
              Custom operational tools designed for specific tasks in Philippine agriculture and fisheries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Farmers", icon: Sprout, text: "Crop cycles, offline field logs, input costing, and harvest logging.", demo: "/demo/farmer" },
              { title: "Fishers", icon: Fish, text: "Fishing trips, vessel logs, fuel tracking, and catch weight by species.", demo: "/demo/fisher" },
              { title: "Cooperatives", icon: Building2, text: "Harvest reviews, lot aggregation, stock inventory, and yield forecasts.", demo: "/demo/coop" },
              { title: "Commercial Buyers", icon: Store, text: "Wholesale produce marketplace, coop traceability, and escrow checkout.", demo: "/demo/buyer" },
              { title: "Food Processors", icon: Factory, text: "Raw intake, drying batches, packaging lines, and FDA/HACCP compliance.", demo: "/demo/processor" },
              { title: "Logistics Providers", icon: Truck, text: "Refrigerated van dispatching, route tracking, and 4°C cold-chain logs.", demo: "/demo/transport" },
              { title: "Government Agencies", icon: Landmark, text: "LGU harvest monitoring, BFAR fisheries, and subsidy voucher distribution.", demo: "/demo/government" },
              { title: "Financial Institutions", icon: Coins, text: "Agri-credit scoring, micro-loans, and PCIC climate insurance claims.", demo: "/demo/finance" },
            ].map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.title} className="p-5 rounded-3xl bg-[#f6fbf7] border border-[#dce9df] space-y-3 shadow-xs hover:border-[#059669] transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-[#dce9df] flex items-center justify-center text-[#059669]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-base text-[#163025]">{role.title}</h3>
                    <p className="text-xs text-[#5f7469] leading-relaxed font-normal">{role.text}</p>
                  </div>

                  <Link
                    href={role.demo}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:text-[#047857] pt-2 border-t border-[#dce9df]"
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
          <span className="text-xs font-black text-[#0ea5a4] uppercase tracking-wider">Comprehensive Features</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163025]">Full-Platform Capabilities</h2>
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
              <div key={cap.title} className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center mb-1">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-[#163025]">{cap.title}</h3>
                <p className="text-[#5f7469] text-xs leading-relaxed font-normal">{cap.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS CONNECTED FLOW */}
      <section className="py-16 bg-white border-y border-[#dce9df] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#059669] uppercase tracking-wider">Value Chain Flow</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163025]">How AgriHub PH Operates</h2>
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
              <div key={flow.step} className="p-5 rounded-3xl bg-[#f6fbf7] border border-[#dce9df] space-y-2 shadow-xs relative overflow-hidden">
                <span className="text-3xl font-black text-[#dce9df] absolute top-3 right-4">{flow.step}</span>
                <h3 className="font-extrabold text-sm text-[#163025] relative z-10">{flow.title}</h3>
                <p className="text-[#5f7469] text-xs leading-relaxed relative z-10 font-normal">{flow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFLINE-FIRST SECTION */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-br from-[#059669] via-[#047857] to-[#065f46] border border-[#a7f3d0] rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold border border-white/30">
              OFFLINE-FIRST ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Built to work deep in remote fields and at sea
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
              Farmers in highland plots and fishers at sea can record logs, inventory usage, and catches without an active internet connection. All records are saved securely in browser storage and synchronized automatically when signal returns.
            </p>
          </div>

          <Link
            href="/demo/farmer"
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#ecfdf5] text-[#047857] font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 shrink-0"
          >
            <WifiOff className="w-4 h-4 text-[#047857]" />
            <span>Test Offline Demo</span>
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 text-center px-4 sm:px-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#163025]">Ready to streamline your agricultural supply chain?</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/demo"
            className="px-6 py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs shadow-md flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" /> Try Demo Workspace
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 rounded-2xl bg-white hover:bg-[#f6fbf7] text-[#163025] border border-[#dce9df] font-extrabold text-xs shadow-xs"
          >
            Create an Account
          </Link>
          <Link
            href="/contact"
            className="px-5 py-3 rounded-2xl text-[#5f7469] hover:text-[#163025] font-bold text-xs"
          >
            Contact Sales
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
