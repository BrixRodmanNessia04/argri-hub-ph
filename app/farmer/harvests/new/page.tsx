"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, HarvestEntity, InventoryItemEntity, InventoryTransactionEntity, createBaseEntity } from "@/lib/db";
import { createHarvest, queueSyncOperation } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Scissors, Save, CheckCircle2, AlertCircle, Warehouse } from "lucide-react";

export default function NewHarvestPage() {
  const router = useRouter();
  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];
  const cycles = useLiveQuery(() => db.cropCycles.filter((c) => !c.isDeleted).toArray(), []) || [];

  const [crop, setCrop] = useState("Benguet Cabbage");
  const [variety, setVariety] = useState("Scorpio F1");
  const [weightKg, setWeightKg] = useState("150");
  const [grade, setGrade] = useState<HarvestEntity["qualityGrade"]>("Class A");
  const [harvestType, setHarvestType] = useState<HarvestEntity["harvestType"]>("PARTIAL");
  const [rejectedKg, setRejectedKg] = useState("5");
  const [damagedKg, setDamagedKg] = useState("5");
  const [homeUseKg, setHomeUseKg] = useState("10");
  const [forSaleKg, setForSaleKg] = useState("130");
  const [plotId, setPlotId] = useState("");
  const [cropCycleId, setCropCycleId] = useState("");
  const [notes, setNotes] = useState("");

  // Requirement 9: Add to Farm Inventory & Storage options
  const [addToInventory, setAddToInventory] = useState(true);
  const [storageLocation, setStorageLocation] = useState("La Trinidad Central Barn");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const totalWeight = parseFloat(weightKg) || 0;
    const rej = parseFloat(rejectedKg) || 0;
    const dam = parseFloat(damagedKg) || 0;
    const home = parseFloat(homeUseKg) || 0;
    const sale = parseFloat(forSaleKg) || 0;

    if (totalWeight <= 0) {
      setErrorMsg("Harvest weight must be greater than zero.");
      return;
    }

    if (rej + dam + home + sale > totalWeight) {
      setErrorMsg(`The allocated quantities (${rej + dam + home + sale} kg) exceed the total harvested weight (${totalWeight} kg). Please check your numbers.`);
      return;
    }

    const harvest = await createHarvest({
      plotId: plotId || undefined,
      cropCycleId: cropCycleId || undefined,
      crop: crop.trim(),
      variety: variety.trim() || undefined,
      harvestType,
      weightKg: totalWeight,
      qualityGrade: grade,
      rejectedKg: rej,
      damagedKg: dam,
      homeUseKg: home,
      forSaleKg: sale,
      harvestedAt: new Date().toISOString().split("T")[0],
      notes: notes.trim() || undefined,
      coopApprovalStatus: "PENDING",
    });

    // Requirement 9: Connect harvest to Warehouse Inventory
    if (addToInventory && sale > 0) {
      const existingItems = await db.inventoryItems
        .filter((i) => !i.isDeleted && i.crop.toLowerCase() === crop.trim().toLowerCase() && i.type === "HARVESTED")
        .toArray();

      let itemId: string;
      if (existingItems.length > 0) {
        itemId = existingItems[0].localId;
        await db.inventoryItems.update(itemId, {
          quantityInKg: existingItems[0].quantityInKg + sale,
          storageLocation: storageLocation.trim() || existingItems[0].storageLocation,
          updatedAt: new Date().toISOString(),
        });
      } else {
        const newItem: InventoryItemEntity = {
          ...createBaseEntity(),
          crop: crop.trim(),
          type: "HARVESTED",
          quantityInKg: sale,
          unit: "kg",
          grade,
          storageLocation: storageLocation.trim() || "La Trinidad Central Barn",
        };
        itemId = newItem.localId;
        await db.inventoryItems.add(newItem);
        await queueSyncOperation("inventory_items", itemId, "CREATE", newItem as unknown as Record<string, unknown>);
      }

      // Record transaction with idempotency key
      const idempotencyKey = `harvest_${harvest.localId}`;
      const existingTx = await db.inventoryTransactions.filter((t) => t.idempotencyKey === idempotencyKey).toArray();
      if (existingTx.length === 0) {
        const tx: InventoryTransactionEntity = {
          ...createBaseEntity(),
          inventoryItemId: itemId,
          changeType: "ADD",
          quantityKg: sale,
          reason: `Harvest addition from ${crop} (${harvest.harvestedAt})`,
          date: harvest.harvestedAt,
          idempotencyKey,
        };
        await db.inventoryTransactions.add(tx);
        await queueSyncOperation("inventory_transactions", tx.localId, "CREATE", tx as unknown as Record<string, unknown>);
      }
    }

    setFeedback(`Harvest record of ${totalWeight} kg ${crop} logged! Added to storage.`);
    setTimeout(() => {
      router.push("/farmer/harvests");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/harvests"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Harvests
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Scissors className="w-6 h-6 text-teal-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Log Harvest Entry (Pag-ani)
              </h1>
              <p className="text-xs text-slate-500">
                Record crop harvest, grade quality, and allocation offline.
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {feedback && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Crop Name (Inani) *
                </label>
                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  placeholder="e.g. Benguet Cabbage"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Variety (Binhi)
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="e.g. Scorpio F1"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Total Harvest Weight (Kg) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-bold text-teal-700 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quality Grade *
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as HarvestEntity["qualityGrade"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                >
                  <option value="Class A">Class A — Premium</option>
                  <option value="Class B">Class B — Standard Wholesale</option>
                  <option value="Class C">Class C — Processing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Harvest Type
                </label>
                <select
                  value={harvestType}
                  onChange={(e) => setHarvestType(e.target.value as HarvestEntity["harvestType"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                >
                  <option value="PARTIAL">PARTIAL (Una / Paunti-unti)</option>
                  <option value="FINAL">FINAL (Huling Ani)</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-3">
              <span className="text-xs font-bold text-slate-800">Harvest Allocation Breakdown (Kg)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Available for Sale</label>
                  <input
                    type="number"
                    value={forSaleKg}
                    onChange={(e) => setForSaleKg(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-bold text-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Home Use</label>
                  <input
                    type="number"
                    value={homeUseKg}
                    onChange={(e) => setHomeUseKg(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Damaged</label>
                  <input
                    type="number"
                    value={damagedKg}
                    onChange={(e) => setDamagedKg(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Rejected</label>
                  <input
                    type="number"
                    value={rejectedKg}
                    onChange={(e) => setRejectedKg(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-rose-600"
                  />
                </div>
              </div>
            </div>

            {/* Requirement 9: Warehouse storage integration option */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <label className="flex items-center gap-2 text-xs font-extrabold text-emerald-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addToInventory}
                  onChange={(e) => setAddToInventory(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <Warehouse className="w-4 h-4 text-emerald-700" />
                <span>Add harvested quantity ({forSaleKg} kg) to Farm Inventory &amp; Storage</span>
              </label>

              {addToInventory && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Select Storage Location *
                  </label>
                  <input
                    type="text"
                    value={storageLocation}
                    onChange={(e) => setStorageLocation(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold"
                    required
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Field Plot</label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Crop Cycle</label>
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Field Weather</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Morning harvest before 10 AM, clean firm heads"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Harvest Log (Offline Saved)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
