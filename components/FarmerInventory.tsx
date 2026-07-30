"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Warehouse, ChevronRight, Plus, ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react";

export default function FarmerInventory() {
  const items = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted).toArray(), []) || [];
  const transactions = useLiveQuery(() => db.inventoryTransactions.filter((t) => !t.isDeleted).toArray(), []) || [];

  return (
    <div className="space-y-4">
      {/* Requirement 10: Section heading links to /farmer/warehouse */}
      <div className="flex items-center justify-between">
        <Link href="/farmer/warehouse" className="group flex items-center gap-2">
          <Warehouse className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" />
          <h2 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            Warehouse Inventory &amp; Harvested Stock
          </h2>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
        </Link>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-gray-300">
          {items.length} SKUs
        </span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-6 text-center text-xs text-slate-500 space-y-3">
          <Warehouse className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="font-semibold">No warehouse inventory items recorded yet.</p>
          <Link
            href="/farmer/warehouse/items/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Inventory Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.slice(0, 4).map((stock) => {
            const itemTx = transactions.filter((t) => t.inventoryItemId === stock.localId);
            const lastTx = itemTx[itemTx.length - 1];
            const isLowStock = stock.quantityInKg <= (stock.minStockLevel || 10);

            return (
              <Link
                key={stock.localId}
                href={`/farmer/warehouse/items/${stock.localId}`}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-emerald-500 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      {stock.type}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {stock.updatedAt.split("T")[0]}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mt-2">
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {stock.crop}
                    </h3>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-slate-900">
                        {stock.quantityInKg}
                      </span>
                      <span className="text-xs font-bold text-slate-500 ml-1">
                        {stock.unit || "kg"}
                      </span>
                    </div>
                  </div>

                  {isLowStock && (
                    <div className="mt-2 p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Low Stock Alert</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {lastTx?.changeType === "ADD" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold">
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
                        <span>+{lastTx.quantityKg} kg</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold">
                        <ArrowDownRight className="w-3.5 h-3.5 text-slate-500" />
                        <span>{lastTx ? `-${lastTx.quantityKg} kg` : "Local stock"}</span>
                      </span>
                    )}

                    <span className="text-slate-500 font-medium truncate max-w-[150px]">
                      {lastTx ? lastTx.reason : "Initial stock"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
