"use client";

import React, { useState } from "react";
import ProducerShell from "@/components/shells/ProducerShell";
import { useLiveQuery } from "dexie-react-hooks";
import { db, LivestockPoultryBatchEntity } from "@/lib/db";
import { createLivestockPoultryBatch } from "@/lib/productionRepository";
import { Beef, Egg, Plus, Save, CheckCircle2, Warehouse, ShieldAlert } from "lucide-react";

export default function LivestockPoultryPage() {
  const batches = useLiveQuery(() => db.livestockPoultryBatches.filter((l) => !l.isDeleted).toArray(), []) || [];
  const feedItems = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted && (i.type === "FERTILIZER" || i.crop.toLowerCase().includes("feed") || i.crop.toLowerCase().includes("feeder"))).toArray(), []) || [];

  // Form state
  const [siteId, setSiteId] = useState("Pasture Barn #2");
  const [animalType, setAnimalType] = useState<LivestockPoultryBatchEntity["animalType"]>("swine");
  const [batchName, setBatchName] = useState("Hog Production Batch #14");
  const [breed, setBreed] = useState("Landrace Hybrid");
  const [headCount, setHeadCount] = useState("45");
  const [housingType, setHousingType] = useState("Elevated Slotted Floor Barn");

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchName.trim()) return;

    await createLivestockPoultryBatch({
      siteId: siteId.trim(),
      animalType,
      batchName: batchName.trim(),
      breed: breed.trim(),
      headCount: parseInt(headCount) || 10,
      housingType: housingType.trim(),
    });

    setFeedback(`Livestock/Poultry batch registered: ${batchName} (${headCount} heads)!`);
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <ProducerShell>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            LIVESTOCK HUSBANDRY &amp; POULTRY FLOCKS
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-2">
            <Beef className="w-6 h-6 text-amber-400" />
            Livestock Herds &amp; Poultry Flock Batches
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Track animal headcount, vaccination schedules, feed consumption, housing conditions, and market readiness.
          </p>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CREATE ANIMAL BATCH FORM */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Beef className="w-4 h-4 text-amber-400" /> Register Livestock / Poultry Batch
            </h2>

            <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Animal Category *</label>
                  <select
                    value={animalType}
                    onChange={(e) => setAnimalType(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-bold text-white"
                  >
                    <option value="swine">Swine / Hogs (Baboy)</option>
                    <option value="cattle">Cattle / Beef (Baka)</option>
                    <option value="broiler">Broiler Chicken (Manok)</option>
                    <option value="layer">Layer Hens (Itlog)</option>
                    <option value="goat">Goat (Kambing)</option>
                    <option value="duck">Duck (Bibe)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Batch Identifier *</label>
                  <input
                    type="text"
                    value={batchName}
                    onChange={(e) => setBatchName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-bold text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Breed / Lineage</label>
                  <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Head Count *</label>
                  <input
                    type="number"
                    value={headCount}
                    onChange={(e) => setHeadCount(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-bold text-amber-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Facility / Housing Type</label>
                <input
                  type="text"
                  value={housingType}
                  onChange={(e) => setHousingType(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <Save className="w-4 h-4" /> Save Animal Batch (Offline First)
              </button>
            </form>
          </div>

          {/* ACTIVE ANIMAL BATCHES LIST */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Egg className="w-4 h-4 text-amber-400" /> Registered Batches &amp; Flocks ({batches.length})
            </h2>

            {batches.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No livestock or poultry batches registered yet.</p>
            ) : (
              <div className="space-y-3">
                {batches.map((b) => (
                  <div key={b.localId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white text-sm">{b.batchName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-extrabold">
                        {b.animalType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-1 border-t border-slate-800/60">
                      <span>Housing: {b.housingType}</span>
                      <span className="text-amber-400 font-extrabold text-sm">{b.headCount} Heads</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProducerShell>
  );
}
