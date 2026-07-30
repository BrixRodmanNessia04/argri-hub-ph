"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Warehouse, Edit, RefreshCw, Coins, Calendar, Tag } from "lucide-react";

export default function WarehouseItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const itemId = resolvedParams.id;

  const item = useLiveQuery(() => db.inventoryItems.get(itemId), [itemId]);
  const transactions = useLiveQuery(
    () => db.inventoryTransactions.where("inventoryItemId").equals(itemId).filter((t) => !t.isDeleted).toArray(),
    [itemId]
  ) || [];

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20 font-sans">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading warehouse item details...</p>
          <Link href="/farmer/warehouse" className="text-xs font-bold text-emerald-700 underline">
            Return to Warehouse
          </Link>
        </main>
      </div>
    );
  }

  const unitCost = item.unitCost || 40;
  const totalStockValue = item.quantityInKg * unitCost;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28 font-sans">
      <FarmerSubNav />

      <main className="max-w-3xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/warehouse"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Warehouse
        </Link>

        {/* Item Overview Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                <Warehouse className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                  {item.type}
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  {item.crop}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Storage Location: {item.storageLocation || "La Trinidad Central Warehouse"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/farmer/warehouse/adjustment"
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <RefreshCw className="w-4 h-4" /> Adjust / Log Usage
              </Link>
              <Link
                href={`/farmer/inventory/${item.localId}/edit`}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                <Edit className="w-4 h-4" /> Edit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-slate-500 font-bold">Available Quantity</span>
              <p className="font-extrabold text-emerald-700 text-lg mt-0.5">
                {item.quantityInKg} {item.unit || "kg"}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
              <span className="text-slate-500 font-bold">Est. Unit Cost / Val</span>
              <p className="font-extrabold text-slate-900 text-base mt-0.5">₱{unitCost.toFixed(2)} / {item.unit || "kg"}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
              <span className="text-slate-500 font-bold">Total Stock Value</span>
              <p className="font-extrabold text-slate-900 text-base mt-0.5">₱{totalStockValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-slate-800">
            Immutable Inventory Movement History ({transactions.length})
          </h2>

          {transactions.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-6 text-center text-xs text-slate-500 font-medium">
              No stock movements recorded yet for this item.
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => {
                const isDeduction = [
                  "usage",
                  "sale_out",
                  "transfer_out",
                  "damage",
                  "loss",
                  "expired",
                  "return_out",
                  "correction_decrease",
                  "USE",
                ].includes(tx.transactionType || tx.changeType || "");

                const txCost = tx.totalCost || (tx.quantityKg || tx.quantity || 0) * (tx.unitCost || unitCost);

                return (
                  <div
                    key={tx.localId}
                    className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:border-emerald-400 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                            isDeduction
                              ? "bg-rose-100 text-rose-800 border border-rose-200"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {tx.transactionType || tx.changeType}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{tx.transactionDate || tx.date}</span>
                      </div>
                      <p className="font-extrabold text-xs text-slate-900 mt-1">{tx.reason}</p>
                      {tx.notes && <p className="text-[11px] text-slate-500 mt-0.5">{tx.notes}</p>}
                    </div>

                    <div className="text-right">
                      <span className={`font-extrabold text-sm ${isDeduction ? "text-rose-600" : "text-emerald-700"}`}>
                        {isDeduction ? "-" : "+"}{tx.quantityKg || tx.quantity} {tx.unit || "kg"}
                      </span>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        ₱{txCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
