"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, SaleEntity, InventoryTransactionEntity, createBaseEntity } from "@/lib/db";
import { createSale, queueSyncOperation } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, DollarSign, Save, CheckCircle2, Warehouse } from "lucide-react";

export default function NewSalePage() {
  const router = useRouter();
  const inventoryItems = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted).toArray(), []) || [];
  const harvests = useLiveQuery(() => db.harvests.filter((h) => !h.isDeleted).toArray(), []) || [];

  const [buyerName, setBuyerName] = useState("La Trinidad Trading Post Trader");
  const [buyerType, setBuyerType] = useState<SaleEntity["buyerType"]>("TRADER");
  const [crop, setCrop] = useState("Benguet Cabbage");
  const [variety, setVariety] = useState("Scorpio F1");
  const [weightKg, setWeightKg] = useState("100");
  const [pricePerKg, setPricePerKg] = useState("45");
  const [discounts, setDiscounts] = useState("0");
  const [transportationCost, setTransportationCost] = useState("150");
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [paymentStatus, setPaymentStatus] = useState<SaleEntity["paymentStatus"]>("PAID");
  const [paymentMethod, setPaymentMethod] = useState("GCash");
  const [soldAt, setSoldAt] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  // Requirement 9: Associate inventory item / stock reduction
  const [selectedInventoryItemId, setSelectedInventoryItemId] = useState("");
  const [reduceStock, setReduceStock] = useState(true);

  const [feedback, setFeedback] = useState<string | null>(null);

  const qty = parseFloat(weightKg) || 0;
  const price = parseFloat(pricePerKg) || 0;
  const gross = qty * price;
  const net = gross - (parseFloat(discounts) || 0) - (parseFloat(transportationCost) || 0) - (parseFloat(otherDeductions) || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !crop.trim() || qty <= 0) return;

    // Requirement 9: Stock reduction confirmation check
    if (reduceStock && selectedInventoryItemId) {
      const invItem = inventoryItems.find((i) => i.localId === selectedInventoryItemId);
      if (invItem && invItem.quantityInKg < qty) {
        if (!confirm(`Warning: Sold quantity (${qty} kg) exceeds current available warehouse stock (${invItem.quantityInKg} kg). Confirm manual inventory reduction?`)) {
          return;
        }
      }
    }

    const sale = await createSale({
      buyerName: buyerName.trim(),
      buyerType,
      crop: crop.trim(),
      variety: variety.trim() || undefined,
      weightKg: qty,
      pricePerKg: price,
      grossAmount: gross,
      discounts: parseFloat(discounts) || 0,
      transportationCost: parseFloat(transportationCost) || 0,
      otherDeductions: parseFloat(otherDeductions) || 0,
      totalAmount: net > 0 ? net : gross,
      paymentStatus,
      paymentMethod,
      soldAt,
      notes: notes.trim() || undefined,
    });

    // Requirement 9: Record inventory stock-out transaction
    if (reduceStock && selectedInventoryItemId) {
      const invItem = inventoryItems.find((i) => i.localId === selectedInventoryItemId);
      if (invItem) {
        const newStock = Math.max(0, invItem.quantityInKg - qty);
        await db.inventoryItems.update(selectedInventoryItemId, {
          quantityInKg: newStock,
          updatedAt: new Date().toISOString(),
        });

        const tx: InventoryTransactionEntity = {
          ...createBaseEntity(),
          inventoryItemId: selectedInventoryItemId,
          changeType: "USE",
          quantityKg: qty,
          reason: `Sold to ${buyerName} (${soldAt})`,
          date: soldAt,
          idempotencyKey: `sale_${sale.localId}`,
        };
        await db.inventoryTransactions.add(tx);
        await queueSyncOperation("inventory_transactions", tx.localId, "CREATE", tx as unknown as Record<string, unknown>);
      }
    }

    setFeedback(`Sale recorded: +₱${net.toLocaleString(undefined, { minimumFractionDigits: 2 })}!`);
    setTimeout(() => {
      router.push("/farmer/sales");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/sales"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sales
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <DollarSign className="w-6 h-6 text-amber-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Record Direct Crop Sale
              </h1>
              <p className="text-xs text-slate-500">
                Log crop sales to traders, cooperatives, or public market buyers.
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
                  Buyer Name (Pangalan ng Bumili) *
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Buyer Type *
                </label>
                <select
                  value={buyerType}
                  onChange={(e) => setBuyerType(e.target.value as SaleEntity["buyerType"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                >
                  <option value="COOPERATIVE">Cooperative (Kooperatiba)</option>
                  <option value="TRADER">Trader / Viajero</option>
                  <option value="PUBLIC_MARKET">Public Market Vendor</option>
                  <option value="RESTAURANT">Restaurant / Hotel</option>
                  <option value="RETAILER">Retailer</option>
                  <option value="WHOLESALER">Wholesaler</option>
                  <option value="DIRECT_CONSUMER">Direct Consumer</option>
                  <option value="OTHER">Other Buyer</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Crop Sold *
                </label>
                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Variety
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                />
              </div>
            </div>

            {/* Requirement 9: Associate inventory item / stock reduction option */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
              <label className="flex items-center gap-2 text-xs font-extrabold text-amber-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reduceStock}
                  onChange={(e) => setReduceStock(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <Warehouse className="w-4 h-4 text-amber-700" />
                <span>Reduce stock from Farm Inventory &amp; Storage</span>
              </label>

              {reduceStock && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Select Associated Warehouse Stock Item
                  </label>
                  <select
                    value={selectedInventoryItemId}
                    onChange={(e) => setSelectedInventoryItemId(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold"
                  >
                    <option value="">-- Select Inventory Stock Item --</option>
                    {inventoryItems.map((item) => (
                      <option key={item.localId} value={item.localId}>
                        {item.crop} (Available: {item.quantityInKg} {item.unit || "kg"})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quantity (Kg) *
                </label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Price per Kg (₱) *
                </label>
                <input
                  type="number"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Gross Amount
                </label>
                <input
                  type="text"
                  disabled
                  value={`₱${gross.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                  className="w-full p-2.5 rounded-xl bg-slate-100 border border-gray-200 text-xs font-extrabold text-slate-900"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-3">
              <span className="text-xs font-bold text-slate-800">Freight &amp; Deductions (₱)</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Transport Freight</label>
                  <input
                    type="number"
                    value={transportationCost}
                    onChange={(e) => setTransportationCost(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white border border-gray-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Discounts</label>
                  <input
                    type="number"
                    value={discounts}
                    onChange={(e) => setDiscounts(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white border border-gray-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Net Revenue</label>
                  <input
                    type="text"
                    disabled
                    value={`₱${net.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                    className="w-full p-2 rounded-lg bg-emerald-100 border border-emerald-300 text-xs font-extrabold text-emerald-800"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as SaleEntity["paymentStatus"])}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                >
                  <option value="PAID">PAID (Bayad Na)</option>
                  <option value="UNPAID">UNPAID (Utang)</option>
                  <option value="PARTIALLY_PAID">PARTIALLY PAID</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                <input
                  type="text"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  placeholder="e.g. Cash, GCash, Bank"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sale Date</label>
                <input
                  type="date"
                  value={soldAt}
                  onChange={(e) => setSoldAt(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Sale Record (+₱{net.toLocaleString(undefined, { minimumFractionDigits: 2 })})</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
