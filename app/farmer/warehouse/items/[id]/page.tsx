"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Warehouse, Edit, RefreshCw } from "lucide-react";

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
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
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

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-3xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/warehouse"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Warehouse
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                <Warehouse className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {item.type}
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  {item.crop}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Storage Location: {item.storageLocation || "La Trinidad Barn"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/farmer/warehouse/adjustment"
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                <RefreshCw className="w-4 h-4" /> Adjust Stock
              </Link>
              <Link
                href={`/farmer/inventory/${item.localId}/edit`}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
              >
                <Edit className="w-4 h-4" /> Edit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Available Quantity:</span>
              <p className="font-extrabold text-emerald-700 text-base mt-0.5">
                {item.quantityInKg} {item.unit || "kg"}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Min Warning Level:</span>
              <p className="font-bold text-slate-900 mt-0.5">{item.minStockLevel || 10} {item.unit || "kg"}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Sync Status:</span>
              <p className="font-bold text-slate-900 mt-0.5">{item.syncStatus || "LOCAL"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Stock Movements &amp; Adjustment History ({transactions.length})
          </h2>

          {transactions.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-6 text-center text-xs text-slate-500">
              No stock movements recorded yet.
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx.localId}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                        {tx.changeType}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{tx.date}</span>
                    </div>
                    <p className="font-bold text-xs text-slate-900 mt-1">{tx.reason}</p>
                  </div>
                  <span className="font-extrabold text-sm text-emerald-700">
                    {tx.changeType === "ADD" ? "+" : "-"}{tx.quantityKg} kg
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
