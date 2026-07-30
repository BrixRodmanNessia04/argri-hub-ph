"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, CropCycleEntity } from "@/lib/db";
import { createCropCycle, recordInventoryMovement } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Sprout, Save, CheckCircle2, Warehouse, AlertCircle, Coins } from "lucide-react";

export default function NewCropCyclePage() {
  const router = useRouter();

  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];
  const inventoryItems = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted).toArray(), []) || [];

  // Filter seed & seedling warehouse stock
  const seedItems = inventoryItems.filter((i) =>
    ["SEED", "SEEDLING", "COMPOST", "FERTILIZER", "SOIL_AMENDMENT", "OTHER"].includes(i.type.toUpperCase())
  );

  const [plotId, setPlotId] = useState("");
  const [crop, setCrop] = useState("Highland Cabbage");
  const [variety, setVariety] = useState("Scorpio F1");
  const [plantedAt, setPlantedAt] = useState(new Date().toISOString().split("T")[0]);
  const [estimatedHarvestAt, setEstimatedHarvestAt] = useState("");
  const [targetYieldKg, setTargetYieldKg] = useState("1200");
  const [status, setStatus] = useState<CropCycleEntity["status"]>("PLANTED");

  // Warehouse Planting Input Linkage
  const [selectedInventoryId, setSelectedInventoryId] = useState("");
  const [quantityUsed, setQuantityUsed] = useState("");
  const [showAllItems, setShowAllItems] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const availableItemsToDisplay = showAllItems ? inventoryItems : seedItems;
  const selectedItem = inventoryItems.find((i) => i.localId === selectedInventoryId);

  const activeUnitCost = selectedItem?.unitCost || 40;
  const qtyUsedNum = parseFloat(quantityUsed) || 0;
  const calculatedInputCost = qtyUsedNum * activeUnitCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!crop.trim() || !plotId) return;

    if (selectedItem && qtyUsedNum > 0) {
      if (qtyUsedNum > selectedItem.quantityInKg) {
        setErrorMsg(`Selected quantity (${qtyUsedNum} ${selectedItem.unit || "kg"}) exceeds available warehouse stock (${selectedItem.quantityInKg} ${selectedItem.unit || "kg"}).`);
        return;
      }
    }

    const newCycle = await createCropCycle({
      plotId,
      crop: crop.trim(),
      variety: variety.trim(),
      plantedAt,
      estimatedHarvestAt: estimatedHarvestAt || new Date(Date.now() + 75 * 86400000).toISOString().split("T")[0],
      status,
      targetYieldKg: parseFloat(targetYieldKg) || 1000,
    });

    // If warehouse stock item was used for planting, deduct stock and record transaction
    if (selectedItem && qtyUsedNum > 0) {
      await recordInventoryMovement({
        inventoryItemId: selectedItem.localId,
        transactionType: "usage",
        quantityKg: qtyUsedNum,
        unit: selectedItem.unit || "kg",
        plotId,
        cropCycleId: newCycle.localId,
        reason: `Planted ${crop} (${variety}) on plot`,
        unitCost: activeUnitCost,
      });
    }

    setFeedback("Crop cycle started! Stock deducted & cost linked to crop performance.");
    setTimeout(() => {
      router.push("/farmer/crops");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28 font-sans">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/crops"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Crops List
        </Link>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Sprout className="w-6 h-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Start New Crop Cycle &amp; Link Seeds/Inputs
              </h1>
              <p className="text-xs text-slate-500">
                Select field plot, target yield, and optionally deduct planted seeds/inputs from warehouse stock.
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
            <div className="p-3.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
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

            {/* WAREHOUSE PLANTING INPUT SELECTION */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <Warehouse className="w-4 h-4 text-emerald-600" />
                  <span>Deduct Planted Seeds / Inputs from Warehouse (Optional)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="text-[11px] font-bold text-emerald-700 hover:underline"
                >
                  {showAllItems ? "Show Planting Inputs Only" : "Show All Items"}
                </button>
              </div>

              <div>
                <select
                  value={selectedInventoryId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedInventoryId(id);
                    const item = inventoryItems.find((i) => i.localId === id);
                    if (item) {
                      if (item.crop) setCrop(item.crop);
                      if (item.grade) setVariety(item.grade);
                    }
                  }}
                  className="w-full p-2.5 rounded-xl bg-white border border-gray-300 text-xs font-semibold"
                >
                  <option value="">-- Select Seeds / Planting Input from Warehouse --</option>
                  {availableItemsToDisplay.map((i) => (
                    <option key={i.localId} value={i.localId}>
                      {i.crop} ({i.type}) — Available: {i.quantityInKg} {i.unit || "kg"}
                    </option>
                  ))}
                </select>
              </div>

              {selectedItem && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Quantity Planted / Used ({selectedItem.unit || "kg"})
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={quantityUsed}
                      onChange={(e) => setQuantityUsed(e.target.value)}
                      placeholder={`Max: ${selectedItem.quantityInKg}`}
                      className="w-full p-2.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-emerald-700"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-100/60 border border-emerald-200 text-xs">
                    <span className="font-bold text-slate-700">Input Cost:</span>
                    <span className="font-extrabold text-emerald-800 text-sm">
                      ₱{calculatedInputCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}
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
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Start Crop Cycle &amp; Deduct Stock</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
