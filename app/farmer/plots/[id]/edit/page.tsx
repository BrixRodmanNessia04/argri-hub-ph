"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, PlotEntity, FarmEntity } from "@/lib/db";
import { updatePlot } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, MapPin, Save, CheckCircle2 } from "lucide-react";

function EditPlotForm({ plot, plotId, farms }: { plot: PlotEntity; plotId: string; farms: FarmEntity[] }) {
  const router = useRouter();
  const [farmId, setFarmId] = useState(plot.farmId);
  const [name, setName] = useState(plot.name);
  const [areaSqMeters, setAreaSqMeters] = useState(String(plot.areaSqMeters));
  const [soilType, setSoilType] = useState(plot.soilType || "");
  const [status, setStatus] = useState<PlotEntity["status"]>(plot.status);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !farmId) return;

    await updatePlot(plotId, {
      farmId,
      name: name.trim(),
      areaSqMeters: parseFloat(areaSqMeters) || 500,
      soilType: soilType.trim(),
      status,
    });

    setFeedback("Field plot updated! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push(`/farmer/plots/${plotId}`);
    }, 1200);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <MapPin className="w-6 h-6 text-emerald-600" />
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            Edit Field Plot
          </h1>
          <p className="text-xs text-slate-500">
            Update plot area, status, or farm assignment.
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
            Parent Farm *
          </label>
          <select
            value={farmId}
            onChange={(e) => setFarmId(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          >
            {farms.map((f) => (
              <option key={f.localId} value={f.localId}>
                {f.name} ({f.location})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Plot Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Area in Square Meters
            </label>
            <input
              type="number"
              value={areaSqMeters}
              onChange={(e) => setAreaSqMeters(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PlotEntity["status"])}
              className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="PREPARATION">PREPARATION</option>
              <option value="FALLOW">FALLOW</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Soil Type
          </label>
          <input
            type="text"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
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

export default function EditPlotPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const plotId = resolvedParams.id;

  const plot = useLiveQuery(() => db.plots.get(plotId), [plotId]);
  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];

  if (!plot) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading field plot record...</p>
          <Link href="/farmer/plots" className="text-xs font-bold text-emerald-700 underline">
            Return to Plots list
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
          href={`/farmer/plots/${plotId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel &amp; Back to Plot Detail
        </Link>

        <EditPlotForm plot={plot} plotId={plotId} farms={farms} />
      </main>
    </div>
  );
}
