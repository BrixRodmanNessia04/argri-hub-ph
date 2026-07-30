"use client";

import React, { useState } from "react";
import FarmerSubNav from "@/components/FarmerSubNav";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { createSale, createExpense, recordInventoryMovement } from "@/lib/farmerRepository";
import { Mic, Send, Sparkles, CheckCircle2, Warehouse } from "lucide-react";

export default function FarmerQuickCapturePage() {
  const [smartInput, setSmartInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const inventoryItems = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted).toArray(), []) || [];

  const handleCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smartInput.trim()) return;

    const text = smartInput.trim();
    const lower = text.toLowerCase();

    const numMatch = text.match(/\d+(?:,\d+)?/);
    const amount = numMatch ? parseInt(numMatch[0].replace(/,/g, ""), 10) : 5;

    // Check if input mentions using an existing warehouse stock item
    const matchedItem = inventoryItems.find((i) => lower.includes(i.crop.toLowerCase()) || lower.includes(i.type.toLowerCase()));

    if (lower.includes("ginamit") || lower.includes("used") || lower.includes("applied") || lower.includes("bawas")) {
      if (matchedItem) {
        await recordInventoryMovement({
          inventoryItemId: matchedItem.localId,
          transactionType: "usage",
          quantityKg: Math.min(amount, matchedItem.quantityInKg || amount),
          reason: `AI Quick Logger: ${text}`,
        });
        setFeedback(`AI Parsed: Stock usage recorded for ${matchedItem.crop} (${amount} ${matchedItem.unit || "kg"}). Deducted from warehouse & linked to ledger.`);
      } else {
        await createExpense({
          category: "FERTILIZER",
          description: text,
          amount: amount * 40,
          date: new Date().toISOString().split("T")[0],
        });
        setFeedback(`AI Parsed & Recorded Expense: -₱${(amount * 40).toLocaleString()}`);
      }
    } else if (lower.includes("sold") || lower.includes("benta") || lower.includes("cabbage")) {
      const gross = amount * 40;
      await createSale({
        buyerName: "Wholesale Market",
        buyerType: "WHOLESALER",
        crop: "Benguet Cabbage",
        weightKg: amount,
        pricePerKg: 40,
        grossAmount: gross,
        totalAmount: gross,
        soldAt: new Date().toISOString().split("T")[0],
      });
      setFeedback(`AI Parsed & Recorded Sale: +₱${gross.toLocaleString()}`);
    } else {
      await createExpense({
        category: "FERTILIZER",
        description: text,
        amount: amount,
        date: new Date().toISOString().split("T")[0],
      });
      setFeedback(`AI Parsed & Recorded Expense: -₱${amount.toLocaleString()}`);
    }

    setSmartInput("");
    setTimeout(() => setFeedback(null), 3500);
  };

  const simulateMic = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setFeedback("Listening... Speak Tagalog or English");
      setTimeout(() => {
        setIsListening(false);
        setSmartInput("Ginamit 5kg abono 14-14-14 sa bukid");
      }, 1800);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20 font-sans">
      <FarmerSubNav />

      <main className="max-w-3xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                AI Quick Logger &amp; Warehouse Input Parser
              </h1>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              Voice / Text
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-4">
            Speak or type farm logs naturally (e.g. &quot;Ginamit 5kg abono&quot; or &quot;Nagbenta ng 50kg cabbage for ₱2,000&quot;). Stock usage is parsed and deducted automatically.
          </p>

          {feedback && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleCaptureSubmit} className="space-y-4">
            <textarea
              rows={4}
              value={smartInput}
              onChange={(e) => setSmartInput(e.target.value)}
              placeholder="Type or speak activity... (e.g. 'Ginamit 5kg abono sa bukid')"
              className="w-full p-4 rounded-2xl bg-slate-50 border border-gray-300 text-base font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={simulateMic}
                className={`px-5 py-3 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all ${
                  isListening
                    ? "bg-rose-600 text-white border-rose-600 animate-pulse"
                    : "bg-gray-100 border-gray-300 text-slate-700 hover:bg-gray-200"
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>{isListening ? "Listening..." : "Voice Input"}</span>
              </button>

              <button
                type="submit"
                disabled={!smartInput.trim()}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2 disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
                <span>Parse &amp; Deduct Stock</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
