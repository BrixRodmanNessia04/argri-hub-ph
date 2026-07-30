"use client";

import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { BookOpen, TrendingUp, TrendingDown, Coins } from "lucide-react";

export default function FarmerLedgerPage() {
  const sales = useLiveQuery(() => db.sales.toArray(), []) || [];
  const expenses = useLiveQuery(() => db.expenses.toArray(), []) || [];
  const activities = useLiveQuery(() => db.fieldActivities.toArray(), []) || [];

  const totalSales = sales.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalExpenses =
    expenses.reduce((sum, e) => sum + e.amount, 0) +
    activities.reduce((sum, a) => sum + (a.cost || 0), 0);
  const netIncome = totalSales - totalExpenses;

  // Combine sales and expenses into a single chronologically sorted ledger
  const combinedLedger = [
    ...sales.map((s) => ({
      id: s.localId,
      type: "SALE" as const,
      title: `Sold ${s.crop} (${s.weightKg} kg)`,
      amount: s.totalAmount,
      date: s.soldAt,
    })),
    ...expenses.map((e) => ({
      id: e.localId,
      type: "EXPENSE" as const,
      title: `${e.category}: ${e.description}`,
      amount: e.amount,
      date: e.date,
    })),
    ...activities
      .filter((a) => a.cost > 0)
      .map((a) => ({
        id: a.localId,
        type: "EXPENSE" as const,
        title: `Activity (${a.activityType}): ${a.description}`,
        amount: a.cost,
        date: a.loggedAt,
      })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Financial Ledger & Net Revenue (Libro ng Kita)
            </h1>
          </div>
          <p className="text-xs text-slate-600">
            Real-time income, farm costs, and net profit calculated from your offline records.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> Total Sales Revenue
              </span>
              <p className="text-xl font-extrabold text-emerald-600 mt-2">
                ₱{totalSales.toLocaleString()}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-rose-600" /> Total Farm Expenses
              </span>
              <p className="text-xl font-extrabold text-rose-600 mt-2">
                ₱{totalExpenses.toLocaleString()}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <Coins className="w-4 h-4 text-blue-600" /> Net Profit (Kikitain)
              </span>
              <p
                className={`text-xl font-extrabold mt-2 ${
                  netIncome >= 0 ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                ₱{netIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Full Financial Transactions ({combinedLedger.length})
          </h2>

          {combinedLedger.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500">
              No transactions recorded in the ledger yet. Add sales or expenses.
            </div>
          ) : (
            <div className="space-y-2">
              {combinedLedger.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-slate-900">{tx.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{tx.date}</p>
                  </div>
                  <span
                    className={`font-extrabold text-sm ${
                      tx.type === "SALE" ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {tx.type === "SALE" ? "+" : "-"}₱{tx.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
