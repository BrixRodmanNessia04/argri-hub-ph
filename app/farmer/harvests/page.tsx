"use client";

import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, createBaseEntity, HarvestEntity } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Scissors, Plus, CheckCircle2, Trash2 } from "lucide-react";

export default function FarmerHarvestsPage() {
  const harvests = useLiveQuery(() => db.harvests.toArray(), []) || [];
  const plots = useLiveQuery(() => db.plots.toArray(), []) || [];

  const [crop, setCrop] = useState("Benguet Cabbage");
  const [weight, setWeight] = useState("150");
  const [grade, setGrade] = useState<HarvestEntity["qualityGrade"]>("Class A");
  const [plotId, setPlotId] = useState("");
  const [notes, setNotes] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddHarvest = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedWeight = parseFloat(weight);
    if (!parsedWeight || parsedWeight <= 0) return;

    const newHarvest: HarvestEntity = {
      ...createBaseEntity("farmer-123", "coop-456"),
      plotId: plotId || "plot-default",
      crop,
      weightKg: parsedWeight,
      qualityGrade: grade,
      harvestedAt: new Date().toISOString().split("T")[0],
      notes: notes.trim(),
      coopApprovalStatus: "PENDING",
    };

    await db.harvests.add(newHarvest);

    const existingInv = await db.inventoryItems.where({ crop }).first();
    if (existingInv) {
      await db.inventoryItems.update(existingInv.localId, {
        quantityInKg: existingInv.quantityInKg + parsedWeight,
        updatedAt: new Date().toISOString(),
      });
    } else {
      await db.inventoryItems.add({
        ...createBaseEntity("farmer-123", "coop-456"),
        crop,
        type: "HARVESTED",
        quantityInKg: parsedWeight,
        grade,
      });
    }

    setWeight("");
    setNotes("");
    setFeedback(`Harvest of ${parsedWeight} kg ${crop} logged! Saved locally for sync.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = async (localId: string) => {
    await db.harvests.delete(localId);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Scissors className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Harvest Recording (Pag-ani)
            </h1>
          </div>
          <p className="text-xs text-slate-600">
            Log harvested weight and quality grade offline. Records will automatically submit to the Cooperative Queue upon sync.
          </p>

          {feedback && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleAddHarvest} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Harvested Crop (Inaning Gulay)
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Benguet Cabbage">Benguet Highland Cabbage</option>
                <option value="Baguio Tomatoes">Baguio Vine Tomatoes</option>
                <option value="Atok Carrots">Atok Sweet Carrots</option>
                <option value="Mountain Eggplant">Mountain Purple Eggplant</option>
                <option value="Romaine Lettuce">Highland Romaine Lettuce</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Harvested Weight in Kg (Timbang)
              </label>
              <input
                type="number"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 150"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Quality Grade (Klase ng Ani)
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as HarvestEntity["qualityGrade"])}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Class A">Class A — Premium Quality</option>
                <option value="Class B">Class B — Standard Wholesale</option>
                <option value="Class C">Class C — Processing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Harvest Field Plot
              </label>
              <select
                value={plotId}
                onChange={(e) => setPlotId(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="">-- Select Plot --</option>
                {plots.map((p) => (
                  <option key={p.localId} value={p.localId}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Notes / Weather during Harvest
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Morning harvest before 10 AM, clean heads"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Log Harvest Entry (Offline Saved)</span>
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Harvest Submissions Queue ({harvests.length})
          </h2>

          {harvests.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500">
              No harvest records logged yet. Use the form above to log your harvest.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {harvests.map((h) => (
                <div
                  key={h.localId}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          h.syncStatus === "synced"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {h.syncStatus.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleDelete(h.localId)}
                        className="text-slate-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900">
                      {h.weightKg} kg • {h.crop}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Grade: {h.qualityGrade} • Harvested: {h.harvestedAt}
                    </p>
                    {h.notes && (
                      <p className="text-xs text-slate-600 italic mt-2 bg-slate-50 p-2 rounded-lg">
                        &quot;{h.notes}&quot;
                      </p>
                    )}
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
