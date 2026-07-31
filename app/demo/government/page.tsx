"use client";

import React, { useState } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { Landmark, Plus, CheckCircle2, Save, X } from "lucide-react";

export default function CompleteGovernmentDemoPage() {
  const [subsidies, setSubsidies] = useState([
    { id: "sub-1", producerName: "Juan Dela Cruz", RSBSA: "RSBSA-14-2026-00412", commodity: "Benguet Cabbage", voucherAmount: 5000, status: "DISBURSED" },
    { id: "sub-2", producerName: "Pedro Penduko", RSBSA: "RSBSA-14-2026-00890", commodity: "Fisheries (Yellowfin Tuna)", voucherAmount: 7500, status: "VERIFIED" },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [producerName, setProducerName] = useState("Maria Santos");
  const [rsbsa, setRsbsa] = useState("RSBSA-14-2026-01245");
  const [amount, setAmount] = useState(6000);

  const handleAddSubsidy = (e: React.FormEvent) => {
    e.preventDefault();
    setSubsidies((prev) => [
      ...prev,
      { id: `sub_${Date.now()}`, producerName, RSBSA: rsbsa, commodity: "Highland Crops", voucherAmount: Number(amount), status: "VERIFIED" },
    ]);
    setShowAdd(false);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <DemoHeader roleName="Government LGU (Interactive Workspace)" />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6 text-xs font-bold">
        <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#dce9df] shadow-xs">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
              DEMO MODE (ISOLATED)
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] flex items-center gap-2 mt-1">
              <Landmark className="w-6 h-6 text-[#059669]" />
              LGU &amp; Government Regulatory Workspace
            </h1>
            <p className="text-[#5f7469] font-normal">Municipal harvest reporting, RSBSA producer verification, and subsidy distribution.</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 rounded-xl bg-[#059669] text-white font-extrabold flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Issue Subsidy Voucher
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">RSBSA Verified Producers</span>
            <p className="text-2xl font-extrabold text-[#059669]">1,420 Farmers &amp; Fishers</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Subsidy Vouchers Issued</span>
            <p className="text-2xl font-extrabold text-[#163025]">₱{subsidies.reduce((sum, s) => sum + s.voucherAmount, 0).toLocaleString()}</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">DA &amp; BFAR Compliance</span>
            <p className="text-2xl font-extrabold text-[#0ea5a4]">Fully Verified</p>
          </div>
        </div>

        <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#059669]" /> Issued Subsidy Vouchers ({subsidies.length})
          </h2>

          <div className="space-y-3">
            {subsidies.map((s) => (
              <div key={s.id} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-[#163025] text-sm block">{s.producerName} ({s.RSBSA})</span>
                  <span className="text-[11px] text-[#5f7469] font-normal">Sector: {s.commodity}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-base text-[#059669] block">₱{s.voucherAmount.toLocaleString()}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-black">{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Issue RSBSA Subsidy Voucher</h3>
              <button onClick={() => setShowAdd(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleAddSubsidy} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Producer Full Name</label>
                <input type="text" value={producerName} onChange={(e) => setProducerName(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div>
                <label className="block text-[#5f7469] mb-1">RSBSA ID Number</label>
                <input type="text" value={rsbsa} onChange={(e) => setRsbsa(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div>
                <label className="block text-[#5f7469] mb-1">Voucher Amount (₱)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#059669] text-white font-extrabold shadow-md flex items-center justify-center gap-1">
                <Save className="w-4 h-4" /> Issue Subsidy Voucher
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
