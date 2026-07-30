"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, CropCycleEntity } from "@/lib/db";
import { updateCropCycle } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Sprout, Save, CheckCircle2 } from "lucide-react";

export default function EditCropCyclePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const cycleId = resolvedParams.id;
  const router = useRouter();

  const cycle = useLiveQuery(() => db.cropCycles.get(cycleId), [cycleId]);
  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];

  const [plotId, setPlotId] = useState("");
  const [crop, setCrop] = useState("");
  const [variety, setVariety] = useState("");
  const [plantedAt, setPlantedAt] = useState("");
  const [estimatedHarvestAt, setEstimatedHarvestAt] = useState("");
  const [targetYieldKg, setTargetYieldKg] = useState("1000");
  const [status, setStatus] = useState<CropCycleEntity["status"]>("PLANTED");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (cycle) {
      setPlotId(cycle.plotId);
      setCrop(cycle.crop);
      setVariety(cycle.variety || "");
      setPlantedAt(cycle.plantedAt);
      setEstimatedHarvestAt(cycle.estimatedHarvestAt);
      setTargetYieldKg(String(cycle.targetYieldKg || 1000));
      setStatus(cycle.status);
    }
  }, [cycle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop.trim() || !plotId) return;

    await updateCropCycle(cycleId, {
      plotId,
      crop: crop.trim(),
      variety: variety.trim(),
      plantedAt,
      estimatedHarvestAt,
      status,
      targetYieldKg: parseFloat(targetYieldKg) || 1000,
    });

    setFeedback("Crop cycle updated! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push(`/farmer/crops/${cycleId}`);
    }, 1200);
  };

  if (!cycle) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading crop cycle record...</p>
          <Link href="/farmer/crops" className="text-xs font-bold text-emerald-700 underline">
            Return to Crops list
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href={`/farmer/crops/${cycleId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel &amp; Back to Crop Cycle Detail
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Sprout className="w-6 h-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Edit Crop Cycle
              </h1>
              <p className="text-xs text-slate-500">
                Update variety, status, or harvest target yield.
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
                  Crop Name *
                </label>
                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Variety
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Planting Date
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
                  Estimated Harvest Date
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
                  <option value="PLANTED">PLANTED</option>
                  <option value="GROWING">GROWING</option>
                  <option value="HARVESTING">HARVESTING</option>
                  <option value="COMPLETED">COMPLETED</option>
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
                <span>Save Changes (Offline Ready)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
