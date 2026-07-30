"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { deletePlot } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { MapPin, Plus, Eye, Edit, Trash2, Search, Building2 } from "lucide-react";

export default function FarmerPlotsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const plots = useLiveQuery(
    () => db.plots.filter((p) => !p.isDeleted).toArray(),
    []
  ) || [];
  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];

  const farmMap = new Map(farms.map((f) => [f.localId, f.name]));

  const filteredPlots = plots.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (farmMap.get(p.farmId) || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (localId: string) => {
    if (confirm("Are you sure you want to delete this field plot?")) {
      await deletePlot(localId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-5xl mx-auto p-4 space-y-6 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                Field Plot Management (Mga Pirasong Lupa)
              </h1>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Manage individual land plots, soil types, and crop assignments per farm.
            </p>
          </div>

          <Link
            href="/farmer/plots/new"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Field Plot</span>
          </Link>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search plot by name or farm..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Registered Plots ({filteredPlots.length})
          </h2>

          {filteredPlots.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500 space-y-3">
              <MapPin className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold">No field plot records found.</p>
              <Link
                href="/farmer/plots/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" /> Add Your First Plot
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredPlots.map((p) => (
                <div
                  key={p.localId}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        {p.areaSqMeters} sq.m
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {p.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 mt-2">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Farm: {farmMap.get(p.farmId) || "Unassigned Farm"}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                    <Link
                      href={`/farmer/plots/${p.localId}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </Link>
                    <Link
                      href={`/farmer/plots/${p.localId}/edit`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.localId)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
