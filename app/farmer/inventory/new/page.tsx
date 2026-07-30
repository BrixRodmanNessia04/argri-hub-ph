"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, InventoryItemEntity, createBaseEntity } from "@/lib/db";
import { queueSyncOperation } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Package, Save, CheckCircle2 } from "lucide-react";

export default function NewInventoryItemPage() {
  const router = useRouter();
  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];

  const [crop, setCrop] = useState("Highland Cabbage Seeds");
  const [type, setType] = useState<InventoryItemEntity["type"]>("SEED");
  const [quantityInKg, setQuantityInKg] = useState("50");
  const [unit, setUnit] = useState("kg");
  const [grade, setGrade] = useState("Class A");
  const [storageLocation, setStorageLocation] = useState("La Trinidad Barn #1");
  const [farmId, setFarmId] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantityInKg) || 0;
    if (!crop.trim() || qty <= 0) return;

    const newItem: InventoryItemEntity = {
      ...createBaseEntity(),
      farmId: farmId || undefined,
      crop: crop.trim(),
      type,
      quantityInKg: qty,
      unit,
      grade,
      storageLocation: storageLocation.trim() || undefined,
    };

    await db.inventoryItems.add(newItem);
    await queueSyncOperation("inventory_items", newItem.localId, "CREATE", newItem as unknown as Record<string, unknown>);

    setFeedback(`Inventory item created: ${qty} ${unit} ${crop}!`);
    setTimeout(() => {
      router.push("/farmer/inventory");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/inventory"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Package className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Register Inventory Stock Item
              </h1>
              <p className="text-xs text-slate-500">
                Record seed stock, fertilizer inputs, or harvested produce stock.
              </p>
            </div>
          </div>

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
                  Item Name / Crop *
                </label>
                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  placeholder="e.g. Highland Cabbage Seeds"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Stock Category *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as InventoryItemEntity["type"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                >
                  <option value="SEED">SEED (Binhi)</option>
                  <option value="SEEDLING">SEEDLING (Punla)</option>
                  <option value="HARVESTED">HARVESTED PRODUCE (Ani)</option>
                  <option value="FERTILIZER">FERTILIZER (Abono)</option>
                  <option value="PESTICIDE">PESTICIDE (Pambomba)</option>
                  <option value="TOOL">TOOL / EQUIPMENT</option>
                  <option value="PACKAGING">PACKAGING SACKS / BOXES</option>
                  <option value="OTHER">OTHER INPUT</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Initial Quantity *
                </label>
                <input
                  type="number"
                  value={quantityInKg}
                  onChange={(e) => setQuantityInKg(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-bold text-blue-700"
                  required
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
                  placeholder="e.g. kg, sacks, packs"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quality Grade
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g. Class A"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Storage Location
                </label>
                <input
                  type="text"
                  value={storageLocation}
                  onChange={(e) => setStorageLocation(e.target.value)}
                  placeholder="e.g. La Trinidad Barn #1"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Farm (Optional)
                </label>
                <select
                  value={farmId}
                  onChange={(e) => setFarmId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                >
                  <option value="">-- Select Farm --</option>
                  {farms.map((f) => (
                    <option key={f.localId} value={f.localId}>{f.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Stock Item (Offline First)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
