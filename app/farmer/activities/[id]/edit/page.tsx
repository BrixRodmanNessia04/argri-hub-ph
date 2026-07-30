"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FieldActivityEntity } from "@/lib/db";
import { updateFieldActivity } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Activity, Save, CheckCircle2 } from "lucide-react";

export default function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const actId = resolvedParams.id;
  const router = useRouter();

  const activity = useLiveQuery(() => db.fieldActivities.get(actId), [actId]);

  const [activityType, setActivityType] = useState<FieldActivityEntity["activityType"]>("FERTILIZING");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("0");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (activity) {
      setActivityType(activity.activityType);
      setDescription(activity.description);
      setCost(String(activity.cost));
    }
  }, [activity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    await updateFieldActivity(actId, {
      activityType,
      description: description.trim(),
      cost: parseFloat(cost) || 0,
    });

    setFeedback("Activity updated! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push(`/farmer/activities/${actId}`);
    }, 1200);
  };

  if (!activity) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading activity details...</p>
          <Link href="/farmer/activities" className="text-xs font-bold text-emerald-700 underline">
            Return to Activities list
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
          href={`/farmer/activities/${actId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel &amp; Back to Activity Detail
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Activity className="w-6 h-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Edit Field Activity
              </h1>
              <p className="text-xs text-slate-500">
                Update description or costs.
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
                Activity Type *
              </label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value as FieldActivityEntity["activityType"])}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="LAND_PREPARATION">Land Preparation</option>
                <option value="PLANTING">Planting</option>
                <option value="IRRIGATION">Watering / Irrigation</option>
                <option value="FERTILIZING">Fertilizer Application</option>
                <option value="PEST_CONTROL">Pesticide / Spraying</option>
                <option value="WEEDING">Weeding / Cleaning</option>
                <option value="INSPECTION">Farm Inspection</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cost in ₱
              </label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
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
