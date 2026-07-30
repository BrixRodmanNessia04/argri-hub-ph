"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { updateTask, deleteTask } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { CheckSquare, Plus, CheckCircle2, Clock, Trash2 } from "lucide-react";

export default function FarmerTasksPage() {
  const tasks = useLiveQuery(() => db.tasks.filter((t) => !t.isDeleted).toArray(), []) || [];

  const handleToggleStatus = async (localId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED";
    await updateTask(localId, { status: nextStatus });
  };

  const handleDelete = async (localId: string) => {
    await deleteTask(localId);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                Farm Tasks &amp; Reminders (Mga Gagawin)
              </h1>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Create task checklists for irrigation, fertilizer application, and coop deliveries.
            </p>
          </div>

          <Link
            href="/farmer/tasks/new"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Task</span>
          </Link>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Pending Tasks ({tasks.length})
          </h2>

          {tasks.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500 space-y-3">
              <CheckSquare className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold">No farm tasks created yet.</p>
              <Link
                href="/farmer/tasks/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" /> Create Your First Task
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {tasks.map((t) => (
                <div
                  key={t.localId}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleStatus(t.localId, t.status)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        t.status === "COMPLETED"
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-gray-300 text-transparent hover:border-emerald-500"
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <div>
                      <h3 className={`font-bold text-sm ${t.status === "COMPLETED" ? "line-through text-slate-400" : "text-slate-900"}`}>
                        {t.title}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Due: {t.dueDate}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 font-bold text-[10px]">{t.priority}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(t.localId)}
                    className="text-slate-400 hover:text-red-600 p-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
