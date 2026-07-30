"use client";

import React, { useState } from "react";
import Link from "next/link";
import CoopLayout from "@/components/CoopLayout";
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
  Bot,
  AlertTriangle,
  ShoppingBag,
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
    <CoopLayout>
      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                BENGUET FARMERS COOPERATIVE #456
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1.5">
              Cooperative Management Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Review member harvests, aggregate bulk lots, monitor inventory, and issue member payouts.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/coop/ai"
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4" />
              <span>AI Operations Assistant</span>
            </Link>

            <Link
              href="/coop/harvests"
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5"
            >
              <Scissors className="w-4 h-4 text-teal-400" />
              <span>Review Harvests</span>
            </Link>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400">Pending Harvests</span>
              <Scissors className="w-4 h-4 text-teal-400" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white mt-2">
              {pendingHarvests.length + 4} Submissions
            </p>
            <p className="text-[11px] text-teal-400 font-semibold">Ready for review</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400">Poolable Volume</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white mt-2">1,650 kg</p>
            <p className="text-[11px] text-slate-400">Est. Value ₱74,250</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400">Active Farmers</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white mt-2">24 Members</p>
            <p className="text-[11px] text-blue-400 font-semibold">Benguet Chapter</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400">Active B2B Listings</span>
              <Store className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white mt-2">6 Listings</p>
            <p className="text-[11px] text-amber-400 font-semibold">Published on Market</p>
          </div>
        </div>

        {/* Section: Forecasts & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  Upcoming Crop Yield Forecasts
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Calculated timeline based on member planting logs
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {mockForecasts.map((fc) => (
                <div key={fc.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-teal-400 font-bold">
                    <span>{fc.time}</span>
                    <span className="text-[10px] text-slate-400">{fc.confidence}% precision</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-white">{fc.crop}</h3>
                  <p className="text-slate-400 font-semibold">{fc.weightKg} kg projected</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 text-xs font-bold">
            <h2 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">
              Quick Operational Actions
            </h2>
            <div className="space-y-2.5">
              <Link
                href="/coop/harvests"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-teal-300 transition-colors"
              >
                <span>1. Review Harvest Submissions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/coop/aggregation"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-emerald-300 transition-colors"
              >
                <span>2. Create Bulk Marketplace Lot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/coop/payouts"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-blue-300 transition-colors"
              >
                <span>3. Calculate Member Payouts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CoopLayout>
  );
}
