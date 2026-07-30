"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Warehouse, Plus, RefreshCw, AlertTriangle, Search, Eye } from "lucide-react";

export default function FarmWarehousePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const items = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted).toArray(), []) || [];
  const transactions = useLiveQuery(() => db.inventoryTransactions.filter((t) => !t.isDeleted).toArray(), []) || [];

  const categories = [
    { key: "ALL", label: "All Items" },
    { key: "HARVESTED", label: "Harvested Produce" },
    { key: "SEED", label: "Seeds" },
    { key: "SEEDLING", label: "Seedlings" },
    { key: "FERTILIZER", label: "Fertilizer" },
    { key: "COMPOST", label: "Compost" },
    { key: "PESTICIDE", label: "Pesticides" },
    { key: "HERBICIDE", label: "Herbicides" },
    { key: "PACKAGING", label: "Packaging" },
    { key: "FUEL", label: "Fuel" },
    { key: "TOOL", label: "Tools & Equipment" },
    { key: "SPARE_PART", label: "Spare Parts" },
    { key: "OTHER", label: "Other Inputs" },
  ];

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === "ALL" || item.type === selectedCategory;
    const matchesSearch = !searchQuery.trim() || item.crop.toLowerCase().includes(searchQuery.toLowerCase()) || (item.storageLocation || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const harvestedCount = items.filter((i) => i.type === "HARVESTED").reduce((sum, i) => sum + i.quantityInKg, 0);
  const lowStockCount = items.filter((i) => i.quantityInKg <= (i.minStockLevel || 10)).length;
  const pendingSyncCount = items.filter((i) => i.syncStatus !== "synced").length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28">
      <FarmerSubNav />

      <main className="max-w-6xl mx-auto p-4 space-y-6 mt-2">
        {/* Page Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <Warehouse className="w-6 h-6 text-emerald-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                Farm Inventory &amp; Storage
              </h1>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Local farm storage room, seed reserves, harvested produce stock, and fertilizer inputs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/farmer/warehouse/adjustment"
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className="w-4 h-4" /> Adjust Stock
            </Link>

            <Link
              href="/farmer/warehouse/items/new"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Item
            </Link>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
            <span className="text-slate-500 font-bold">Total SKUs</span>
            <p className="text-xl font-extrabold text-slate-900">{items.length}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
            <span className="text-slate-500 font-bold">Harvested Produce</span>
            <p className="text-xl font-extrabold text-emerald-700">{harvestedCount.toLocaleString()} kg</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
            <span className="text-slate-500 font-bold">Low-Stock Warnings</span>
            <p className={`text-xl font-extrabold ${lowStockCount > 0 ? "text-amber-600" : "text-slate-700"}`}>
              {lowStockCount} items
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
            <span className="text-slate-500 font-bold">Pending Sync</span>
            <p className="text-xl font-extrabold text-blue-600">{pendingSyncCount} items</p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search item name or storage location..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Items List */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Storage Room Items ({filteredItems.length})
          </h2>

          {filteredItems.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500 space-y-3">
              <Warehouse className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold">No inventory items found for this filter.</p>
              <Link
                href="/farmer/warehouse/items/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" /> Add New Stock Item
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const isLowStock = item.quantityInKg <= (item.minStockLevel || 10);
                const itemTx = transactions.filter((t) => t.inventoryItemId === item.localId);
                const lastTx = itemTx[itemTx.length - 1];

                return (
                  <div
                    key={item.localId}
                    className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between hover:border-emerald-500 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                          {item.type}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono uppercase">
                          {item.syncStatus || "LOCAL"}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between mt-2">
                        <div>
                          <h3 className="font-extrabold text-base text-slate-900">
                            {item.crop}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Location: {item.storageLocation || "La Trinidad Storage"}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-extrabold text-slate-900">
                            {item.quantityInKg}
                          </span>
                          <span className="text-xs font-bold text-slate-500 ml-1">
                            {item.unit || "kg"}
                          </span>
                        </div>
                      </div>

                      {isLowStock && (
                        <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Low Stock Warning (Min: {item.minStockLevel || 10} {item.unit || "kg"})</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div className="text-slate-500 font-medium truncate max-w-[200px]">
                        {lastTx ? `${lastTx.changeType}: ${lastTx.reason}` : "Initial local record"}
                      </div>

                      <Link
                        href={`/farmer/warehouse/items/${item.localId}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 shrink-0"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </Link>
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
