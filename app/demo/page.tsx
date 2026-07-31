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
  ShieldCheck,
  Play,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function DemoSelectorPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            INTERACTIVE DEMO WORKSPACES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Select a Persona Demo Workspace</h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Test AgriHub PH features in isolated demo mode using pre-seeded sample data. No registration or credit card required.
          </p>
        </div>

        {/* PRIMARY DEMOS */}
        <div className="space-y-4">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Complete Production Demos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* FARMER DEMO */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sprout className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-white">Farmer PWA</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Field activity logging, crop cycle tracking, farm inputs deduction, financial ledger, and offline Dexie storage.
                </p>
                <ul className="space-y-1 text-[11px] text-slate-300 font-semibold pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Offline Farm PWA</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Input Stock Deductions</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Real-time Net Profit</li>
                </ul>
              </div>

              <Link
                href="/demo/farmer"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4 fill-white" /> Open Farmer Demo
              </Link>
            </div>

            {/* FISHER DEMO */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-blue-500/50 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Fish className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-white">Capture Fisheries</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fishing vessel dispatching, fuel stock deduction, fishing ground logging, and species catch weight per grade.
                </p>
                <ul className="space-y-1 text-[11px] text-slate-300 font-semibold pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Vessel Trip Dispatch</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Fuel Inventory Usage</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Species Catch Logging</li>
                </ul>
              </div>

              <Link
                href="/demo/fisher"
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4 fill-white" /> Open Fisher Demo
              </Link>
            </div>

            {/* COOPERATIVE MANAGER DEMO */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-teal-500/50 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-white">Cooperative Manager</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Member harvest reviews, wholesale lot aggregation, inventory management, and yield supply forecasting.
                </p>
                <ul className="space-y-1 text-[11px] text-slate-300 font-semibold pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Member Harvest Approval</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Lot Consolidation Engine</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Mobile Drawer Nav</li>
                </ul>
              </div>

              <Link
                href="/demo/coop"
                className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4 fill-white" /> Open Coop Demo
              </Link>
            </div>

            {/* B2B BUYER MARKET DEMO */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-purple-500/50 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-white">B2B Wholesale Market</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Browse wholesale produce catalog, coop provenance check, shopping cart, and PayMongo escrow checkout simulation.
                </p>
                <ul className="space-y-1 text-[11px] text-slate-300 font-semibold pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Wholesale Produce Catalog</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Coop Traceability Check</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Escrow Checkout Simulation</li>
                </ul>
              </div>

              <Link
                href="/demo/buyer"
                className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4 fill-white" /> Open Buyer Demo
              </Link>
            </div>
          </div>
        </div>

        {/* ADDITIONAL PREVIEW DEMOS */}
        <div className="space-y-4 pt-4 border-t border-slate-900">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Additional Role Previews</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {[
              { title: "Food Processor", icon: Factory, link: "/demo/processor", label: "Preview", desc: "Batch drying & packaging lines" },
              { title: "Fleet Logistics", icon: Truck, link: "/demo/transport", label: "Preview", desc: "Reefer trucks & 4°C telemetry" },
              { title: "Government LGU", icon: Landmark, link: "/demo/government", label: "Preview", desc: "Harvest audits & subsidies" },
              { title: "Platform Admin", icon: ShieldCheck, link: "/demo/admin", label: "Preview", desc: "RBAC & compliance logs" },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[9px] font-extrabold">
                        {p.label}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-white text-sm">{p.title}</h4>
                    <p className="text-slate-400 text-[11px]">{p.desc}</p>
                  </div>
                  <Link href={p.link} className="text-emerald-400 font-bold hover:underline pt-2">
                    Open {p.title} →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
