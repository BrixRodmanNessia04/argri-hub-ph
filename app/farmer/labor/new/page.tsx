"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, LaborLogEntity } from "@/lib/db";
import { createLaborLog } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Users, Save, CheckCircle2 } from "lucide-react";

export default function NewLaborLogPage() {
  const router = useRouter();
  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];

  const [farmId, setFarmId] = useState("");
  const [workType, setWorkType] = useState<LaborLogEntity["workType"]>("HARVESTING");
  const [workerGroup, setWorkerGroup] = useState("Local Harvester Group");
  const [workerCount, setWorkerCount] = useState("3");
  const [hoursWorked, setHoursWorked] = useState("8");
  const [rateType, setRateType] = useState<LaborLogEntity["rateType"]>("PER_DAY");
  const [ratePerUnit, setRatePerUnit] = useState("500");
  const [totalCost, setTotalCost] = useState("1500");
  const [paymentStatus, setPaymentStatus] = useState<LaborLogEntity["paymentStatus"]>("PAID");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleRateChange = (cnt: string, rate: string, rType: string) => {
    setWorkerCount(cnt);
    setRatePerUnit(rate);
    const c = parseInt(cnt) || 1;
    const r = parseFloat(rate) || 0;
    if (rType === "PER_DAY") {
      setTotalCost(String(c * r));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(workerCount) || 1;
    const cost = parseFloat(totalCost) || 0;
    if (!farmId || cost <= 0) return;

    await createLaborLog({
      farmId,
      workType,
      workerGroup: workerGroup.trim(),
      workerCount: count,
      date: new Date().toISOString().split("T")[0],
      hoursWorked: parseFloat(hoursWorked) || 8,
      rateType,
      ratePerUnit: parseFloat(ratePerUnit) || 500,
      totalCost: cost,
      paymentStatus,
    });

    setFeedback(`Labor record logged: -₱${cost.toLocaleString()}! Saved locally & queued for sync.`);
    setTimeout(() => {
      router.push("/farmer/labor");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/labor"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Labor Logs
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Users className="w-6 h-6 text-orange-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Log Farm Labor &amp; Wages
              </h1>
              <p className="text-xs text-slate-500">
                Record worker groups, task hours, and total labor costs offline.
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
                Farm *
              </label>
              <select
                value={farmId}
                onChange={(e) => setFarmId(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                required
              >
                <option value="">-- Select Farm --</option>
                {farms.map((f) => (
                  <option key={f.localId} value={f.localId}>{f.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Work Type *
                </label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value as LaborLogEntity["workType"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                >
                  <option value="LAND_PREPARATION">Land Preparation</option>
                  <option value="PLANTING">Planting</option>
                  <option value="WEEDING">Weeding / Cleaning</option>
                  <option value="FERTILIZING">Fertilizing</option>
                  <option value="SPRAYING">Spraying</option>
                  <option value="HARVESTING">Harvesting</option>
                  <option value="SORTING">Sorting &amp; Packing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Worker Group Name *
                </label>
                <input
                  type="text"
                  value={workerGroup}
                  onChange={(e) => setWorkerGroup(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Worker Count *</label>
                <input
                  type="number"
                  value={workerCount}
                  onChange={(e) => handleRateChange(e.target.value, ratePerUnit, rateType)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rate Type</label>
                <select
                  value={rateType}
                  onChange={(e) => {
                    setRateType(e.target.value as LaborLogEntity["rateType"]);
                    handleRateChange(workerCount, ratePerUnit, e.target.value);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                >
                  <option value="PER_DAY">Per Day (₱/day)</option>
                  <option value="PER_HOUR">Per Hour</option>
                  <option value="PER_TASK">Per Task</option>
                  <option value="FIXED">Fixed Lump Sum</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rate per Worker (₱)</label>
                <input
                  type="number"
                  value={ratePerUnit}
                  onChange={(e) => handleRateChange(workerCount, e.target.value, rateType)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Total Calculated Labor Cost (₱) *</label>
              <input
                type="number"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-bold text-rose-600"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Labor Record (-₱{parseFloat(totalCost || "0").toLocaleString()})</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
