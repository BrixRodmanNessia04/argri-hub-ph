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
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] pb-24">
      <FarmerSubNav />

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-4 space-y-5 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#dce9df] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#059669]" />
              <h1 className="text-lg sm:text-xl font-extrabold text-[#163025]">
                Farm Labor Logs <span className="hidden sm:inline">(Trabahador sa Bukid)</span>
              </h1>
            </div>
            <p className="text-xs text-[#5f7469] mt-1">
              Log worker group sizes, tasks, rates (per day / per task), and wages paid offline.
            </p>
          </div>

          <Link
            href="/farmer/labor/new"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] active:bg-[#065f46] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 shrink-0 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Log Labor Entry</span>
          </Link>
        </div>

        <div className="space-y-2.5">
          <h2 className="text-sm font-extrabold text-[#163025]">
            Recorded Labor Logs ({items.length})
          </h2>

          {items.length === 0 ? (
            <div className="bg-white border border-dashed border-[#dce9df] rounded-2xl p-8 sm:p-12 text-center space-y-3">
              <Users className="w-10 h-10 text-[#9db5a5] mx-auto" />
              <p className="font-extrabold text-[#163025] text-sm">No labor logs recorded yet.</p>
              <p className="text-xs text-[#5f7469]">Log your first farm worker entry to track wages and productivity.</p>
              <Link
                href="/farmer/labor/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs transition-colors"
              >
                <Plus className="w-4 h-4" /> Log First Labor Entry
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {items.map((l) => (
                <div
                  key={l.localId}
                  className="bg-white border border-[#dce9df] rounded-2xl p-4 shadow-xs flex items-center justify-between hover:border-[#059669]/60 transition-all"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#f3e8ff] text-[#7e22ce] text-[11px] font-bold">
                        {l.workType}
                      </span>
                      <span className="text-[11px] text-[#9db5a5] font-mono">{l.date}</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#163025]">
                      {l.workerCount} Workers ({l.workerGroup})
                    </h3>
                    <p className="text-xs text-[#5f7469]">Rate: ₱{l.ratePerUnit}/{l.rateType}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-base text-[#dc2626] tabular-nums">
                      -₱{(l.totalCost ?? 0).toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleDelete(l.localId)}
                      className="text-[#9db5a5] hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
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
