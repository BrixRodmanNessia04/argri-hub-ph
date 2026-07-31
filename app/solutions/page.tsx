"use client";

import React from "react";
import Link from "next/link";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { Sprout, Fish, Building2, Store, Factory, Truck, Landmark, Coins } from "lucide-react";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12 space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/20">
            VALUE CHAIN SOLUTIONS
          </span>
          <h1 className="text-3xl font-extrabold text-white">Solutions for Every Persona</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {[
            { role: "Farmers", icon: Sprout, link: "/demo/farmer", desc: "Offline farm PWA, crop cycles, activity logging, and ledger." },
            { role: "Fishers", icon: Fish, link: "/demo/fisher", desc: "Fishing trip dispatch, fuel stock deduction, and catch logs." },
            { role: "Cooperatives", icon: Building2, link: "/demo/coop", desc: "Member produce aggregation, harvest reviews, and listings." },
            { role: "Buyers", icon: Store, link: "/demo/buyer", desc: "B2B wholesale marketplace, stock check, and escrow checkout." },
            { role: "Processors", icon: Factory, link: "/demo/processor", desc: "Batch drying, packaging production lines, and FDA compliance." },
            { role: "Logistics", icon: Truck, link: "/demo/transport", desc: "Cold-chain reefer van dispatch and 4°C temperature telemetry." },
            { role: "Government", icon: Landmark, link: "/demo/government", desc: "LGU harvest monitoring, BFAR fisheries, and subsidy distribution." },
            { role: "Financial", icon: Coins, link: "/demo/admin", desc: "Agri-credit scoring, production micro-loans, and PCIC claims." },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.role} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
                <Icon className="w-5 h-5 text-teal-400" />
                <h3 className="font-extrabold text-sm text-white">{s.role}</h3>
                <p className="text-slate-400 font-normal leading-relaxed">{s.desc}</p>
                <Link href={s.link} className="inline-block text-teal-400 font-bold hover:underline pt-2">
                  Try {s.role} Demo →
                </Link>
              </div>
            );
          })}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
