"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Building2, MapPin, Sprout, Edit, ChevronRight } from "lucide-react";

export default function FarmDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const farmId = resolvedParams.id;

  const farm = useLiveQuery(() => db.farms.get(farmId), [farmId]);
  const plots = useLiveQuery(
    () => db.plots.where("farmId").equals(farmId).filter((p) => !p.isDeleted).toArray(),
    [farmId]
  ) || [];

  if (!farm) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading farm record from local database...</p>
          <Link href="/farmer/farms" className="text-xs font-bold text-emerald-700 underline">
            Return to Farms list
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
          href="/farmer/farms"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Farms List
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {farm.areaHectares} Hectares
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  {farm.name}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{farm.location}</span>
                </p>
              </div>
            </div>

            <Link
              href={`/farmer/farms/${farm.localId}/edit`}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <Edit className="w-4 h-4" /> Edit Farm
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Primary Crop:</span>
              <p className="font-bold text-slate-900 mt-0.5">{farm.primaryCrop || "None specified"}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Sync Status:</span>
              <p className="font-bold text-slate-900 mt-0.5 uppercase">{farm.syncStatus}</p>
            </div>
          </div>

          {farm.notes && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200 text-xs space-y-1">
              <span className="text-slate-400 font-medium">Notes &amp; Description:</span>
              <p className="text-slate-700 font-semibold">{farm.notes}</p>
            </div>
          )}

          <details className="text-xs text-slate-400 pt-2 border-t border-gray-100">
            <summary className="cursor-pointer font-bold hover:text-slate-600">Technical Details</summary>
            <div className="mt-2 space-y-1 font-mono text-[11px]">
              <p>Local ID: {farm.localId}</p>
              <p>Server ID: {farm.serverId || "Pending cloud sync"}</p>
              <p>Device ID: {farm.deviceId}</p>
              <p>Version: {farm.version}</p>
            </div>
          </details>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">
              Assigned Field Plots ({plots.length})
            </h2>
            <Link
              href="/farmer/plots/new"
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              + Add Plot to Farm
            </Link>
          </div>

          {plots.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-6 text-center text-xs text-slate-500">
              No plots created for this farm yet.
            </div>
          ) : (
            <div className="space-y-2">
              {plots.map((p) => (
                <Link
                  key={p.localId}
                  href={`/farmer/plots/${p.localId}`}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:border-emerald-500 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Sprout className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{p.name}</h3>
                      <p className="text-xs text-slate-500">{p.areaSqMeters} sq.m • {p.soilType || "Standard Soil"}</p>
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
