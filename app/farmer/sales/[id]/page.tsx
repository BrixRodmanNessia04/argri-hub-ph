"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, DollarSign, Edit, Calendar } from "lucide-react";

export default function SaleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const saleId = resolvedParams.id;

  const sale = useLiveQuery(() => db.sales.get(saleId), [saleId]);

  if (!sale) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading sale record details...</p>
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

      <main className="max-w-3xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/sales"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sales
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-800">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                  {sale.buyerType || "DIRECT BUYER"}
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  Sale to {sale.buyerName}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Date Sold: {sale.soldAt}</span>
                </p>
              </div>
            </div>

            <Link
              href={`/farmer/sales/${sale.localId}/edit`}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <Edit className="w-4 h-4" /> Edit Sale
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Quantity &amp; Crop:</span>
              <p className="font-bold text-slate-900 mt-0.5">{sale.weightKg} kg {sale.crop}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Price per Kg:</span>
              <p className="font-bold text-slate-900 mt-0.5">₱{sale.pricePerKg}/kg</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Net Revenue:</span>
              <p className="font-extrabold text-emerald-700 text-base mt-0.5">
                +₱{sale.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <details className="text-xs text-slate-400 pt-2 border-t border-gray-100">
            <summary className="cursor-pointer font-bold hover:text-slate-600">Technical Details</summary>
            <div className="mt-2 space-y-1 font-mono text-[11px]">
              <p>Local ID: {sale.localId}</p>
              <p>Payment Status: {sale.paymentStatus || "PAID"}</p>
              <p>Sync Status: {sale.syncStatus}</p>
              <p>Device ID: {sale.deviceId}</p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}
