"use client";

import React from "react";
import Link from "next/link";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { Sprout, Building2, Store, ArrowRight, ShieldCheck } from "lucide-react";

export default function SelectWorkspacePage() {
  const workspaces = [
    { id: "farmer", title: "Farmer Operations Workspace", role: "Farmer", org: "Personal Highland Farm", href: "/farmer", icon: Sprout, color: "emerald", desc: "Manage plots, crop cycles, activity logging, and offline ledger." },
    { id: "coop", title: "Benguet Agriculture Cooperative", role: "Cooperative Manager", org: "Benguet Coop #456", href: "/coop/dashboard", icon: Building2, color: "teal", desc: "Review member harvests, aggregate wholesale lots, and supply forecasting." },
    { id: "buyer", title: "Manila Fresh Supermarkets", role: "Commercial Buyer", org: "Manila Fresh Retail Inc", href: "/buyer/dashboard", icon: Store, color: "purple", desc: "Wholesale produce ordering, coop supplier directory, and PayMongo escrow." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            MULTI-ROLE ACCOUNT WORKSPACES
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Select Destination Workspace</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Your account holds multiple role permissions and organization memberships. Select where you would like to work today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold">
          {workspaces.map((w) => {
            const Icon = w.icon;
            return (
              <div key={w.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between hover:border-emerald-500/50 transition-all">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400 block">{w.role}</span>
                    <h3 className="font-extrabold text-base text-white">{w.title}</h3>
                    <span className="text-slate-400 text-[11px] font-normal">{w.org}</span>
                  </div>
                  <p className="text-slate-400 text-xs font-normal leading-relaxed">{w.desc}</p>
                </div>

                <Link
                  href={w.href}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 mt-4"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-4 h-4" />
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
