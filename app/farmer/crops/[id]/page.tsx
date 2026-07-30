"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Sprout, MapPin, Edit, Activity, Scissors } from "lucide-react";

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

  if (!cycle) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
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

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-3xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/crops"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Crops List
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {cycle.status}
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  {cycle.crop} ({cycle.variety || "Standard Variety"})
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Planted Date:</span>
              <p className="font-bold text-slate-900 mt-0.5">{cycle.plantedAt}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Est. Harvest:</span>
              <p className="font-bold text-slate-900 mt-0.5">{cycle.estimatedHarvestAt}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Yield Progress:</span>
              <p className="font-bold text-emerald-700 mt-0.5">
                {totalHarvestedKg} / {cycle.targetYieldKg || 0} kg
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              Field Activities ({activities.length})
            </h2>
            {activities.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No field activities logged.</p>
            ) : (
              <div className="space-y-2 text-xs">
                {activities.map((a) => (
                  <div key={a.localId} className="p-2.5 rounded-xl bg-slate-50 border border-gray-100">
                    <span className="font-bold text-slate-900">{a.activityType}</span>
                    <p className="text-slate-500">{a.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-emerald-600" />
              Harvest Records ({harvests.length})
            </h2>
            {harvests.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No harvests recorded for this cycle yet.</p>
            ) : (
              <div className="space-y-2 text-xs">
                {harvests.map((h) => (
                  <div key={h.localId} className="p-2.5 rounded-xl bg-slate-50 border border-gray-100 flex justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{h.weightKg} kg</span>
                      <p className="text-slate-500">Grade: {h.qualityGrade}</p>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">{h.harvestedAt}</span>
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
