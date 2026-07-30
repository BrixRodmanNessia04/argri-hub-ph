"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, GeneralLogEntity } from "@/lib/db";
import { createGeneralLog } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, FileText, Save, CheckCircle2 } from "lucide-react";

export default function NewGeneralLogPage() {
  const router = useRouter();
  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];
  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];
  const cycles = useLiveQuery(() => db.cropCycles.filter((c) => !c.isDeleted).toArray(), []) || [];

  const [farmId, setFarmId] = useState("");
  const [plotId, setPlotId] = useState("");
  const [cropCycleId, setCropCycleId] = useState("");
  const [logType, setLogType] = useState<GeneralLogEntity["logType"]>("FARM_OBSERVATION");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !notes.trim()) return;

    await createGeneralLog({
      farmId: farmId || undefined,
      plotId: plotId || undefined,
      cropCycleId: cropCycleId || undefined,
      logType,
      title: title.trim(),
      notes: notes.trim(),
      quantity: quantity ? parseFloat(quantity) : undefined,
      unit: unit || undefined,
      cost: cost ? parseFloat(cost) : undefined,
      date,
    });

    setFeedback("Farm log entry saved locally & queued for sync!");
    setTimeout(() => {
      router.push("/farmer/logs");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/logs"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Unified Logs
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <FileText className="w-6 h-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Create General Farm Log Entry
              </h1>
              <p className="text-xs text-slate-500">
                Record farm observations, weather, soil condition, or custom notes.
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
                  Log Type (Uri ng Tala) *
                </label>
                <select
                  value={logType}
                  onChange={(e) => setLogType(e.target.value as GeneralLogEntity["logType"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="FARM_OBSERVATION">Farm Observation</option>
                  <option value="WEATHER">Weather Observation</option>
                  <option value="CROP_CONDITION">Crop Condition</option>
                  <option value="SOIL_CONDITION">Soil Condition</option>
                  <option value="IRRIGATION">Irrigation / Water</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="DELIVERY">Delivery / Pickup</option>
                  <option value="COOP_VISIT">Cooperative Visit</option>
                  <option value="BUYER_INQUIRY">Buyer Inquiry</option>
                  <option value="GENERAL_NOTE">General Note</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Log Title (Pamagat) *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Heavy morning rain observation"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Farm (Optional)
                </label>
                <select
                  value={farmId}
                  onChange={(e) => setFarmId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                >
                  <option value="">-- Any Farm --</option>
                  {farms.map((f) => (
                    <option key={f.localId} value={f.localId}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Plot (Optional)
                </label>
                <select
                  value={plotId}
                  onChange={(e) => setPlotId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                >
                  <option value="">-- Any Plot --</option>
                  {plots.map((p) => (
                    <option key={p.localId} value={p.localId}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Crop Cycle (Optional)
                </label>
                <select
                  value={cropCycleId}
                  onChange={(e) => setCropCycleId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                >
                  <option value="">-- Any Cycle --</option>
                  {cycles.map((c) => (
                    <option key={c.localId} value={c.localId}>{c.crop}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detailed Notes &amp; Observations *
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write observation details here..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quantity (Optional)
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g. kg, sako, liters"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cost in ₱ (Optional)
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save General Log (Offline First)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
