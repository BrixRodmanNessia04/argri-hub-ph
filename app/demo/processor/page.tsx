"use client";

import React, { useState } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { Factory, Plus, CheckCircle2, ShieldCheck, Layers, Save, X } from "lucide-react";

export default function CompleteProcessorDemoPage() {
  const [batches, setBatches] = useState([
    { id: "batch-1", commodity: "Highland Mango Slices", weightKg: 1200, status: "DEHYDRATING", fdaStatus: "HACCP Approved", startedAt: "2026-07-30" },
    { id: "batch-2", commodity: "Smoked Bangus Fillets", weightKg: 850, status: "VACUUM_PACKAGING", fdaStatus: "FDA Verified", startedAt: "2026-07-31" },
  ]);

  const [showAddBatch, setShowAddBatch] = useState(false);
  const [commodity, setCommodity] = useState("Dehydrated Strawberry Chips");
  const [weightKg, setWeightKg] = useState(650);

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    setBatches((prev) => [
      ...prev,
      { id: `batch_${Date.now()}`, commodity, weightKg: Number(weightKg), status: "RAW_INTAKE", fdaStatus: "HACCP Inspected", startedAt: new Date().toISOString().split("T")[0] },
    ]);
    setShowAddBatch(false);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <DemoHeader roleName="Food Processor (Interactive Workspace)" />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6 text-xs">
        <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#dce9df] shadow-xs">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
              DEMO MODE (ISOLATED)
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] flex items-center gap-2 mt-1">
              <Factory className="w-6 h-6 text-[#059669]" />
              Food Processing &amp; Packaging Line Workspace
            </h1>
            <p className="text-[#5f7469] font-normal">Raw intake, batch drying, vacuum sealing, and FDA quality compliance.</p>
          </div>
          <button
            onClick={() => setShowAddBatch(true)}
            className="px-4 py-2 rounded-xl bg-[#059669] text-white font-extrabold flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Intake Batch
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-bold">
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Processing Batches</span>
            <p className="text-2xl font-extrabold text-[#059669]">{batches.length} Active Batches</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Total Raw Intake</span>
            <p className="text-2xl font-extrabold text-[#163025]">{batches.reduce((sum, b) => sum + b.weightKg, 0).toLocaleString()} kg</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">FDA / HACCP Status</span>
            <p className="text-2xl font-extrabold text-[#0ea5a4]">100% Compliant</p>
          </div>
        </div>

        {/* Batches List */}
        <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#059669]" /> Processing Line Batches ({batches.length})
          </h2>

          <div className="space-y-3">
            {batches.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-[#163025] text-sm block">{b.commodity} ({b.weightKg} kg)</span>
                  <span className="text-[11px] text-[#5f7469] font-normal">Started: {b.startedAt} • Compliance: {b.fdaStatus}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-black">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* MODAL */}
      {showAddBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Add Raw Intake Processing Batch</h3>
              <button onClick={() => setShowAddBatch(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleAddBatch} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Commodity Name</label>
                <input type="text" value={commodity} onChange={(e) => setCommodity(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div>
                <label className="block text-[#5f7469] mb-1">Raw Intake Weight (Kg)</label>
                <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#059669] text-white font-extrabold shadow-md flex items-center justify-center gap-1">
                <Save className="w-4 h-4" /> Start Processing Batch
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
