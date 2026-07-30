"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { deletePestDisease } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Bug, Plus, Trash2, MapPin, AlertCircle } from "lucide-react";

export default function PestsDiseasesPage() {
  const items = useLiveQuery(() => db.pestsDiseases.filter((p) => !p.isDeleted).toArray(), []) || [];
  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];

  const plotMap = new Map(plots.map((p) => [p.localId, p.name]));

  const handleDelete = async (localId: string) => {
    if (confirm("Delete this observation log?")) {
      await deletePestDisease(localId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-5xl mx-auto p-4 space-y-6 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-purple-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                Pest &amp; Disease Observations (Mga Salot sa Tanim)
              </h1>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Log suspected crop issues for cooperative or agricultural technician review.
            </p>
          </div>

          <Link
            href="/farmer/pests-diseases/new"
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Log Observation</span>
          </Link>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Recorded Observations ({items.length})
          </h2>

          {items.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500 space-y-3">
              <Bug className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold">No pest or disease observations logged yet.</p>
              <Link
                href="/farmer/pests-diseases/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" /> Log First Observation
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.localId}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold">
                        {item.observationType}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.severity === "CRITICAL" || item.severity === "HIGH"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.severity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono">{item.observedAt}</span>
                      <button
                        onClick={() => handleDelete(item.localId)}
                        className="text-slate-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">{item.symptoms}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Plot: {plotMap.get(item.plotId || "") || "General Plot"}</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-gray-100 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="text-slate-600">
                      Farmer Observation • Needs cooperative or technician review
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
