"use client";

import React, { useEffect, useState } from "react";
import ProducerShell from "@/components/shells/ProducerShell";
import { useLiveQuery } from "dexie-react-hooks";
import { db, CatchLogEntity, type DocumentEntity } from "@/lib/db";
import { createFishingTrip, recordCatchLog, createFisheriesDocument } from "@/lib/productionRepository";
import { demoDb } from "@/lib/demoDb";
import { useApplicationContext } from "@/lib/ApplicationContext";
import { hydrateFisheriesFromSupabase } from "@/lib/fisheriesSupabaseRepository";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Fish, Anchor, Save, CheckCircle2, AlertCircle, RefreshCw, FileText } from "lucide-react";

export default function FishingOperationsPage() {
  const { mode, userId, organizationId } = useApplicationContext();
  const trips = useLiveQuery(async () => {
    if (mode === "demo") return demoDb.demoFishingTrips.toArray();
    return db.fishingTrips.filter((trip) => !trip.isDeleted).toArray();
  }, [mode]) || [];
  const catchLogs = useLiveQuery(async () => {
    if (mode === "demo") return demoDb.demoCatches.toArray();
    return db.catchLogs.filter((catchLog) => !catchLog.isDeleted).toArray();
  }, [mode]) || [];
  const fuelItems = useLiveQuery(async () => {
    if (mode === "demo") {
      const items = await demoDb.demoInventoryItems
        .filter((item) => item.type === "FUEL")
        .toArray();
      return items.map((item) => ({
        localId: item.localId,
        crop: item.name,
        quantityInKg: item.quantity,
      }));
    }
    return db.inventoryItems
      .filter((item) =>
        !item.isDeleted &&
        (item.type === "FUEL" ||
          item.crop.toLowerCase().includes("fuel") ||
          item.crop.toLowerCase().includes("diesel")))
      .toArray();
  }, [mode]) || [];
  const fisheriesDocuments = useLiveQuery(async () => {
    if (mode === "demo") return demoDb.demoFisheriesDocuments.toArray();
    return db.documents
      .filter(
        (document) =>
          !document.isDeleted &&
          ["VESSEL_PERMIT", "LGU_PERMIT", "BFAR_LICENSE"].includes(
            document.documentType,
          ),
      )
      .toArray();
  }, [mode]) || [];

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
  const [documentTitle, setDocumentTitle] = useState("Municipal Fishing Permit");
  const [documentType, setDocumentType] =
    useState<DocumentEntity["documentType"]>("VESSEL_PERMIT");
  const [documentFileName, setDocumentFileName] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const [feedback, setFeedback] = useState<string | null>(null);
  const [cloudError, setCloudError] = useState<string | null>(() =>
    mode === "production" && !isSupabaseConfigured()
      ? "Supabase is not configured. Records will stay safely queued on this device until cloud settings are added."
      : null,
  );
  const [syncing, setSyncing] = useState(false);
  const pendingFisheriesCount = useLiveQuery(async () => {
    if (mode === "demo") return 0;
    const [tripCount, catchCount] = await Promise.all([
      db.fishingTrips.where("syncStatus").anyOf(["local", "pending", "failed"]).count(),
      db.catchLogs.where("syncStatus").anyOf(["local", "pending", "failed"]).count(),
    ]);
    return tripCount + catchCount;
  }, [mode]) ?? 0;

  useEffect(() => {
    if (mode !== "production") return;
    if (!isSupabaseConfigured()) return;
    void import("@/lib/syncEngine");
    void hydrateFisheriesFromSupabase().catch((error: unknown) => {
      setCloudError(
        error instanceof Error
          ? `Cloud refresh failed; local records remain available. ${error.message}`
          : "Cloud refresh failed; local records remain available.",
      );
    });
  }, [mode]);

  const handleSync = async () => {
    if (mode === "demo") return;
    setSyncing(true);
    const { syncEngine } = await import("@/lib/syncEngine");
    const success = await syncEngine.triggerSync();
    setSyncing(false);
    setFeedback(
      success
        ? "Fisheries records synchronized with Supabase."
        : "Sync is still pending. Your records remain safe on this device.",
    );
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vesselName.trim() || !fishingGround.trim()) return;

    if (mode === "demo") {
      await demoDb.demoFishingTrips.add({
        localId: `demo-trip-${crypto.randomUUID()}`,
        vesselName: vesselName.trim(),
        vesselRegistrationNumber: vesselRegNum.trim() || undefined,
        departurePort: departurePort.trim(),
        fishingGround: fishingGround.trim(),
        fuelUsedLiters: parseFloat(fuelUsedLiters) || 0,
        crewCount: parseInt(crewCount) || 1,
        departedAt: new Date().toISOString().split("T")[0],
        status: "DEPARTED",
      });
      if (selectedFuelItemId) {
        const fuel = await demoDb.demoInventoryItems.get(selectedFuelItemId);
        if (fuel) {
          await demoDb.demoInventoryItems.update(selectedFuelItemId, {
            quantity: Math.max(0, fuel.quantity - (parseFloat(fuelUsedLiters) || 0)),
          });
        }
      }
    } else {
      await createFishingTrip({
        vesselName: vesselName.trim(),
        vesselRegistrationNumber: vesselRegNum.trim(),
        departurePort: departurePort.trim(),
        fishingGround: fishingGround.trim(),
        fuelUsedLiters: parseFloat(fuelUsedLiters) || 0,
        crewCount: parseInt(crewCount) || 1,
        fuelInventoryItemId: selectedFuelItemId || undefined,
        userId,
        organizationId,
      });
    }

    setFeedback(
      `Fishing trip created for ${vesselName}.${selectedFuelItemId ? " Fuel deducted from warehouse." : ""}`,
    );
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleRecordCatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTripId || !speciesName.trim()) return;

    if (mode === "demo") {
      const trip = await demoDb.demoFishingTrips.get(selectedTripId);
      await demoDb.demoCatches.add({
        localId: `demo-catch-${crypto.randomUUID()}`,
        tripId: selectedTripId,
        vesselName: trip?.vesselName ?? "Fishing vessel",
        speciesName: speciesName.trim(),
        weightKg: parseFloat(weightKg) || 0,
        qualityGrade,
        preservationMethod,
        caughtAtDate: new Date().toISOString().split("T")[0],
        forSaleKg: parseFloat(forSaleKg) || 0,
        homeUseKg: parseFloat(homeUseKg) || 0,
      });
      const existingFish = await demoDb.demoInventoryItems
        .filter(
          (item) =>
            item.type === "FISH" &&
            item.name.toLowerCase() === speciesName.trim().toLowerCase(),
        )
        .first();
      if (existingFish) {
        await demoDb.demoInventoryItems.update(existingFish.localId, {
          quantity:
            existingFish.quantity + (parseFloat(forSaleKg) || parseFloat(weightKg) || 0),
        });
      } else {
        await demoDb.demoInventoryItems.add({
          localId: `demo-fish-stock-${crypto.randomUUID()}`,
          name: speciesName.trim(),
          type: "FISH",
          quantity: parseFloat(forSaleKg) || parseFloat(weightKg) || 0,
          unit: "kg",
          unitCost: 0,
        });
      }
    } else {
      await recordCatchLog({
        tripId: selectedTripId,
        speciesName: speciesName.trim(),
        weightKg: parseFloat(weightKg) || 0,
        qualityGrade,
        preservationMethod,
        forSaleKg: parseFloat(forSaleKg) || 0,
        homeUseKg: parseFloat(homeUseKg) || 0,
        userId,
        organizationId,
      });
    }

    setFeedback(`Catch log recorded for ${speciesName} (${weightKg} kg)! Added to fish inventory.`);
    setSpeciesName("");
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleSaveDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentTitle.trim()) return;
    if (mode === "demo") {
      await demoDb.demoFisheriesDocuments.add({
        localId: `demo-fish-doc-${crypto.randomUUID()}`,
        title: documentTitle.trim(),
        documentType,
        fileName: documentFileName || undefined,
        verificationStatus: "PENDING",
      });
    } else {
      const savedDocument = await createFisheriesDocument({
        title: documentTitle.trim(),
        documentType,
        fileName: documentFileName || undefined,
        userId,
        organizationId,
      });
      if (documentFile) {
        await db.mediaQueue.add({
          localId: `document-upload-${crypto.randomUUID()}`,
          entityType: "DOCUMENT",
          entityLocalId: savedDocument.localId,
          fileName: documentFile.name,
          fileType: documentFile.type || "application/octet-stream",
          fileBlob: documentFile,
          syncStatus: "pending",
          createdAt: new Date().toISOString(),
        });
      }
    }
    setFeedback("Vessel document saved offline and queued for secure synchronization.");
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <ProducerShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
            {mode === "demo" ? "DEMO · LOCAL SANDBOX" : "CAPTURE FISHERIES & VESSEL OPERATIONS"}
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1 flex items-center gap-2">
            <Fish className="w-6 h-6 text-[#059669]" />
            Fishing Trips &amp; Catch Logging
          </h1>
          <p className="text-xs sm:text-sm text-[#5f7469] mt-0.5">
            Log vessel departure, fuel usage, fishing grounds, and catch weight per species.
          </p>
          </div>
          {mode === "production" && (
            <button
              type="button"
              onClick={handleSync}
              disabled={syncing}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#dce9df] text-[#047857] font-bold text-xs flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing…" : `Sync (${pendingFisheriesCount})`}
            </button>
          )}
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {cloudError && mode === "production" && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{cloudError}</span>
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
                <label className="block text-[#5f7469] font-bold mb-1">Vessel Name *</label>
                <input
                  type="text"
                  value={vesselName}
                  onChange={(e) => setVesselName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#5f7469] font-bold mb-1">BFAR Registration Number</label>
                <input
                  type="text"
                  value={vesselRegNum}
                  onChange={(e) => setVesselRegNum(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
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
                    onChange={(e) =>
                      setPreservationMethod(
                        e.target.value as CatchLogEntity["preservationMethod"],
                      )
                    }
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                  >
                    <option value="chilled_ice">Chilled in Ice (Yelo)</option>
                    <option value="frozen">Flash Frozen (-18°C)</option>
                    <option value="live">Live Catch (Buhay)</option>
                    <option value="ambient">Ambient</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">For Sale (Kg)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={forSaleKg}
                    onChange={(e) => setForSaleKg(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#163025]"
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] font-bold mb-1">Home Use (Kg)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={homeUseKg}
                    onChange={(e) => setHomeUseKg(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#163025]"
                  />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleSaveDocument}
            className="bg-white border border-[#dce9df] rounded-2xl p-5 sm:p-6 shadow-xs space-y-3 text-xs"
          >
            <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2 border-b border-[#dce9df] pb-3">
              <FileText className="w-4 h-4 text-[#059669]" />
              Add Vessel Compliance Document
            </h2>
            <input
              value={documentTitle}
              onChange={(event) => setDocumentTitle(event.target.value)}
              placeholder="Document title"
              className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#163025]"
              required
            />
            <select
              value={documentType}
              onChange={(event) =>
                setDocumentType(
                  event.target.value as DocumentEntity["documentType"],
                )
              }
              className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] font-bold text-[#163025]"
            >
              <option value="VESSEL_PERMIT">BFAR / Vessel Permit</option>
              <option value="OTHER">Municipal or Other Permit</option>
            </select>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(event) =>
                {
                  const file = event.target.files?.[0] ?? null;
                  setDocumentFile(file);
                  setDocumentFileName(file?.name ?? "");
                }
              }
              className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#5f7469]"
            />
            <p className="text-[11px] text-[#5f7469]">
              The selected file is queued locally and uploaded to private user-scoped storage when online.
            </p>
            <button className="w-full py-3 rounded-xl bg-[#059669] text-white font-bold flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Save Document Offline
            </button>
          </form>

          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 sm:p-6 shadow-xs space-y-3 text-xs">
            <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2 border-b border-[#dce9df] pb-3">
              <FileText className="w-4 h-4 text-[#059669]" />
              Vessel Documents ({fisheriesDocuments.length})
            </h2>
            {fisheriesDocuments.length === 0 ? (
              <p className="text-[#9db5a5] text-center py-6">No vessel documents saved yet.</p>
            ) : (
              fisheriesDocuments.map((document) => (
                <div key={document.localId} className="p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-extrabold text-[#163025]">{document.title}</p>
                      <p className="text-[11px] text-[#5f7469]">{document.fileName ?? document.documentType}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-extrabold">
                      {document.verificationStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ProducerShell>
  );
}
