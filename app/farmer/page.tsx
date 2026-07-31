"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { createExpense, createSale, createGeneralLog } from "@/lib/farmerRepository";
import {
  Tractor,
  Sparkles,
  Mic,
  Send,
  Sun,
  CloudRain,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  Wifi,
  WifiOff,
  ChevronRight,
  X,
  Save,
} from "lucide-react";
import CropInsights from "@/components/CropInsights";
import FarmerInventory from "@/components/FarmerInventory";
import FarmerSubNav from "@/components/FarmerSubNav";

export default function FarmerPwaMainPage() {
  const [smartInput, setSmartInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  // Confirmation Modal state for AI Smart Logger
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    logType: "SALE" | "EXPENSE" | "ACTIVITY" | "NOTE";
    title: string;
    amount: number;
    crop: string;
    rawText: string;
  }>({
    isOpen: false,
    logType: "EXPENSE",
    title: "",
    amount: 0,
    crop: "",
    rawText: "",
  });

  useEffect(() => {
    setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : true);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Pending Sync Queue count
  const pendingSyncQueue = useLiveQuery(
    () => db.syncQueue.toArray(),
    []
  ) || [];

  // Farmer User Profile from localSession
  const localSession = useLiveQuery(() => db.localSession.toCollection().first(), []) || null;
  const farmerName = localSession?.name || "Juan Farmer";

  // Real Ledger Data from Dexie
  const sales = useLiveQuery(() => db.sales.filter((s) => !s.isDeleted).toArray(), []) || [];
  const expenses = useLiveQuery(() => db.expenses.filter((e) => !e.isDeleted).toArray(), []) || [];
  const laborLogs = useLiveQuery(() => db.laborLogs.filter((l) => !l.isDeleted).toArray(), []) || [];

  const normalizedSales = sales.map((s) => ({
    id: s.localId,
    desc: `Sold ${s.weightKg || 0}kg ${s.crop || "Produce"}`,
    amount: Number(s.totalAmount ?? s.grossAmount ?? (s.weightKg && s.pricePerKg ? s.weightKg * s.pricePerKg : 0)) || 0,
    type: "SALE" as const,
    date: s.soldAt || s.createdAt || new Date().toISOString().split("T")[0],
    url: `/farmer/sales/${s.localId}`,
  }));

  const normalizedExpenses = expenses.map((e) => ({
    id: e.localId,
    desc: e.description || `${e.category} Expense`,
    amount: Number(e.amount) || 0,
    type: "COST" as const,
    date: e.date || e.createdAt || new Date().toISOString().split("T")[0],
    url: `/farmer/expenses/${e.localId}`,
  }));

  const normalizedLabor = laborLogs.map((l) => ({
    id: l.localId,
    desc: `Labor: ${l.workerGroup || l.workType || "Farm Worker"}`,
    amount: Number(l.totalCost) || 0,
    type: "COST" as const,
    date: l.date || l.createdAt || new Date().toISOString().split("T")[0],
    url: `/farmer/labor`,
  }));

  const totalSales = normalizedSales.reduce((sum, s) => sum + s.amount, 0);
  const totalExpenses = normalizedExpenses.reduce((sum, e) => sum + e.amount, 0) + normalizedLabor.reduce((sum, l) => sum + l.amount, 0);

  // Recent ledger entries combined
  const recentEntries = [
    ...normalizedSales,
    ...normalizedExpenses,
    ...normalizedLabor,
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // AI Parser & Confirmation dialog trigger
  const handleSmartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smartInput.trim()) return;

    const text = smartInput.trim();
    const lower = text.toLowerCase();

    const numMatch = text.match(/\d+(?:,\d+)?/);
    const parsedAmount = numMatch ? parseInt(numMatch[0].replace(/,/g, ""), 10) : 500;

    let detectedType: "SALE" | "EXPENSE" | "ACTIVITY" | "NOTE" = "EXPENSE";
    let cropName = "Benguet Cabbage";

    if (lower.includes("sold") || lower.includes("benta") || lower.includes("cabbage")) {
      detectedType = "SALE";
    } else if (lower.includes("spray") || lower.includes("tanim") || lower.includes("dilig")) {
      detectedType = "ACTIVITY";
    } else if (lower.includes("note") || lower.includes("sulat")) {
      detectedType = "NOTE";
    }

    setConfirmModal({
      isOpen: true,
      logType: detectedType,
      title: text,
      amount: parsedAmount,
      crop: cropName,
      rawText: text,
    });
  };

  const handleConfirmSave = async () => {
    const { logType, title, amount, crop } = confirmModal;

    if (logType === "SALE") {
      const gross = amount > 100 ? amount : amount * 40;
      await createSale({
        buyerName: "Wholesale Trader",
        buyerType: "WHOLESALER",
        crop,
        weightKg: amount > 100 ? Math.round(amount / 40) : amount,
        pricePerKg: 40,
        grossAmount: gross,
        totalAmount: gross,
        soldAt: new Date().toISOString().split("T")[0],
        notes: title,
      });
      setToastMessage(`AI Parsed & Recorded Sale: +₱${gross.toLocaleString()}`);
    } else if (logType === "EXPENSE") {
      await createExpense({
        category: "FERTILIZER",
        description: title,
        amount,
        date: new Date().toISOString().split("T")[0],
      });
      setToastMessage(`AI Parsed & Recorded Expense: -₱${amount.toLocaleString()}`);
    } else {
      await createGeneralLog({
        logType: "FARM_OBSERVATION",
        title: title,
        notes: title,
        date: new Date().toISOString().split("T")[0],
      });
      setToastMessage(`AI Parsed & Saved Farm Note: "${title}"`);
    }

    setConfirmModal({ ...confirmModal, isOpen: false });
    setSmartInput("");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const simulateMicToggle = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setToastMessage("Voice Input Active: Speak now or type text.");
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setSmartInput("Bumili ng abono 14-14-14 for ₱850");
      }, 1800);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28 font-sans">
      <FarmerSubNav />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-14 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-sm">
              <Tractor className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-slate-900 tracking-tight">
                Farmer Operations &amp; Inventory Hub
              </h1>
              <p className="text-xs font-semibold text-emerald-700">
                Light Theme • Offline-First PWA
              </p>
            </div>
          </div>

          {/* Header Badges */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-gray-300">
              {farmerName}
            </span>

            <Link
              href="/farmer/sync"
              className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all ${
                isOnline
                  ? pendingSyncQueue.length === 0
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                    : "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200"
                  : "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
              }`}
            >
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span>
                {isOnline
                  ? pendingSyncQueue.length === 0
                    ? "Online & Synced"
                    : `Online (${pendingSyncQueue.length} pending)`
                  : `Offline (${pendingSyncQueue.length} queued)`}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-5">
        {toastMessage && (
          <div className="p-3.5 mb-5 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col md:grid md:grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="md:col-span-4 space-y-5">
            {/* 1. AI SMART LOGGER */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <Link href="/farmer/quick-capture" className="flex items-center gap-2 group">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    AI Smart Logger
                  </h2>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </Link>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Tagalog / English
                </span>
              </div>

              <form onSubmit={handleSmartSubmit} className="space-y-3">
                <textarea
                  id="smart-ai-textarea"
                  rows={3}
                  value={smartInput}
                  onChange={(e) => setSmartInput(e.target.value)}
                  placeholder="Log activity, costs, or sales... (e.g., 'Bumili ng abono for ₱500')"
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-gray-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                />

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={simulateMicToggle}
                    className={`p-2.5 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition-all ${
                      isListening
                        ? "bg-rose-600 text-white border-rose-600 animate-pulse"
                        : "bg-gray-100 border-gray-300 text-slate-700 hover:bg-gray-200"
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    <span>{isListening ? "Listening..." : "Voice"}</span>
                  </button>

                  <button
                    id="submit-ai-logger-btn"
                    type="submit"
                    disabled={!smartInput.trim()}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 disabled:opacity-40 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Log to Ledger</span>
                  </button>
                </div>
              </form>
            </section>

            {/* 2. WEATHER CARD */}
            <Link
              href="/farmer/weather"
              className="block bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-emerald-500 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600 group-hover:bg-amber-200">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <span>Hyper-Local Weather</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                    </p>
                    <p className="text-sm font-extrabold text-slate-900">
                      La Trinidad, Benguet: 22°C (Cached)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-blue-600 font-bold text-xs bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>Rain 70%</span>
                </div>
              </div>
            </Link>

            {/* 3. FINANCIAL LEDGER */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <Link href="/farmer/ledger" className="flex items-center gap-2 group">
                  <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Financial Ledger (This Month)
                  </h2>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                  <p className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                    Total Costs
                  </p>
                  <p className="text-base font-extrabold text-rose-600 mt-1">
                    ₱{totalExpenses.toLocaleString()}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <p className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    Total Sales
                  </p>
                  <p className="text-base font-extrabold text-emerald-600 mt-1">
                    ₱{totalSales.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                {recentEntries.length === 0 ? (
                  <p className="text-xs text-slate-500 py-2 text-center">No transactions recorded yet.</p>
                ) : (
                  recentEntries.map((tx) => (
                    <Link
                      key={tx.id}
                      href={tx.url}
                      className="py-1.5 px-2.5 rounded-lg bg-slate-50 border border-gray-200 hover:bg-slate-100 flex items-center justify-between text-xs transition-colors"
                    >
                      <span className="font-semibold text-slate-800 truncate max-w-[170px]">
                        {tx.desc}
                      </span>
                      <span
                        className={`font-bold ${
                          tx.type === "SALE" ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {tx.type === "SALE" ? "+" : "-"} ₱
                        {(tx.amount || 0).toLocaleString()}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-8 space-y-6">
            <CropInsights />
            <FarmerInventory />
          </div>
        </div>
      </main>

      {/* AI Smart Logger Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Confirm AI Parsed Log
                </h3>
              </div>
              <button
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                className="p-1.5 rounded-full hover:bg-gray-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Detected Type</label>
                <select
                  value={confirmModal.logType}
                  onChange={(e) => setConfirmModal({ ...confirmModal, logType: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 font-semibold"
                >
                  <option value="SALE">SALE (Benta)</option>
                  <option value="EXPENSE">EXPENSE (Gastos / Abono)</option>
                  <option value="ACTIVITY">FIELD ACTIVITY (Gawain)</option>
                  <option value="NOTE">GENERAL NOTE</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description / Title</label>
                <input
                  type="text"
                  value={confirmModal.title}
                  onChange={(e) => setConfirmModal({ ...confirmModal, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Amount (₱ or Kg)</label>
                <input
                  type="number"
                  value={confirmModal.amount}
                  onChange={(e) => setConfirmModal({ ...confirmModal, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 font-extrabold text-emerald-700"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" /> Save Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
