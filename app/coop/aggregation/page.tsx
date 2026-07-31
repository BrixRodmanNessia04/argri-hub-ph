"use client";

import React, { useState } from "react";
import CoopLayout from "@/components/CoopLayout";
import { Layers, CheckCircle2, AlertCircle, Plus, Check, Store } from "lucide-react";

export default function CoopAggregationPage() {
  const [selectedCommodity, setSelectedCommodity] = useState<string>("Highland Cabbage");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [lotTitle, setLotTitle] = useState("Bulk Highland Cabbage Lot #2026-08");
  const [proposedPricePerKg, setProposedPricePerKg] = useState("42");
  const [feedback, setFeedback] = useState<string | null>(null);

  const availableHarvests = [
    { id: "h-201", farmerName: "Jose Reyes", farmName: "Valley Hill Farm", commodity: "Highland Cabbage", grade: "Class A", weightKg: 250, date: "Today" },
    { id: "h-202", farmerName: "Maria Santos", farmName: "Mountain Crest Farm", commodity: "Highland Cabbage", grade: "Class A", weightKg: 300, date: "Today" },
    { id: "h-203", farmerName: "Ricardo Cruz", farmName: "Tublay Plateau", commodity: "Highland Cabbage", grade: "Class A", weightKg: 180, date: "Yesterday" },
    { id: "h-204", farmerName: "Elena Gomez", farmName: "Atok Heights", commodity: "Highland Cabbage", grade: "Class B", weightKg: 200, date: "Yesterday" },
    { id: "h-205", farmerName: "Pedro Penduko", farmName: "La Trinidad Garden", commodity: "Sweet Carrots", grade: "Class A", weightKg: 400, date: "Today" },
  ];

  const filteredHarvests = availableHarvests.filter((h) => h.commodity === selectedCommodity);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedItems = availableHarvests.filter((h) => selectedIds.includes(h.id));
  const totalSelectedQty = selectedItems.reduce((sum, i) => sum + i.weightKg, 0);
  const uniqueFarmersCount = new Set(selectedItems.map((i) => i.farmerName)).size;

  const handleCreateLot = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;

    setFeedback(`Created bulk wholesale lot '${lotTitle}' (${totalSelectedQty} kg) from ${uniqueFarmersCount} member farmers! Ready for marketplace publishing.`);
    setSelectedIds([]);
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            WHOLESALE LOT CONSOLIDATION ENGINE
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1">
            Produce Aggregation &amp; Marketplace Publishing
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Select approved member harvest lots to pool into bulk marketplace listings.
          </p>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Commodity Selector */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
          <label className="block text-xs font-extrabold text-white uppercase tracking-wider">
            Select Commodity to Aggregate
          </label>
          <div className="flex flex-wrap gap-2 text-xs">
            {["Highland Cabbage", "Sweet Carrots"].map((comm) => (
              <button
                key={comm}
                onClick={() => {
                  setSelectedCommodity(comm);
                  setSelectedIds([]);
                }}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  selectedCommodity === comm
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {comm}
              </button>
            ))}
          </div>
        </div>

        {/* Selectable Harvest Cards */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-white">
            Available Approved Harvests ({filteredHarvests.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredHarvests.map((h) => {
              const isSelected = selectedIds.includes(h.id);
              return (
                <div
                  key={h.id}
                  onClick={() => toggleSelect(h.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? "bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/30"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-teal-300 text-[10px] font-bold border border-slate-800">
                      {h.grade}
                    </span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      isSelected ? "bg-teal-500 border-teal-500 text-slate-950" : "border-slate-700"
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-white">{h.farmerName}</h3>
                    <p className="text-xs text-slate-400">{h.farmName}</p>
                    <p className="text-sm font-extrabold text-emerald-400 mt-1">{h.weightKg} kg</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky Mobile Summary Bar & Lot Creator */}
        {selectedIds.length > 0 && (
          <div className="sticky bottom-16 lg:bottom-4 bg-slate-900 border border-teal-500/40 rounded-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-slate-800 pb-3">
              <div>
                <span className="text-teal-400 font-extrabold">Aggregating {selectedIds.length} Harvest Lots</span>
                <p className="text-white font-extrabold text-base mt-0.5">
                  Total Volume: {totalSelectedQty} kg ({uniqueFarmersCount} Farmers)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Est. Pool Value:</span>
                <span className="text-emerald-400 font-extrabold text-base">
                  ₱{(totalSelectedQty * (parseFloat(proposedPricePerKg) || 0)).toLocaleString()}
                </span>
              </div>
            </div>

            <form onSubmit={handleCreateLot} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <input
                type="text"
                value={lotTitle}
                onChange={(e) => setLotTitle(e.target.value)}
                placeholder="Bulk Lot Name"
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-bold text-white"
                required
              />
              <input
                type="number"
                value={proposedPricePerKg}
                onChange={(e) => setProposedPricePerKg(e.target.value)}
                placeholder="Proposed Price per Kg (₱)"
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-bold text-emerald-400"
                required
              />
              <button
                type="submit"
                className="py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Store className="w-4 h-4" /> Create Bulk Marketplace Lot
              </button>
            </form>
          </div>
        )}
      </div>
    </CoopLayout>
  );
}
