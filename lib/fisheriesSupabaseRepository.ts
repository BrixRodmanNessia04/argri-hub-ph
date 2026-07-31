"use client";

import {
  db,
  type CatchLogEntity,
  type DocumentEntity,
  type FishingTripEntity,
  type InventoryItemEntity,
} from "./db";
import { createClient } from "./supabase/client";
import { isSupabaseConfigured } from "./supabase/config";

function syncedBase(row: {
  id: string;
  owner_id: string;
  organization_id: string | null;
  local_id: string;
  version: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}) {
  return {
    localId: row.local_id,
    serverId: row.id,
    userId: row.owner_id,
    cooperativeId: row.organization_id,
    deviceId: "supabase",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncStatus: "synced" as const,
    syncAttempts: 0,
    lastSyncAttemptAt: new Date().toISOString(),
    syncError: null,
    version: row.version,
    isDeleted: Boolean(row.deleted_at),
  };
}

async function canHydrate(table: { get(key: string): Promise<{ syncStatus?: string } | undefined> }, localId: string) {
  const existing = await table.get(localId);
  return !existing || existing.syncStatus === "synced";
}

export async function hydrateFisheriesFromSupabase() {
  if (!isSupabaseConfigured() || typeof window === "undefined") return;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const [{ data: trips, error: tripsError }, { data: catches, error: catchesError }, { data: inventory, error: inventoryError }, { data: documents, error: documentsError }] =
    await Promise.all([
      supabase
        .from("fishing_trips")
        .select("*")
        .is("deleted_at", null)
        .order("departed_at", { ascending: false }),
      supabase
        .from("catch_logs")
        .select("*")
        .is("deleted_at", null)
        .order("caught_at_date", { ascending: false }),
      supabase
        .from("inventory_items")
        .select("*")
        .eq("fisheries_use", true)
        .is("deleted_at", null),
      supabase
        .from("documents")
        .select("*")
        .in("document_type", ["VESSEL_PERMIT", "LGU_PERMIT", "BFAR_LICENSE"])
        .is("deleted_at", null),
    ]);

  if (tripsError || catchesError || inventoryError || documentsError) {
    throw tripsError ?? catchesError ?? inventoryError ?? documentsError;
  }

  for (const row of trips ?? []) {
    if (!(await canHydrate(db.fishingTrips, row.local_id))) continue;
    const trip: FishingTripEntity = {
      ...syncedBase(row),
      vesselName: row.vessel_name,
      vesselRegistrationNumber: row.vessel_registration_number ?? undefined,
      departurePort: row.departure_port,
      arrivalPort: row.arrival_port ?? undefined,
      departedAt: row.departed_at,
      returnedAt: row.returned_at ?? undefined,
      fishingGround: row.fishing_ground,
      fuelUsedLiters: Number(row.fuel_used_liters),
      crewCount: row.crew_count,
      status: row.status as FishingTripEntity["status"],
    };
    await db.fishingTrips.put(trip);
  }

  for (const row of catches ?? []) {
    if (!(await canHydrate(db.catchLogs, row.local_id))) continue;
    const catchLog: CatchLogEntity = {
      ...syncedBase(row),
      tripId: row.trip_local_id,
      speciesName: row.species_name,
      weightKg: Number(row.weight_kg),
      qualityGrade: row.quality_grade,
      preservationMethod:
        row.preservation_method as CatchLogEntity["preservationMethod"],
      caughtAtCoordinates: row.caught_at_coordinates ?? undefined,
      caughtAtDate: row.caught_at_date,
      forSaleKg: Number(row.for_sale_kg),
      homeUseKg: Number(row.home_use_kg),
    };
    await db.catchLogs.put(catchLog);
  }

  for (const row of inventory ?? []) {
    if (!(await canHydrate(db.inventoryItems, row.local_id))) continue;
    await db.inventoryItems.put({
      ...syncedBase(row),
      crop: row.name,
      type: row.item_type as InventoryItemEntity["type"],
      quantityInKg: Number(row.quantity),
      unit: row.unit,
      unitCost: Number(row.unit_cost),
    });
  }

  for (const row of documents ?? []) {
    if (!(await canHydrate(db.documents, row.local_id))) continue;
    await db.documents.put({
      ...syncedBase(row),
      title: row.title,
      documentType: row.document_type as DocumentEntity["documentType"],
      entityType: row.entity_type as DocumentEntity["entityType"],
      entityLocalId: row.entity_local_id,
      fileUrl: row.storage_path ?? undefined,
      fileName: row.file_name ?? undefined,
      fileSizeBytes: row.file_size_bytes ?? undefined,
      mimeType: row.mime_type ?? undefined,
      verificationStatus:
        (row.verification_status === "VERIFIED"
          ? "verified"
          : row.verification_status === "REJECTED"
            ? "rejected"
            : "submitted") as DocumentEntity["verificationStatus"],
    });
  }
}
