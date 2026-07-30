"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { deleteLaborLog } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Users, Plus, Trash2 } from "lucide-react";

export default function LaborLogsPage() {
  const items = useLiveQuery(() => db.laborLogs.filter((l) => !l.isDeleted).toArray(), []) || [];

  const handleDelete = async (localId: string) => {
    if (confirm("Delete this labor record?")) {
      await deleteLaborLog(localId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-5xl mx-auto p-4 space-y-6 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                Farm Labor Logs (Trabahador sa Bukid)
              </h1>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Log worker group sizes, tasks, rates (per day / per task), and wages paid offline.
            </p>
          </div>

          <Link
            href="/farmer/labor/new"
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Log Labor Entry</span>
          </Link>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Recorded Labor Logs ({items.length})
          </h2>

          {items.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500 space-y-3">
              <Users className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold">No labor logs recorded yet.</p>
              <Link
                href="/farmer/labor/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" /> Log First Labor Entry
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((l) => (
                <div
                  key={l.localId}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold">
                        {l.workType}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{l.date}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">
                      {l.workerCount} Workers ({l.workerGroup})
                    </h3>
                    <p className="text-xs text-slate-500">Rate: ₱{l.ratePerUnit}/{l.rateType}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="font-extrabold text-base text-rose-600">
                      -₱{l.totalCost.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleDelete(l.localId)}
                      className="text-slate-400 hover:text-red-600 p-1"
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
