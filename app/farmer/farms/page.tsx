"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { deleteFarm } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Building2, Plus, MapPin, Eye, Edit, Trash2, Search, Sprout } from "lucide-react";

export default function FarmerFarmsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const farms = useLiveQuery(
    () => db.farms.filter((f) => !f.isDeleted).toArray(),
    []
  ) || [];

  const filteredFarms = farms.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (localId: string) => {
    if (confirm("Are you sure you want to delete this farm record?")) {
      await deleteFarm(localId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-5xl mx-auto p-4 space-y-6 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                Farm Management (Mga Bukid)
              </h1>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Manage your agricultural land holdings, geographic location, and plot assignments offline.
            </p>
          </div>

          <Link
            href="/farmer/farms/new"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Farm</span>
          </Link>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search farm by name or location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Registered Farms ({filteredFarms.length})
          </h2>

          {filteredFarms.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500 space-y-3">
              <Building2 className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold">No farm records found.</p>
              <Link
                href="/farmer/farms/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" /> Add Your First Farm
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredFarms.map((f) => (
                <div
                  key={f.localId}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        {f.areaHectares} Hectares
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          f.syncStatus === "synced"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {f.syncStatus.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 mt-2">
                      {f.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{f.location}</span>
                    </p>

                    {f.primaryCrop && (
                      <p className="text-xs text-slate-600 font-semibold flex items-center gap-1 mt-2">
                        <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Primary Crop: {f.primaryCrop}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                    <Link
                      href={`/farmer/farms/${f.localId}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </Link>
                    <Link
                      href={`/farmer/farms/${f.localId}/edit`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(f.localId)}
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
