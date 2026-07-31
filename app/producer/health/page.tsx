"use client";

import React, { useState } from "react";
import ProducerShell from "@/components/shells/ProducerShell";
import { useLiveQuery } from "dexie-react-hooks";
import { db, HealthObservationEntity } from "@/lib/db";
import { createHealthObservation } from "@/lib/productionRepository";
import { ShieldAlert, AlertTriangle, Bug, Waves, Stethoscope, Plus, Save, CheckCircle2 } from "lucide-react";

export default function HealthObservationsPage() {
  const observations = useLiveQuery(() => db.healthObservations.filter((h) => !h.isDeleted).toArray(), []) || [];
  const items = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted).toArray(), []) || [];

  // Form states
  const [sector, setSector] = useState<HealthObservationEntity["sector"]>("crops");
  const [observationType, setObservationType] = useState<HealthObservationEntity["observationType"]>("PEST");
  const [severity, setSeverity] = useState<HealthObservationEntity["severity"]>("MEDIUM");
  const [symptoms, setSymptoms] = useState("Leaf yellowing and stem borer insects observed on Plot B");
  const [treatmentApplied, setTreatmentApplied] = useState("Sprayed organic neem oil pesticide solution");
  const [selectedInputId, setSelectedInputId] = useState("");
  const [inputQty, setInputQty] = useState("2");

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSaveObservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    await createHealthObservation({
      sector,
      observationType,
      severity,
      symptoms: symptoms.trim(),
      treatmentApplied: treatmentApplied.trim(),
      inputUsedId: selectedInputId || undefined,
      inputQuantityUsed: parseFloat(inputQty) || 0,
    });

    setFeedback(`Health observation saved (${observationType} - ${severity})! Treatment inputs deducted.`);
    setSymptoms("");
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <ProducerShell>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            HEALTH OBSERVATIONS &amp; BIOSECURITY
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
            Pest, Aquatic &amp; Animal Health Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Log plant diseases, aquatic mortality, water quality anomalies, and livestock illnesses across sectors.
          </p>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CREATE HEALTH OBSERVATION FORM */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Stethoscope className="w-4 h-4 text-rose-400" /> Log Health or Pest Incident
            </h2>

            <form onSubmit={handleSaveObservation} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Sector *</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-bold text-white"
                  >
                    <option value="crops">Crops / Agriculture</option>
                    <option value="fisheries">Capture Fisheries</option>
                    <option value="aquaculture">Aquaculture Ponds</option>
                    <option value="livestock">Livestock</option>
                    <option value="poultry">Poultry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Observation Type *</label>
                  <select
                    value={observationType}
                    onChange={(e) => setObservationType(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-bold text-white"
                  >
                    <option value="PEST">Pest Infestation (Peste)</option>
                    <option value="DISEASE">Plant / Animal Disease (Sakit)</option>
                    <option value="AQUATIC_MORTALITY">Aquatic Mortality (Patay na Isda)</option>
                    <option value="WATER_ANOMALY">Water Quality Anomaly</option>
                    <option value="ANIMAL_ILLNESS">Animal Illness / Symptoms</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Severity Level *</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-extrabold text-rose-400"
                >
                  <option value="LOW">LOW — Minor Symptoms</option>
                  <option value="MEDIUM">MEDIUM — Moderate Spread</option>
                  <option value="HIGH">HIGH — Severe Contagion / Loss</option>
                  <option value="CRITICAL">CRITICAL — Emergency Outbreak</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Observed Symptoms &amp; Details *</label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Treatment / Action Applied</label>
                <input
                  type="text"
                  value={treatmentApplied}
                  onChange={(e) => setTreatmentApplied(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              {items.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Treatment Material Stock</label>
                    <select
                      value={selectedInputId}
                      onChange={(e) => setSelectedInputId(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    >
                      <option value="">-- None / No Stock Used --</option>
                      {items.map((i) => (
                        <option key={i.localId} value={i.localId}>
                          {i.crop} ({i.quantityInKg} available)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Quantity Used</label>
                    <input
                      type="number"
                      value={inputQty}
                      onChange={(e) => setInputQty(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-rose-300 font-bold"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <Save className="w-4 h-4" /> Save Health Observation (Offline First)
              </button>
            </form>
          </div>

          {/* RECENT HEALTH OBSERVATIONS */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" /> Logged Incident Reports ({observations.length})
            </h2>

            {observations.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No health or pest incidents logged.</p>
            ) : (
              <div className="space-y-3">
                {observations.map((o) => (
                  <div key={o.localId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white text-xs uppercase">{o.sector} • {o.observationType}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-extrabold">
                        {o.severity}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs font-semibold">{o.symptoms}</p>
                    {o.treatmentApplied && (
                      <p className="text-emerald-400 text-[11px] font-bold">Treatment: {o.treatmentApplied}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProducerShell>
  );
}
