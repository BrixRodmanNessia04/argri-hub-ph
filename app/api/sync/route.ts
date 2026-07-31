import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type SyncOperation = "CREATE" | "UPDATE" | "DELETE";

interface SyncRequest {
  endpoint?: string;
  item?: Record<string, unknown>;
  operation?: SyncOperation;
  idempotencyKey?: string;
}

const supportedEndpoints = new Set([
  "fishing_trips",
  "catch_logs",
  "inventory_items",
  "documents",
]);

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function number(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function nullableText(value: unknown) {
  const parsed = text(value).trim();
  return parsed || null;
}

function nullableUuid(value: unknown) {
  const parsed = nullableText(value);
  return parsed &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(parsed)
    ? parsed
    : null;
}

function commonRow(item: Record<string, unknown>, userId: string) {
  return {
    owner_id: userId,
    organization_id: nullableUuid(item.cooperativeId),
    local_id: text(item.localId),
    version: Math.max(1, number(item.version, 1)),
    deleted_at: item.isDeleted ? new Date().toISOString() : null,
    updated_at: text(item.updatedAt, new Date().toISOString()),
  };
}

function mapRow(
  endpoint: string,
  item: Record<string, unknown>,
  userId: string,
) {
  const common = commonRow(item, userId);
  switch (endpoint) {
    case "fishing_trips":
      return {
        ...common,
        vessel_name: text(item.vesselName),
        vessel_registration_number: nullableText(item.vesselRegistrationNumber),
        departure_port: text(item.departurePort),
        arrival_port: nullableText(item.arrivalPort),
        departed_at: text(item.departedAt),
        returned_at: nullableText(item.returnedAt),
        fishing_ground: text(item.fishingGround),
        fuel_used_liters: number(item.fuelUsedLiters),
        crew_count: Math.max(1, number(item.crewCount, 1)),
        status: text(item.status, "DEPARTED"),
      };
    case "catch_logs":
      return {
        ...common,
        trip_local_id: text(item.tripId),
        species_name: text(item.speciesName),
        weight_kg: number(item.weightKg),
        quality_grade: text(item.qualityGrade),
        preservation_method: text(item.preservationMethod, "chilled_ice"),
        caught_at_coordinates: nullableText(item.caughtAtCoordinates),
        caught_at_date: text(item.caughtAtDate),
        for_sale_kg: number(item.forSaleKg, number(item.weightKg)),
        home_use_kg: number(item.homeUseKg),
      };
    case "inventory_items":
      return {
        ...common,
        name: text(item.crop, text(item.name)),
        item_type: text(item.type, "OTHER"),
        quantity: number(item.quantityInKg, number(item.quantity)),
        unit: text(item.unit, "unit"),
        unit_cost: number(item.unitCost),
        fisheries_use:
          item.fisheriesUse === true ||
          ["FUEL", "ICE", "FISH", "GEAR"].includes(text(item.type)),
      };
    case "documents":
      const localVerification = text(item.verificationStatus).toLowerCase();
      return {
        ...common,
        title: text(item.title),
        document_type: text(item.documentType, "OTHER"),
        entity_type: text(item.entityType, "USER"),
        entity_local_id: text(item.entityLocalId),
        storage_path: nullableText(item.fileUrl),
        file_name: nullableText(item.fileName),
        file_size_bytes: item.fileSizeBytes
          ? number(item.fileSizeBytes)
          : null,
        mime_type: nullableText(item.mimeType),
        verification_status:
          localVerification === "verified"
            ? "VERIFIED"
            : localVerification === "rejected"
              ? "REJECTED"
              : "PENDING",
      };
    default:
      return null;
  }
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase cloud sync is not configured." },
      { status: 503 },
    );
  }

  let body: SyncRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const endpoint = body.endpoint ?? "";
  const item = body.item;
  const operation = body.operation ?? "CREATE";
  if (
    !supportedEndpoints.has(endpoint) ||
    !item ||
    !text(item.localId) ||
    !body.idempotencyKey
  ) {
    return NextResponse.json(
      { error: "Unsupported endpoint or incomplete sync payload." },
      { status: 422 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { data: existingOperation } = await supabase
    .from("sync_operations")
    .select("entity_local_id,status")
    .eq("owner_id", user.id)
    .eq("idempotency_key", body.idempotencyKey)
    .maybeSingle();
  if (existingOperation?.status === "APPLIED") {
    return NextResponse.json({
      success: true,
      idempotent: true,
      serverId: null,
    });
  }

  const row = mapRow(endpoint, item, user.id);
  if (!row) {
    return NextResponse.json({ error: "Unsupported sync entity." }, { status: 422 });
  }

  if (endpoint === "catch_logs") {
    const { data: trip } = await supabase
      .from("fishing_trips")
      .select("id")
      .eq("owner_id", user.id)
      .eq("local_id", text(item.tripId))
      .maybeSingle();
    Object.assign(row, { trip_id: trip?.id ?? null });
  }

  if (operation === "DELETE") {
    Object.assign(row, { deleted_at: new Date().toISOString() });
  }

  // The endpoint is allow-listed above. The cast keeps one generic handler while
  // generated types continue to protect table-specific repositories.
  // The runtime table is constrained by supportedEndpoints.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from(endpoint)
    .upsert(row, { onConflict: "owner_id,local_id" })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 422 });
  }

  const { error: operationError } = await supabase
    .from("sync_operations")
    .upsert(
      {
        owner_id: user.id,
        device_id: text(item.deviceId, "unknown-device"),
        idempotency_key: body.idempotencyKey,
        entity_type: endpoint,
        entity_local_id: text(item.localId),
        operation,
        client_version: Math.max(1, number(item.version, 1)),
        status: "APPLIED",
        payload: item as never,
      },
      { onConflict: "owner_id,idempotency_key" },
    );

  if (operationError) {
    return NextResponse.json({ error: operationError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, serverId: data.id });
}
