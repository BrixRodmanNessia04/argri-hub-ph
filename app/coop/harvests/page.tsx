"use client";

import React, { useState } from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Scissors, CheckCircle2, XCircle, AlertTriangle, Layers } from "lucide-react";

export default function CoopHarvestsApprovalPage() {
  const localHarvests = useLiveQuery(() => db.harvests.toArray(), []) || [];
  const [feedback, setFeedback] = useState<string | null>(null);

  // Mock static submitted harvests if none exist in Dexie
  const mockSubmissions = [
    { id: "h-101", farmerName: "Jose Reyes", crop: "Benguet Cabbage", weightKg: 150.0, grade: "Class A", date: "10 mins ago", status: "PENDING" },
    { id: "h-102", farmerName: "Maria Santos", crop: "Baguio Tomatoes", weightKg: 120.5, grade: "Class A", date: "25 mins ago", status: "PENDING" },
    { id: "h-103", farmerName: "Ricardo Cruz", crop: "Mountain Eggplant", weightKg: 85.0, grade: "Class B", date: "1 hour ago", status: "PENDING" },
    { id: "h-104", farmerName: "Elena Gomez", crop: "Atok Carrots", weightKg: 210.0, grade: "Class A", date: "2 hours ago", status: "PENDING" },
  ];

  const handleApprove = async (id: string, crop: string, weight: number) => {
    setFeedback(`Approved harvest submission of ${weight} kg ${crop}. Moved to aggregation pool.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleReject = async (id: string) => {
    setFeedback(`Harvest submission ${id} rejected with feedback sent to farmer.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                HARVEST SUBMISSION REVIEW QUEUE
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Member Harvest Approval &amp; Quality Grading
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Review incoming harvest submissions synced from member farmer PWAs.
            </p>
          </div>
        </div>

        {feedback && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-sm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{feedback}</span>
            </div>
          </div>
        )}

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Scissors className="w-5 h-5 text-teal-400" />
              Pending Harvest Submissions
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 text-xs font-bold border border-teal-500/20">
              {mockSubmissions.length + localHarvests.length} Lots Pending Review
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3.5 px-6 font-semibold">Farmer Member</th>
                  <th className="py-3.5 px-6 font-semibold">Crop &amp; Grade</th>
                  <th className="py-3.5 px-6 font-semibold">Weight</th>
                  <th className="py-3.5 px-6 font-semibold">Submitted</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {mockSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      {sub.farmerName}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-white">{sub.crop}</p>
                      <span className="text-xs text-teal-400">{sub.grade}</span>
                    </td>
                    <td className="py-4 px-6 font-extrabold text-emerald-400">
                      {sub.weightKg} kg
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400">{sub.date}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleApprove(sub.id, sub.crop, sub.weightKg)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        Approve Harvest
                      </button>
                      <button
                        onClick={() => handleReject(sub.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
                      >
                        Reject / Adjust
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
