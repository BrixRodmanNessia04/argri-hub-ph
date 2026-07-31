"use client";

import React, { useState } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { Truck, Plus, Save, X, ShieldCheck } from "lucide-react";

export default function CompleteTransportDemoPage() {
  const [dispatches, setDispatches] = useState([
    { id: "disp-1", vehicle: "Reefer Truck #04 (ISUZU 6-Wheeler)", cargo: "Benguet Highland Cabbage (3,500 kg)", tempCelsius: 4.2, origin: "Benguet Coop Trading Post", destination: "Manila Fresh Hub", status: "IN_TRANSIT" },
    { id: "disp-2", vehicle: "Reefer Van #09 (HINO Cold Van)", cargo: "Dagupan Bangus (1,200 kg)", tempCelsius: 2.8, origin: "Dagupan Aquaculturists Dock", destination: "Balintawak Market", status: "DELIVERED" },
  ]);

  const [showAddDispatch, setShowAddDispatch] = useState(false);
  const [vehicle, setVehicle] = useState("Reefer Truck #12 (MITSUBISHI Cold Chain)");
  const [cargo, setCargo] = useState("Atok Sweet Carrots (2,000 kg)");
  const [destination, setDestination] = useState("Divisoria Wholesale Hub");

  const handleAddDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatches((prev) => [
      ...prev,
      { id: `disp_${Date.now()}`, vehicle, cargo, tempCelsius: 4.0, origin: "Benguet Coop Trading Post", destination, status: "DISPATCHED" },
    ]);
    setShowAddDispatch(false);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <DemoHeader roleName="Fleet Logistics (Interactive Workspace)" />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6 text-xs">
        <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#dce9df] shadow-xs">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e6f4f4] text-[#0ea5a4] border border-[#a7e3e3]">
              DEMO MODE (ISOLATED)
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] flex items-center gap-2 mt-1">
              <Truck className="w-6 h-6 text-[#0ea5a4]" />
              Refrigerated Transport Fleet Workspace
            </h1>
            <p className="text-[#5f7469] font-normal">Reefer truck dispatching, 4°C cold-chain temperature telemetry, and proof of delivery.</p>
          </div>
          <button
            onClick={() => setShowAddDispatch(true)}
            className="px-4 py-2 rounded-xl bg-[#0ea5a4] text-white font-extrabold flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Dispatch Reefer Truck
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-bold">
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Active Fleet Dispatches</span>
            <p className="text-2xl font-extrabold text-[#0ea5a4]">{dispatches.length} Vehicles</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Average Reefer Temp</span>
            <p className="text-2xl font-extrabold text-[#059669]">3.5°C (Optimal)</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Cold-Chain Compliance</span>
            <p className="text-2xl font-extrabold text-[#163025]">100% Certified</p>
          </div>
        </div>

        <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#0ea5a4]" /> Live Fleet Dispatches ({dispatches.length})
          </h2>

          <div className="space-y-3">
            {dispatches.map((d) => (
              <div key={d.id} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[#163025] text-sm">{d.vehicle}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#e6f4f4] text-[#0ea5a4] border border-[#a7e3e3] text-[10px] font-black">
                    {d.status}
                  </span>
                </div>
                <p className="text-[#5f7469] font-normal">Cargo: {d.cargo} • Route: {d.origin} → {d.destination}</p>
                <p className="text-[#059669] font-bold">Telemetry Sensor: {d.tempCelsius}°C (Verified Cold Chain)</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showAddDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Dispatch Reefer Truck</h3>
              <button onClick={() => setShowAddDispatch(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleAddDispatch} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Vehicle Description</label>
                <input type="text" value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div>
                <label className="block text-[#5f7469] mb-1">Cargo Details</label>
                <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div>
                <label className="block text-[#5f7469] mb-1">Destination Hub</label>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#0ea5a4] text-white font-extrabold shadow-md flex items-center justify-center gap-1">
                <Save className="w-4 h-4" /> Dispatch Reefer Truck
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
