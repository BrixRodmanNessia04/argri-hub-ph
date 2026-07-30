"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createFarm } from "@/lib/farmerRepository";
import { saveFormDraft, loadFormDraft, clearFormDraft } from "@/lib/formDraftService";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Building2, Save, CheckCircle2 } from "lucide-react";

export default function NewFarmPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("La Trinidad, Benguet");
  const [areaHectares, setAreaHectares] = useState("1.5");
  const [primaryCrop, setPrimaryCrop] = useState("Highland Cabbage");
  const [notes, setNotes] = useState("");

  const [hasDraft, setHasDraft] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    loadFormDraft<{ name: string; location: string; areaHectares: string; primaryCrop: string; notes: string }>("farm_new").then((draft) => {
      if (draft && (draft.name || draft.notes)) {
        setHasDraft(true);
      }
    });
  }, []);

  const handleRestoreDraft = async () => {
    const draft = await loadFormDraft<{ name: string; location: string; areaHectares: string; primaryCrop: string; notes: string }>("farm_new");
    if (draft) {
      setName(draft.name || "");
      setLocation(draft.location || "");
      setAreaHectares(draft.areaHectares || "1.5");
      setPrimaryCrop(draft.primaryCrop || "");
      setNotes(draft.notes || "");
      setHasDraft(false);
    }
  };

  const handleDiscardDraft = async () => {
    await clearFormDraft("farm_new");
    setHasDraft(false);
  };

  const handleFormChange = (field: string, val: string) => {
    const updated = { name, location, areaHectares, primaryCrop, notes, [field]: val };
    saveFormDraft("farm_new", updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await createFarm({
      name: name.trim(),
      location: location.trim(),
      areaHectares: parseFloat(areaHectares) || 1,
      primaryCrop: primaryCrop.trim(),
      notes: notes.trim(),
    });

    await clearFormDraft("farm_new");
    setFeedback("Saved on this device & queued for cloud sync!");
    setTimeout(() => {
      router.push("/farmer/farms");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/farms"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Farms List
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Building2 className="w-6 h-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Register New Farm
              </h1>
              <p className="text-xs text-slate-500">
                Record farm details offline. Synced automatically when connected.
              </p>
            </div>
          </div>

          {hasDraft && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
              <span>Unsaved farm draft found from previous session.</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRestoreDraft}
                  className="px-2.5 py-1 bg-amber-600 text-white rounded-lg font-bold"
                >
                  Restore Draft
                </button>
                <button
                  onClick={handleDiscardDraft}
                  className="px-2 py-1 text-slate-500 hover:text-slate-800"
                >
                  Discard
                </button>
              </div>
            </div>
          )}

          {feedback && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Farm Name (Pangalan ng Bukid) *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleFormChange("name", e.target.value);
                }}
                placeholder="e.g. Mountain Crest Organic Farm"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Location / Barangay &amp; Municipality *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  handleFormChange("location", e.target.value);
                }}
                placeholder="e.g. Sitio Balili, La Trinidad, Benguet"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Land Area in Hectares
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={areaHectares}
                  onChange={(e) => {
                    setAreaHectares(e.target.value);
                    handleFormChange("areaHectares", e.target.value);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Crop (Pangunahing Tanim)
                </label>
                <input
                  type="text"
                  value={primaryCrop}
                  onChange={(e) => {
                    setPrimaryCrop(e.target.value);
                    handleFormChange("primaryCrop", e.target.value);
                  }}
                  placeholder="e.g. Highland Cabbage"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Notes &amp; Soil Type
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  handleFormChange("notes", e.target.value);
                }}
                placeholder="e.g. Terraced hillside farm, volcanic loam soil"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Farm (Offline First)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
