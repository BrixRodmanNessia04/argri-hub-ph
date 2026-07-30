"use client";

import React, { useState } from "react";
import CoopLayout from "@/components/CoopLayout";
import { Warehouse, Plus, Search, RefreshCw, Store, AlertTriangle, Eye, X } from "lucide-react";

export default function CoopInventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    product: string;
    grade: string;
    availableKg: number;
    reservedKg: number;
    location: string;
    lotId: string;
    freshnessDays: number;
    status: string;
  } | null>(null);

  const [feedback, setFeedback] = useState<string | null>(null);

  const stockItems = [
    { id: "inv-1", product: "Benguet Highland Cabbage", grade: "Class A", availableKg: 650, reservedKg: 100, location: "La Trinidad Cold Storage", lotId: "LOT-2026-08A", freshnessDays: 7, status: "GOOD" },
    { id: "inv-2", product: "Atok Sweet Carrots", grade: "Class A", availableKg: 400, reservedKg: 50, location: "La Trinidad Cold Storage", lotId: "LOT-2026-08B", freshnessDays: 12, status: "GOOD" },
    { id: "inv-3", product: "Baguio Vine Tomatoes", grade: "Class B", availableKg: 200, reservedKg: 0, location: "Pico Hub Room #2", lotId: "LOT-2026-07C", freshnessDays: 3, status: "NEAR_EXPIRY" },
  ];

  const filteredItems = stockItems.filter((i) =>
    i.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (actionName: string) => {
    if (!selectedItem) return;
    setFeedback(`Action '${actionName}' applied for ${selectedItem.product} (${selectedItem.lotId}).`);
    setSelectedItem(null);
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            COOPERATIVE BULK STORAGE ROOM
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            Warehouse Inventory &amp; Reserved Produce
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Monitor cold-storage bulk stock, reserved buyer lots, and freshness thresholds.
          </p>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center justify-between shadow-lg">
            <span>{feedback}</span>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search warehouse inventory by produce name or location..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Inventory Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isWarning = item.status === "NEAR_EXPIRY";
            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-teal-300 text-[10px] font-extrabold border border-slate-800">
                      {item.grade} • {item.lotId}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isWarning
                          ? "bg-amber-950 text-amber-400 border border-amber-800"
                          : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      }`}
                    >
                      {isWarning ? `Freshness: ${item.freshnessDays} days left` : "FRESH"}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h3 className="font-extrabold text-base text-white">{item.product}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Location: {item.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-800/60 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold text-[11px]">Available Bulk</span>
                      <p className="text-base font-extrabold text-emerald-400">{item.availableKg} kg</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold text-[11px]">Reserved Orders</span>
                      <p className="text-base font-extrabold text-amber-400">{item.reservedKg} kg</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-end">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-400" /> Actions
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTION SHEET MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl animate-in fade-in text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-white">{selectedItem.product}</h3>
                <p className="text-slate-400 text-[11px]">Lot: {selectedItem.lotId}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 font-bold">
              <button
                onClick={() => handleAction("Adjust Stock")}
                className="w-full p-3 rounded-2xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 flex items-center justify-between"
              >
                <span>Adjust Stock Quantity</span>
                <RefreshCw className="w-4 h-4 text-teal-400" />
              </button>
              <button
                onClick={() => handleAction("Transfer Storage Location")}
                className="w-full p-3 rounded-2xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 flex items-center justify-between"
              >
                <span>Transfer Storage Location</span>
                <Warehouse className="w-4 h-4 text-blue-400" />
              </button>
              <button
                onClick={() => handleAction("Create Marketplace Listing")}
                className="w-full p-3 rounded-2xl bg-teal-950/60 hover:bg-teal-950 border border-teal-800 text-teal-300 flex items-center justify-between"
              >
                <span>Create Marketplace Listing</span>
                <Store className="w-4 h-4 text-teal-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </CoopLayout>
  );
}
