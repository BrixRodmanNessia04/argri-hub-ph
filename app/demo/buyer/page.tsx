"use client";

import React, { useState, useEffect } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { seedDemoDatabase, demoDb, DemoListing, DemoOrder } from "@/lib/demoDb";
import { useLiveQuery } from "dexie-react-hooks";
import { Store, ShoppingCart, ShieldCheck, CheckCircle2, Search, ArrowRight, X, CreditCard } from "lucide-react";

export default function CompleteBuyerDemoPage() {
  const [activeTab, setActiveTab] = useState<"catalog" | "cart" | "orders">("catalog");

  useEffect(() => {
    seedDemoDatabase();
  }, []);

  const listings = useLiveQuery(() => demoDb.demoListings.toArray(), []) || [];
  const orders = useLiveQuery(() => demoDb.demoOrders.toArray(), []) || [];

  // Cart & Checkout state
  const [cart, setCart] = useState<{ listing: DemoListing; quantityKg: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListing, setSelectedListing] = useState<DemoListing | null>(null);

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleAddToCart = (item: DemoListing) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.listing.localId === item.localId);
      if (existing) {
        return prev.map((c) => (c.listing.localId === item.localId ? { ...c, quantityKg: c.quantityKg + 100 } : c));
      }
      return [...prev, { listing: item, quantityKg: 500 }];
    });
    setActiveTab("cart");
  };

  const handleSimulateCheckout = async () => {
    for (const c of cart) {
      await demoDb.demoOrders.put({
        localId: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        listingTitle: c.listing.title,
        coopName: c.listing.coopName,
        weightKg: c.quantityKg,
        totalPrice: c.quantityKg * c.listing.pricePerKg,
        status: "ESCROW_PAID",
        orderedAt: new Date().toISOString().split("T")[0],
      });
    }
    setCart([]);
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setActiveTab("orders");
    }, 1500);
  };

  const filteredListings = listings.filter(
    (l) => l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.coopName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartTotal = cart.reduce((sum, c) => sum + c.quantityKg * c.listing.pricePerKg, 0);

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <DemoHeader roleName="B2B Commercial Buyer (Full Application)" />

      {/* Sub Navigation */}
      <div className="bg-white border-b border-[#dce9df] px-4 sm:px-6 sticky top-[89px] z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between py-2 text-xs font-bold">
          <div className="flex gap-2">
            {[
              { id: "catalog", label: `Wholesale Catalog (${listings.length})`, icon: Store },
              { id: "cart", label: `Shopping Cart (${cart.length})`, icon: ShoppingCart },
              { id: "orders", label: `Orders & Invoices (${orders.length})`, icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#059669] text-white shadow-xs"
                      : "text-[#5f7469] hover:bg-[#f6fbf7] hover:text-[#163025]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button onClick={() => setActiveTab("cart")} className="px-3 py-1.5 rounded-xl bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] flex items-center gap-1.5">
            <ShoppingCart className="w-4 h-4" />
            <span>Cart: ₱{cartTotal.toLocaleString()}</span>
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* CATALOG TAB */}
        {activeTab === "catalog" && (
          <div className="space-y-6 text-xs">
            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-[#dce9df] shadow-xs">
              <Search className="w-4 h-4 text-[#5f7469]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wholesale produce, cooperatives, or origin province..."
                className="w-full bg-transparent border-none outline-none text-[#163025] font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredListings.map((l) => (
                <div key={l.localId} className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-4 shadow-xs hover:border-[#059669] transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-extrabold text-[10px]">
                        {l.verifiedStatus}
                      </span>
                      <span className="font-extrabold text-base text-[#059669]">₱{l.pricePerKg} / kg</span>
                    </div>

                    <h3 className="font-extrabold text-base text-[#163025]">{l.title}</h3>
                    <p className="text-[#5f7469] font-normal">Supplier: {l.coopName} • Origin: {l.originProvince}</p>
                    <p className="text-[#163025] font-bold">Available Bulk Lot: {l.availableKg.toLocaleString()} kg</p>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-[#dce9df]">
                    <button
                      onClick={() => setSelectedListing(l)}
                      className="w-1/2 py-2.5 rounded-xl bg-[#f6fbf7] text-[#163025] border border-[#dce9df] hover:bg-[#ecfdf5] font-bold text-xs"
                    >
                      Trace Provenance
                    </button>
                    <button
                      onClick={() => handleAddToCart(l)}
                      className="w-1/2 py-2.5 rounded-xl bg-[#059669] text-white hover:bg-[#047857] font-extrabold text-xs flex items-center justify-center gap-1 shadow-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CART TAB */}
        {activeTab === "cart" && (
          <div className="space-y-4 text-xs font-bold">
            <div className="bg-white p-5 rounded-3xl border border-[#dce9df]">
              <h2 className="font-extrabold text-base text-[#163025]">Shopping Cart &amp; PayMongo Escrow Checkout</h2>
              <p className="text-[#5f7469] font-normal">Funds are held safely in escrow until produce is inspected at arrival.</p>
            </div>

            {checkoutSuccess ? (
              <div className="p-8 bg-white border border-[#dce9df] rounded-3xl text-center space-y-3 shadow-xs">
                <CheckCircle2 className="w-10 h-10 text-[#059669] mx-auto animate-bounce" />
                <h3 className="text-[#163025] font-extrabold text-lg">PayMongo Escrow Payment Authorized!</h3>
                <p className="text-[#5f7469] font-normal">Your order has been sent to the cooperative for reefer transport dispatch.</p>
              </div>
            ) : cart.length === 0 ? (
              <div className="p-8 bg-white border border-[#dce9df] rounded-3xl text-center space-y-3 text-[#5f7469]">
                <ShoppingCart className="w-8 h-8 mx-auto text-[#dce9df]" />
                <p>Your shopping cart is empty.</p>
                <button onClick={() => setActiveTab("catalog")} className="px-4 py-2 bg-[#059669] text-white rounded-xl font-bold">
                  Browse Wholesale Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-3xl bg-white border border-[#dce9df] flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-base text-[#163025] block">{item.listing.title}</span>
                        <span className="text-[#5f7469] font-normal">Supplier: {item.listing.coopName}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-sm text-[#059669] block">{item.quantityKg} kg</span>
                        <span className="text-xs text-[#163025]">₱{(item.quantityKg * item.listing.pricePerKg).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-3xl bg-white border border-[#059669] space-y-3 shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-[#5f7469] text-[10px] uppercase font-black tracking-wider block">Total Cart Escrow Amount</span>
                    <span className="text-2xl font-extrabold text-[#059669]">₱{cartTotal.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={handleSimulateCheckout}
                    className="px-6 py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs shadow-lg flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" /> Simulate PayMongo Escrow
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="space-y-4 text-xs font-bold">
            <div className="bg-white p-5 rounded-3xl border border-[#dce9df]">
              <h2 className="font-extrabold text-base text-[#163025]">Placed Orders &amp; Receipts</h2>
              <p className="text-[#5f7469] font-normal">Escrow status, cold-chain transport tracking, and invoices.</p>
            </div>

            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.localId} className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-base text-[#163025] block">{o.listingTitle}</span>
                    <span className="text-xs text-[#5f7469] font-normal">Coop: {o.coopName} • Ordered: {o.orderedAt}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-base text-[#059669] block">₱{o.totalPrice.toLocaleString()}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-black">
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* PROVENANCE TRACEABILITY MODAL */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025] flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-[#059669]" /> Provenance QR Traceability
              </h3>
              <button onClick={() => setSelectedListing(null)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>

            <div className="space-y-3 text-[#163025] font-semibold p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df]">
              <span className="text-[10px] font-black uppercase text-[#059669] tracking-wider block">VERIFIED COOP PROVENANCE</span>
              <p>Product: <span className="font-bold">{selectedListing.title}</span></p>
              <p>Producer Coop: <span className="font-bold">{selectedListing.coopName}</span></p>
              <p>Origin: <span className="font-bold">{selectedListing.originProvince}, Philippines</span></p>
              <p>Lot Certification: <span className="text-[#059669] font-bold">Class A GAP Certified</span></p>
            </div>

            <button
              onClick={() => setSelectedListing(null)}
              className="w-full py-3 rounded-xl bg-[#059669] text-white font-extrabold shadow-md"
            >
              Close Traceability Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
