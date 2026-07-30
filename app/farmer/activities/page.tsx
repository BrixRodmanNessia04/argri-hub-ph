"use client";

import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, createBaseEntity, FieldActivityEntity } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Activity, Plus, CheckCircle2, Trash2 } from "lucide-react";

export default function FarmerActivitiesPage() {
  const activities = useLiveQuery(() => db.fieldActivities.toArray(), []) || [];
  const cropCycles = useLiveQuery(() => db.cropCycles.toArray(), []) || [];

  const [type, setType] = useState<FieldActivityEntity["activityType"]>("FERTILIZING");
  const [cropCycleId, setCropCycleId] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("350");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newAct: FieldActivityEntity = {
      ...createBaseEntity("farmer-123", "coop-456"),
      cropCycleId: cropCycleId || "cycle-default",
      activityType: type,
      description: description.trim(),
      cost: parseFloat(cost) || 0,
      loggedAt: new Date().toISOString().split("T")[0],
    };

    await db.fieldActivities.add(newAct);
    setDescription("");
    setFeedback(`Activity logged successfully!`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = async (localId: string) => {
    await db.fieldActivities.delete(localId);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Field Activities (Gawain sa Bukid)
            </h1>
          </div>
          <p className="text-xs text-slate-600">
            Log planting, watering, pesticide application, and weeding activities offline.
          </p>

          {feedback && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleAddActivity} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Activity Type (Uri ng Gawain)
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as FieldActivityEntity["activityType"])}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="PLANTING">Planting (Pagtatanim)</option>
                <option value="IRRIGATION">Watering / Irrigation (Pagdidilig)</option>
                <option value="FERTILIZING">Fertilizer Application (Pag-abono)</option>
                <option value="PEST_CONTROL">Pesticide / Spraying (Pag-spray)</option>
                <option value="WEEDING">Weeding / Cleaning (Pag-gamas)</option>
                <option value="INSPECTION">Farm Inspection (Pagsusuri)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Crop Cycle
              </label>
              <select
                value={cropCycleId}
                onChange={(e) => setCropCycleId(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="">-- Select Crop Batch --</option>
                {cropCycles.map((c) => (
                  <option key={c.localId} value={c.localId}>
                    {c.crop} ({c.variety})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description (Detalye ng Gawain)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Applied 2 bags of organic fertilizer on Plot 2"
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Associated Cost in ₱ (Gastos)
              </label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Log Activity (Offline Ready)</span>
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Activity Log History ({activities.length})
          </h2>

          {activities.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500">
              No field activities logged yet.
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((act) => (
                <div
                  key={act.localId}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        {act.activityType}
                      </span>
                      <span className="text-xs text-slate-400">{act.loggedAt}</span>
                    </div>
                    <p className="font-bold text-sm text-slate-900 mt-1">
                      {act.description}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="font-extrabold text-sm text-rose-600">
                      -₱{act.cost.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleDelete(act.localId)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
