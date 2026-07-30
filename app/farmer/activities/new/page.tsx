"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FieldActivityEntity } from "@/lib/db";
import { createFieldActivity, recordInventoryMovement } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Activity, Save, CheckCircle2, Warehouse, AlertCircle, Coins } from "lucide-react";

export default function NewActivityPage() {
  const router = useRouter();

  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];
  const cycles = useLiveQuery(() => db.cropCycles.filter((c) => !c.isDeleted).toArray(), []) || [];
  const inventoryItems = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted).toArray(), []) || [];

  const [plotId, setPlotId] = useState("");
  const [cropCycleId, setCropCycleId] = useState("");
  const [activityType, setActivityType] = useState<FieldActivityEntity["activityType"]>("FERTILIZING");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("0");
  const [productName, setProductName] = useState("");
  const [applicationRate, setApplicationRate] = useState("");
  const [safetyIntervalDays, setSafetyIntervalDays] = useState("");
  const [reEntryDate, setReEntryDate] = useState("");

  // Warehouse Input Linkage
  const [selectedInventoryId, setSelectedInventoryId] = useState("");
  const [quantityUsed, setQuantityUsed] = useState("");
  const [showAllItems, setShowAllItems] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Filter warehouse items by activity type
  const filterCategoriesForActivity = (act: FieldActivityEntity["activityType"]) => {
    switch (act) {
      case "FERTILIZING":
        return ["FERTILIZER", "COMPOST", "SOIL_AMENDMENT"];
      case "PEST_CONTROL":
        return ["PESTICIDE", "BIOLOGICAL_CONTROL"];
      case "WEEDING":
        return ["HERBICIDE"];
      case "PLANTING":
      case "TRANSPLANTING":
        return ["SEED", "SEEDLING", "COMPOST", "FERTILIZER"];
      case "IRRIGATION":
        return ["FUEL", "IRRIGATION_SUPPLIES"];
      case "MULCHING":
        return ["MULCH", "SOIL_AMENDMENT"];
      default:
        return ["FERTILIZER", "PESTICIDE", "HERBICIDE", "SEED", "COMPOST", "FUEL", "PACKAGING"];
    }
  };

  const allowedCats = filterCategoriesForActivity(activityType);
  const filteredItems = inventoryItems.filter((i) => allowedCats.includes(i.type.toUpperCase()));
  const availableItemsToDisplay = showAllItems ? inventoryItems : filteredItems;

  const selectedItem = inventoryItems.find((i) => i.localId === selectedInventoryId);
  const activeUnitCost = selectedItem?.unitCost || 40;
  const qtyUsedNum = parseFloat(quantityUsed) || 0;
  const calculatedUsageCost = qtyUsedNum * activeUnitCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!description.trim()) return;

    if (selectedItem && qtyUsedNum > 0) {
      if (qtyUsedNum > selectedItem.quantityInKg) {
        setErrorMsg(`Quantity (${qtyUsedNum} ${selectedItem.unit || "kg"}) exceeds available stock (${selectedItem.quantityInKg} ${selectedItem.unit || "kg"}).`);
        return;
      }
    }

    const activity = await createFieldActivity({
      plotId: plotId || undefined,
      cropCycleId: cropCycleId || "cycle-default",
      activityType,
      description: description.trim(),
      cost: (parseFloat(cost) || 0) + calculatedUsageCost,
      inputsUsed: selectedItem
        ? [{ name: selectedItem.crop, quantity: qtyUsedNum, unit: selectedItem.unit || "kg" }]
        : productName
        ? [{ name: productName, quantity: 1, unit: "application" }]
        : [],
      applicationRate: applicationRate || undefined,
      safetyIntervalDays: safetyIntervalDays ? parseInt(safetyIntervalDays) : undefined,
      reEntryDate: reEntryDate || undefined,
      loggedAt: new Date().toISOString().split("T")[0],
    });

    if (selectedItem && qtyUsedNum > 0) {
      await recordInventoryMovement({
        inventoryItemId: selectedItem.localId,
        transactionType: "usage",
        quantityKg: qtyUsedNum,
        unit: selectedItem.unit || "kg",
        plotId: plotId || undefined,
        cropCycleId: cropCycleId || undefined,
        activityLocalId: activity.localId,
        reason: `${activityType}: ${description.trim()}`,
        unitCost: activeUnitCost,
      });
    }

    setFeedback("Field activity logged! Stock deducted & input cost linked to crop performance & ledger.");
    setTimeout(() => {
      router.push("/farmer/activities");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28 font-sans">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/activities"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Activities
        </Link>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Activity className="w-6 h-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Log New Field Activity &amp; Input Stock
              </h1>
              <p className="text-xs text-slate-500">
                Log land preparation, spraying, watering, or fertilizing. Select warehouse items to deduct stock automatically.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Activity Type (Gawain) *
                </label>
                <select
                  value={activityType}
                  onChange={(e) => {
                    const val = e.target.value as FieldActivityEntity["activityType"];
                    setActivityType(val);
                    setSelectedInventoryId("");
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="FERTILIZING">Fertilizer Application</option>
                  <option value="PEST_CONTROL">Pesticide / Spraying</option>
                  <option value="WEEDING">Weeding / Herbicides</option>
                  <option value="PLANTING">Planting (Pagtatanim)</option>
                  <option value="TRANSPLANTING">Transplanting</option>
                  <option value="IRRIGATION">Watering / Irrigation Fuel</option>
                  <option value="MULCHING">Mulching</option>
                  <option value="LAND_PREPARATION">Land Preparation</option>
                  <option value="INSPECTION">Farm Inspection</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Labor / Cash Cost (₱)
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="0"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* WAREHOUSE INPUT DEDUCTION BOX */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <Warehouse className="w-4 h-4 text-emerald-600" />
                  <span>Deduct Stock from Warehouse (Categorized for {activityType})</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="text-[11px] font-bold text-emerald-700 hover:underline"
                >
                  {showAllItems ? "Show Filtered Only" : "Show All Items"}
                </button>
              </div>

              <div>
                <select
                  value={selectedInventoryId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedInventoryId(id);
                    const item = inventoryItems.find((i) => i.localId === id);
                    if (item) setProductName(item.crop);
                  }}
                  className="w-full p-2.5 rounded-xl bg-white border border-gray-300 text-xs font-semibold"
                >
                  <option value="">-- Select Warehouse Input Item --</option>
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
                      Quantity Used ({selectedItem.unit || "kg"})
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={quantityUsed}
                      onChange={(e) => setQuantityUsed(e.target.value)}
                      placeholder={`Available: ${selectedItem.quantityInKg}`}
                      className="w-full p-2.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-emerald-700"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-100/60 border border-emerald-200 text-xs">
                    <span className="font-bold text-slate-700">Input Cost:</span>
                    <span className="font-extrabold text-emerald-800 text-sm">
                      ₱{calculatedUsageCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}
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
                  Crop Cycle (Recalculates Profit)
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
                placeholder="e.g. Applied 2 bags complete fertilizer on Plot A"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            {(activityType === "FERTILIZING" || activityType === "PEST_CONTROL") && (
              <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-3">
                <span className="text-xs font-bold text-emerald-800">Safety &amp; Application Details (Optional)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Application Rate</label>
                    <input
                      type="text"
                      value={applicationRate}
                      onChange={(e) => setApplicationRate(e.target.value)}
                      placeholder="e.g. 2 sacks / ha"
                      className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Pre-Harvest Interval (Days)</label>
                    <input
                      type="number"
                      value={safetyIntervalDays}
                      onChange={(e) => setSafetyIntervalDays(e.target.value)}
                      placeholder="14"
                      className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Activity Log &amp; Deduct Stock</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
