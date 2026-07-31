"use client";

import React, { useState, useEffect } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { seedDemoDatabase, demoDb, DemoCoopSubmission, DemoListing } from "@/lib/demoDb";
import { useLiveQuery } from "dexie-react-hooks";
import { Building2, Layers, Store, CheckCircle2, XCircle, Plus, Save, X, BarChart3 } from "lucide-react";

export default function CompleteCoopDemoPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "approvals" | "listings" | "forecasts">("dashboard");

  useEffect(() => {
    seedDemoDatabase();
  }, []);

  const submissions = useLiveQuery(() => demoDb.demoCoopSubmissions.toArray(), []) || [];
  const listings = useLiveQuery(() => demoDb.demoListings.toArray(), []) || [];

  // Modals
  const [showAddListing, setShowAddListing] = useState(false);
  const [listTitle, setListTitle] = useState("Fresh Benguet Highland Cabbage (Class A)");
  const [listCategory, setListCategory] = useState("Highland Vegetables");
  const [listKg, setListKg] = useState(2500);
  const [listPrice, setListPrice] = useState(48);

  const handleApproveSubmission = async (localId: string) => {
    await demoDb.demoCoopSubmissions.update(localId, { status: "APPROVED" });
  };

  const handleRejectSubmission = async (localId: string) => {
    await demoDb.demoCoopSubmissions.update(localId, { status: "REJECTED" });
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    await demoDb.demoListings.put({
      localId: `list_${Date.now()}`,
      title: listTitle,
      coopName: "Benguet Agriculture Cooperative",
      commodityCategory: listCategory,
      availableKg: Number(listKg),
      pricePerKg: Number(listPrice),
      grade: "Class A",
      originProvince: "Benguet",
      verifiedStatus: "Verified Coop",
    });
    setShowAddListing(false);
  };

  const pendingSubmissions = submissions.filter((s) => s.status === "PENDING");
  const approvedSubmissions = submissions.filter((s) => s.status === "APPROVED");
  const totalAggregatedKg = approvedSubmissions.reduce((sum, s) => sum + s.weightKg, 0);

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <DemoHeader roleName="Cooperative Manager (Full Application)" />

      {/* Sub Navigation */}
      <div className="bg-white border-b border-[#dce9df] px-4 sm:px-6 sticky top-[89px] z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center gap-2 py-2 text-xs font-bold overflow-x-auto">
          {[
            { id: "dashboard", label: "Coop Dashboard", icon: Building2 },
            { id: "approvals", label: `Member Approvals (${pendingSubmissions.length})`, icon: CheckCircle2 },
            { id: "listings", label: `Wholesale B2B Listings (${listings.length})`, icon: Store },
            { id: "forecasts", label: "Yield & Supply Forecasts", icon: BarChart3 },
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
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-[#dce9df] shadow-xs text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
                <span className="text-[#163025]">Cooperative Consolidation Engine: Active (`agrihub-demo` DB)</span>
              </div>
              <button
                onClick={() => setShowAddListing(true)}
                className="px-3.5 py-2 rounded-xl bg-[#059669] text-white hover:bg-[#047857] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Publish Wholesale Listing
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-bold">
              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
                <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Pending Approvals</span>
                <p className="text-2xl font-extrabold text-amber-600">{pendingSubmissions.length} Submissions</p>
                <span className="text-[#5f7469] text-[11px] font-normal">Awaiting coop quality review</span>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
                <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Aggregated Supply</span>
                <p className="text-2xl font-extrabold text-[#059669]">{totalAggregatedKg.toLocaleString()} kg</p>
                <span className="text-[#5f7469] text-[11px] font-normal">Approved member harvest</span>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
                <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Active B2B Listings</span>
                <p className="text-2xl font-extrabold text-[#163025]">{listings.length} Listings</p>
                <span className="text-[#5f7469] text-[11px] font-normal">Published to marketplace</span>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
                <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Member Producers</span>
                <p className="text-2xl font-extrabold text-[#0ea5a4]">48 Members</p>
                <span className="text-[#5f7469] text-[11px] font-normal">Benguet &amp; La Trinidad</span>
              </div>
            </div>

            {/* Pending Approvals Table/Card List */}
            <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-[#163025] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" /> Pending Member Submissions ({pendingSubmissions.length})
              </h3>
              <div className="space-y-3">
                {pendingSubmissions.map((s) => (
                  <div key={s.localId} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="font-extrabold text-[#163025] text-sm block">{s.farmerName}</span>
                      <span className="text-[11px] text-[#5f7469] font-normal">Commodity: {s.commodity} • Grade: {s.qualityGrade}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-[#059669] text-sm">{s.weightKg} kg</span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleApproveSubmission(s.localId)}
                          className="px-3 py-1.5 rounded-xl bg-[#059669] text-white hover:bg-[#047857] font-extrabold text-xs flex items-center gap-1 shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => handleRejectSubmission(s.localId)}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-extrabold text-xs flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* APPROVALS TAB */}
        {activeTab === "approvals" && (
          <div className="space-y-4 text-xs">
            <div className="bg-white p-5 rounded-3xl border border-[#dce9df]">
              <h2 className="font-extrabold text-base text-[#163025]">Member Harvest Review Queue</h2>
              <p className="text-[#5f7469] font-normal">Review farmer and fisherfolk harvest submissions before consolidating into wholesale lots.</p>
            </div>

            <div className="space-y-3">
              {submissions.map((s) => (
                <div key={s.localId} className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-base text-[#163025] block">{s.farmerName}</span>
                    <span className="text-xs text-[#5f7469] font-normal">Commodity: {s.commodity} • Quality: {s.qualityGrade}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-base text-[#059669]">{s.weightKg} kg</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] ${
                      s.status === "APPROVED" ? "bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]" : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LISTINGS TAB */}
        {activeTab === "listings" && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#dce9df]">
              <div>
                <h2 className="font-extrabold text-base text-[#163025]">Wholesale B2B Listings</h2>
                <p className="text-[#5f7469] font-normal">Listings published to supermarket buyers and commercial traders.</p>
              </div>
              <button
                onClick={() => setShowAddListing(true)}
                className="px-4 py-2 rounded-xl bg-[#059669] text-white font-extrabold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" /> Create Wholesale Listing
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {listings.map((l) => (
                <div key={l.localId} className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-[#163025]">{l.title}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] font-black text-[10px]">
                      {l.grade}
                    </span>
                  </div>
                  <p className="text-[#5f7469] text-xs font-normal">Coop: {l.coopName} • Origin: {l.originProvince}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#dce9df]">
                    <span className="text-xl font-extrabold text-[#059669]">{l.availableKg} kg</span>
                    <span className="text-sm font-extrabold text-[#163025]">₱{l.pricePerKg} / kg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FORECASTS TAB */}
        {activeTab === "forecasts" && (
          <div className="space-y-4 text-xs">
            <div className="bg-white p-5 rounded-3xl border border-[#dce9df]">
              <h2 className="font-extrabold text-base text-[#163025]">Yield &amp; Supply Forecasting</h2>
              <p className="text-[#5f7469] font-normal">Predictive supply curves aggregated across member farms and fishing grounds.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
                <span className="font-extrabold text-[#163025] text-sm block">Benguet Highland Cabbage</span>
                <p className="text-2xl font-extrabold text-[#059669]">12,500 kg Expected</p>
                <p className="text-[#5f7469] font-normal">Harvest window: August 15 - August 30</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
                <span className="font-extrabold text-[#163025] text-sm block">Lingayen Yellowfin Tuna</span>
                <p className="text-2xl font-extrabold text-[#0ea5a4]">4,200 kg Expected</p>
                <p className="text-[#5f7469] font-normal">Arrival window: Next 7 days</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FORM MODAL: CREATE LISTING */}
      {showAddListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Create Wholesale Listing</h3>
              <button onClick={() => setShowAddListing(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleCreateListing} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Listing Title</label>
                <input type="text" value={listTitle} onChange={(e) => setListTitle(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#5f7469] mb-1">Available Weight (Kg)</label>
                  <input type="number" value={listKg} onChange={(e) => setListKg(Number(e.target.value))} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Price per Kg (₱)</label>
                  <input type="number" value={listPrice} onChange={(e) => setListPrice(Number(e.target.value))} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#059669] text-white font-extrabold shadow-md flex items-center justify-center gap-1 mt-2">
                <Save className="w-4 h-4" /> Publish Listing to Marketplace
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
