"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, ExpenseEntity } from "@/lib/db";
import { createExpense, undoLastOperation } from "@/lib/farmerRepository";
import { getSelectionMemory, saveSelectionMemory } from "@/lib/selectionMemory";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, TrendingDown, Save, CheckCircle2, ChevronDown, RotateCcw, Plus } from "lucide-react";

function NewExpenseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryFarmId = searchParams.get("farmId");
  const queryPlotId = searchParams.get("plotId");
  const queryCycleId = searchParams.get("cropCycleId");

  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];
  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];
  const cycles = useLiveQuery(() => db.cropCycles.filter((c) => !c.isDeleted).toArray(), []) || [];

  const [category, setCategory] = useState<ExpenseEntity["category"]>("FERTILIZER");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [amount, setAmount] = useState("500");
  const [supplier, setSupplier] = useState("");
  const [farmId, setFarmId] = useState("");
  const [plotId, setPlotId] = useState("");
  const [cropCycleId, setCropCycleId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Fast-Save & Undo window state
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);
  const [undoBanner, setUndoBanner] = useState<{ active: boolean; message: string }>({ active: false, message: "" });

  useEffect(() => {
    const mem = getSelectionMemory();
    if (queryFarmId) setFarmId(queryFarmId);
    else if (mem.lastFarmId) setFarmId(mem.lastFarmId);

    if (queryPlotId) setPlotId(queryPlotId);
    else if (mem.lastPlotId) setPlotId(mem.lastPlotId);

    if (queryCycleId) setCropCycleId(queryCycleId);
    else if (mem.lastCropCycleId) setCropCycleId(mem.lastCropCycleId);
  }, [queryFarmId, queryPlotId, queryCycleId]);

  const handleQtyPriceChange = (q: string, p: string) => {
    setQuantity(q);
    setUnitPrice(p);
    const parsedQ = parseFloat(q);
    const parsedP = parseFloat(p);
    if (!isNaN(parsedQ) && !isNaN(parsedP)) {
      setAmount(String(parsedQ * parsedP));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount) || 0;
    if (!description.trim() || val <= 0) return;

    if (farmId) saveSelectionMemory({ lastFarmId: farmId });
    if (plotId) saveSelectionMemory({ lastPlotId: plotId });
    if (cropCycleId) saveSelectionMemory({ lastCropCycleId: cropCycleId });

    const newExpense = await createExpense({
      farmId: farmId || undefined,
      plotId: plotId || undefined,
      cropCycleId: cropCycleId || undefined,
      category,
      description: description.trim(),
      amount: val,
      quantity: quantity ? parseFloat(quantity) : undefined,
      unitPrice: unitPrice ? parseFloat(unitPrice) : undefined,
      supplier: supplier.trim() || undefined,
      date,
    });

    setLastSavedId(newExpense.localId);
    setUndoBanner({
      active: true,
      message: `Expense logged (-₱${val.toLocaleString()})! Saved locally.`,
    });

    // Reset simple form inputs for quick subsequent entry
    setDescription("");
    setAmount("500");
    setQuantity("");
    setUnitPrice("");

    // Auto-hide undo banner after 15 seconds
    setTimeout(() => {
      setUndoBanner({ active: false, message: "" });
    }, 15000);
  };

  const handleUndo = async () => {
    if (lastSavedId) {
      await undoLastOperation("expenses", lastSavedId);
      setLastSavedId(null);
      setUndoBanner({ active: false, message: "" });
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
      <Link
        href="/farmer/expenses"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Expenses
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <TrendingDown className="w-6 h-6 text-rose-600" />
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Log Farm Expense (Gastos sa Bukid)
            </h1>
            <p className="text-xs text-slate-500">
              Record inputs, seeds, fertilizer, labor, or equipment costs offline.
            </p>
          </div>
        </div>

        {/* FAST-SAVE & UNDO BANNER */}
        {undoBanner.active && (
          <div className="p-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex flex-wrap items-center justify-between gap-2 shadow-md animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{undoBanner.message}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndo}
                className="px-3 py-1 bg-white text-rose-700 hover:bg-rose-50 rounded-xl font-extrabold flex items-center gap-1 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Undo
              </button>
              <button
                onClick={() => setUndoBanner({ active: false, message: "" })}
                className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ESSENTIAL PRIMARY FIELDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category (Kategorya) *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseEntity["category"])}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="SEEDS">Seeds (Binhi)</option>
                <option value="SEEDLINGS">Seedlings</option>
                <option value="FERTILIZER">Fertilizer (Abono)</option>
                <option value="COMPOST">Compost</option>
                <option value="PESTICIDE">Pesticide (Pambomba)</option>
                <option value="HERBICIDE">Herbicide</option>
                <option value="LABOR">Labor (Trabahador)</option>
                <option value="EQUIPMENT_RENTAL">Equipment Rental</option>
                <option value="EQUIPMENT_REPAIR">Equipment Repair</option>
                <option value="FUEL">Fuel &amp; Gasoline</option>
                <option value="TRANSPORTATION">Transport &amp; Freight</option>
                <option value="PACKAGING">Packaging Boxes / Sacks</option>
                <option value="IRRIGATION">Irrigation / Water</option>
                <option value="COOP_FEES">Cooperative Fees</option>
                <option value="OTHER">Other Expense</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Total Amount (₱) *
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-extrabold text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Description / Particulars *
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

          {/* PROGRESSIVE DISCLOSURE: EXPANDABLE MORE DETAILS */}
          <details className="group border border-gray-200 rounded-2xl p-4 bg-slate-50">
            <summary className="cursor-pointer font-bold text-xs text-slate-700 flex items-center justify-between select-none">
              <span>More Details (Farm, Quantity, Supplier, Date)</span>
              <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" />
            </summary>

            <div className="space-y-3 pt-3 mt-2 border-t border-gray-200 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Supplier Store</label>
                  <input
                    type="text"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    placeholder="e.g. La Trinidad Agri Supply"
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQtyPriceChange(e.target.value, unitPrice)}
                    placeholder="e.g. 2"
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit Price (₱)</label>
                  <input
                    type="number"
                    value={unitPrice}
                    onChange={(e) => handleQtyPriceChange(quantity, e.target.value)}
                    placeholder="e.g. 1200"
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Associated Farm</label>
                  <select
                    value={farmId}
                    onChange={(e) => setFarmId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-semibold"
                  >
                    <option value="">-- Any Farm --</option>
                    {farms.map((f) => (
                      <option key={f.localId} value={f.localId}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Associated Crop Cycle</label>
                  <select
                    value={cropCycleId}
                    onChange={(e) => setCropCycleId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-semibold"
                  >
                    <option value="">-- Any Cycle --</option>
                    {cycles.map((c) => (
                      <option key={c.localId} value={c.localId}>{c.crop}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </details>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Expense (-₱{parseFloat(amount || "0").toLocaleString()})</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function NewExpensePage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading form...</div>}>
        <NewExpenseContent />
      </Suspense>
    </div>
  );
}
