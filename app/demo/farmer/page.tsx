"use client";

import React, { useState, useEffect } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { seedDemoDatabase, demoDb, DemoFarm, DemoCropCycle, DemoHarvest, DemoInventoryItem, DemoSale, DemoExpense, DemoActivity } from "@/lib/demoDb";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Sprout,
  Tractor,
  Warehouse,
  BookOpen,
  Plus,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  WifiOff,
  Sparkles,
  CloudRain,
  Sun,
  Layers,
  X,
  Save,
  DollarSign,
  Package,
} from "lucide-react";

export default function CompleteFarmerDemoPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "farms" | "cycles" | "warehouse" | "ledger">("dashboard");

  useEffect(() => {
    seedDemoDatabase();
  }, []);

  // Live queries from agrihub-demo IndexedDB
  const farms = useLiveQuery(() => demoDb.demoFarms.toArray(), []) || [];
  const cropCycles = useLiveQuery(() => demoDb.demoCropCycles.toArray(), []) || [];
  const activities = useLiveQuery(() => demoDb.demoActivities.toArray(), []) || [];
  const harvests = useLiveQuery(() => demoDb.demoHarvests.toArray(), []) || [];
  const sales = useLiveQuery(() => demoDb.demoSales.toArray(), []) || [];
  const expenses = useLiveQuery(() => demoDb.demoExpenses.toArray(), []) || [];
  const inventory = useLiveQuery(() => demoDb.demoInventoryItems.toArray(), []) || [];

  // Financial Calculations
  const totalRevenue = sales.reduce((sum, s) => sum + s.totalRevenue, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netIncome = totalRevenue - totalExpenses;
  const totalHarvestKg = harvests.reduce((sum, h) => sum + h.weightKg, 0);
  const costPerKg = totalHarvestKg > 0 ? (totalExpenses / totalHarvestKg).toFixed(2) : "0.00";

  // Form Modals
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [newFarmName, setNewFarmName] = useState("");
  const [newFarmLocation, setNewFarmLocation] = useState("Atok, Benguet");
  const [newFarmHectares, setNewFarmHectares] = useState(1.5);
  const [newFarmCrop, setNewFarmCrop] = useState("Benguet Cabbage");

  const [showAddActivity, setShowAddActivity] = useState(false);
  const [actType, setActType] = useState("FERTILIZING");
  const [actDesc, setActDesc] = useState("");
  const [actCost, setActCost] = useState(500);
  const [selectedInvId, setSelectedInvId] = useState("");
  const [deductQty, setDeductQty] = useState(1);

  const [showAddHarvest, setShowAddHarvest] = useState(false);
  const [harvCrop, setHarvCrop] = useState("Benguet Highland Cabbage");
  const [harvKg, setHarvKg] = useState(500);
  const [harvGrade, setHarvGrade] = useState("Class A");

  const [showAddStock, setShowAddStock] = useState(false);
  const [stockName, setStockName] = useState("");
  const [stockType, setStockType] = useState<any>("FERTILIZER");
  const [stockQty, setStockQty] = useState(10);
  const [stockUnit, setStockUnit] = useState("bags");
  const [stockCost, setStockCost] = useState(1200);

  // Handlers saving directly to agrihub-demo
  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    await demoDb.demoFarms.put({
      localId: `farm_${Date.now()}`,
      name: newFarmName,
      location: newFarmLocation,
      areaHectares: Number(newFarmHectares),
      primaryCrop: newFarmCrop,
      status: "Active",
    });
    setNewFarmName("");
    setShowAddFarm(false);
  };

  const handleRecordActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    const actId = `act_${Date.now()}`;
    await demoDb.demoActivities.put({
      localId: actId,
      cropCycleId: cropCycles[0]?.localId || "cycle-1",
      activityType: actType,
      description: actDesc,
      cost: Number(actCost),
      loggedAt: new Date().toISOString().split("T")[0],
    });

    // Also record expense
    if (actCost > 0) {
      await demoDb.demoExpenses.put({
        localId: `exp_${Date.now()}`,
        category: actType,
        description: actDesc,
        amount: Number(actCost),
        date: new Date().toISOString().split("T")[0],
      });
    }

    // Deduct stock if inventory item selected
    if (selectedInvId && deductQty > 0) {
      const item = await demoDb.demoInventoryItems.get(selectedInvId);
      if (item) {
        const newQty = Math.max(0, item.quantity - deductQty);
        await demoDb.demoInventoryItems.update(selectedInvId, { quantity: newQty });
      }
    }

    setActDesc("");
    setShowAddActivity(false);
  };

  const handleRecordHarvest = async (e: React.FormEvent) => {
    e.preventDefault();
    await demoDb.demoHarvests.put({
      localId: `harv_${Date.now()}`,
      crop: harvCrop,
      weightKg: Number(harvKg),
      qualityGrade: harvGrade,
      harvestedAt: new Date().toISOString().split("T")[0],
      status: "STORAGE",
    });
    setShowAddHarvest(false);
  };

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    await demoDb.demoInventoryItems.put({
      localId: `inv_${Date.now()}`,
      name: stockName,
      type: stockType,
      quantity: Number(stockQty),
      unit: stockUnit,
      unitCost: Number(stockCost),
    });
    setStockName("");
    setShowAddStock(false);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <DemoHeader roleName="Farmer PWA (Full Application)" />

      {/* Sub Navigation Bar */}
      <div className="bg-white border-b border-[#dce9df] px-4 sm:px-6 sticky top-[89px] z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between overflow-x-auto gap-2 py-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: Tractor },
            { id: "farms", label: `Farms & Plots (${farms.length})`, icon: Sprout },
            { id: "cycles", label: `Activities & Harvest`, icon: Layers },
            { id: "warehouse", label: `Warehouse (${inventory.length})`, icon: Warehouse },
            { id: "ledger", label: "Costing & Ledger", icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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
            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-[#dce9df] shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
                <span className="text-xs font-extrabold text-[#163025]">PWA Offline Engine: Active (`agrihub-demo` DB)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <button
                  onClick={() => setShowAddActivity(true)}
                  className="px-3 py-2 rounded-xl bg-[#059669] text-white hover:bg-[#047857] shadow-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Log Activity
                </button>
                <button
                  onClick={() => setShowAddHarvest(true)}
                  className="px-3 py-2 rounded-xl bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] hover:bg-[#d1fae5] flex items-center gap-1"
                >
                  <Sprout className="w-3.5 h-3.5" /> Log Harvest
                </button>
                <button
                  onClick={() => setShowAddStock(true)}
                  className="px-3 py-2 rounded-xl bg-[#f6fbf7] text-[#163025] border border-[#dce9df] hover:bg-[#ecfdf5] flex items-center gap-1"
                >
                  <Warehouse className="w-3.5 h-3.5 text-[#059669]" /> Add Input
                </button>
              </div>
            </div>

            {/* Financial Ledger Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-bold">
              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
                <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Net Income</span>
                <p className={`text-2xl font-extrabold ${netIncome >= 0 ? "text-[#059669]" : "text-rose-600"}`}>
                  ₱{netIncome.toLocaleString()}
                </p>
                <span className="text-[#5f7469] text-[11px] font-normal">Real-time ledger balance</span>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
                <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Total Revenue</span>
                <p className="text-2xl font-extrabold text-[#163025]">₱{totalRevenue.toLocaleString()}</p>
                <span className="text-[#5f7469] text-[11px] font-normal">{sales.length} Harvest sales</span>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
                <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Total Expenses</span>
                <p className="text-2xl font-extrabold text-amber-600">₱{totalExpenses.toLocaleString()}</p>
                <span className="text-[#5f7469] text-[11px] font-normal">{expenses.length} Expense records</span>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
                <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Est. Cost / Kg</span>
                <p className="text-2xl font-extrabold text-[#0ea5a4]">₱{costPerKg}</p>
                <span className="text-[#5f7469] text-[11px] font-normal">Across {totalHarvestKg} kg harvest</span>
              </div>
            </div>

            {/* Active Crop Cycles & Activities List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
                  <h3 className="font-extrabold text-sm text-[#163025] flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-[#059669]" /> Active Crop Cycles ({cropCycles.length})
                  </h3>
                </div>
                <div className="space-y-3">
                  {cropCycles.map((c) => (
                    <div key={c.localId} className="p-3.5 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[#163025]">{c.crop} ({c.variety})</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] text-[10px] font-black">
                          {c.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5f7469] font-normal">
                        Plot: {c.plotName} • Planted: {c.plantedAt} • Est. Harvest: {c.estimatedHarvestAt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
                  <h3 className="font-extrabold text-sm text-[#163025] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#059669]" /> Recent Field Activities ({activities.length})
                  </h3>
                </div>
                <div className="space-y-3">
                  {activities.map((a) => (
                    <div key={a.localId} className="p-3.5 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] space-y-1 flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-[#163025] block">{a.activityType}</span>
                        <span className="text-[11px] text-[#5f7469] font-normal">{a.description}</span>
                      </div>
                      <span className="font-extrabold text-amber-700">₱{a.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FARMS TAB */}
        {activeTab === "farms" && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#dce9df]">
              <div>
                <h2 className="font-extrabold text-base text-[#163025]">Registered Farms &amp; Plots</h2>
                <p className="text-[#5f7469] font-normal">Manage plot boundaries, soil preparation, and active land allocation.</p>
              </div>
              <button
                onClick={() => setShowAddFarm(true)}
                className="px-4 py-2 rounded-xl bg-[#059669] text-white font-extrabold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" /> Add Farm
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {farms.map((f) => (
                <div key={f.localId} className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-[#163025]">{f.name}</span>
                    <span className="px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-black text-[10px]">
                      {f.areaHectares} Hectares
                    </span>
                  </div>
                  <p className="text-[#5f7469] text-xs font-normal">Location: {f.location} • Primary Crop: {f.primaryCrop}</p>
                  <div className="pt-2 border-t border-[#dce9df] flex items-center justify-between text-[#059669] font-bold">
                    <span>Status: {f.status}</span>
                    <span>2 Plots Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CROP CYCLES & ACTIVITIES TAB */}
        {activeTab === "cycles" && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#dce9df]">
              <div>
                <h2 className="font-extrabold text-base text-[#163025]">Harvest Logs &amp; Field Activities</h2>
                <p className="text-[#5f7469] font-normal">Record inputs application, weeding, irrigation, and harvest logging.</p>
              </div>
              <div className="flex gap-2 font-extrabold">
                <button
                  onClick={() => setShowAddActivity(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#059669] text-white hover:bg-[#047857] flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Log Activity
                </button>
                <button
                  onClick={() => setShowAddHarvest(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] flex items-center gap-1"
                >
                  <Sprout className="w-3.5 h-3.5" /> Log Harvest
                </button>
              </div>
            </div>

            <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-[#163025]">Harvest Log History</h3>
              <div className="space-y-2">
                {harvests.map((h) => (
                  <div key={h.localId} className="p-3.5 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-[#163025] text-sm block">{h.crop} ({h.qualityGrade})</span>
                      <span className="text-[11px] text-[#5f7469] font-normal">Harvested: {h.harvestedAt} • Status: {h.status}</span>
                    </div>
                    <span className="font-extrabold text-[#059669] text-sm">{h.weightKg} kg</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WAREHOUSE TAB */}
        {activeTab === "warehouse" && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#dce9df]">
              <div>
                <h2 className="font-extrabold text-base text-[#163025]">Farm Warehouse &amp; Inventory</h2>
                <p className="text-[#5f7469] font-normal">Seeds, fertilizers, pesticides, fuel, and packaging crates stock levels.</p>
              </div>
              <button
                onClick={() => setShowAddStock(true)}
                className="px-4 py-2 rounded-xl bg-[#059669] text-white font-extrabold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" /> Add Inventory Item
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inventory.map((item) => (
                <div key={item.localId} className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-[#163025] text-sm font-extrabold">{item.name}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-extrabold">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#dce9df]">
                    <span className="text-xl font-extrabold text-[#059669]">
                      {item.quantity} {item.unit}
                    </span>
                    <span className="text-[#5f7469] font-semibold">Unit Cost: ₱{item.unitCost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEDGER TAB */}
        {activeTab === "ledger" && (
          <div className="space-y-4 text-xs">
            <div className="bg-white p-5 rounded-3xl border border-[#dce9df] space-y-2">
              <h2 className="font-extrabold text-base text-[#163025]">Financial Ledger &amp; Cost Calculation</h2>
              <p className="text-[#5f7469] font-normal">Automatic expense tracking linked to crop production cycles.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-3">
                <h3 className="font-extrabold text-sm text-[#163025] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#059669]" /> Sales &amp; Revenue Log
                </h3>
                {sales.map((s) => (
                  <div key={s.localId} className="p-3 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-[#163025] block">{s.crop} ({s.weightKg} kg)</span>
                      <span className="text-[11px] text-[#5f7469] font-normal">Buyer: {s.buyerName}</span>
                    </div>
                    <span className="font-extrabold text-[#059669]">₱{s.totalRevenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-3">
                <h3 className="font-extrabold text-sm text-[#163025] flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-amber-600" /> Expense Log
                </h3>
                {expenses.map((e) => (
                  <div key={e.localId} className="p-3 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-[#163025] block">{e.category}: {e.description}</span>
                      <span className="text-[11px] text-[#5f7469] font-normal">Date: {e.date}</span>
                    </div>
                    <span className="font-extrabold text-amber-700">₱{e.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FORM MODAL: ADD FARM */}
      {showAddFarm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Register New Farm</h3>
              <button onClick={() => setShowAddFarm(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleCreateFarm} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Farm Name</label>
                <input
                  type="text"
                  value={newFarmName}
                  onChange={(e) => setNewFarmName(e.target.value)}
                  placeholder="e.g. Benguet Strawberry Haven"
                  className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#5f7469] mb-1">Location</label>
                  <input
                    type="text"
                    value={newFarmLocation}
                    onChange={(e) => setNewFarmLocation(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Area (Hectares)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newFarmHectares}
                    onChange={(e) => setNewFarmHectares(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold shadow-md flex items-center justify-center gap-1 mt-2"
              >
                <Save className="w-4 h-4" /> Save Farm to Demo DB
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL: RECORD ACTIVITY WITH STOCK DEDUCTION */}
      {showAddActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Log Field Activity</h3>
              <button onClick={() => setShowAddActivity(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleRecordActivity} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Activity Type</label>
                <select
                  value={actType}
                  onChange={(e) => setActType(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                >
                  <option value="FERTILIZING">FERTILIZING</option>
                  <option value="PEST_CONTROL">PEST_CONTROL</option>
                  <option value="IRRIGATION">IRRIGATION</option>
                  <option value="WEEDING">WEEDING</option>
                </select>
              </div>
              <div>
                <label className="block text-[#5f7469] mb-1">Description</label>
                <input
                  type="text"
                  value={actDesc}
                  onChange={(e) => setActDesc(e.target.value)}
                  placeholder="e.g. Applied 1 bag Complete 14-14-14"
                  className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#5f7469] mb-1">Cost (₱)</label>
                  <input
                    type="number"
                    value={actCost}
                    onChange={(e) => setActCost(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Deduct Warehouse Stock?</label>
                  <select
                    value={selectedInvId}
                    onChange={(e) => setSelectedInvId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                  >
                    <option value="">No deduction</option>
                    {inventory.map((inv) => (
                      <option key={inv.localId} value={inv.localId}>
                        {inv.name} ({inv.quantity} {inv.unit})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold shadow-md flex items-center justify-center gap-1 mt-2"
              >
                <Save className="w-4 h-4" /> Save &amp; Deduct Stock
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL: LOG HARVEST */}
      {showAddHarvest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Log Harvest Production</h3>
              <button onClick={() => setShowAddHarvest(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleRecordHarvest} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Crop</label>
                <input
                  type="text"
                  value={harvCrop}
                  onChange={(e) => setHarvCrop(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#5f7469] mb-1">Weight (Kg)</label>
                  <input
                    type="number"
                    value={harvKg}
                    onChange={(e) => setHarvKg(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Quality Grade</label>
                  <select
                    value={harvGrade}
                    onChange={(e) => setHarvGrade(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                  >
                    <option value="Class A">Class A</option>
                    <option value="Class B">Class B</option>
                    <option value="Class C">Class C</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold shadow-md flex items-center justify-center gap-1 mt-2"
              >
                <Save className="w-4 h-4" /> Save Harvest to Demo DB
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL: ADD WAREHOUSE STOCK */}
      {showAddStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Add Inventory Input</h3>
              <button onClick={() => setShowAddStock(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleAddStock} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Input Item Name</label>
                <input
                  type="text"
                  value={stockName}
                  onChange={(e) => setStockName(e.target.value)}
                  placeholder="e.g. Organic Foliar Fertilizer"
                  className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[#5f7469] mb-1">Quantity</label>
                  <input
                    type="number"
                    value={stockQty}
                    onChange={(e) => setStockQty(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Unit</label>
                  <input
                    type="text"
                    value={stockUnit}
                    onChange={(e) => setStockUnit(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Unit Cost (₱)</label>
                  <input
                    type="number"
                    value={stockCost}
                    onChange={(e) => setStockCost(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold shadow-md flex items-center justify-center gap-1 mt-2"
              >
                <Save className="w-4 h-4" /> Save Item to Warehouse
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
