"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CoopLayout from "@/components/CoopLayout";
import { CoopAIOperationalSummary, OperationalAlert, AggregationSuggestion } from "@/lib/ai/types";
import {
  Bot,
  Sparkles,
  AlertTriangle,
  Layers,
  Send,
  MessageSquare,
  Scissors,
  Store,
  Clock,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  History,
} from "lucide-react";

export default function CoopAIPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CoopAIOperationalSummary | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fetchInsights = async (searchQuery: string = "") => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/coop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error("Failed to fetch AI insights:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights("");
  }, []);

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchInsights(query.trim());
  };

  const sampleQuestions = [
    "Which harvests need review today?",
    "Which products may run out this week?",
    "Group today's cabbage harvests into possible lots.",
    "Draft an SMS for farmers with pickups tomorrow.",
  ];

  return (
    <CoopLayout>
      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                DATA-GROUNDED AI OPERATIONS ASSISTANT
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1.5 flex items-center gap-2">
              <Bot className="w-6 h-6 text-teal-400" />
              Cooperative AI Operations Assistant
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Structured operational insights, harvest risk alerts, and lot aggregation recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/coop/ai/history"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 border border-slate-700"
            >
              <History className="w-4 h-4 text-teal-400" /> Audit Log
            </Link>
          </div>
        </div>

        {toastMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Natural Language Query Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            Ask About Cooperative Data &amp; Operations
          </h2>

          <form onSubmit={handleQuerySubmit} className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask e.g. 'Which harvests need review today?' or 'Group cabbage into lots'"
                className="flex-1 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-5 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-bold text-xs shadow-md flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Ask AI</span>
              </button>
            </div>
          </form>

          {/* Sample Questions Pills */}
          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <span className="text-[11px] font-bold text-slate-500 self-center">Try asking:</span>
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(q);
                  fetchInsights(q);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-300 text-[11px] font-medium border border-slate-800 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Query Result Response */}
        {data?.queryResponse && (
          <div className="bg-teal-950/40 border border-teal-500/40 rounded-3xl p-5 shadow-xl space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-teal-400 font-extrabold text-xs">
              <Bot className="w-4 h-4" />
              <span>AI Query Analysis Result</span>
            </div>
            <p className="text-slate-100 text-sm font-semibold leading-relaxed">
              {data.queryResponse}
            </p>
          </div>
        )}

        {/* Operational Summary */}
        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT: ALERTS & SUGGESTIONS */}
            <div className="lg:col-span-8 space-y-6">
              {/* Operational Risk Alerts */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    Items Requiring Attention ({data.alerts.length})
                  </h2>
                </div>

                <div className="space-y-3">
                  {data.alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-white text-sm">{alert.title}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                            alert.severity === "HIGH"
                              ? "bg-rose-950 text-rose-400 border border-rose-800"
                              : "bg-amber-950 text-amber-400 border border-amber-800"
                          }`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-slate-300 font-medium">{alert.description}</p>
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-teal-400 font-bold">
                        <span>Action: {alert.suggestedAction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Aggregation Groups */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-teal-400" />
                    Suggested Aggregation Lots ({data.aggregationSuggestions.length})
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {data.aggregationSuggestions.map((sug, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-400 font-extrabold text-[10px] border border-teal-800">
                          {sug.grade}
                        </span>
                        <h3 className="font-extrabold text-sm text-white mt-1.5">{sug.lotTitle}</h3>
                        <p className="text-slate-400 text-[11px] mt-0.5">{sug.commodity}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                        <div>
                          <span className="text-slate-400 text-[10px]">Total Volume</span>
                          <p className="font-extrabold text-emerald-400 text-sm">{sug.totalQuantityKg} kg</p>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 text-[10px]">Est. Value</span>
                          <p className="font-extrabold text-white text-sm">₱{sug.estimatedTotalValue.toLocaleString()}</p>
                        </div>
                      </div>

                      <Link
                        href="/coop/aggregation"
                        className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                      >
                        <Store className="w-3.5 h-3.5" /> Create Aggregated Lot
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: DRAFT MESSAGES & QUICK INSIGHTS */}
            <div className="lg:col-span-4 space-y-6">
              {/* Draft Announcement */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
                <h2 className="text-sm font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <MessageSquare className="w-4 h-4 text-teal-400" />
                  Suggested Draft Announcement / SMS
                </h2>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] leading-relaxed">
                  {data.suggestedDraftMessage}
                </div>

                <Link
                  href="/coop/messages"
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Send className="w-3.5 h-3.5 text-teal-400" /> Broadcast SMS to Farmers
                </Link>
              </div>

              {/* Safety & Human Approval Note */}
              <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 text-[11px] space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-teal-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Human Operational Control</span>
                </div>
                <p>
                  The AI Operations Assistant provides suggestions based on platform data. No harvests, listings, prices, or payouts are modified automatically without explicit manager approval.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CoopLayout>
  );
}
