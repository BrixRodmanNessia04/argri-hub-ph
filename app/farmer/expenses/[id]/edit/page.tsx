"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, ExpenseEntity } from "@/lib/db";
import { updateExpense } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, TrendingDown, Save, CheckCircle2 } from "lucide-react";

export default function EditExpensePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const expId = resolvedParams.id;
  const router = useRouter();

  const expense = useLiveQuery(() => db.expenses.get(expId), [expId]);

  const [category, setCategory] = useState<ExpenseEntity["category"]>("FERTILIZER");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (expense) {
      setCategory(expense.category);
      setDescription(expense.description);
      setAmount(String(expense.amount));
      setDate(expense.date);
    }
  }, [expense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount) || 0;
    if (!description.trim() || val <= 0) return;

    await updateExpense(expId, {
      category,
      description: description.trim(),
      amount: val,
      date,
    });

    setFeedback("Expense record updated! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push(`/farmer/expenses/${expId}`);
    }, 1200);
  };

  if (!expense) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading expense details...</p>
          <Link href="/farmer/expenses" className="text-xs font-bold text-emerald-700 underline">
            Return to Expenses list
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href={`/farmer/expenses/${expId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel &amp; Back to Expense Detail
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <TrendingDown className="w-6 h-6 text-rose-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Edit Farm Expense
              </h1>
              <p className="text-xs text-slate-500">
                Update amount, category, or description.
              </p>
            </div>
          </div>

          {feedback && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseEntity["category"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="SEEDS">Seeds</option>
                  <option value="FERTILIZER">Fertilizer</option>
                  <option value="PESTICIDE">Pesticide</option>
                  <option value="LABOR">Labor</option>
                  <option value="EQUIPMENT_RENTAL">Equipment Rental</option>
                  <option value="FUEL">Fuel</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description *
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Amount (₱) *
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600 font-bold text-rose-600"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes (Offline Ready)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
