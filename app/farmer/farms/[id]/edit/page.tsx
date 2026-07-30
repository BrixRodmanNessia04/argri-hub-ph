"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FarmEntity } from "@/lib/db";
import { updateFarm } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Building2, Save, CheckCircle2 } from "lucide-react";

function EditFarmForm({ farm, farmId }: { farm: FarmEntity; farmId: string }) {
  const router = useRouter();
  const [name, setName] = useState(farm.name);
  const [location, setLocation] = useState(farm.location);
  const [areaHectares, setAreaHectares] = useState(String(farm.areaHectares));
  const [primaryCrop, setPrimaryCrop] = useState(farm.primaryCrop || "");
  const [notes, setNotes] = useState(farm.notes || "");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await updateFarm(farmId, {
      name: name.trim(),
      location: location.trim(),
      areaHectares: parseFloat(areaHectares) || 1,
      primaryCrop: primaryCrop.trim(),
      notes: notes.trim(),
    });

    setFeedback("Farm record updated! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push(`/farmer/farms/${farmId}`);
    }, 1200);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Building2 className="w-6 h-6 text-emerald-600" />
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            Edit Farm Record
          </h1>
          <p className="text-xs text-slate-500">
            Update farm location, acreage, and primary crops.
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
            Farm Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Area in Hectares
            </label>
            <input
              type="number"
              step="0.1"
              value={areaHectares}
              onChange={(e) => setAreaHectares(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Primary Crop
            </label>
            <input
              type="text"
              value={primaryCrop}
              onChange={(e) => setPrimaryCrop(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
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
  );
}

export default function EditFarmPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const farmId = resolvedParams.id;

  const farm = useLiveQuery(() => db.farms.get(farmId), [farmId]);

  if (!farm) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading farm record for editing...</p>
          <Link href="/farmer/farms" className="text-xs font-bold text-emerald-700 underline">
            Return to Farms list
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
          href={`/farmer/farms/${farmId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel &amp; Back to Farm Detail
        </Link>

        <EditFarmForm farm={farm} farmId={farmId} />
      </main>
    </div>
  );
}
