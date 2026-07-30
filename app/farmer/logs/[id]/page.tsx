"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, FileText, Edit, Calendar } from "lucide-react";

export default function GeneralLogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const logId = resolvedParams.id;

  const log = useLiveQuery(() => db.generalLogs.get(logId), [logId]);

  if (!log) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
        <FarmerSubNav />
        <main className="max-w-2xl mx-auto p-4 mt-6 text-center space-y-4">
          <p className="text-slate-500 text-sm">Loading farm log record...</p>
          <Link href="/farmer/logs" className="text-xs font-bold text-emerald-700 underline">
            Return to Unified Logs
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
          href="/farmer/logs"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Unified Logs
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {log.logType}
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  {log.title}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Date: {log.date}</span>
                </p>
              </div>
            </div>

            <Link
              href={`/farmer/logs/${log.localId}/edit`}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <Edit className="w-4 h-4" /> Edit Log
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-2">
            <span className="text-xs font-bold text-slate-700">Observation Notes:</span>
            <p className="text-sm text-slate-800 font-medium whitespace-pre-wrap">{log.notes}</p>
          </div>

          <details className="text-xs text-slate-400 pt-2 border-t border-gray-100">
            <summary className="cursor-pointer font-bold hover:text-slate-600">Technical Details</summary>
            <div className="mt-2 space-y-1 font-mono text-[11px]">
              <p>Local ID: {log.localId}</p>
              <p>Sync Status: {log.syncStatus}</p>
              <p>Device ID: {log.deviceId}</p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}
