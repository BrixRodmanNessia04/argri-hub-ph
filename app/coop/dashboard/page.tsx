"use client";

import React, { useState } from "react";
import Link from "next/link";
import CoopLayout from "@/components/CoopLayout";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { useAppRoute } from "@/lib/navigation";
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
  const buildRoute = useAppRoute();
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#dce9df] rounded-3xl p-5 sm:p-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                BENGUET FARMERS COOPERATIVE #456
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1.5">
              Cooperative Management Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#5f7469] mt-0.5">
              Review member harvests, aggregate bulk lots, monitor inventory, and issue member payouts.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/coop/ai"
              className="px-3.5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4" />
              <span>AI Operations Assistant</span>
            </Link>

            <Link
              href="/coop/harvests"
              className="px-3.5 py-2.5 rounded-xl bg-[#f6fbf7] hover:bg-[#ecfdf5] text-[#163025] font-bold text-xs border border-[#dce9df] flex items-center gap-1.5"
            >
              <Scissors className="w-4 h-4 text-[#059669]" />
              <span>Review Harvests</span>
            </Link>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="p-3.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-[#dce9df] rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5f7469]">Pending Harvests</span>
              <Scissors className="w-4 h-4 text-[#059669]" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-[#163025] mt-2">
              {pendingHarvests.length + 4} Submissions
            </p>
            <p className="text-[11px] text-[#059669] font-semibold">Ready for review</p>
          </div>

          <div className="bg-white border border-[#dce9df] rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5f7469]">Poolable Volume</span>
              <TrendingUp className="w-4 h-4 text-[#059669]" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-[#163025] mt-2">1,650 kg</p>
            <p className="text-[11px] text-[#5f7469]">Est. Value ₱74,250</p>
          </div>

          <div className="bg-white border border-[#dce9df] rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5f7469]">Active Farmers</span>
              <Users className="w-4 h-4 text-[#059669]" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-[#163025] mt-2">24 Members</p>
            <p className="text-[11px] text-[#059669] font-semibold">Benguet Chapter</p>
          </div>

          <div className="bg-white border border-[#dce9df] rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5f7469]">Active B2B Listings</span>
              <Store className="w-4 h-4 text-[#059669]" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-[#163025] mt-2">6 Listings</p>
            <p className="text-[11px] text-[#059669] font-semibold">Published on Market</p>
          </div>
        </div>

        {/* Section: Forecasts & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white border border-[#dce9df] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <div>
                <h2 className="text-base font-extrabold text-[#163025] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#059669]" />
                  Upcoming Crop Yield Forecasts
                </h2>
                <p className="text-xs text-[#5f7469] mt-0.5">
                  Calculated timeline based on member planting logs
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {mockForecasts.map((fc) => (
                <div key={fc.id} className="bg-[#f6fbf7] border border-[#dce9df] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-[#059669] font-bold">
                    <span>{fc.time}</span>
                    <span className="text-[10px] text-[#5f7469]">{fc.confidence}% precision</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-[#163025]">{fc.crop}</h3>
                  <p className="text-[#5f7469] font-semibold">{fc.weightKg} kg projected</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-[#dce9df] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-xs font-bold">
            <h2 className="text-base font-extrabold text-[#163025] border-b border-[#dce9df] pb-3">
              Quick Operational Actions
            </h2>
            <div className="space-y-2.5">
              <Link
                href={buildRoute("/coop/harvests")}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f6fbf7] hover:bg-[#ecfdf5] border border-[#dce9df] text-[#047857] transition-colors"
              >
                <span>1. Review Harvest Submissions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={buildRoute("/coop/aggregation")}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f6fbf7] hover:bg-[#ecfdf5] border border-[#dce9df] text-[#047857] transition-colors"
              >
                <span>2. Create Bulk Marketplace Lot</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={buildRoute("/coop/payouts")}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f6fbf7] hover:bg-[#ecfdf5] border border-[#dce9df] text-[#047857] transition-colors"
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
