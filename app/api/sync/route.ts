import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface SyncHarvestRecord {
  farmerId?: string;
  crop: string;
  weightKg: number;
}

export async function POST(req: Request) {
  try {
    const { harvests } = await req.json();

    if (!Array.isArray(harvests) || harvests.length === 0) {
      return NextResponse.json(
        { error: "No harvest records provided" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn(
        "[AgriHub Cloud Sync] Supabase env variables not configured. Returning simulated successful sync."
      );
      return NextResponse.json({
        success: true,
        count: harvests.length,
        simulated: true,
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const rows = harvests.map((h: SyncHarvestRecord) => ({
      farmer_id: h.farmerId || "farmer-123",
      crop: h.crop,
      weight_kg: Number(h.weightKg),
      status: "PENDING",
    }));

    const { data, error } = await supabase.from("harvest_logs").insert(rows).select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: data?.length || rows.length,
      data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Sync API error:", error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
