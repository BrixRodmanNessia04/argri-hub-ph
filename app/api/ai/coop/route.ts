import { NextResponse } from "next/server";
import { coopAIProvider } from "@/lib/ai/provider";
import { verifyAIPermission } from "@/lib/ai/permissions";

export async function POST(req: Request) {
  try {
    if (!verifyAIPermission("COOP_LEADER")) {
      return NextResponse.json({ error: "Unauthorized AI access" }, { status: 403 });
    }

    const body = await req.json();
    const result = await coopAIProvider.generateStructuredResponse(body);

    return NextResponse.json(result);
  } catch (e: any) {
    console.error("Coop AI API Error:", e);
    return NextResponse.json({ error: e.message || "Failed to generate AI insights" }, { status: 500 });
  }
}
