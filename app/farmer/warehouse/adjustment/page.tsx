"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, InventoryTransactionType } from "@/lib/db";
import { recordInventoryMovement } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, RefreshCw, Save, CheckCircle2, AlertCircle, ChevronDown, Coins } from "lucide-react";

export default function WarehouseAdjustmentPage() {
  const router = useRouter();

  const items = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted).toArray(), []) || [];
  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];
  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];
  const cycles = useLiveQuery(() => db.cropCycles.filter((c) => !c.isDeleted).toArray(), []) || [];

  const [inventoryItemId, setInventoryItemId] = useState("");
  const [transactionType, setTransactionType] = useState<InventoryTransactionType>("usage");
  const [quantityKg, setQuantityKg] = useState("5");
  const [unitCost, setUnitCost] = useState("");
  const [farmId, setFarmId] = useState("");
  const [plotId, setPlotId] = useState("");
  const [cropCycleId, setCropCycleId] = useState("");
  const [reason, setReason] = useState("Field application input usage");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const selectedItem = items.find((i) => i.localId === inventoryItemId);
  const activeUnitCost = unitCost ? parseFloat(unitCost) : selectedItem?.unitCost || 40;
  const qty = parseFloat(quantityKg) || 0;
  const calculatedTotalCost = qty * activeUnitCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!inventoryItemId || qty <= 0 || !reason.trim()) return;

    try {
      const { transaction, expense } = await recordInventoryMovement({
        inventoryItemId,
        transactionType,
        quantityKg: qty,
        unit: selectedItem?.unit || "kg",
        farmId: farmId || selectedItem?.farmId,
        plotId: plotId || undefined,
        cropCycleId: cropCycleId || undefined,
        reason: reason.trim(),
        unitCost: activeUnitCost,
        allowNegativeStock: transactionType === "correction_decrease",
      });

      if (expense) {
        setFeedback(`Stock usage recorded! Stock deducted by ${qty} ${selectedItem?.unit || "kg"}. Generated expense of ₱${expense.amount.toLocaleString()} linked to crop performance & ledger.`);
      } else {
        setFeedback(`Inventory transaction (${transactionType}) recorded successfully! Stock updated.`);
      }

      setTimeout(() => {
        router.push("/farmer/warehouse");
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to record stock movement");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20 font-sans">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/warehouse"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Warehouse
        </Link>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <RefreshCw className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Record Stock Movement &amp; Input Costing
              </h1>
              <p className="text-xs text-slate-500">
                Log stock usage, purchases, stock-in, damage, or correction. Stock usage automatically updates crop costs &amp; ledger.
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
                Select Warehouse Stock Item *
              </label>
              <select
                value={inventoryItemId}
                onChange={(e) => {
                  const id = e.target.value;
                  setInventoryItemId(id);
                  const found = items.find((i) => i.localId === id);
                  if (found?.unitCost) setUnitCost(String(found.unitCost));
                  if (found?.farmId) setFarmId(found.farmId);
                }}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              >
                <option value="">-- Select Stock Item (Fertilizer, Seeds, Pesticides, etc.) --</option>
                {items.map((i) => (
                  <option key={i.localId} value={i.localId}>
                    {i.crop} ({i.type}) — Available: {i.quantityInKg} {i.unit || "kg"}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Transaction Type (Movement) *
                </label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value as InventoryTransactionType)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                >
                  <option value="usage">USAGE (Ginamit sa Bukid - Auto-Costed)</option>
                  <option value="purchase">PURCHASE (Bumili ng bagong stock)</option>
                  <option value="stock_in">STOCK IN (Dagdag bodega)</option>
                  <option value="harvest_in">HARVEST IN (Mula sa ani)</option>
                  <option value="sale_out">SALE OUT (Benta mula sa bodega)</option>
                  <option value="transfer_out">TRANSFER OUT (Inilipat)</option>
                  <option value="damage">DAMAGE (Nasira)</option>
                  <option value="loss">LOSS (Nawala)</option>
                  <option value="expired">EXPIRED (Expired)</option>
                  <option value="correction_increase">CORRECTION (Dagdag adjustment)</option>
                  <option value="correction_decrease">CORRECTION (Bawas adjustment)</option>
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

            {/* Calculated Cost Preview */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <Coins className="w-4 h-4 text-emerald-600" />
                <span>Calculated Input Usage Cost:</span>
              </div>
              <span className="text-base font-extrabold text-emerald-700">
                ₱{calculatedTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Linkage to Farm, Plot, and Crop Cycle */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Cost Linkage (Farm, Plot, Crop Cycle)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Farm
                  </label>
                  <select
                    value={farmId}
                    onChange={(e) => setFarmId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                  >
                    <option value="">-- Select Farm --</option>
                    {farms.map((f) => (
                      <option key={f.localId} value={f.localId}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Plot
                  </label>
                  <select
                    value={plotId}
                    onChange={(e) => setPlotId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                  >
                    <option value="">-- Select Active Crop --</option>
                    {cycles.map((c) => (
                      <option key={c.localId} value={c.localId}>{c.crop}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reason / Field Activity Reference *
              </label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Applied fertilizer during vegetative growth stage"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Movement &amp; Deduct Stock</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
