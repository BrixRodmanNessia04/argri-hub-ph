"use client";

import React, { useState } from "react";
import ProducerShell from "@/components/shells/ProducerShell";
import { useLiveQuery } from "dexie-react-hooks";
import { db, AquacultureCycleEntity } from "@/lib/db";
import { createAquacultureCycle } from "@/lib/productionRepository";
import { Anchor, Waves, Thermometer, Droplets, Plus, Save, CheckCircle2, Warehouse } from "lucide-react";

export default function AquacultureOperationsPage() {
  const cycles = useLiveQuery(() => db.aquacultureCycles.filter((a) => !a.isDeleted).toArray(), []) || [];
  const feedItems = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted && (i.type === "FERTILIZER" || i.crop.toLowerCase().includes("feed"))).toArray(), []) || [];

  // Form states
  const [siteId, setSiteId] = useState("Fishpond-A1");
  const [speciesName, setSpeciesName] = useState("Dagupan Milkfish (Bangus)");
  const [totalStockCount, setTotalStockCount] = useState("5000");
  const [stockingDensity, setStockingDensity] = useState("10");
  const [waterSalinity, setWaterSalinity] = useState("15");
  const [waterTemp, setWaterTemp] = useState("28.5");
  const [phLevel, setPhLevel] = useState("7.6");
  const [dissolvedOxygen, setDissolvedOxygen] = useState("6.4");

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCreateCycle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!speciesName.trim()) return;

    await createAquacultureCycle({
      siteId: siteId.trim(),
      speciesName: speciesName.trim(),
      totalStockCount: parseInt(totalStockCount) || 1000,
      stockingDensityPerSqM: parseFloat(stockingDensity) || 10,
      waterSalinityPpt: parseFloat(waterSalinity) || 15,
      waterTempCelsius: parseFloat(waterTemp) || 28,
      phLevel: parseFloat(phLevel) || 7.5,
      dissolvedOxygen: parseFloat(dissolvedOxygen) || 6.0,
    });

    setFeedback(`Aquaculture stocking cycle created for ${speciesName} (${totalStockCount} fingerlings)!`);
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <ProducerShell>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            AQUACULTURE &amp; BRACKISHWATER PONDS
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1 flex items-center gap-2">
            <Anchor className="w-6 h-6 text-teal-400" />
            Pond &amp; Cage Stocking Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Monitor fishpond stocking density, salinity, water temperature, dissolved oxygen, and growth cycles.
          </p>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CREATE AQUACULTURE POND STOCKING FORM */}
          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2 border-b border-[#dce9df] pb-3">
              <Waves className="w-4 h-4 text-teal-400" /> Start Aquaculture Stocking Batch
            </h2>

            <form onSubmit={handleCreateCycle} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Production Site / Pond ID *</label>
                  <input
                    type="text"
                    value={siteId}
                    onChange={(e) => setSiteId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Species Stocked *</label>
                  <input
                    type="text"
                    value={speciesName}
                    onChange={(e) => setSpeciesName(e.target.value)}
                    placeholder="e.g. Milkfish (Bangus), Tilapia, Vannamei Shrimp"
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Total Fingerlings Stocked *</label>
                  <input
                    type="number"
                    value={totalStockCount}
                    onChange={(e) => setTotalStockCount(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-teal-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Density (per sq. meter)</label>
                  <input
                    type="number"
                    value={stockingDensity}
                    onChange={(e) => setStockingDensity(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                  />
                </div>
              </div>

              {/* WATER TELEMETRY */}
              <div className="p-3.5 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] space-y-3">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Water Quality Telemetry Telemetry
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1">Salinity (ppt)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={waterSalinity}
                      onChange={(e) => setWaterSalinity(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-teal-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1">Temperature (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={waterTemp}
                      onChange={(e) => setWaterTemp(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-amber-300 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 font-bold mb-1">pH Level (6.5 - 8.5)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={phLevel}
                      onChange={(e) => setPhLevel(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-emerald-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 font-bold mb-1">Dissolved Oxygen (mg/L)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={dissolvedOxygen}
                      onChange={(e) => setDissolvedOxygen(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-blue-300 font-bold"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-[#163025] font-bold text-xs shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <Save className="w-4 h-4" /> Start Aquaculture Batch (Offline First)
              </button>
            </form>
          </div>

          {/* ACTIVE AQUACULTURE BATCHES */}
          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
            <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2">
              <Anchor className="w-4 h-4 text-teal-400" /> Active Aquaculture Cycles ({cycles.length})
            </h2>

            {cycles.length === 0 ? (
              <p className="text-[#9db5a5] text-center py-4">No aquaculture cycles active yet.</p>
            ) : (
              <div className="space-y-3">
                {cycles.map((c) => (
                  <div key={c.localId} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#163025] text-sm">{c.speciesName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-teal-950 text-teal-400 border border-teal-800 text-[10px] font-extrabold">
                        {c.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5f7469] font-semibold pt-1 border-t border-[#dce9df]">
                      <span>Pond: {c.siteId}</span>
                      <span className="text-emerald-400 font-bold">{c.totalStockCount.toLocaleString()} fingerlings</span>
                      <span>Salinity: {c.waterSalinityPpt} ppt</span>
                      <span>DO: {c.dissolvedOxygen} mg/L</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProducerShell>
  );
}
