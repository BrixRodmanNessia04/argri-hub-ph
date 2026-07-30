"use client";

import React, { useState } from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function CoopMessagesPage() {
  const [announcement, setAnnouncement] = useState("Pahimangno: Ang pagtanggap ng rebolyo sa coop warehouse ay bukas ngayong Biyernes 8AM-4PM.");
  const [recipientGroup, setRecipientGroup] = useState("ALL_FARMERS");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(`Broadcast queued for 24 member farmers via SMS gateway!`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            MEMBER COMMUNICATION CENTER
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Broadcast SMS &amp; Cooperative Announcements
          </h1>
        </div>

        {feedback && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Recipient Target Group
              </label>
              <select
                value={recipientGroup}
                onChange={(e) => setRecipientGroup(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-teal-500"
              >
                <option value="ALL_FARMERS">All Active Member Farmers (24 Members)</option>
                <option value="CABBAGE_GROWERS">Cabbage Farmers</option>
                <option value="TOMATO_GROWERS">Tomato Farmers</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                SMS Announcement Content (Tagalog / Ilocano / English)
              </label>
              <textarea
                rows={4}
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-teal-500 font-medium"
                required
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast SMS to 24 Members</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
