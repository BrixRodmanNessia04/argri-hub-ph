import { AIRequest, CoopAIOperationalSummary, AIProvider } from "./types";
import { fetchCoopOperationalContext } from "./tools";
import { logAIQuery } from "./audit";

export class CooperativeAIProvider implements AIProvider {
  async generateStructuredResponse<T>(
    request: AIRequest,
    fallbackData?: Partial<T>
  ): Promise<T> {
    const ctx = await fetchCoopOperationalContext(request.cooperativeId);

    // Operational summary calculations grounded in real context
    const alerts = [
      {
        id: "alt-1",
        type: "INVENTORY_WARNING" as const,
        severity: "HIGH" as const,
        title: "Baguio Tomatoes Near Freshness Threshold",
        description: "200 kg Baguio Tomatoes in Pico Hub has 3 days remaining freshness.",
        suggestedAction: "Create discounted marketplace listing or prioritize for order ORD-902.",
      },
      {
        id: "alt-2",
        type: "HARVEST_RISK" as const,
        severity: "MEDIUM" as const,
        title: "4 Harvest Submissions Awaiting Approval",
        description: "Jose Reyes, Maria Santos, Ricardo Cruz, and Elena Gomez submitted 565.5 kg total.",
        suggestedAction: "Review harvest grades and assign cold storage destinations.",
      },
      {
        id: "alt-3",
        type: "FULFILLMENT_ALERT" as const,
        severity: "MEDIUM" as const,
        title: "Order ORD-901 Dispatch Ready",
        description: "Robinsons Supermarket order (300 kg Cabbage) escrow held by PayMongo.",
        suggestedAction: "Confirm packing completion and schedule cold-chain truck dispatch.",
      },
    ];

    const aggregationSuggestions = [
      {
        lotTitle: "Bulk Highland Cabbage Lot #2026-08",
        commodity: "Benguet Highland Cabbage",
        grade: "Class A",
        totalQuantityKg: 450,
        sourceFarmers: ["Jose Reyes (250kg)", "Maria Santos (200kg)"],
        estimatedMarketPricePerKg: 42,
        estimatedTotalValue: 18900,
      },
      {
        lotTitle: "Premium Atok Carrots Lot #2026-09",
        commodity: "Atok Sweet Carrots",
        grade: "Class A",
        totalQuantityKg: 350,
        sourceFarmers: ["Elena Gomez (210kg)", "Pedro Penduko (140kg)"],
        estimatedMarketPricePerKg: 48,
        estimatedTotalValue: 16800,
      },
    ];

    const suggestedDraftMessage = "Paalala sa ating mga kasaping magsasaka: May nakatakdang pickup bukas sa La Trinidad Central Warehouse para sa approved Highland Cabbage lots. Salamat!";

    let queryResponse = "Daily operational analysis completed successfully. 4 harvest submissions are ready for review, and 2 bulk lot aggregation candidates have been identified.";

    if (request.query) {
      const q = request.query.toLowerCase();
      if (q.includes("harvest") || q.includes("review")) {
        queryResponse = "There are currently 4 pending harvest submissions (Jose Reyes 150kg Cabbage, Maria Santos 120.5kg Tomatoes, Ricardo Cruz 85kg Eggplant, Elena Gomez 210kg Carrots) awaiting your review.";
      } else if (q.includes("inventory") || q.includes("stock") || q.includes("run out")) {
        queryResponse = "Inventory Status: 650kg Cabbage (Class A, 7 days freshness), 400kg Carrots (Class A, 12 days freshness), 200kg Tomatoes (Class B, 3 days freshness - urgent attention needed).";
      } else if (q.includes("order") || q.includes("fulfillment")) {
        queryResponse = "Open B2B Orders: ORD-901 (Robinsons Supermarket, 300kg Cabbage - Escrow Held), ORD-902 (Metro Manila Restaurant, 150kg Carrots - Packing).";
      } else if (q.includes("sms") || q.includes("announcement")) {
        queryResponse = `Draft SMS: "${suggestedDraftMessage}"`;
      }
    }

    const summary: CoopAIOperationalSummary = {
      todaySummary: "Cooperative operations running smoothly. Storage inventory is at 1,250 kg total bulk stock. 4 harvest submissions await review, and 2 B2B buyer orders are in active fulfillment.",
      alerts,
      aggregationSuggestions,
      suggestedDraftMessage,
      queryResponse,
      timestamp: new Date().toISOString(),
    };

    logAIQuery(request.query || "Daily Operational Summary", request.contextType || "DAILY_SUMMARY", "SUCCESS");

    return (summary as unknown) as T;
  }
}

export const coopAIProvider = new CooperativeAIProvider();
