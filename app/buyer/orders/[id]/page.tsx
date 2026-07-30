"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2, Truck, ShieldCheck } from "lucide-react";

export default function BuyerOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/buyer/orders" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                ORDER INVOICE &amp; FULFILLMENT
              </span>
              <h1 className="text-2xl font-extrabold text-white mt-1">
                Order #{resolvedParams.id}
              </h1>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              PayMongo Escrow Held
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Supplier Cooperative:</span>
                <span className="text-white font-bold">Benguet Farmers Cooperative #456</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Items Ordered:</span>
                <span className="text-white font-bold">300 kg Benguet Highland Cabbage</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Cold-Chain Status:</span>
                <span className="text-blue-400 font-bold">In Transit (Reefer Truck #CAR-809)</span>
              </div>
              <div className="flex justify-between text-white font-extrabold text-sm pt-2 border-t border-slate-800">
                <span>Total Tax Invoice:</span>
                <span className="text-emerald-400">₱12,000.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
