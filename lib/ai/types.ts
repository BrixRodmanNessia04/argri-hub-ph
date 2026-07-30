// AI Service Core Interfaces & Schemas for Cooperative Operations

export interface AIRequest {
  query: string;
  contextType?: "DAILY_SUMMARY" | "HARVEST_RISK" | "AGGREGATION_SUGGESTION" | "INVENTORY_WARNING" | "ORDER_FULFILLMENT" | "CUSTOM_QUERY";
  cooperativeId?: string;
  parameters?: Record<string, unknown>;
}

export interface OperationalAlert {
  id: string;
  type: "HARVEST_RISK" | "INVENTORY_WARNING" | "FULFILLMENT_ALERT" | "FARMER_FOLLOWUP";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  title: string;
  description: string;
  suggestedAction: string;
}

export interface AggregationSuggestion {
  lotTitle: string;
  commodity: string;
  grade: string;
  totalQuantityKg: number;
  sourceFarmers: string[];
  estimatedMarketPricePerKg: number;
  estimatedTotalValue: number;
}

export interface CoopAIOperationalSummary {
  todaySummary: string;
  alerts: OperationalAlert[];
  aggregationSuggestions: AggregationSuggestion[];
  suggestedDraftMessage?: string;
  queryResponse?: string;
  timestamp: string;
}

export interface AIProvider {
  generateStructuredResponse<T>(
    request: AIRequest,
    fallbackData?: Partial<T>
  ): Promise<T>;
}
