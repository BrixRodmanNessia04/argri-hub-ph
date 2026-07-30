"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Scissors, Edit, Calendar } from "lucide-react";

export default function HarvestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const hId = resolvedParams.id;

  const harvest = useLiveQuery(() => db.harvests.get(hId), [hId]);

  if (!harvest) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading harvest record details...</p>
          <Link href="/farmer/harvests" className="text-xs font-bold text-emerald-700 underline">
            Return to Harvests list
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
          href="/farmer/harvests"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Harvests
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-teal-100 text-teal-800">
                <Scissors className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold">
                  {harvest.qualityGrade}
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  {harvest.weightKg} kg {harvest.crop}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Harvested on: {harvest.harvestedAt}</span>
                </p>
              </div>
            </div>

            <Link
              href={`/farmer/harvests/${harvest.localId}/edit`}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <Edit className="w-4 h-4" /> Edit Harvest
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">For Sale:</span>
              <p className="font-bold text-emerald-700 mt-0.5">{harvest.forSaleKg || harvest.weightKg} kg</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Home Use:</span>
              <p className="font-bold text-slate-900 mt-0.5">{harvest.homeUseKg || 0} kg</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Damaged:</span>
              <p className="font-bold text-rose-600 mt-0.5">{harvest.damagedKg || 0} kg</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Coop Queue Status:</span>
              <p className="font-bold text-slate-900 mt-0.5">{harvest.coopApprovalStatus || "PENDING"}</p>
            </div>
          </div>

          {harvest.notes && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200 text-xs space-y-1">
              <span className="text-slate-400 font-medium">Notes &amp; Particulars:</span>
              <p className="text-slate-800 font-semibold">{harvest.notes}</p>
            </div>
          )}

          <details className="text-xs text-slate-400 pt-2 border-t border-gray-100">
            <summary className="cursor-pointer font-bold hover:text-slate-600">Technical Details</summary>
            <div className="mt-2 space-y-1 font-mono text-[11px]">
              <p>Local ID: {harvest.localId}</p>
              <p>Sync Status: {harvest.syncStatus}</p>
              <p>Device ID: {harvest.deviceId}</p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}
