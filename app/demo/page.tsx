"use client";

import React from "react";
import Link from "next/link";
import DemoHeader from "@/components/demo/DemoHeader";
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
  Coins,
  Play,
  CheckCircle2,
} from "lucide-react";

export default function DemoSelectorPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <DemoHeader roleName="Demo Workspace Hub" />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] text-xs font-extrabold shadow-xs">
            INTERACTIVE DEMO WORKSPACES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#163025]">Select a Persona Demo Workspace</h1>
          <p className="text-[#5f7469] text-xs sm:text-sm leading-relaxed font-normal">
            Test AgriHub PH features in isolated demo mode using pre-seeded sample data. No registration or credit card required.
          </p>
        </div>

        {/* PRIMARY DEMOS */}
        <div className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#059669]">Complete Persona Demos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* FARMER DEMO */}
            <div className="bg-white border border-[#dce9df] rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-[#059669] transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] flex items-center justify-center text-[#059669]">
                  <Sprout className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-[#163025]">Farmer PWA</h3>
                <p className="text-xs text-[#5f7469] leading-relaxed font-normal">
                  Field activity logging, crop cycle tracking, farm inputs deduction, financial ledger, and offline Dexie storage.
                </p>
                <ul className="space-y-1 text-[11px] text-[#163025] font-semibold pt-2 border-t border-[#dce9df]">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" /> Offline Farm PWA</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" /> Input Stock Deductions</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" /> Real-time Net Profit</li>
                </ul>
              </div>

              <Link
                href="/demo/farmer"
                className="w-full py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4 fill-white" /> Open Farmer Demo
              </Link>
            </div>

            {/* FISHER DEMO */}
            <div className="bg-white border border-[#dce9df] rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-[#0ea5a4] transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#e6f4f4] border border-[#a7e3e3] flex items-center justify-center text-[#0ea5a4]">
                  <Fish className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-[#163025]">Capture Fisheries</h3>
                <p className="text-xs text-[#5f7469] leading-relaxed font-normal">
                  Fishing vessel dispatching, fuel stock deduction, fishing ground logging, and species catch weight per grade.
                </p>
                <ul className="space-y-1 text-[11px] text-[#163025] font-semibold pt-2 border-t border-[#dce9df]">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#0ea5a4]" /> Vessel Trip Dispatch</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#0ea5a4]" /> Fuel Inventory Usage</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#0ea5a4]" /> Species Catch Logging</li>
                </ul>
              </div>

              <Link
                href="/demo/fisher"
                className="w-full py-3 rounded-2xl bg-[#0ea5a4] hover:bg-[#097e7d] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4 fill-white" /> Open Fisher Demo
              </Link>
            </div>

            {/* COOPERATIVE MANAGER DEMO */}
            <div className="bg-white border border-[#dce9df] rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-[#059669] transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] flex items-center justify-center text-[#059669]">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-[#163025]">Cooperative Manager</h3>
                <p className="text-xs text-[#5f7469] leading-relaxed font-normal">
                  Member harvest reviews, wholesale lot aggregation, inventory management, and yield supply forecasting.
                </p>
                <ul className="space-y-1 text-[11px] text-[#163025] font-semibold pt-2 border-t border-[#dce9df]">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" /> Member Harvest Approval</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" /> Lot Consolidation Engine</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" /> Mobile Drawer Nav</li>
                </ul>
              </div>

              <Link
                href="/demo/coop"
                className="w-full py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4 fill-white" /> Open Coop Demo
              </Link>
            </div>

            {/* B2B BUYER MARKET DEMO */}
            <div className="bg-white border border-[#dce9df] rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-[#059669] transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] flex items-center justify-center text-[#059669]">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-[#163025]">B2B Wholesale Market</h3>
                <p className="text-xs text-[#5f7469] leading-relaxed font-normal">
                  Browse wholesale produce catalog, coop provenance check, shopping cart, and PayMongo escrow checkout simulation.
                </p>
                <ul className="space-y-1 text-[11px] text-[#163025] font-semibold pt-2 border-t border-[#dce9df]">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" /> Wholesale Produce Catalog</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" /> Coop Traceability Check</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" /> Escrow Checkout Simulation</li>
                </ul>
              </div>

              <Link
                href="/demo/buyer"
                className="w-full py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4 fill-white" /> Open Buyer Demo
              </Link>
            </div>
          </div>
        </div>

        {/* ADDITIONAL PREVIEW DEMOS */}
        <div className="space-y-4 pt-4 border-t border-[#dce9df]">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#5f7469]">Additional Persona Workspaces</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            {[
              { title: "Food Processor", icon: Factory, link: "/demo/processor", desc: "Drying & packaging lines" },
              { title: "Fleet Logistics", icon: Truck, link: "/demo/transport", desc: "Reefer trucks & 4°C telemetry" },
              { title: "Government LGU", icon: Landmark, link: "/demo/government", desc: "Harvest audits & subsidies" },
              { title: "Agri-Finance", icon: Coins, link: "/demo/finance", desc: "Loans & PCIC insurance" },
              { title: "Platform Admin", icon: ShieldCheck, link: "/demo/admin", desc: "RBAC & compliance logs" },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="p-4 rounded-2xl bg-white border border-[#dce9df] space-y-2 shadow-xs flex flex-col justify-between hover:border-[#059669]">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Icon className="w-4 h-4 text-[#059669]" />
                      <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] text-[9px] font-extrabold">
                        Demo
                      </span>
                    </div>
                    <h4 className="font-extrabold text-[#163025] text-sm">{p.title}</h4>
                    <p className="text-[#5f7469] text-[11px] font-normal">{p.desc}</p>
                  </div>
                  <Link href={p.link} className="text-[#059669] font-bold hover:underline pt-2">
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
