"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, MapPin, Building2, Sprout, Edit, ChevronRight } from "lucide-react";

export default function PlotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const plotId = resolvedParams.id;

  const plot = useLiveQuery(() => db.plots.get(plotId), [plotId]);
  const farm = useLiveQuery(() => (plot ? db.farms.get(plot.farmId) : undefined), [plot]);
  const cycles = useLiveQuery(
    () => db.cropCycles.where("plotId").equals(plotId).filter((c) => !c.isDeleted).toArray(),
    [plotId]
  ) || [];

  if (!plot) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading field plot details...</p>
          <Link href="/farmer/plots" className="text-xs font-bold text-emerald-700 underline">
            Return to Plots list
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-3xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/plots"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Plots List
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {plot.areaSqMeters} sq.meters
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  {plot.name}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Farm: {farm?.name || "Unassigned Farm"}</span>
                </p>
              </div>
            </div>

            <Link
              href={`/farmer/plots/${plot.localId}/edit`}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <Edit className="w-4 h-4" /> Edit Plot
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Soil Type:</span>
              <p className="font-bold text-slate-900 mt-0.5">{plot.soilType || "Standard Soil"}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Status:</span>
              <p className="font-bold text-slate-900 mt-0.5">{plot.status}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">
              Crop Cycles on this Plot ({cycles.length})
            </h2>
            <Link
              href="/farmer/crops/new"
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              + Start New Crop Cycle
            </Link>
          </div>

          {cycles.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-6 text-center text-xs text-slate-500">
              No crop cycles planted on this plot yet.
            </div>
          ) : (
            <div className="space-y-2">
              {cycles.map((c) => (
                <Link
                  key={c.localId}
                  href={`/farmer/crops/${c.localId}`}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:border-emerald-500 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Sprout className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{c.crop} ({c.variety || "Standard Variety"})</h3>
                      <p className="text-xs text-slate-500">Status: {c.status} • Planted: {c.plantedAt}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
