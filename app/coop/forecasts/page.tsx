"use client";

import React, { useState, useEffect } from "react";
import CoopLayout from "@/components/CoopLayout";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { getCoopExpectedProduction } from "@/lib/productionRepository";
import { Sparkles, Sprout, Fish, Anchor, Beef, TrendingUp } from "lucide-react";

export default function CoopForecastsPage() {
  const [stats, setStats] = useState({
    totalCropExpectedKg: 0,
    totalCatchLoggedKg: 0,
    totalAquacultureEstKg: 0,
    totalLivestockUnits: 0,
    cropCyclesCount: 0,
    catchLogsCount: 0,
    aquacultureCyclesCount: 0,
    livestockBatchesCount: 0,
  });

  const crops = useLiveQuery(() => db.cropCycles.filter((c) => !c.isDeleted).toArray(), []) || [];
  const catchLogs = useLiveQuery(() => db.catchLogs.filter((c) => !c.isDeleted).toArray(), []) || [];
  const aquaculture = useLiveQuery(() => db.aquacultureCycles.filter((a) => !a.isDeleted).toArray(), []) || [];

  useEffect(() => {
    getCoopExpectedProduction().then(setStats);
  }, [crops.length, catchLogs.length, aquaculture.length]);

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            MEMBER PRODUCTION &amp; YIELD FORECASTING
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-teal-400" />
            Cooperative Expected Yield &amp; Catch Forecasts
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time aggregation of member crop harvest forecasts, fisheries catches, and aquaculture pond yields.
          </p>
        </div>

        {/* Multi-Sector Forecast Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 text-xs font-bold">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400">
              <Sprout className="w-4 h-4" />
              <span className="uppercase text-[10px]">Crop Harvest Forecast</span>
            </div>
            <p className="text-2xl font-extrabold text-white">
              {stats.totalCropExpectedKg.toLocaleString()} kg
            </p>
            <p className="text-slate-500 text-[11px]">{stats.cropCyclesCount} Active Crop Cycles</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-blue-400">
              <Fish className="w-4 h-4" />
              <span className="uppercase text-[10px]">Fisheries Catch Logged</span>
            </div>
            <p className="text-2xl font-extrabold text-blue-400">
              {stats.totalCatchLoggedKg.toLocaleString()} kg
            </p>
            <p className="text-slate-500 text-[11px]">{stats.catchLogsCount} Logged Fishing Trips</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-teal-400">
              <Anchor className="w-4 h-4" />
              <span className="uppercase text-[10px]">Aquaculture Pond Yield</span>
            </div>
            <p className="text-2xl font-extrabold text-teal-400">
              {stats.totalAquacultureEstKg.toLocaleString()} kg
            </p>
            <p className="text-slate-500 text-[11px]">{stats.aquacultureCyclesCount} Stocked Ponds/Cages</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400">
              <Beef className="w-4 h-4" />
              <span className="uppercase text-[10px]">Livestock &amp; Poultry</span>
            </div>
            <p className="text-2xl font-extrabold text-amber-400">
              {stats.totalLivestockUnits.toLocaleString()} Heads
            </p>
            <p className="text-slate-500 text-[11px]">{stats.livestockBatchesCount} Batches Registered</p>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-400" /> Multi-Sector Forecast Breakdown
          </h2>

          <div className="space-y-3">
            {crops.map((c) => (
              <div key={c.localId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-white text-sm block">{c.crop}</span>
                  <span className="text-[11px] text-slate-400">Expected Harvest Date: {c.estimatedHarvestAt}</span>
                </div>
                <span className="font-extrabold text-emerald-400 text-sm">{c.targetYieldKg || 1200} kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CoopLayout>
  );
}
