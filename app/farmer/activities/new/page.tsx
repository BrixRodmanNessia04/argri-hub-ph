"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FieldActivityEntity } from "@/lib/db";
import { createFieldActivity } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Activity, Save, CheckCircle2 } from "lucide-react";

export default function NewActivityPage() {
  const router = useRouter();
  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];
  const cycles = useLiveQuery(() => db.cropCycles.filter((c) => !c.isDeleted).toArray(), []) || [];

  const [plotId, setPlotId] = useState("");
  const [cropCycleId, setCropCycleId] = useState("");
  const [activityType, setActivityType] = useState<FieldActivityEntity["activityType"]>("FERTILIZING");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("350");
  const [productName, setProductName] = useState("14-14-14 Complete Fertilizer");
  const [applicationRate, setApplicationRate] = useState("2 sacks / ha");
  const [safetyIntervalDays, setSafetyIntervalDays] = useState("14");
  const [reEntryDate, setReEntryDate] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    await createFieldActivity({
      plotId: plotId || undefined,
      cropCycleId: cropCycleId || "cycle-default",
      activityType,
      description: description.trim(),
      cost: parseFloat(cost) || 0,
      inputsUsed: productName ? [{ name: productName, quantity: 2, unit: "sacks" }] : [],
      applicationRate: applicationRate || undefined,
      safetyIntervalDays: safetyIntervalDays ? parseInt(safetyIntervalDays) : undefined,
      reEntryDate: reEntryDate || undefined,
      loggedAt: new Date().toISOString().split("T")[0],
    });

    setFeedback("Field activity logged! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push("/farmer/activities");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/activities"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Activities
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Activity className="w-6 h-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Log New Field Activity
              </h1>
              <p className="text-xs text-slate-500">
                Log land preparation, spraying, watering, fertilizing, or weeding offline.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Activity Type (Gawain) *
                </label>
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value as FieldActivityEntity["activityType"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="LAND_PREPARATION">Land Preparation (Pag-aararo)</option>
                  <option value="PLANTING">Planting (Pagtatanim)</option>
                  <option value="TRANSPLANTING">Transplanting</option>
                  <option value="IRRIGATION">Watering / Irrigation</option>
                  <option value="FERTILIZING">Fertilizer Application</option>
                  <option value="PEST_CONTROL">Pesticide / Spraying</option>
                  <option value="WEEDING">Weeding / Cleaning</option>
                  <option value="MULCHING">Mulching</option>
                  <option value="PRUNING">Pruning</option>
                  <option value="INSPECTION">Farm Inspection</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Associated Cost in ₱
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Field Plot
                </label>
                <select
                  value={plotId}
                  onChange={(e) => setPlotId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                >
                  <option value="">-- Select Plot --</option>
                  {plots.map((p) => (
                    <option key={p.localId} value={p.localId}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Crop Cycle
                </label>
                <select
                  value={cropCycleId}
                  onChange={(e) => setCropCycleId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                >
                  <option value="">-- Select Crop Batch --</option>
                  {cycles.map((c) => (
                    <option key={c.localId} value={c.localId}>{c.crop} ({c.variety})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description (Detalye) *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Applied 2 bags 14-14-14 fertilizer on Plot A"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            {(activityType === "FERTILIZING" || activityType === "PEST_CONTROL") && (
              <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-3">
                <span className="text-xs font-bold text-emerald-800">Safety &amp; Application Details (Optional)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Product Name</label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Application Rate</label>
                    <input
                      type="text"
                      value={applicationRate}
                      onChange={(e) => setApplicationRate(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Pre-Harvest Interval (Days)</label>
                    <input
                      type="number"
                      value={safetyIntervalDays}
                      onChange={(e) => setSafetyIntervalDays(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Safe Re-entry Date</label>
                    <input
                      type="date"
                      value={reEntryDate}
                      onChange={(e) => setReEntryDate(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Activity Log (Offline First)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
