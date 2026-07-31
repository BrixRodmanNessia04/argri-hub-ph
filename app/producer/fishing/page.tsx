"use client";

import React, { useState } from "react";
import ProducerShell from "@/components/shells/ProducerShell";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FishingTripEntity, CatchLogEntity } from "@/lib/db";
import { createFishingTrip, recordCatchLog } from "@/lib/productionRepository";
import { Fish, Anchor, Plus, Save, CheckCircle2, AlertCircle, Fuel, Users, MapPin, Warehouse } from "lucide-react";

export default function FishingOperationsPage() {
  const trips = useLiveQuery(() => db.fishingTrips.filter((t) => !t.isDeleted).toArray(), []) || [];
  const catchLogs = useLiveQuery(() => db.catchLogs.filter((c) => !c.isDeleted).toArray(), []) || [];
  const fuelItems = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted && (i.type === "FUEL" || i.crop.toLowerCase().includes("fuel") || i.crop.toLowerCase().includes("diesel"))).toArray(), []) || [];

  // Form states
  const [vesselName, setVesselName] = useState("FB San Jose - Marine Fishing Vessel");
  const [vesselRegNum, setVesselRegNum] = useState("BFAR-REG-2026-881");
  const [departurePort, setDeparturePort] = useState("Bolinao Fishing Port, Pangasinan");
  const [fishingGround, setFishingGround] = useState("Lingayen Gulf / West Philippine Sea");
  const [fuelUsedLiters, setFuelUsedLiters] = useState("45");
  const [crewCount, setCrewCount] = useState("4");
  const [selectedFuelItemId, setSelectedFuelItemId] = useState("");

  // Catch Log states
  const [selectedTripId, setSelectedTripId] = useState("");
  const [speciesName, setSpeciesName] = useState("Yellowfin Tuna (Tambakol)");
  const [weightKg, setWeightKg] = useState("120");
  const [qualityGrade, setQualityGrade] = useState("Class A");
  const [preservationMethod, setPreservationMethod] = useState<CatchLogEntity["preservationMethod"]>("chilled_ice");
  const [forSaleKg, setForSaleKg] = useState("110");
  const [homeUseKg, setHomeUseKg] = useState("10");

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vesselName.trim() || !fishingGround.trim()) return;

    await createFishingTrip({
      vesselName: vesselName.trim(),
      vesselRegistrationNumber: vesselRegNum.trim(),
      departurePort: departurePort.trim(),
      fishingGround: fishingGround.trim(),
      fuelUsedLiters: parseFloat(fuelUsedLiters) || 0,
      crewCount: parseInt(crewCount) || 1,
      fuelInventoryItemId: selectedFuelItemId || undefined,
    });

    setFeedback(`Fishing trip created for ${vesselName}! Fuel deducted from warehouse.`);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleRecordCatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTripId || !speciesName.trim()) return;

    await recordCatchLog({
      tripId: selectedTripId,
      speciesName: speciesName.trim(),
      weightKg: parseFloat(weightKg) || 0,
      qualityGrade,
      preservationMethod,
      forSaleKg: parseFloat(forSaleKg) || 0,
      homeUseKg: parseFloat(homeUseKg) || 0,
    });

    setFeedback(`Catch log recorded for ${speciesName} (${weightKg} kg)! Added to fish inventory.`);
    setSpeciesName("");
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <ProducerShell>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
            CAPTURE FISHERIES &amp; VESSEL OPERATIONS
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1 flex items-center gap-2">
            <Fish className="w-6 h-6 text-[#059669]" />
            Fishing Trips &amp; Catch Logging
          </h1>
          <p className="text-xs sm:text-sm text-[#5f7469] mt-0.5">
            Log vessel departure, fuel usage, fishing grounds, and catch weight per species.
          </p>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CREATE FISHING TRIP FORM */}
          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2 border-b border-[#dce9df] pb-3">
              <Anchor className="w-4 h-4 text-[#059669]" /> Dispatch New Fishing Trip
            </h2>

            <form onSubmit={handleCreateTrip} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#5f7469] font-bold mb-1">Vessel Name &amp; BFAR Registration *</label>
                <input
                  type="text"
                  value={vesselName}
                  onChange={(e) => setVesselName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Departure Port *</label>
                  <input
                    type="text"
                    value={departurePort}
                    onChange={(e) => setDeparturePort(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]/30"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Fishing Ground *</label>
                  <input
                    type="text"
                    value={fishingGround}
                    onChange={(e) => setFishingGround(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]/30"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Fuel Consumed (Liters)</label>
                  <input
                    type="number"
                    value={fuelUsedLiters}
                    onChange={(e) => setFuelUsedLiters(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#0ea5a4]"
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Crew Count</label>
                  <input
                    type="number"
                    value={crewCount}
                    onChange={(e) => setCrewCount(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#163025]"
                  />
                </div>
              </div>

              {fuelItems.length > 0 && (
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Deduct Fuel from Warehouse</label>
                  <select
                    value={selectedFuelItemId}
                    onChange={(e) => setSelectedFuelItemId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-semibold text-[#163025]"
                  >
                    <option value="">-- Select Fuel Stock Item --</option>
                    {fuelItems.map((f) => (
                      <option key={f.localId} value={f.localId}>
                        {f.crop} — Available: {f.quantityInKg} L
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 mt-2 transition-colors"
              >
                <Save className="w-4 h-4" /> Save Fishing Trip (Offline First)
              </button>
            </form>
          </div>

          {/* RECORD CATCH LOG FORM */}
          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2 border-b border-[#dce9df] pb-3">
              <Fish className="w-4 h-4 text-[#059669]" /> Record Species Catch Log
            </h2>

            <form onSubmit={handleRecordCatch} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#5f7469] font-bold mb-1">Select Fishing Trip *</label>
                <select
                  value={selectedTripId}
                  onChange={(e) => setSelectedTripId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#163025]"
                  required
                >
                  <option value="">-- Select Dispatched Fishing Trip --</option>
                  {trips.map((t) => (
                    <option key={t.localId} value={t.localId}>
                      {t.vesselName} ({t.fishingGround}) — {t.departedAt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Species Name *</label>
                  <input
                    type="text"
                    value={speciesName}
                    onChange={(e) => setSpeciesName(e.target.value)}
                    placeholder="e.g. Yellowfin Tuna, Round Scad (Galunggong)"
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#163025] placeholder:text-[#9db5a5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Weight Logged (Kg) *</label>
                  <input
                    type="number"
                    step="0.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#059669]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Quality Grade</label>
                  <select
                    value={qualityGrade}
                    onChange={(e) => setQualityGrade(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                  >
                    <option value="Class A">Class A — Export / Premium</option>
                    <option value="Class B">Class B — Wholesale</option>
                    <option value="Class C">Class C — Processing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Preservation Method</label>
                  <select
                    value={preservationMethod}
                    onChange={(e) => setPreservationMethod(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                  >
                    <option value="chilled_ice">Chilled in Ice (Yelo)</option>
                    <option value="frozen">Flash Frozen (-18°C)</option>
                    <option value="live">Live Catch (Buhay)</option>
                    <option value="ambient">Ambient</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 mt-2 transition-colors"
              >
                <Save className="w-4 h-4" /> Save Catch Log (Offline First)
              </button>
            </form>
          </div>
        </div>

        {/* LOGGED CATCH HISTORY */}
        <div className="bg-white border border-[#dce9df] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2">
            <Fish className="w-4 h-4 text-[#059669]" /> Fisheries Catch History ({catchLogs.length})
          </h2>

          {catchLogs.length === 0 ? (
            <p className="text-[#9db5a5] text-center py-4">No catch records logged yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {catchLogs.map((c) => (
                <div key={c.localId} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#163025] text-sm">{c.speciesName}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-extrabold">
                      {c.preservationMethod}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#5f7469] font-semibold pt-1 border-t border-[#dce9df]">
                    <span>Caught: {c.caughtAtDate}</span>
                    <span className="font-extrabold text-[#059669] text-sm">{c.weightKg} kg</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProducerShell>
  );
}
