import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

async function authenticatedClient() {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured.", status: 503 } as const;
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication required.", status: 401 } as const;
  return { supabase, user } as const;
}

export async function GET(request: Request) {
  const auth = await authenticatedClient();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const { supabase, user } = auth;
  const url = new URL(request.url);
  const threadId = url.searchParams.get("id");
  const contextOnly = url.searchParams.get("context") === "1";

  if (contextOnly) {
    const [{ data: memberships, error: membershipError }, { data: cooperatives, error: cooperativeError }] =
      await Promise.all([
        supabase
          .from("organization_memberships")
          .select("organization_id,role_in_organization,organizations(id,name,type,verification_status)")
          .eq("user_id", user.id)
          .eq("status", "ACTIVE"),
        supabase
          .from("organizations")
          .select("id,name,type,verification_status")
          .eq("type", "cooperative")
          .eq("verification_status", "VERIFIED")
          .order("name"),
      ]);
    const error = membershipError ?? cooperativeError;
    if (error) return NextResponse.json({ error: error.message }, { status: 422 });
    return NextResponse.json({ memberships, cooperatives });
  }

  if (threadId) {
    const [negotiation, offers, messages, events, orders] = await Promise.all([
      supabase
        .from("negotiations")
        .select("*,buyer:organizations!negotiations_buyer_organization_id_fkey(id,name),cooperative:organizations!negotiations_cooperative_organization_id_fkey(id,name)")
        .eq("id", threadId)
        .single(),
      supabase
        .from("negotiation_offers")
        .select("*")
        .eq("negotiation_id", threadId)
        .order("offer_number"),
      supabase
        .from("negotiation_messages")
        .select("*,sender_organization:organizations!negotiation_messages_sender_organization_id_fkey(name)")
        .eq("negotiation_id", threadId)
        .is("deleted_at", null)
        .order("created_at"),
      supabase
        .from("negotiation_events")
        .select("*")
        .eq("negotiation_id", threadId)
        .order("created_at"),
      supabase
        .from("orders")
        .select("*")
        .eq("negotiation_id", threadId)
        .limit(1),
    ]);
    const error =
      negotiation.error ?? offers.error ?? messages.error ?? events.error ?? orders.error;
    if (error) return NextResponse.json({ error: error.message }, { status: 422 });
    return NextResponse.json({
      negotiation: negotiation.data,
      offers: offers.data,
      messages: messages.data,
      events: events.data,
      order: orders.data?.[0] ?? null,
    });
  }

  const { data, error } = await supabase
    .from("negotiations")
    .select("*,buyer:organizations!negotiations_buyer_organization_id_fkey(id,name),cooperative:organizations!negotiations_cooperative_organization_id_fkey(id,name)")
    .is("deleted_at", null)
    .order("last_activity_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 422 });
  return NextResponse.json({ negotiations: data });
}

export async function POST(request: Request) {
  const auth = await authenticatedClient();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const { supabase } = auth;
  const body = await request.json();
  const action = String(body.action ?? "");

  let result;
  switch (action) {
    case "create":
      result = await supabase.rpc("create_negotiation", {
        p_buyer_organization_id: body.buyerOrganizationId,
        p_cooperative_organization_id: body.cooperativeOrganizationId,
        p_listing_id: body.listingId || "",
        p_commodity_id: body.commodityId,
        p_commodity_name: body.commodityName,
        p_product_sector: body.productSector,
        p_inventory_item_id: body.inventoryItemId || null,
        p_quantity: body.quantity,
        p_unit: body.unit || "kg",
        p_unit_price: body.unitPrice,
        p_delivery_date: body.deliveryDate,
        p_delivery_location: body.deliveryLocation,
        p_payment_terms: body.paymentTerms,
        p_quality_grade: body.qualityGrade,
        p_quality_notes: body.qualityNotes || null,
        p_notes: body.notes || null,
        p_expires_at: body.expiresAt || null,
        p_reservation_rule: body.reservationRule || "on_confirmation",
      });
      break;
    case "counter":
      result = await supabase.rpc("counter_negotiation", {
        p_negotiation_id: body.negotiationId,
        p_quantity: body.quantity,
        p_unit: body.unit || "kg",
        p_unit_price: body.unitPrice,
        p_delivery_date: body.deliveryDate,
        p_delivery_location: body.deliveryLocation,
        p_payment_terms: body.paymentTerms,
        p_quality_grade: body.qualityGrade,
        p_quality_notes: body.qualityNotes || null,
        p_notes: body.notes || null,
        p_valid_until: body.validUntil || null,
      });
      break;
    case "accept":
      result = await supabase.rpc("accept_negotiation", {
        p_negotiation_id: body.negotiationId,
      });
      break;
    case "reject":
    case "withdraw":
      result = await supabase.rpc("respond_to_negotiation", {
        p_negotiation_id: body.negotiationId,
        p_action: action,
      });
      break;
    case "message":
      result = await supabase.rpc("add_negotiation_message", {
        p_negotiation_id: body.negotiationId,
        p_message: body.message,
      });
      break;
    case "confirm_order":
      result = await supabase.rpc("confirm_negotiated_order", {
        p_order_id: body.orderId,
      });
      break;
    default:
      return NextResponse.json({ error: "Unsupported negotiation action." }, { status: 400 });
  }

  if (result.error) {
    return NextResponse.json({ error: result.error.message }, { status: 422 });
  }
  return NextResponse.json({ success: true, data: result.data });
}

