"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Coins, Scale, Clock, Sprout, MapPin, ChevronRight, Plus } from "lucide-react";

export default function CropInsights() {
  const cropCycles = useLiveQuery(() => db.cropCycles.filter((c) => !c.isDeleted).toArray(), []) || [];
  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];
  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];
  const harvests = useLiveQuery(() => db.harvests.filter((h) => !h.isDeleted).toArray(), []) || [];
  const sales = useLiveQuery(() => db.sales.filter((s) => !s.isDeleted).toArray(), []) || [];
  const expenses = useLiveQuery(() => db.expenses.filter((e) => !e.isDeleted).toArray(), []) || [];

  const farmMap = new Map(farms.map((f) => [f.localId, f.name]));
  const plotMap = new Map(plots.map((p) => [p.localId, p.name]));

  return (
    <div className="space-y-4">
      {/* Heading - requirement 10: heading links to /farmer/crops */}
      <div className="flex items-center justify-between">
        <Link href="/farmer/crops" className="group flex items-center gap-2">
          <Sprout className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" />
          <h2 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            Crop Performance &amp; Estimated Yields
          </h2>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
        </Link>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
          Estimated Performance
        </span>
      </div>

      {cropCycles.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-6 text-center text-xs text-slate-500 space-y-3">
          <Sprout className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="font-semibold">No active crop cycles recorded yet.</p>
          <Link
            href="/farmer/crops/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm"
          >
            <Plus className="w-4 h-4" /> Start First Crop Cycle
          </Link>
        </div>
      ) : (
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none">
          {cropCycles.map((cycle) => {
            // Calculate lifecycle progress
            const plantedDate = cycle.plantedAt ? new Date(cycle.plantedAt) : new Date();
            const estHarvestDate = cycle.estimatedHarvestAt ? new Date(cycle.estimatedHarvestAt) : new Date(Date.now() + 60 * 86400000);
            const totalDays = Math.max(1, Math.round((estHarvestDate.getTime() - plantedDate.getTime()) / 86400000));
            const elapsedDays = Math.max(0, Math.round((Date.now() - plantedDate.getTime()) / 86400000));
            const progressPercent = Math.min(100, Math.round((elapsedDays / totalDays) * 100));

            // Harvest & sales totals linked to this crop
            const cycleHarvests = harvests.filter((h) => h.cropCycleId === cycle.localId || h.crop.toLowerCase() === cycle.crop.toLowerCase());
            const harvestedKg = cycleHarvests.reduce((sum, h) => sum + (h.weightKg || 0), 0);

            const cycleSales = sales.filter((s) => s.crop.toLowerCase() === cycle.crop.toLowerCase());
            const totalRev = cycleSales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);

            const cycleExp = expenses.filter((e) => e.cropCycleId === cycle.localId);
            const totalExp = cycleExp.reduce((sum, e) => sum + (e.amount || 0), 0);
            const estProfit = totalRev - totalExp;

            const farmName = farmMap.get(cycle.farmId || "") || "My Farm";
            const plotName = plotMap.get(cycle.plotId || "") || "Plot A";

            return (
              <div
                key={cycle.localId}
                className="min-w-[280px] md:min-w-0 snap-center bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-emerald-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 truncate max-w-[140px]">
                      {farmName}
                    </span>

                    {/* Plot Badge - Requirement 10: Clickable plot badge to /farmer/plots/[id] */}
                    <Link
                      href={cycle.plotId ? `/farmer/plots/${cycle.plotId}` : "/farmer/plots"}
                      className="text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{plotName}</span>
                    </Link>
                  </div>

                  {/* Crop Card Link - Requirement 10: Clickable crop card to /farmer/crops/[id] */}
                  <Link href={`/farmer/crops/${cycle.localId}`} className="block group">
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cycle.crop}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Variety: {cycle.variety || "Local Selection"} • Stage: {cycle.stage || "Growing"}
                    </p>
                  </Link>

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-gray-200">
                      <div className="flex items-center gap-1 text-emerald-700">
                        <Coins className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase">Est. Net</span>
                      </div>
                      <p className={`text-xs font-extrabold mt-1 ${estProfit >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        ₱{estProfit.toLocaleString()}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-gray-200">
                      <div className="flex items-center gap-1 text-blue-700">
                        <Scale className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase">Yield</span>
                      </div>
                      <p className="text-xs font-extrabold text-slate-900 mt-1">
                        {harvestedKg} kg
                      </p>
                      <p className="text-[9px] text-slate-500">of {cycle.expectedYieldKg || 500}kg est</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-gray-200">
                      <div className="flex items-center gap-1 text-amber-700">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase">Days</span>
                      </div>
                      <p className="text-xs font-extrabold text-slate-900 mt-1">
                        Day {elapsedDays}
                      </p>
                      <p className="text-[9px] text-slate-500">of {totalDays}d</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                    <span className="text-slate-600">Growth Progress</span>
                    <span className="text-emerald-700">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
