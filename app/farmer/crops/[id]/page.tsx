"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Sprout, MapPin, Edit, Activity, Scissors, Coins, TrendingUp, TrendingDown, Warehouse, Plus } from "lucide-react";

export default function CropCycleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const cycleId = resolvedParams.id;

  const cycle = useLiveQuery(() => db.cropCycles.get(cycleId), [cycleId]);
  const plot = useLiveQuery(() => (cycle ? db.plots.get(cycle.plotId) : undefined), [cycle]);
  const activities = useLiveQuery(
    () => db.fieldActivities.where("cropCycleId").equals(cycleId).filter((a) => !a.isDeleted).toArray(),
    [cycleId]
  ) || [];
  const harvests = useLiveQuery(
    () => db.harvests.where("cropCycleId").equals(cycleId).filter((h) => !h.isDeleted).toArray(),
    [cycleId]
  ) || [];
  const sales = useLiveQuery(
    () => db.sales.filter((s) => Boolean(!s.isDeleted && (s.cropCycleId === cycleId || (cycle && s.crop.toLowerCase() === cycle.crop.toLowerCase())))).toArray(),
    [cycleId, cycle]
  ) || [];
  const expenses = useLiveQuery(
    () => db.expenses.filter((e) => Boolean(!e.isDeleted && (e.cropCycleId === cycleId || (cycle && e.farmId === cycle.farmId && e.cropCycleId === undefined)))).toArray(),
    [cycleId, cycle]
  ) || [];
  const inventoryTransactions = useLiveQuery(
    () => db.inventoryTransactions.filter((t) => !t.isDeleted && t.cropCycleId === cycleId).toArray(),
    [cycleId]
  ) || [];

  if (!cycle) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20 font-sans">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading crop cycle details...</p>
          <Link href="/farmer/crops" className="text-xs font-bold text-emerald-700 underline">
            Return to Crops list
          </Link>
        </main>
      </div>
    );
  }

  const totalHarvestedKg = harvests.reduce((acc, h) => acc + (h.weightKg || 0), 0);
  const totalSalesRevenue = sales.reduce((acc, s) => acc + (s.totalAmount || 0), 0);
  const totalOperatingExpenses = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
  const estimatedNetProfit = totalSalesRevenue - totalOperatingExpenses;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28 font-sans">
      <FarmerSubNav />

      <main className="max-w-3xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/crops"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Crops List
        </Link>

        {/* Cycle Overview Header Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                  {cycle.status}
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  {cycle.crop} ({cycle.variety || "Standard Variety"})
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Plot: {plot?.name || "Unassigned Plot"}</span>
                </p>
              </div>
            </div>

            <Link
              href={`/farmer/crops/${cycle.localId}/edit`}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <Edit className="w-4 h-4" /> Edit Cycle
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-bold">Planted Date</span>
              <p className="font-extrabold text-slate-900 mt-0.5">{cycle.plantedAt}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-bold">Est. Harvest Date</span>
              <p className="font-extrabold text-slate-900 mt-0.5">{cycle.estimatedHarvestAt}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-bold">Yield Progress</span>
              <p className="font-extrabold text-emerald-700 mt-0.5">
                {totalHarvestedKg} / {cycle.expectedYieldKg || cycle.targetYieldKg || 500} kg
              </p>
            </div>
          </div>
        </div>

        {/* FINANCIAL PERFORMANCE SUMMARY CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Crop Cost &amp; Net Financial Performance
              </h2>
            </div>

            <Link
              href={`/farmer/warehouse/adjustment?cropCycleId=${cycle.localId}`}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" /> Log Input Usage
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
              <span className="text-[11px] font-bold text-slate-600 flex items-center justify-center gap-1">
                <TrendingDown className="w-3.5 h-3.5 text-rose-600" /> Total Inputs &amp; Costs
              </span>
              <p className="text-lg font-extrabold text-rose-600 mt-1">
                ₱{totalOperatingExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-bold text-slate-600 flex items-center justify-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Total Harvest Revenue
              </span>
              <p className="text-lg font-extrabold text-emerald-600 mt-1">
                ₱{totalSalesRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
              <span className="text-[11px] font-bold text-slate-600">Estimated Net Profit</span>
              <p className={`text-lg font-extrabold mt-1 ${estimatedNetProfit >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                ₱{estimatedNetProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* SUB-SECTIONS: ACTIVITIES, HARVESTS, INVENTORY USAGE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Field Activities */}
          <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              Field Activities ({activities.length})
            </h2>
            {activities.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No field activities logged.</p>
            ) : (
              <div className="space-y-2 text-xs">
                {activities.map((a) => (
                  <div key={a.localId} className="p-3 rounded-2xl bg-slate-50 border border-gray-100 space-y-0.5">
                    <span className="font-bold text-slate-900">{a.activityType}</span>
                    <p className="text-slate-600 font-medium">{a.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Warehouse Inputs Used */}
          <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-emerald-600" />
              Warehouse Inputs Used ({inventoryTransactions.length})
            </h2>
            {inventoryTransactions.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No warehouse inputs linked yet.</p>
            ) : (
              <div className="space-y-2 text-xs">
                {inventoryTransactions.map((tx) => (
                  <div key={tx.localId} className="p-3 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{tx.reason}</span>
                      <p className="text-slate-500 font-medium">{tx.quantityKg} {tx.unit || "kg"}</p>
                    </div>
                    <span className="font-extrabold text-rose-600">
                      -₱{(tx.totalCost || tx.quantityKg * 40).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
