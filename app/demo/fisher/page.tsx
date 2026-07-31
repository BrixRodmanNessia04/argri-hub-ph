"use client";

import React, { useState, useEffect } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { seedDemoDatabase, demoDb, DemoFishingTrip, DemoCatch } from "@/lib/demoDb";
import { useLiveQuery } from "dexie-react-hooks";
import { Fish, Anchor, Fuel, Plus, Save, X, Layers, CheckCircle2 } from "lucide-react";

export default function CompleteFisherDemoPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "trips" | "catches" | "fuel">("dashboard");

  useEffect(() => {
    seedDemoDatabase();
  }, []);

  const trips = useLiveQuery(() => demoDb.demoFishingTrips.toArray(), []) || [];
  const catches = useLiveQuery(() => demoDb.demoCatches.toArray(), []) || [];

  // Modals
  const [showAddTrip, setShowAddTrip] = useState(false);
  const [vesselName, setVesselName] = useState("FB San Jose Marine Vessel");
  const [departurePort, setDeparturePort] = useState("Bolinao Municipal Port");
  const [fishingGround, setFishingGround] = useState("Lingayen Gulf");
  const [crewCount, setCrewCount] = useState(4);
  const [fuelLiters, setFuelLiters] = useState(85);

  const [showAddCatch, setShowAddCatch] = useState(false);
  const [speciesName, setSpeciesName] = useState("Yellowfin Tuna (Tambakol)");
  const [catchKg, setCatchKg] = useState(350);
  const [catchGrade, setCatchGrade] = useState("Class A");
  const [preservation, setPreservation] = useState("Chilled Ice");

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    await demoDb.demoFishingTrips.put({
      localId: `trip_${Date.now()}`,
      vesselName,
      departurePort,
      fishingGround,
      crewCount: Number(crewCount),
      fuelUsedLiters: Number(fuelLiters),
      departedAt: new Date().toISOString().split("T")[0],
      status: "DEPARTED",
    });
    setShowAddTrip(false);
  };

  const handleRecordCatch = async (e: React.FormEvent) => {
    e.preventDefault();
    await demoDb.demoCatches.put({
      localId: `catch_${Date.now()}`,
      tripId: trips[0]?.localId || "trip-1",
      vesselName: trips[0]?.vesselName || "FB San Jose Vessel",
      speciesName,
      weightKg: Number(catchKg),
      qualityGrade: catchGrade,
      preservationMethod: preservation,
      caughtAtDate: new Date().toISOString().split("T")[0],
    });
    setShowAddCatch(false);
  };

  const totalCatchKg = catches.reduce((sum, c) => sum + c.weightKg, 0);
  const totalFuelLiters = trips.reduce((sum, t) => sum + t.fuelUsedLiters, 0);

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <DemoHeader roleName="Capture Fisheries (Full Application)" />

      {/* Sub Navigation */}
      <div className="bg-white border-b border-[#dce9df] px-4 sm:px-6 sticky top-[89px] z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center gap-2 py-2 text-xs font-bold">
          {[
            { id: "dashboard", label: "Fisheries Dashboard", icon: Fish },
            { id: "trips", label: `Fishing Trips (${trips.length})`, icon: Anchor },
            { id: "catches", label: `Species Catch Logs (${catches.length})`, icon: Layers },
            { id: "fuel", label: "Fuel & Vessel Warehouse", icon: Fuel },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#0ea5a4] text-white shadow-xs"
                    : "text-[#5f7469] hover:bg-[#f6fbf7] hover:text-[#163025]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-[#dce9df] shadow-xs text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0ea5a4] animate-pulse" />
                <span className="text-[#163025]">Vessel Telemetry &amp; Offline Storage: Active (`agrihub-demo` DB)</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddTrip(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#0ea5a4] text-white hover:bg-[#097e7d] flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Log Fishing Trip
                </button>
                <button
                  onClick={() => setShowAddCatch(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#e6f4f4] text-[#0ea5a4] border border-[#a7e3e3] flex items-center gap-1"
                >
                  <Fish className="w-3.5 h-3.5" /> Record Catch
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
                <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Total Catch Weight</span>
                <p className="text-2xl font-extrabold text-[#0ea5a4]">{totalCatchKg.toLocaleString()} kg</p>
                <span className="text-[#5f7469] text-[11px] font-normal">{catches.length} Catch records</span>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
                <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Active Vessels</span>
                <p className="text-2xl font-extrabold text-[#163025]">{trips.length} Vessels</p>
                <span className="text-[#5f7469] text-[11px] font-normal">Bolinao &amp; Lingayen Gulf</span>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
                <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Total Fuel Used</span>
                <p className="text-2xl font-extrabold text-amber-600">{totalFuelLiters} Liters</p>
                <span className="text-[#5f7469] text-[11px] font-normal">Deducted from warehouse</span>
              </div>
            </div>

            {/* Catches List */}
            <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-[#163025] flex items-center gap-1.5">
                <Fish className="w-4 h-4 text-[#0ea5a4]" /> Recorded Marine Catches
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {catches.map((c) => (
                  <div key={c.localId} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#163025] text-sm">{c.speciesName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#e6f4f4] text-[#0ea5a4] border border-[#a7e3e3] text-[10px] font-extrabold">
                        {c.weightKg} kg
                      </span>
                    </div>
                    <p className="text-[#5f7469] text-[11px] font-normal">Vessel: {c.vesselName} • Preservation: {c.preservationMethod}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TRIPS TAB */}
        {activeTab === "trips" && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#dce9df]">
              <div>
                <h2 className="font-extrabold text-base text-[#163025]">Fishing Trip Records</h2>
                <p className="text-[#5f7469] font-normal">Departure ports, fishing ground coordinates, and crew management.</p>
              </div>
              <button
                onClick={() => setShowAddTrip(true)}
                className="px-4 py-2 rounded-xl bg-[#0ea5a4] text-white font-extrabold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" /> Log Fishing Trip
              </button>
            </div>

            <div className="space-y-3">
              {trips.map((t) => (
                <div key={t.localId} className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-[#163025]">{t.vesselName}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e6f4f4] text-[#0ea5a4] font-black text-[10px]">
                      {t.status}
                    </span>
                  </div>
                  <p className="text-[#5f7469] text-xs font-normal">Port: {t.departurePort} • Ground: {t.fishingGround} • Crew: {t.crewCount} crewmen</p>
                  <p className="text-[#0ea5a4] text-xs font-bold pt-2 border-t border-[#dce9df]">Fuel consumed: {t.fuelUsedLiters} Liters</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CATCHES TAB */}
        {activeTab === "catches" && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#dce9df]">
              <div>
                <h2 className="font-extrabold text-base text-[#163025]">Catch Logging &amp; Grading</h2>
                <p className="text-[#5f7469] font-normal">Yellowfin Tuna, Galunggong, Bangus, and preservation methods.</p>
              </div>
              <button
                onClick={() => setShowAddCatch(true)}
                className="px-4 py-2 rounded-xl bg-[#0ea5a4] text-white font-extrabold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" /> Record Catch
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {catches.map((c) => (
                <div key={c.localId} className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#163025] text-sm">{c.speciesName}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e6f4f4] text-[#0ea5a4] font-black text-[10px]">{c.qualityGrade}</span>
                  </div>
                  <p className="text-[#5f7469] text-xs font-normal">Weight: {c.weightKg} kg • Method: {c.preservationMethod}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FUEL TAB */}
        {activeTab === "fuel" && (
          <div className="space-y-4 text-xs">
            <div className="bg-white p-5 rounded-3xl border border-[#dce9df]">
              <h2 className="font-extrabold text-base text-[#163025]">Vessel Fuel &amp; Gear Warehouse</h2>
              <p className="text-[#5f7469] font-normal">Diesel stock, marine oil, fishing nets, and cold-storage ice supplies.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
                <span className="font-extrabold text-[#163025] text-sm block">Marine Diesel Fuel</span>
                <p className="text-2xl font-extrabold text-[#0ea5a4]">350 Liters Available</p>
                <p className="text-[#5f7469] font-normal">Unit Cost: ₱62 / Liter</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
                <span className="font-extrabold text-[#163025] text-sm block">Chilled Ice Blocks</span>
                <p className="text-2xl font-extrabold text-[#0ea5a4]">120 Blocks Available</p>
                <p className="text-[#5f7469] font-normal">Unit Cost: ₱150 / Block</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FORM MODAL: ADD TRIP */}
      {showAddTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Log Fishing Trip</h3>
              <button onClick={() => setShowAddTrip(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleCreateTrip} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Vessel Name</label>
                <input type="text" value={vesselName} onChange={(e) => setVesselName(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#5f7469] mb-1">Departure Port</label>
                  <input type="text" value={departurePort} onChange={(e) => setDeparturePort(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Fishing Ground</label>
                  <input type="text" value={fishingGround} onChange={(e) => setFishingGround(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#5f7469] mb-1">Crew Count</label>
                  <input type="number" value={crewCount} onChange={(e) => setCrewCount(Number(e.target.value))} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Fuel (Liters)</label>
                  <input type="number" value={fuelLiters} onChange={(e) => setFuelLiters(Number(e.target.value))} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#0ea5a4] text-white font-extrabold shadow-md flex items-center justify-center gap-1 mt-2">
                <Save className="w-4 h-4" /> Save Fishing Trip
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL: RECORD CATCH */}
      {showAddCatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Record Catch Weight</h3>
              <button onClick={() => setShowAddCatch(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleRecordCatch} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Species Name</label>
                <input type="text" value={speciesName} onChange={(e) => setSpeciesName(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#5f7469] mb-1">Weight (Kg)</label>
                  <input type="number" value={catchKg} onChange={(e) => setCatchKg(Number(e.target.value))} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Preservation</label>
                  <select value={preservation} onChange={(e) => setPreservation(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]">
                    <option value="Chilled Ice">Chilled Ice</option>
                    <option value="Brine Freezing">Brine Freezing</option>
                    <option value="Live Well">Live Well</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#0ea5a4] text-white font-extrabold shadow-md flex items-center justify-center gap-1 mt-2">
                <Save className="w-4 h-4" /> Save Catch Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
