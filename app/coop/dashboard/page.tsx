"use client";

import React, { useState } from "react";
import Link from "next/link";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import {
  Building2,
  Users,
  Sprout,
  Scissors,
  Layers,
  Sparkles,
  Store,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function CoopDashboardPage() {
  const localHarvests = useLiveQuery(() => db.harvests.toArray(), []) || [];
  const pendingHarvests = localHarvests.filter((h) => h.coopApprovalStatus === "PENDING" || !h.coopApprovalStatus);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const mockForecasts = [
    { id: "fc-1", crop: "Benguet Highland Cabbage", weightKg: 500, time: "Next Week", confidence: 94 },
    { id: "fc-2", crop: "Baguio Vine Tomatoes", weightKg: 800, time: "In 2 Weeks", confidence: 89 },
    { id: "fc-3", crop: "Atok Sweet Carrots", weightKg: 350, time: "In 3 Weeks", confidence: 91 },
  ];

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                BENGUET FARMERS COOPERATIVE #456
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Cooperative Leadership &amp; Aggregation Hub
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Review synced member harvest logs, aggregate produce into bulk marketplace lots, and manage payouts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/coop/harvests"
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
            >
              <Scissors className="w-4 h-4" />
              <span>Review Harvest Submissions</span>
            </Link>
          </div>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-sm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Pending Harvest Submissions</span>
              <Scissors className="w-5 h-5 text-teal-400" />
            </div>
            <p className="text-2xl font-extrabold text-white mt-3">
              {pendingHarvests.length + 4} Lots
            </p>
            <p className="text-xs text-teal-400 mt-1 font-medium">Ready for grading &amp; approval</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Total Poolable Volume</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold text-white mt-3">1,650 kg</p>
            <p className="text-xs text-slate-400 mt-1">Est. Value @ ₱45/kg</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Registered Member Farmers</span>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-extrabold text-white mt-3">24 Members</p>
            <p className="text-xs text-blue-400 mt-1 font-medium">Benguet Chapter</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Active B2B Listings</span>
              <Store className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-2xl font-extrabold text-white mt-3">6 Listings</p>
            <p className="text-xs text-amber-400 mt-1 font-medium">Published on Marketplace</p>
          </div>
        </div>

        {/* Section: Forecasts & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  Upcoming Crop Yield Forecasts
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Estimated upcoming supply timeline calculated from member planting logs
                </p>
              </div>
              <span className="text-xs text-slate-500 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                Marked Estimated
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mockForecasts.map((fc) => (
                <div key={fc.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-teal-400 font-bold">
                    <span>{fc.time}</span>
                    <span className="text-[10px] text-slate-400">{fc.confidence}% precision</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-white">{fc.crop}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{fc.weightKg} kg projected</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white">Quick Cooperative Actions</h2>
            <div className="space-y-2.5">
              <Link
                href="/coop/harvests"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-teal-300 transition-colors"
              >
                <span>1. Review Pending Member Harvests</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/coop/aggregation"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-emerald-300 transition-colors"
              >
                <span>2. Create Bulk Marketplace Lot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/coop/payouts"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-blue-300 transition-colors"
              >
                <span>3. Calculate Member Payouts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
