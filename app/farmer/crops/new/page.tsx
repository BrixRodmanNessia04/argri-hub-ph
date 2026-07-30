"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, CropCycleEntity } from "@/lib/db";
import { createCropCycle } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Sprout, Save, CheckCircle2 } from "lucide-react";

export default function NewCropCyclePage() {
  const router = useRouter();
  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];

  const [plotId, setPlotId] = useState("");
  const [crop, setCrop] = useState("Highland Cabbage");
  const [variety, setVariety] = useState("Scorpio F1");
  const [plantedAt, setPlantedAt] = useState(new Date().toISOString().split("T")[0]);
  const [estimatedHarvestAt, setEstimatedHarvestAt] = useState("");
  const [targetYieldKg, setTargetYieldKg] = useState("1200");
  const [status, setStatus] = useState<CropCycleEntity["status"]>("PLANTED");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop.trim() || !plotId) return;

    await createCropCycle({
      plotId,
      crop: crop.trim(),
      variety: variety.trim(),
      plantedAt,
      estimatedHarvestAt: estimatedHarvestAt || new Date(Date.now() + 75 * 86400000).toISOString().split("T")[0],
      status,
      targetYieldKg: parseFloat(targetYieldKg) || 1000,
    });

    setFeedback("Crop cycle started! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push("/farmer/crops");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/crops"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Crops List
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Sprout className="w-6 h-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Start New Crop Cycle
              </h1>
              <p className="text-xs text-slate-500">
                Log crop species, seed variety, and expected harvest timeline.
              </p>
            </div>
          </div>

          {feedback && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Field Plot *
              </label>
              <select
                value={plotId}
                onChange={(e) => setPlotId(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              >
                <option value="">-- Select Field Plot --</option>
                {plots.map((p) => (
                  <option key={p.localId} value={p.localId}>
                    {p.name} ({p.areaSqMeters} sq.m)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Crop Name (Tanim) *
                </label>
                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  placeholder="e.g. Highland Cabbage"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Variety (Binhi / Uri)
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="e.g. Scorpio F1"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Planting Date (Petsa ng Pagtatanim)
                </label>
                <input
                  type="date"
                  value={plantedAt}
                  onChange={(e) => setPlantedAt(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Harvest Date (Tantiya ng Ani)
                </label>
                <input
                  type="date"
                  value={estimatedHarvestAt}
                  onChange={(e) => setEstimatedHarvestAt(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Yield in Kg
                </label>
                <input
                  type="number"
                  value={targetYieldKg}
                  onChange={(e) => setTargetYieldKg(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Growth Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as CropCycleEntity["status"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="PLANTED">PLANTED (Bagong Tanim)</option>
                  <option value="GROWING">GROWING (Lumalaki)</option>
                  <option value="HARVESTING">HARVESTING (Inaani)</option>
                  <option value="COMPLETED">COMPLETED (Tapos na)</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Start Crop Cycle (Offline First)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
