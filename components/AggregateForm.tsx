"use client";

import React, { useState, useTransition } from "react";
import { aggregateHarvest } from "@/app/(coop)/dashboard/actions";
import { Layers, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function AggregateForm({
  availableCrops = ["Cabbage", "Eggplant", "Tomato"],
  coopId = "coop-456",
}: {
  availableCrops?: string[];
  coopId?: string;
}) {
  const [selectedCrop, setSelectedCrop] = useState(availableCrops[0] || "Cabbage");
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleAggregate = () => {
    setFeedback(null);
    startTransition(async () => {
      const res = await aggregateHarvest(coopId, selectedCrop);
      setFeedback({
        success: res.success,
        message: res.message || res.error || "Aggregation complete.",
      });
    });
  };

  return (
    <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-[#163025] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#059669]" />
            Pool &amp; Aggregate Harvests
          </h3>
          <p className="text-xs text-[#5f7469] mt-0.5">
            Bundle member crops into a bulk B2B Marketplace Listing
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          disabled={isPending}
          className="flex-1 px-4 py-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
        >
          {availableCrops.map((crop) => (
            <option key={crop} value={crop}>
              {crop} (Pending Lots)
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleAggregate}
          disabled={isPending}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Aggregating...</span>
            </>
          ) : (
            <>
              <Layers className="w-4 h-4" />
              <span>Aggregate to Marketplace</span>
            </>
          )}
        </button>
      </div>

      {feedback && (
        <div
          className={`mt-4 p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
            feedback.success
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-amber-500/10 border-amber-500/30 text-amber-300"
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}
    </div>
  );
}
