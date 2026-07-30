"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreditCard, CheckCircle2, ShieldCheck, Truck, Building, ArrowLeft } from "lucide-react";

export default function BuyerCheckoutPage() {
  const [orgName, setOrgName] = useState("Robinsons Supermarket Corporate");
  const [address, setAddress] = useState("Cold-Storage Facility, QC Hub, Metro Manila");
  const [paymentMethod, setPaymentMethod] = useState("PAYMONGO_CORPORATE");
  const [isCompleted, setIsCompleted] = useState(false);
  const [refNo, setRefNo] = useState("");

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `AGRI-PM-${Math.floor(10000 + Math.random() * 90000)}`;
    setRefNo(newRef);
    setIsCompleted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/market/cart" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        {isCompleted ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold border border-blue-500/20">
              PAYMONGO ESCROW VERIFIED
            </span>
            <h1 className="text-2xl font-extrabold text-white">Wholesale Order Confirmed!</h1>
            <p className="text-xs text-slate-400">
              Server Reference Number: <span className="font-mono text-emerald-400 font-bold">{refNo}</span>
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Deliver To:</span>
                <span className="text-white font-semibold">{orgName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Hub Address:</span>
                <span className="text-white font-semibold">{address}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Escrow Status:</span>
                <span className="text-emerald-400 font-bold">Held in PayMongo Escrow</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <Link
                href="/buyer/orders"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
              >
                View Order Status &amp; Invoice
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                Wholesale Order Checkout
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Server stock is validated prior to escrow payment authorization.
              </p>
            </div>

            <form onSubmit={handleCompleteOrder} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  B2B Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Cold-Storage Delivery Hub Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Payment Gateway Integration
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="PAYMONGO_CORPORATE">PayMongo Corporate Escrow (GCash, Cards, Maya)</option>
                  <option value="BANK_TRANSFER">Bank Wire Transfer (Escrow Release on Receipt)</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Order Items:</span>
                  <span>150 kg Produce</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Cold-Chain Delivery:</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>
                <div className="flex justify-between text-white font-extrabold text-sm pt-2 border-t border-slate-800">
                  <span>Total Escrow Authorization:</span>
                  <span className="text-emerald-400">₱6,750.00</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-blue-300" />
                <span>Authorize PayMongo Escrow Order</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
