"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, HarvestEntity } from "@/lib/db";
import { updateHarvest } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Scissors, Save, CheckCircle2 } from "lucide-react";

export default function EditHarvestPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const hId = resolvedParams.id;
  const router = useRouter();

  const harvest = useLiveQuery(() => db.harvests.get(hId), [hId]);

  const [crop, setCrop] = useState("");
  const [weightKg, setWeightKg] = useState("0");
  const [grade, setGrade] = useState<HarvestEntity["qualityGrade"]>("Class A");
  const [notes, setNotes] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (harvest) {
      setCrop(harvest.crop);
      setWeightKg(String(harvest.weightKg));
      setGrade(harvest.qualityGrade);
      setNotes(harvest.notes || "");
    }
  }, [harvest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weightKg) || 0;
    if (!crop.trim() || w <= 0) return;

    await updateHarvest(hId, {
      crop: crop.trim(),
      weightKg: w,
      qualityGrade: grade,
      notes: notes.trim(),
    });

    setFeedback("Harvest record updated! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push(`/farmer/harvests/${hId}`);
    }, 1200);
  };

  if (!harvest) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading harvest record...</p>
          <Link href="/farmer/harvests" className="text-xs font-bold text-emerald-700 underline">
            Return to Harvests list
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href={`/farmer/harvests/${hId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel &amp; Back to Harvest Detail
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Scissors className="w-6 h-6 text-teal-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Edit Harvest Entry
              </h1>
              <p className="text-xs text-slate-500">
                Update weight, quality grade, or harvest notes.
              </p>
            </div>
          </div>

          {feedback && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Crop Name *
              </label>
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Harvest Weight (Kg) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600 font-bold text-teal-700"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quality Grade *
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as HarvestEntity["qualityGrade"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Class A">Class A — Premium</option>
                  <option value="Class B">Class B — Standard Wholesale</option>
                  <option value="Class C">Class C — Processing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes (Offline Ready)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
