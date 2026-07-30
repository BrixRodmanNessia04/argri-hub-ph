"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, PestDiseaseEntity } from "@/lib/db";
import { createPestDisease } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Bug, Save, CheckCircle2 } from "lucide-react";

export default function NewPestDiseasePage() {
  const router = useRouter();
  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];
  const plots = useLiveQuery(() => db.plots.filter((p) => !p.isDeleted).toArray(), []) || [];

  const [farmId, setFarmId] = useState("");
  const [plotId, setPlotId] = useState("");
  const [observationType, setObservationType] = useState<PestDiseaseEntity["observationType"]>("PEST");
  const [name, setName] = useState("Suspected Diamondback Moth");
  const [severity, setSeverity] = useState<PestDiseaseEntity["severity"]>("MODERATE");
  const [symptoms, setSymptoms] = useState("Holes in cabbage leaves, green larvae visible");
  const [actionTaken, setActionTaken] = useState("Sprayed organic Neem oil");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !symptoms.trim() || !farmId) return;

    await createPestDisease({
      farmId,
      plotId: plotId || undefined,
      observationType,
      name: name.trim(),
      severity,
      symptoms: symptoms.trim(),
      actionTaken: actionTaken.trim() || undefined,
      observedAt: new Date().toISOString().split("T")[0],
      status: "OBSERVED",
    });

    setFeedback("Pest observation saved locally & queued for sync!");
    setTimeout(() => {
      router.push("/farmer/pests-diseases");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/pests-diseases"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Pests &amp; Diseases
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Bug className="w-6 h-6 text-purple-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Log Pest or Disease Observation
              </h1>
              <p className="text-xs text-slate-500">
                Note suspected crop issues for farm records. Non-medical observation.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Plot (Optional)
                </label>
                <select
                  value={plotId}
                  onChange={(e) => setPlotId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                >
                  <option value="">-- Select Plot --</option>
                  {plots.map((p) => (
                    <option key={p.localId} value={p.localId}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Observation Type *
                </label>
                <select
                  value={observationType}
                  onChange={(e) => setObservationType(e.target.value as PestDiseaseEntity["observationType"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                >
                  <option value="PEST">Pest Insect (Uod / Salot)</option>
                  <option value="DISEASE">Fungal / Bacterial Disease</option>
                  <option value="WEED">Weed Infestation</option>
                  <option value="NUTRIENT_DEFICIENCY">Nutrient Deficiency</option>
                  <option value="UNKNOWN">Unknown Crop Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Severity Level *
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as PestDiseaseEntity["severity"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                >
                  <option value="LOW">LOW (Mababa)</option>
                  <option value="MODERATE">MODERATE (Katamtaman)</option>
                  <option value="HIGH">HIGH (Mataas)</option>
                  <option value="CRITICAL">CRITICAL (Malala)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Suspected Issue Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Suspected Diamondback Moth"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Observed Symptoms *
              </label>
              <textarea
                rows={3}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe visible leaf holes, spots, or wilting..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Action Taken (Optional)
              </label>
              <input
                type="text"
                value={actionTaken}
                onChange={(e) => setActionTaken(e.target.value)}
                placeholder="e.g. Applied organic pesticide spray"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Observation (Offline Ready)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
