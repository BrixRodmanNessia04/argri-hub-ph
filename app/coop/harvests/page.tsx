"use client";

import React, { useState } from "react";
import CoopLayout from "@/components/CoopLayout";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Scissors, CheckCircle2, XCircle, AlertTriangle, Layers, Eye, X, Save } from "lucide-react";

export default function CoopHarvestsApprovalPage() {
  const localHarvests = useLiveQuery(() => db.harvests.toArray(), []) || [];
  const [feedback, setFeedback] = useState<string | null>(null);

  // Review Sheet State
  const [reviewItem, setReviewItem] = useState<{
    id: string;
    farmerName: string;
    crop: string;
    weightKg: number;
    grade: string;
    date: string;
  } | null>(null);

  const [acceptedWeight, setAcceptedWeight] = useState<number>(0);
  const [reviewGrade, setReviewGrade] = useState<string>("Class A");
  const [storageDestination, setStorageDestination] = useState<string>("La Trinidad Central Cold Storage");
  const [reviewNotes, setReviewNotes] = useState<string>("");

  const mockSubmissions = [
    { id: "h-101", farmerName: "Jose Reyes", crop: "Benguet Cabbage", weightKg: 150.0, grade: "Class A", date: "10 mins ago", status: "PENDING" },
    { id: "h-102", farmerName: "Maria Santos", crop: "Baguio Tomatoes", weightKg: 120.5, grade: "Class A", date: "25 mins ago", status: "PENDING" },
    { id: "h-103", farmerName: "Ricardo Cruz", crop: "Mountain Eggplant", weightKg: 85.0, grade: "Class B", date: "1 hour ago", status: "PENDING" },
    { id: "h-104", farmerName: "Elena Gomez", crop: "Atok Carrots", weightKg: 210.0, grade: "Class A", date: "2 hours ago", status: "PENDING" },
  ];

  const handleOpenReview = (sub: typeof mockSubmissions[0]) => {
    setReviewItem(sub);
    setAcceptedWeight(sub.weightKg);
    setReviewGrade(sub.grade);
    setReviewNotes("");
  };

  const handleConfirmApproval = () => {
    if (!reviewItem) return;
    setFeedback(`Approved ${acceptedWeight} kg of ${reviewItem.crop} (${reviewGrade}) for ${reviewItem.farmerName}. Assigned to ${storageDestination}.`);
    setReviewItem(null);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleConfirmRejection = () => {
    if (!reviewItem) return;
    if (confirm(`Confirm rejection of harvest submission from ${reviewItem.farmerName}?`)) {
      setFeedback(`Harvest submission ${reviewItem.id} rejected. Notification sent to ${reviewItem.farmerName}.`);
      setReviewItem(null);
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            HARVEST SUBMISSION REVIEW QUEUE
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1">
            Harvest Approval &amp; Quality Grading
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Review incoming harvest submissions synced from member farmer PWAs.
          </p>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{feedback}</span>
            </div>
          </div>
        )}

        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <Scissors className="w-5 h-5 text-teal-400" />
              Pending Harvest Submissions
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 text-xs font-bold border border-teal-500/20">
              {mockSubmissions.length + localHarvests.length} Submissions Pending Review
            </span>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-6 font-semibold">Farmer Member</th>
                <th className="py-3.5 px-6 font-semibold">Crop &amp; Grade</th>
                <th className="py-3.5 px-6 font-semibold">Weight</th>
                <th className="py-3.5 px-6 font-semibold">Submitted</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-semibold">
              {mockSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-850 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{sub.farmerName}</td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-white">{sub.crop}</p>
                    <span className="text-[11px] text-teal-400">{sub.grade}</span>
                  </td>
                  <td className="py-4 px-6 font-extrabold text-emerald-400">{sub.weightKg} kg</td>
                  <td className="py-4 px-6 text-slate-400">{sub.date}</td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleOpenReview(sub)}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm"
                    >
                      Review Harvest
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="md:hidden space-y-3">
          {mockSubmissions.map((sub) => (
            <div key={sub.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-400 text-[10px] font-extrabold border border-teal-800">
                  {sub.grade}
                </span>
                <span className="text-[11px] text-slate-400">{sub.date}</span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-white">{sub.crop}</h3>
                <p className="text-xs text-slate-400">Farmer: {sub.farmerName}</p>
                <p className="text-sm font-extrabold text-emerald-400 mt-1">Submitted: {sub.weightKg} kg</p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => handleOpenReview(sub)}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" /> Review &amp; Grade Harvest
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL-SCREEN / MOBILE HARVEST REVIEW SHEET */}
      {reviewItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 space-y-5 shadow-2xl animate-in fade-in max-h-[92dvh] overflow-y-auto text-xs pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-white">Review Harvest Submission</h3>
                <p className="text-slate-400 text-[11px]">Submitted by {reviewItem.farmerName}</p>
              </div>
              <button
                onClick={() => setReviewItem(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold">Crop &amp; Variety</span>
                <p className="font-extrabold text-white text-sm">{reviewItem.crop}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Submitted Weight (Kg)</label>
                  <input
                    type="number"
                    value={reviewItem.weightKg}
                    disabled
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 font-bold opacity-70"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Accepted Weight (Kg) *</label>
                  <input
                    type="number"
                    value={acceptedWeight}
                    onChange={(e) => setAcceptedWeight(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 font-extrabold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Quality Grade *</label>
                  <select
                    value={reviewGrade}
                    onChange={(e) => setReviewGrade(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 font-bold text-white"
                  >
                    <option value="Class A">Class A (Premium)</option>
                    <option value="Class B">Class B (Standard)</option>
                    <option value="Class C">Class C (Processing)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Storage Destination</label>
                  <select
                    value={storageDestination}
                    onChange={(e) => setStorageDestination(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 font-bold text-white"
                  >
                    <option value="La Trinidad Central Cold Storage">La Trinidad Central Cold Storage</option>
                    <option value="Pico Warehouse Hub">Pico Warehouse Hub</option>
                    <option value="Buguias Trading Post Room">Buguias Trading Post Room</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Quality Inspection Notes &amp; Feedback</label>
                <textarea
                  rows={2}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="e.g. Good firmness, uniform size, zero pest damage"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 font-semibold text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleConfirmRejection}
                className="w-1/2 py-3 rounded-xl bg-rose-950/60 hover:bg-rose-950 text-rose-300 font-bold border border-rose-900"
              >
                Reject Harvest
              </button>
              <button
                onClick={handleConfirmApproval}
                className="w-1/2 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" /> Approve Harvest
              </button>
            </div>
          </div>
        </div>
      )}
    </CoopLayout>
  );
}
