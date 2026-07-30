"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, InventoryTransactionEntity, createBaseEntity } from "@/lib/db";
import { queueSyncOperation } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, RefreshCw, Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function WarehouseAdjustmentPage() {
  const router = useRouter();
  const items = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted).toArray(), []) || [];

  const [inventoryItemId, setInventoryItemId] = useState("");
  const [changeType, setChangeType] = useState<InventoryTransactionEntity["changeType"]>("USE");
  const [quantityKg, setQuantityKg] = useState("10");
  const [reason, setReason] = useState("Used stock for farm operations");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const selectedItem = items.find((i) => i.localId === inventoryItemId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const qty = parseFloat(quantityKg) || 0;
    if (!inventoryItemId || qty <= 0 || !reason.trim()) return;

    // Requirement 8: Do not allow negative inventory unless Manual correction is selected and confirmed
    if (selectedItem && changeType !== "ADD" && changeType !== "CORRECTION") {
      if (selectedItem.quantityInKg - qty < 0) {
        setErrorMsg(`Cannot reduce stock below 0 (Available: ${selectedItem.quantityInKg} ${selectedItem.unit || "kg"}). To adjust negative stock, select "CORRECTION" and confirm.`);
        return;
      }
    } else if (selectedItem && changeType === "CORRECTION") {
      if (selectedItem.quantityInKg - qty < 0) {
        if (!confirm(`Confirm manual correction allowing negative balance (${selectedItem.quantityInKg - qty} ${selectedItem.unit || "kg"})?`)) {
          return;
        }
      }
    }

    const tx: InventoryTransactionEntity = {
      ...createBaseEntity(),
      inventoryItemId,
      changeType,
      quantityKg: qty,
      reason: reason.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    await db.inventoryTransactions.add(tx);
    await queueSyncOperation("inventory_transactions", tx.localId, "CREATE", tx as unknown as Record<string, unknown>);

    if (selectedItem) {
      const isAdd = changeType === "ADD" || changeType === "CORRECTION";
      const newQty = isAdd
        ? selectedItem.quantityInKg + qty
        : selectedItem.quantityInKg - qty;

      await db.inventoryItems.update(inventoryItemId, {
        quantityInKg: newQty > 0 ? newQty : 0,
        updatedAt: new Date().toISOString(),
      });
    }

    setFeedback(`Inventory stock movement recorded! Updated stock.`);
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
            <RefreshCw className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Record Stock Movement &amp; Adjustment
              </h1>
              <p className="text-xs text-slate-500">
                Stock in, stock out, use, transfer, damage, loss, or manual correction.
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
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Warehouse Stock Item *
              </label>
              <select
                value={inventoryItemId}
                onChange={(e) => setInventoryItemId(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              >
                <option value="">-- Select Inventory Stock Item --</option>
                {items.map((i) => (
                  <option key={i.localId} value={i.localId}>
                    {i.crop} (Available: {i.quantityInKg} {i.unit || "kg"})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Movement / Action *
                </label>
                <select
                  value={changeType}
                  onChange={(e) => setChangeType(e.target.value as InventoryTransactionEntity["changeType"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                >
                  <option value="USE">USE (Ginamit sa bukid)</option>
                  <option value="ADD">ADD (Stock In / Dagdag)</option>
                  <option value="TRANSFER">TRANSFER (Inilipat ng bodega)</option>
                  <option value="DAMAGE">DAMAGE (Nasira)</option>
                  <option value="EXPIRY">EXPIRY (Expired / Napasukan ng pest)</option>
                  <option value="LOSS">LOSS (Nawala)</option>
                  <option value="CORRECTION">MANUAL CORRECTION</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quantity ({selectedItem?.unit || "kg"}) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-bold text-blue-700 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reason / Activity Reference *
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Harvested lot addition or field application usage"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Stock Movement (Offline First)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
