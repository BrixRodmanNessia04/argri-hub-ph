"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Sprout, Activity, CheckSquare, Scissors } from "lucide-react";

export default function FarmerCalendarPage() {
  const [viewMode, setViewMode] = useState<"month" | "week" | "agenda">("month");
  const cropCycles = useLiveQuery(() => db.cropCycles.filter((c) => !c.isDeleted).toArray(), []) || [];
  const activities = useLiveQuery(() => db.fieldActivities.filter((a) => !a.isDeleted).toArray(), []) || [];
  const tasks = useLiveQuery(() => db.tasks.filter((t) => !t.isDeleted).toArray(), []) || [];
  const harvests = useLiveQuery(() => db.harvests.filter((h) => !h.isDeleted).toArray(), []) || [];

  const agendaEvents = [
    ...cropCycles.map((c) => ({ id: c.localId, title: `Harvest Expected: ${c.crop}`, date: c.estimatedHarvestAt, type: "crop", icon: Sprout, url: `/farmer/crops/${c.localId}` })),
    ...activities.map((a) => ({ id: a.localId, title: `Activity: ${a.activityType}`, date: a.loggedAt, type: "activity", icon: Activity, url: `/farmer/activities/${a.localId}` })),
    ...tasks.map((t) => ({ id: t.localId, title: `Task: ${t.title}`, date: t.dueDate, type: "task", icon: CheckSquare, url: `/farmer/tasks` })),
    ...harvests.map((h) => ({ id: h.localId, title: `Harvested: ${h.weightKg}kg ${h.crop}`, date: h.harvestedAt, type: "harvest", icon: Scissors, url: `/farmer/harvests/${h.localId}` })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-5xl mx-auto p-4 space-y-6 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-emerald-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                Farm Schedule &amp; Calendar (Kalendaryo)
              </h1>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              View planting schedules, expected harvests, tasks, and labor offline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
              <button
                onClick={() => setViewMode("month")}
                className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === "month" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-600"}`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode("agenda")}
                className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === "agenda" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-600"}`}
              >
                Agenda
              </button>
            </div>

            <Link
              href="/farmer/tasks/new"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Event
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-900">July 2026 Schedule</h2>
            <div className="flex items-center gap-1 text-slate-500">
              <button className="p-1 rounded-lg hover:bg-slate-100"><ChevronLeft className="w-4 h-4" /></button>
              <button className="p-1 rounded-lg hover:bg-slate-100"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          {viewMode === "month" ? (
            <div className="grid grid-cols-7 gap-1 text-center text-xs border border-gray-200 rounded-xl overflow-hidden bg-slate-50">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="py-2 font-bold bg-slate-200/60 text-slate-700">{day}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <div key={d} className="min-h-[70px] p-1 bg-white border-t border-r border-gray-100 flex flex-col items-start justify-between text-[11px]">
                  <span className={`font-bold p-1 rounded-full ${d === 28 || d === 30 ? "bg-emerald-600 text-white" : "text-slate-700"}`}>{d}</span>
                  {d === 28 && <span className="px-1 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold truncate w-full text-[9px]">Cabbage Harvest</span>}
                  {d === 30 && <span className="px-1 py-0.5 rounded bg-blue-100 text-blue-800 font-bold truncate w-full text-[9px]">Spraying Task</span>}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {agendaEvents.map((evt) => {
                const Icon = evt.icon;
                return (
                  <Link
                    key={evt.id}
                    href={evt.url}
                    className="p-3.5 rounded-xl border border-gray-200 bg-slate-50 hover:bg-emerald-50/50 flex items-center justify-between text-xs transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{evt.title}</h3>
                        <p className="text-slate-500 font-mono text-[11px]">{evt.date}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
