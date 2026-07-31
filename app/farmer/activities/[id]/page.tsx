"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, Activity, Edit, Calendar, DollarSign } from "lucide-react";

export default function FieldActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const actId = resolvedParams.id;

  const activity = useLiveQuery(() => db.fieldActivities.get(actId), [actId]);

  if (!activity) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading field activity details...</p>
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

      <main className="max-w-3xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/activities"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Activities
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {activity.activityType}
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  {activity.description}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Logged on: {activity.loggedAt}</span>
                </p>
              </div>
            </div>

            <Link
              href={`/farmer/activities/${activity.localId}/edit`}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <Edit className="w-4 h-4" /> Edit Activity
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Cost:</span>
              <p className="font-extrabold text-rose-600 text-base mt-0.5">
                ₱{(activity.cost ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Sync Status:</span>
              <p className="font-bold text-slate-900 mt-0.5 uppercase">{activity.syncStatus}</p>
            </div>
          </div>

          {activity.applicationRate && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200 text-xs space-y-1">
              <span className="text-slate-400 font-medium">Application Rate:</span>
              <p className="text-slate-800 font-bold">{activity.applicationRate}</p>
            </div>
          )}

          <details className="text-xs text-slate-400 pt-2 border-t border-gray-100">
            <summary className="cursor-pointer font-bold hover:text-slate-600">Technical Details</summary>
            <div className="mt-2 space-y-1 font-mono text-[11px]">
              <p>Local ID: {activity.localId}</p>
              <p>Device ID: {activity.deviceId}</p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}
