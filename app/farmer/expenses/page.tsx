"use client";

import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, createBaseEntity, ExpenseEntity } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { TrendingDown, Plus, CheckCircle2, Trash2 } from "lucide-react";

export default function FarmerExpensesPage() {
  const expenses = useLiveQuery(() => db.expenses.toArray(), []) || [];

  const [category, setCategory] = useState<ExpenseEntity["category"]>("FERTILIZER");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("500");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount) || 0;
    if (!description.trim() || val <= 0) return;

    const newExp: ExpenseEntity = {
      ...createBaseEntity("farmer-123", "coop-456"),
      category,
      description: description.trim(),
      amount: val,
      date: new Date().toISOString().split("T")[0],
    };

    await db.expenses.add(newExp);
    setDescription("");
    setFeedback(`Expense logged: -₱${val.toLocaleString()} (${category})`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = async (localId: string) => {
    await db.expenses.delete(localId);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-rose-600" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Farm Expenses (Mga Gastos)
            </h1>
          </div>
          <p className="text-xs text-slate-600">
            Log farm inputs, seeds, fertilizer, labor, and transport costs offline.
          </p>

          {feedback && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleAddExpense} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category (Kategorya)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseEntity["category"])}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="FERTILIZER">Fertilizer (Abono)</option>
                <option value="SEEDS">Seeds (Binhi)</option>
                <option value="PESTICIDE">Pesticide (Pambomba)</option>
                <option value="LABOR">Farm Labor (Trabahador)</option>
                <option value="EQUIPMENT">Equipment &amp; Tools</option>
                <option value="TRANSPORT">Transport &amp; Fuel</option>
                <option value="OTHER">Other Expense</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Amount in ₱ (Halaga ng Gastos)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description / Particulars
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 1 sack 14-14-14 Complete Fertilizer"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Log Expense Entry (-₱{parseFloat(amount || "0").toLocaleString()})</span>
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Recorded Expenses ({expenses.length})
          </h2>

          {expenses.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500">
              No farm expenses recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map((e) => (
                <div
                  key={e.localId}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                        {e.category}
                      </span>
                      <span className="text-xs text-slate-400">{e.date}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">
                      {e.description}
                    </h3>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="font-extrabold text-base text-rose-600">
                      -₱{(e.amount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <button
                      onClick={() => handleDelete(e.localId)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
