"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, InventoryItemEntity, createBaseEntity } from "@/lib/db";
import { queueSyncOperation } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Package, Save, CheckCircle2 } from "lucide-react";

export default function NewWarehouseItemPage() {
  const router = useRouter();
  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];

  const [crop, setCrop] = useState("Highland Cabbage Seeds");
  const [type, setType] = useState<InventoryItemEntity["type"]>("SEED");
  const [quantityInKg, setQuantityInKg] = useState("50");
  const [unit, setUnit] = useState("kg");
  const [grade, setGrade] = useState("Class A");
  const [storageLocation, setStorageLocation] = useState("La Trinidad Barn #1");
  const [minStockLevel, setMinStockLevel] = useState("10");
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
      minStockLevel: parseFloat(minStockLevel) || 10,
      storageLocation: storageLocation.trim() || undefined,
    };

    await db.inventoryItems.add(newItem);
    await queueSyncOperation("inventory_items", newItem.localId, "CREATE", newItem as unknown as Record<string, unknown>);

    setFeedback(`Inventory item created: ${qty} ${unit} ${crop}!`);
    setTimeout(() => {
      router.push("/farmer/warehouse");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/warehouse"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Warehouse
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Package className="w-6 h-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Register Warehouse Inventory Item
              </h1>
              <p className="text-xs text-slate-500">
                Add seed reserve, fertilizer stock, or harvested produce into storage.
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
                  Item / Crop Name *
                </label>
                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
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
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                >
                  <option value="HARVESTED">Harvested Produce (Ani)</option>
                  <option value="SEED">Seed Stock (Binhi)</option>
                  <option value="SEEDLING">Seedling Stock (Punla)</option>
                  <option value="FERTILIZER">Fertilizer (Abono)</option>
                  <option value="COMPOST">Compost</option>
                  <option value="PESTICIDE">Pesticide (Pambomba)</option>
                  <option value="HERBICIDE">Herbicide</option>
                  <option value="PACKAGING">Packaging / Sacks</option>
                  <option value="FUEL">Fuel / Diesel</option>
                  <option value="TOOL">Tools &amp; Equipment</option>
                  <option value="SPARE_PART">Spare Parts</option>
                  <option value="OTHER">Other Input</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quantity *</label>
                <input
                  type="number"
                  value={quantityInKg}
                  onChange={(e) => setQuantityInKg(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-bold text-emerald-700"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Unit</label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Min Stock Level</label>
                <input
                  type="number"
                  value={minStockLevel}
                  onChange={(e) => setMinStockLevel(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Storage Location</label>
                <input
                  type="text"
                  value={storageLocation}
                  onChange={(e) => setStorageLocation(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Farm (Optional)</label>
                <select
                  value={farmId}
                  onChange={(e) => setFarmId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
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
                <span>Save Item to Warehouse (Offline First)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
