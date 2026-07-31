"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApplicationContext } from "@/lib/ApplicationContext";
import { useAppRoute } from "@/lib/navigation";
import {
  Store,
  ShoppingCart,
  CheckCircle2,
  Plus,
  Trash2,
  CreditCard,
  MapPin,
  ShieldCheck,
  Truck,
  Sprout,
  X,
  Handshake,
  Fish,
} from "lucide-react";

interface ProduceItem {
  id: string;
  name: string;
  coopName: string;
  origin: string;
  availableKg: number;
  pricePerKg: number;
  grade: string;
  category: string;
  sector?: "agriculture" | "fisheries";
  demoListingId?: string;
}

interface CartItem {
  produce: ProduceItem;
  quantityKg: number;
}

export default function BuyerMarketPage() {
  const buildRoute = useAppRoute();
  const { mode } = useApplicationContext();
  const produceCatalog: ProduceItem[] = [
    {
      id: "prod-1",
      name: "Benguet Highland Cabbage",
      coopName: "Benguet Farmers Coop #456",
      origin: "La Trinidad, Benguet",
      availableKg: 500,
      pricePerKg: 40.0,
      grade: "Class A - Premium Head",
      category: "Cruciferous",
      demoListingId: "list-1",
    },
    {
      id: "prod-fish-1",
      name: "Dagupan Milkfish (Bangus)",
      coopName: "Dagupan Aquaculturists Cooperative",
      origin: "Dagupan, Pangasinan",
      availableKg: 1200,
      pricePerKg: 160,
      grade: "Class A - Chilled",
      category: "Aquaculture",
      sector: "fisheries",
      demoListingId: "list-2",
    },
    {
      id: "prod-2",
      name: "Atok Sweet Carrots",
      coopName: "Benguet Farmers Coop #456",
      origin: "Atok, Benguet",
      availableKg: 350,
      pricePerKg: 55.0,
      grade: "Class A - Washed Select",
      category: "Root Crops",
    },
    {
      id: "prod-3",
      name: "Mountain Purple Eggplant",
      coopName: "Benguet Farmers Coop #456",
      origin: "Tublay, Benguet",
      availableKg: 280,
      pricePerKg: 48.0,
      grade: "Class A - Standard",
      category: "Solanaceous",
    },
    {
      id: "prod-4",
      name: "Baguio Vine-Ripened Tomatoes",
      coopName: "Benguet Farmers Coop #456",
      origin: "Buguias, Benguet",
      availableKg: 620,
      pricePerKg: 60.0,
      grade: "Class A - Large Export",
      category: "Solanaceous",
    },
    {
      id: "prod-5",
      name: "Highland Romaine Lettuce",
      coopName: "Benguet Farmers Coop #456",
      origin: "La Trinidad, Benguet",
      availableKg: 190,
      pricePerKg: 85.0,
      grade: "Hydroponic Premium",
      category: "Leafy Greens",
    },
    {
      id: "prod-6",
      name: "Sweet Bell Peppers (Green/Red)",
      coopName: "Benguet Farmers Coop #456",
      origin: "Atok, Benguet",
      availableKg: 140,
      pricePerKg: 110.0,
      grade: "Class A - Crisp",
      category: "Peppers",
    },
  ];

  const [cart, setCart] = useState<CartItem[]>([
    {
      produce: produceCatalog[0],
      quantityKg: 100,
    },
  ]);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const addToCart = (produce: ProduceItem, kg: number = 50) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.produce.id === produce.id);
      if (existing) {
        return prev.map((item) =>
          item.produce.id === produce.id
            ? { ...item, quantityKg: item.quantityKg + kg }
            : item
        );
      }
      return [...prev, { produce, quantityKg: kg }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.produce.id !== id));
  };

  const totalKg = cart.reduce((sum, item) => sum + item.quantityKg, 0);
  const totalCost = cart.reduce(
    (sum, item) => sum + item.quantityKg * item.produce.pricePerKg,
    0
  );

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      {/* Storefront Header */}
      <header className="bg-white border-b border-[#dce9df] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                B2B DIRECT WHOLESALE
              </span>
              <span className="text-xs text-[#5f7469]">Coop-Verified Supply Chain</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#163025] tracking-tight mt-1.5">
              AgriHub B2B Produce Market
            </h1>
            <p className="text-sm text-[#5f7469] mt-1">
              Direct-from-cooperative wholesale produce for Metro Manila supermarkets, restaurants &amp; distributors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-xs font-bold">
              <Truck className="w-4 h-4 text-[#059669]" />
              <span>Cold-Chain Next-Day Delivery</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>Escrow Protected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid & Sticky Cart Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Area: Produce Catalog Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#163025] flex items-center gap-2">
              <Store className="w-5 h-5 text-[#059669]" />
              Available Wholesale Lots ({produceCatalog.length})
            </h2>
            <span className="text-xs text-[#5f7469]">Minimum wholesale increment: 50 kg</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {produceCatalog.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#dce9df] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#059669] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                      {item.sector === "fisheries" ? <Fish className="w-3.5 h-3.5" /> : <Sprout className="w-3.5 h-3.5" />}
                      {item.category}
                    </span>
                    <span className="text-xs text-[#5f7469] font-medium">
                      {item.grade}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#163025] group-hover:text-[#059669] transition-colors">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#5f7469] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#5f7469]" />
                    <span>{item.origin}</span>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#5f7469]">Wholesale Price</p>
                      <p className="text-xl font-extrabold text-[#059669]">
                        ₱{item.pricePerKg.toFixed(2)}{" "}
                        <span className="text-xs font-normal text-[#5f7469]">/ kg</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#5f7469]">Available Pool</p>
                      <p className="font-bold text-[#163025]">{item.availableKg} kg</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#dce9df] grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => addToCart(item, 50)}
                    className="py-2.5 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add 50 kg to Cart</span>
                  </button>
                  <Link
                    href={buildRoute(`/buyer/negotiations?${new URLSearchParams({
                      ...(mode === "demo" && item.demoListingId ? { listingId: item.demoListingId } : {}),
                      commodityId: item.id,
                      commodityName: item.name,
                      sector: item.sector ?? "agriculture",
                    }).toString()}`)}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#ecfdf5] text-[#047857] font-bold text-xs border border-[#a7f3d0] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Handshake className="w-4 h-4" />
                    Negotiate terms
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area: Floating B2B Cart Summary */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl sticky top-20">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-400" />
                Wholesale Order Cart
              </h3>
              <span
                id="cart-items-count"
                className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold border border-blue-500/30"
              >
                {cart.length} lots
              </span>
            </div>

            {/* Cart Line Items */}
            <div className="my-4 space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.produce.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-sm"
                  >
                    <div className="pr-2">
                      <p className="font-semibold text-white text-xs">
                        {item.produce.name}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.quantityKg} kg × ₱{item.produce.pricePerKg.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-emerald-400 text-xs">
                        ₱{(item.quantityKg * item.produce.pricePerKg).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.produce.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs">
                  Your B2B cart is empty. Select wholesale lots from the catalog.
                </div>
              )}
            </div>

            {/* Total Calculation */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Wholesale Weight</span>
                <span className="font-bold text-white">{totalKg.toLocaleString()} kg</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Logistics &amp; Cold Storage</span>
                <span className="font-semibold text-emerald-400">Included</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="font-bold text-white">Total Order Cost</span>
                <span
                  id="cart-total-cost"
                  className="text-2xl font-extrabold text-emerald-400"
                >
                  ₱{totalCost.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Trigger Button */}
            <button
              id="proceed-checkout-btn"
              type="button"
              disabled={cart.length === 0}
              onClick={() => setIsCheckoutModalOpen(true)}
              className="w-full mt-6 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all disabled:opacity-40 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Proceed to Checkout (PayMongo)</span>
            </button>

            <p className="text-[11px] text-center text-slate-500 mt-3 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Escrow release upon Manila cold-storage delivery verification</span>
            </p>
          </div>
        </div>
      </main>

      {/* Checkout Confirmation Modal (PayMongo Prototype) */}
      {isCheckoutModalOpen && (
        <div
          id="checkout-modal"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[92dvh] overflow-y-auto pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold border border-blue-500/20">
                PAYMONGO ESCROW PROTOTYPE
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-3">
                Order Confirmed!
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Transaction ID: <span className="text-emerald-400 font-mono">AGRI-PM-90842</span>
              </p>

              <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Total Order Volume:</span>
                  <span className="font-bold text-white">{totalKg} kg</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Total Amount Paid:</span>
                  <span className="font-extrabold text-emerald-400">
                    ₱{totalCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Payment Gateway:</span>
                  <span className="font-semibold text-blue-400">PayMongo Corporate</span>
                </div>
              </div>

              <button
                id="close-order-modal-btn"
                type="button"
                onClick={() => {
                  setCart([]);
                  setIsCheckoutModalOpen(false);
                }}
                className="w-full mt-6 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all cursor-pointer"
              >
                Done • Return to Market
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
