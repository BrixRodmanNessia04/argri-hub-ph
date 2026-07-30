"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, GeneralLogEntity } from "@/lib/db";
import { updateGeneralLog } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { ArrowLeft, FileText, Save, CheckCircle2 } from "lucide-react";

function EditGeneralLogForm({ log, logId }: { log: GeneralLogEntity; logId: string }) {
  const router = useRouter();
  const [logType, setLogType] = useState<GeneralLogEntity["logType"]>(log.logType);
  const [title, setTitle] = useState(log.title);
  const [notes, setNotes] = useState(log.notes);
  const [date, setDate] = useState(log.date);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !notes.trim()) return;

    await updateGeneralLog(logId, {
      logType,
      title: title.trim(),
      notes: notes.trim(),
      date,
    });

    setFeedback("Farm log updated! Saved locally & queued for sync.");
    setTimeout(() => {
      router.push(`/farmer/logs/${logId}`);
    }, 1200);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <FileText className="w-6 h-6 text-emerald-600" />
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            Edit General Log
          </h1>
          <p className="text-xs text-slate-500">
            Update notes, title, or date.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Log Type *
            </label>
            <select
              value={logType}
              onChange={(e) => setLogType(e.target.value as GeneralLogEntity["logType"])}
              className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="FARM_OBSERVATION">Farm Observation</option>
              <option value="WEATHER">Weather Observation</option>
              <option value="CROP_CONDITION">Crop Condition</option>
              <option value="SOIL_CONDITION">Soil Condition</option>
              <option value="IRRIGATION">Irrigation</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="GENERAL_NOTE">General Note</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Log Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Notes *
          </label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
  );
}

export default function EditGeneralLogPage({ params }: { params: Promise<{ id: string }> }) {
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

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href={`/farmer/logs/${logId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel &amp; Back to Log Detail
        </Link>

        <EditGeneralLogForm log={log} logId={logId} />
      </main>
    </div>
  );
}
