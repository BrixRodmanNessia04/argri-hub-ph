"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { deleteEquipment } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Wrench, Plus, Trash2 } from "lucide-react";

export default function EquipmentPage() {
  const items = useLiveQuery(() => db.equipment.filter((e) => !e.isDeleted).toArray(), []) || [];

  const handleDelete = async (localId: string) => {
    if (confirm("Delete this equipment record?")) {
      await deleteEquipment(localId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-5xl mx-auto p-4 space-y-6 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-indigo-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                Equipment &amp; Machinery (Mga Gagamitin sa Bukid)
              </h1>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Manage farm tractors, sprayers, pumps, ownership, and maintenance logs offline.
            </p>
          </div>

          <Link
            href="/farmer/equipment/new"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Register Equipment</span>
          </Link>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Registered Machinery &amp; Tools ({items.length})
          </h2>

          {items.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500 space-y-3">
              <Wrench className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold">No equipment registered yet.</p>
              <Link
                href="/farmer/equipment/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" /> Register First Equipment
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((eq) => (
                <div
                  key={eq.localId}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold">
                        {eq.ownership}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {eq.condition}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 mt-2">
                      {eq.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Type: {eq.type} {eq.brand && `• ${eq.brand} ${eq.model || ""}`}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleDelete(eq.localId)}
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
