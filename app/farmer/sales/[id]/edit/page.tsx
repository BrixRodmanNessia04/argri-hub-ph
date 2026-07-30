"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, SaleEntity } from "@/lib/db";
import { updateSale } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, DollarSign, Save, CheckCircle2 } from "lucide-react";

function EditSaleForm({ sale, saleId }: { sale: SaleEntity; saleId: string }) {
  const router = useRouter();
  const [buyerName, setBuyerName] = useState(sale.buyerName);
  const [crop, setCrop] = useState(sale.crop);
  const [weightKg, setWeightKg] = useState(String(sale.weightKg));
  const [pricePerKg, setPricePerKg] = useState(String(sale.pricePerKg));
  const [totalAmount, setTotalAmount] = useState(String(sale.totalAmount));
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(weightKg) || 0;
    const price = parseFloat(pricePerKg) || 0;
    if (!buyerName.trim() || !crop.trim() || qty <= 0) return;

    const net = parseFloat(totalAmount) || qty * price;

    await updateSale(saleId, {
      buyerName: buyerName.trim(),
      crop: crop.trim(),
      weightKg: qty,
      pricePerKg: price,
      totalAmount: net,
    });

    setFeedback("Sale record updated! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push(`/farmer/sales/${saleId}`);
    }, 1200);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <DollarSign className="w-6 h-6 text-amber-600" />
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            Edit Sale Entry
          </h1>
          <p className="text-xs text-slate-500">
            Update buyer, crop weight, or price per kg.
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
              Buyer Name *
            </label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Crop *
            </label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Quantity (Kg) *
            </label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Price per Kg (₱) *
            </label>
            <input
              type="number"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Total Revenue (₱) *
            </label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-bold text-emerald-700"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes (Offline Ready)</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditSalePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const saleId = resolvedParams.id;

  const sale = useLiveQuery(() => db.sales.get(saleId), [saleId]);

  if (!sale) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading sale record...</p>
          <Link href="/farmer/sales" className="text-xs font-bold text-emerald-700 underline">
            Return to Sales list
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
          href={`/farmer/sales/${saleId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel &amp; Back to Sale Detail
        </Link>

        <EditSaleForm sale={sale} saleId={saleId} />
      </main>
    </div>
  );
}
