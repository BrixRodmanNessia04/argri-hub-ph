"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EquipmentEntity } from "@/lib/db";
import { createEquipment } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Wrench, Save, CheckCircle2 } from "lucide-react";

export default function NewEquipmentPage() {
  const router = useRouter();
  const [name, setName] = useState("Hand Tractor / Till-Cultivator");
  const [type, setType] = useState<EquipmentEntity["type"]>("TRACTOR");
  const [brand, setBrand] = useState("Kubota");
  const [model, setModel] = useState("KND70");
  const [ownership, setOwnership] = useState<EquipmentEntity["ownership"]>("OWNED");
  const [condition, setCondition] = useState<EquipmentEntity["condition"]>("GOOD");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await createEquipment({
      name: name.trim(),
      type,
      brand: brand.trim() || undefined,
      model: model.trim() || undefined,
      ownership,
      condition,
    });

    setFeedback("Equipment registered! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push("/farmer/equipment");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/equipment"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Equipment
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Wrench className="w-6 h-6 text-indigo-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Register Farm Equipment &amp; Machinery
              </h1>
              <p className="text-xs text-slate-500">
                Log tractor, water pump, or sprayer ownership offline.
              </p>
            </div>
          </div>

          {feedback && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Equipment Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as EquipmentEntity["type"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                >
                  <option value="TRACTOR">Tractor / Cultivator</option>
                  <option value="SPRAYER">Power Sprayer</option>
                  <option value="IRRIGATION_PUMP">Water / Irrigation Pump</option>
                  <option value="HARVESTER">Harvester Machine</option>
                  <option value="HAND_TOOL">Hand Tool</option>
                  <option value="VEHICLE">Vehicle / Hauler Truck</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ownership Model *
                </label>
                <select
                  value={ownership}
                  onChange={(e) => setOwnership(e.target.value as EquipmentEntity["ownership"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                >
                  <option value="OWNED">OWNED (Sarili)</option>
                  <option value="RENTED">RENTED (Upa)</option>
                  <option value="BORROWED">BORROWED (Hiram)</option>
                  <option value="COOPERATIVE_SHARED">COOPERATIVE SHARED</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brand</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as EquipmentEntity["condition"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                >
                  <option value="EXCELLENT">EXCELLENT</option>
                  <option value="GOOD">GOOD</option>
                  <option value="NEEDS_REPAIR">NEEDS REPAIR</option>
                  <option value="OUT_OF_SERVICE">OUT OF SERVICE</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Equipment (Offline Ready)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
