import {
  db,
  createBaseEntity,
  FishingTripEntity,
  CatchLogEntity,
  AquacultureCycleEntity,
  LivestockPoultryBatchEntity,
  HealthObservationEntity,
  DocumentEntity,
} from "./db";
import { queueSyncOperation, recordInventoryMovement } from "./farmerRepository";

// 1. Capture Fisheries & Fishing Trips
export async function createFishingTrip(params: {
  vesselName: string;
  vesselRegistrationNumber?: string;
  departurePort: string;
  arrivalPort?: string;
  departedAt?: string;
  fishingGround: string;
  fuelUsedLiters?: number;
  crewCount: number;
  fuelInventoryItemId?: string;
  userId?: string;
  organizationId?: string | null;
}): Promise<FishingTripEntity> {
  const trip: FishingTripEntity = {
    ...createBaseEntity(params.userId ?? "local-pending-user", params.organizationId ?? null),
    vesselName: params.vesselName,
    vesselRegistrationNumber: params.vesselRegistrationNumber,
    departurePort: params.departurePort,
    arrivalPort: params.arrivalPort,
    departedAt: params.departedAt || new Date().toISOString().split("T")[0],
    fishingGround: params.fishingGround,
    fuelUsedLiters: params.fuelUsedLiters || 0,
    crewCount: params.crewCount || 1,
    status: "DEPARTED",
  };

  await db.fishingTrips.add(trip);
  await queueSyncOperation("fishing_trips", trip.localId, "CREATE", trip as unknown as Record<string, unknown>);

  // Deduct fuel from warehouse inventory if specified
  if (params.fuelInventoryItemId && params.fuelUsedLiters && params.fuelUsedLiters > 0) {
    await recordInventoryMovement({
      inventoryItemId: params.fuelInventoryItemId,
      transactionType: "usage",
      quantityKg: params.fuelUsedLiters,
      unit: "liters",
      reason: `Fuel usage for Fishing Trip: ${params.vesselName} (${params.fishingGround})`,
    });
  }

  return trip;
}

export async function recordCatchLog(params: {
  tripId: string;
  speciesName: string;
  weightKg: number;
  qualityGrade: string;
  preservationMethod: CatchLogEntity["preservationMethod"];
  caughtAtCoordinates?: string;
  caughtAtDate?: string;
  forSaleKg?: number;
  homeUseKg?: number;
  userId?: string;
  organizationId?: string | null;
}): Promise<CatchLogEntity> {
  const catchLog: CatchLogEntity = {
    ...createBaseEntity(params.userId ?? "local-pending-user", params.organizationId ?? null),
    tripId: params.tripId,
    speciesName: params.speciesName,
    weightKg: params.weightKg,
    qualityGrade: params.qualityGrade,
    preservationMethod: params.preservationMethod,
    caughtAtCoordinates: params.caughtAtCoordinates,
    caughtAtDate: params.caughtAtDate || new Date().toISOString().split("T")[0],
    forSaleKg: params.forSaleKg || params.weightKg,
    homeUseKg: params.homeUseKg || 0,
  };

  await db.catchLogs.add(catchLog);
  await queueSyncOperation("catch_logs", catchLog.localId, "CREATE", catchLog as unknown as Record<string, unknown>);

  const existingInventory = await db.inventoryItems
    .filter(
      (item) =>
        !item.isDeleted &&
        item.type === "HARVESTED" &&
        item.crop.toLowerCase() === params.speciesName.toLowerCase(),
    )
    .first();
  if (existingInventory) {
    const updatedInventory = {
      ...existingInventory,
      quantityInKg: existingInventory.quantityInKg + (params.forSaleKg ?? params.weightKg),
      fisheriesUse: true,
      updatedAt: new Date().toISOString(),
      syncStatus: "pending" as const,
      version: existingInventory.version + 1,
    };
    await db.inventoryItems.put(updatedInventory);
    await queueSyncOperation(
      "inventory_items",
      updatedInventory.localId,
      "UPDATE",
      updatedInventory as unknown as Record<string, unknown>,
    );
  } else {
    const inventoryItem = {
      ...createBaseEntity(params.userId ?? "local-pending-user", params.organizationId ?? null),
      crop: params.speciesName,
      type: "HARVESTED" as const,
      quantityInKg: params.forSaleKg ?? params.weightKg,
      unit: "kg",
      fisheriesUse: true,
    };
    await db.inventoryItems.add(inventoryItem);
    await queueSyncOperation(
      "inventory_items",
      inventoryItem.localId,
      "CREATE",
      inventoryItem as unknown as Record<string, unknown>,
    );
  }
  return catchLog;
}

export async function createFisheriesDocument(params: {
  title: string;
  documentType: DocumentEntity["documentType"];
  fileName?: string;
  userId?: string;
  organizationId?: string | null;
}): Promise<DocumentEntity> {
  const document: DocumentEntity = {
    ...createBaseEntity(
      params.userId ?? "local-pending-user",
      params.organizationId ?? null,
    ),
    title: params.title,
    documentType: params.documentType,
    entityType: "PRODUCER",
    entityLocalId: params.userId ?? "local-fisher-profile",
    fileName: params.fileName,
    verificationStatus: "submitted",
  };
  await db.documents.add(document);
  await queueSyncOperation(
    "documents",
    document.localId,
    "CREATE",
    document as unknown as Record<string, unknown>,
  );
  return document;
}

// 2. Aquaculture Pond / Cage Stocking Operations
export async function createAquacultureCycle(params: {
  siteId: string;
  speciesName: string;
  stockingDensityPerSqM?: number;
  totalStockCount: number;
  stockingDate?: string;
  expectedHarvestDate?: string;
  waterSalinityPpt?: number;
  waterTempCelsius?: number;
  phLevel?: number;
  dissolvedOxygen?: number;
}): Promise<AquacultureCycleEntity> {
  const now = new Date();
  const harvestEst = params.expectedHarvestDate || new Date(now.getTime() + 120 * 86400000).toISOString().split("T")[0];

  const cycle: AquacultureCycleEntity = {
    ...createBaseEntity(),
    siteId: params.siteId,
    speciesName: params.speciesName,
    stockingDensityPerSqM: params.stockingDensityPerSqM || 15,
    totalStockCount: params.totalStockCount,
    stockingDate: params.stockingDate || now.toISOString().split("T")[0],
    expectedHarvestDate: harvestEst,
    waterSalinityPpt: params.waterSalinityPpt || 12,
    waterTempCelsius: params.waterTempCelsius || 28,
    phLevel: params.phLevel || 7.5,
    dissolvedOxygen: params.dissolvedOxygen || 6.2,
    status: "STOCKING",
  };

  await db.aquacultureCycles.add(cycle);
  await queueSyncOperation("aquaculture_cycles", cycle.localId, "CREATE", cycle as unknown as Record<string, unknown>);
  return cycle;
}

// 3. Livestock & Poultry Batch Operations
export async function createLivestockPoultryBatch(params: {
  siteId: string;
  animalType: LivestockPoultryBatchEntity["animalType"];
  batchName: string;
  breed?: string;
  headCount: number;
  housingType?: string;
  startDate?: string;
  expectedMarketDate?: string;
}): Promise<LivestockPoultryBatchEntity> {
  const now = new Date();
  const marketEst = params.expectedMarketDate || new Date(now.getTime() + 60 * 86400000).toISOString().split("T")[0];

  const batch: LivestockPoultryBatchEntity = {
    ...createBaseEntity(),
    siteId: params.siteId,
    animalType: params.animalType,
    batchName: params.batchName,
    breed: params.breed || "Standard Breed",
    headCount: params.headCount,
    housingType: params.housingType || "Enclosed Barn",
    startDate: params.startDate || now.toISOString().split("T")[0],
    expectedMarketDate: marketEst,
    vaccinationStatus: "Up to date",
    status: "ACTIVE",
  };

  await db.livestockPoultryBatches.add(batch);
  await queueSyncOperation("livestock_poultry_batches", batch.localId, "CREATE", batch as unknown as Record<string, unknown>);
  return batch;
}

// 4. Sector-Wide Health Observations (Crops, Fisheries, Aquaculture, Livestock, Poultry)
export async function createHealthObservation(params: {
  sector: HealthObservationEntity["sector"];
  siteId?: string;
  cycleId?: string;
  observationType: HealthObservationEntity["observationType"];
  severity: HealthObservationEntity["severity"];
  symptoms: string;
  treatmentApplied?: string;
  inputUsedId?: string;
  inputQuantityUsed?: number;
}): Promise<HealthObservationEntity> {
  const obs: HealthObservationEntity = {
    ...createBaseEntity(),
    sector: params.sector,
    siteId: params.siteId,
    cycleId: params.cycleId,
    observationType: params.observationType,
    severity: params.severity,
    symptoms: params.symptoms,
    treatmentApplied: params.treatmentApplied,
    inputUsedId: params.inputUsedId,
    observedAt: new Date().toISOString().split("T")[0],
  };

  await db.healthObservations.add(obs);
  await queueSyncOperation("health_observations", obs.localId, "CREATE", obs as unknown as Record<string, unknown>);

  // Deduct treatment medicine/chemical from warehouse if specified
  if (params.inputUsedId && params.inputQuantityUsed && params.inputQuantityUsed > 0) {
    await recordInventoryMovement({
      inventoryItemId: params.inputUsedId,
      transactionType: "usage",
      quantityKg: params.inputQuantityUsed,
      reason: `Health Treatment (${params.sector}): ${params.symptoms}`,
    });
  }

  return obs;
}

// 5. Cooperative Production Forecast Visibility Engine
export async function getCoopExpectedProduction(_cooperativeId: string = "coop-456") {
  void _cooperativeId;
  const crops = await db.cropCycles.filter((c) => !c.isDeleted).toArray();
  const catchLogs = await db.catchLogs.filter((c) => !c.isDeleted).toArray();
  const aquaculture = await db.aquacultureCycles.filter((a) => !a.isDeleted).toArray();
  const livestock = await db.livestockPoultryBatches.filter((l) => !l.isDeleted).toArray();

  const totalCropExpectedKg = crops.reduce((sum, c) => sum + (c.targetYieldKg || c.expectedYieldKg || 1000), 0);
  const totalCatchLoggedKg = catchLogs.reduce((sum, c) => sum + (c.forSaleKg || c.weightKg || 0), 0);
  const totalAquacultureEstKg = aquaculture.reduce((sum, a) => sum + a.totalStockCount * 0.4, 0); // 400g avg fish weight
  const totalLivestockUnits = livestock.reduce((sum, l) => sum + l.headCount, 0);

  return {
    totalCropExpectedKg,
    totalCatchLoggedKg,
    totalAquacultureEstKg,
    totalLivestockUnits,
    cropCyclesCount: crops.length,
    catchLogsCount: catchLogs.length,
    aquacultureCyclesCount: aquaculture.length,
    livestockBatchesCount: livestock.length,
  };
}
