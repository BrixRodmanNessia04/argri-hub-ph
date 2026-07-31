"use client";

import React, { useState } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { Coins, Plus, Save, X, ShieldCheck } from "lucide-react";

export default function CompleteFinanceDemoPage() {
  const [loans, setLoans] = useState([
    { id: "loan-1", farmerName: "Juan Dela Cruz (Benguet Coop)", creditScore: 780, loanAmount: 45000, purpose: "Fertilizer & Seed Financing", status: "DISBURSED" },
    { id: "loan-2", farmerName: "Marine Captain San Jose", creditScore: 740, loanAmount: 85000, purpose: "Vessel Diesel & Ice Supply", status: "APPROVED" },
  ]);

  const [showAddLoan, setShowAddLoan] = useState(false);
  const [farmerName, setFarmerName] = useState("Pedro Penduko");
  const [amount, setAmount] = useState(30000);
  const [purpose, setPurpose] = useState("Irrigation Drip Pump");

  const handleApplyLoan = (e: React.FormEvent) => {
    e.preventDefault();
    setLoans((prev) => [
      ...prev,
      { id: `loan_${Date.now()}`, farmerName, creditScore: 760, loanAmount: Number(amount), purpose, status: "APPROVED" },
    ]);
    setShowAddLoan(false);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <DemoHeader roleName="Agri-Credit &amp; Finance (Interactive Workspace)" />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6 text-xs font-bold">
        <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#dce9df] shadow-xs">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
              DEMO MODE (ISOLATED)
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] flex items-center gap-2 mt-1">
              <Coins className="w-6 h-6 text-[#059669]" />
              Agri-Credit &amp; PCIC Insurance Workspace
            </h1>
            <p className="text-[#5f7469] font-normal">Production credit scoring, micro-loan disbursement, and climate insurance claim assessments.</p>
          </div>
          <button
            onClick={() => setShowAddLoan(true)}
            className="px-4 py-2 rounded-xl bg-[#059669] text-white font-extrabold flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Apply Micro-Loan
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Average Credit Score</span>
            <p className="text-2xl font-extrabold text-[#059669]">765 / 850 (Low Risk)</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Active Micro-Loans</span>
            <p className="text-2xl font-extrabold text-[#163025]">₱{loans.reduce((sum, l) => sum + l.loanAmount, 0).toLocaleString()}</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">PCIC Insurance Claim Parametric</span>
            <p className="text-2xl font-extrabold text-[#0ea5a4]">100% Active Policy</p>
          </div>
        </div>

        <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#059669]" /> Active Micro-Loan Portfolio ({loans.length})
          </h2>

          <div className="space-y-3">
            {loans.map((l) => (
              <div key={l.id} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-[#163025] text-sm block">{l.farmerName}</span>
                  <span className="text-[11px] text-[#5f7469] font-normal">Purpose: {l.purpose} • Score: {l.creditScore}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-base text-[#059669] block">₱{l.loanAmount.toLocaleString()}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-black">{l.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showAddLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Apply Production Micro-Loan</h3>
              <button onClick={() => setShowAddLoan(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleApplyLoan} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Applicant Name</label>
                <input type="text" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div>
                <label className="block text-[#5f7469] mb-1">Loan Amount (₱)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div>
                <label className="block text-[#5f7469] mb-1">Purpose</label>
                <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#059669] text-white font-extrabold shadow-md flex items-center justify-center gap-1">
                <Save className="w-4 h-4" /> Authorize Micro-Loan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
