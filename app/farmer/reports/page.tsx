"use client";

import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { BarChart3, TrendingUp, TrendingDown, Scissors, DollarSign } from "lucide-react";

export default function FarmerReportsPage() {
  const sales = useLiveQuery(() => db.sales.filter((s) => !s.isDeleted).toArray(), []) || [];
  const expenses = useLiveQuery(() => db.expenses.filter((e) => !e.isDeleted).toArray(), []) || [];
  const harvests = useLiveQuery(() => db.harvests.filter((h) => !h.isDeleted).toArray(), []) || [];
  const activities = useLiveQuery(() => db.fieldActivities.filter((a) => !a.isDeleted).toArray(), []) || [];

  const totalSales = sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalHarvestKg = harvests.reduce((sum, h) => sum + (h.weightKg || 0), 0);
  const netIncome = totalSales - totalExpenses;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Farm Profitability &amp; Activity Reports
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Real-time analytics generated locally from your IndexedDB farm logs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-500">Gross Sales Income</span>
            <p className="text-xl font-extrabold text-emerald-700 mt-2">
              ₱{totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-500">Total Farm Expenses</span>
            <p className="text-xl font-extrabold text-rose-600 mt-2">
              -₱{totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-500">Estimated Net Income</span>
            <p className={`text-xl font-extrabold mt-2 ${netIncome >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
              ₱{netIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-500">Total Harvested Produce</span>
            <p className="text-xl font-extrabold text-teal-700 mt-2">
              {totalHarvestKg.toLocaleString()} kg
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Summary Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-100 space-y-1">
              <span className="font-bold text-slate-800">Field Activities Logged:</span>
              <p className="text-slate-600">{activities.length} activities completed</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-100 space-y-1">
              <span className="font-bold text-slate-800">Harvest Submissions:</span>
              <p className="text-slate-600">{harvests.length} harvest entries</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
