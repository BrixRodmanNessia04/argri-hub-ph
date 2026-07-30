"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, InventoryItemEntity } from "@/lib/db";
import { queueSyncOperation } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Package, Save, CheckCircle2 } from "lucide-react";

export default function EditInventoryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const itemId = resolvedParams.id;
  const router = useRouter();

  const item = useLiveQuery(() => db.inventoryItems.get(itemId), [itemId]);

  const [crop, setCrop] = useState("");
  const [type, setType] = useState<InventoryItemEntity["type"]>("SEED");
  const [quantityInKg, setQuantityInKg] = useState("0");
  const [unit, setUnit] = useState("kg");
  const [storageLocation, setStorageLocation] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setCrop(item.crop);
      setType(item.type);
      setQuantityInKg(String(item.quantityInKg));
      setUnit(item.unit || "kg");
      setStorageLocation(item.storageLocation || "");
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantityInKg) || 0;
    if (!crop.trim() || qty <= 0) return;

    await db.inventoryItems.update(itemId, {
      crop: crop.trim(),
      type,
      quantityInKg: qty,
      unit,
      storageLocation: storageLocation.trim() || undefined,
      updatedAt: new Date().toISOString(),
    });
    await queueSyncOperation("inventory_items", itemId, "UPDATE", { crop, type, quantityInKg: qty });

    setFeedback("Inventory item updated! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push(`/farmer/inventory/${itemId}`);
    }, 1200);
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading inventory item...</p>
          <Link href="/farmer/inventory" className="text-xs font-bold text-emerald-700 underline">
            Return to Inventory list
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
          href={`/farmer/inventory/${itemId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel &amp; Back to Item Detail
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Package className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Edit Inventory Item
              </h1>
              <p className="text-xs text-slate-500">
                Update item name, storage location, or stock level.
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
                Item Name / Crop *
              </label>
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quantity *
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
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Storage Location
                </label>
                <input
                  type="text"
                  value={storageLocation}
                  onChange={(e) => setStorageLocation(e.target.value)}
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
                <span>Save Changes (Offline Ready)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
