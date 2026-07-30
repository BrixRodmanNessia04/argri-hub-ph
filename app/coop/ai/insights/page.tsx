"use client";

import React from "react";
import Link from "next/link";
import CoopLayout from "@/components/CoopLayout";
import { Sparkles, TrendingUp, BarChart3, AlertTriangle, ArrowLeft } from "lucide-react";

export default function CoopAIInsightsPage() {
  return (
    <CoopLayout>
      <div className="space-y-6">
        <Link
          href="/coop/ai"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-teal-300"
        >
          <ArrowLeft className="w-4 h-4" /> Back to AI Assistant
        </Link>

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Cooperative AI Operational Insights &amp; Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Predictive demand matching, supply forecasts, and harvest loss prevention analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Supply &amp; Demand Velocity
            </h2>
            <p className="text-xs text-slate-300">
              Highland Cabbage demand in Metro Manila is projected to peak in 5 days with an estimated price increase of +8%.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Post-Harvest Spoilage Risk
            </h2>
            <p className="text-xs text-slate-300">
              Tomatoes stored in Pico Hub are approaching 3-day freshness limits. Recommend prioritizing for immediate restaurant order fulfillment.
            </p>
          </div>
        </div>
      </div>
    </CoopLayout>
  );
}
