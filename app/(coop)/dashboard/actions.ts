"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function aggregateHarvest(coopId: string, crop: string) {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Supabase is not configured.",
    };
  }

  const typedClient = await createClient();
  const {
    data: { user },
  } = await typedClient.auth.getUser();
  if (!user) return { success: false, error: "Authentication required." };
  // Legacy tables predate the generated migration-003 types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = typedClient as any;

  // 1. Fetch all 'PENDING' harvest_logs for this crop
  const { data: pendingLogs, error: fetchError } = await supabase
    .from("harvest_logs")
    .select("id, weight_kg")
    .eq("crop", crop)
    .eq("status", "PENDING");

  if (fetchError) {
    console.error("Error fetching pending harvest logs:", fetchError);
    return { success: false, error: fetchError.message };
  }

  if (!pendingLogs || pendingLogs.length === 0) {
    return {
      success: false,
      error: `No pending harvest records found for crop: ${crop}`,
    };
  }

  // 2. Sum total weight
  const totalWeightKg = pendingLogs.reduce(
    (sum: number, log: { weight_kg: number | string | null }) =>
      sum + Number(log.weight_kg || 0),
    0
  );

  // 3. Create a new marketplace_listings row
  const defaultPricePerKg = 45.0; // Base fair-trade price per kg
  const { error: insertError } = await supabase
    .from("marketplace_listings")
    .insert({
      coop_id: coopId,
      crop: crop,
      total_weight_kg: totalWeightKg,
      price_per_kg: defaultPricePerKg,
    });

  if (insertError) {
    console.error("Error creating marketplace listing:", insertError);
    return { success: false, error: insertError.message };
  }

  // 4. Update harvest_logs statuses to 'AGGREGATED'
  const logIds = pendingLogs.map((log: { id: string }) => log.id);
  const { error: updateError } = await supabase
    .from("harvest_logs")
    .update({ status: "AGGREGATED" })
    .in("id", logIds);

  if (updateError) {
    console.error("Error updating harvest log status:", updateError);
    return { success: false, error: updateError.message };
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: `Successfully aggregated ${totalWeightKg} kg of ${crop} into Marketplace Listing!`,
  };
}
