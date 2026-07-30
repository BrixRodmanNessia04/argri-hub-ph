"use client";

import React, { useState } from "react";
import CoopLayout from "@/components/CoopLayout";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function CoopMessagesPage() {
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setFeedback("Broadcast SMS sent to 24 member farmers via Semaphore Gateway!");
    setMessage("");
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            BROADCAST SMS COMMUNICATIONS
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            Broadcast SMS to Member Farmers
          </h1>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-extrabold text-white">Compose Broadcast Message</h2>
          <form onSubmit={handleBroadcast} className="space-y-3 text-xs">
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Paalala: Ang pagtanggap ng Highland Cabbage para sa Lot #08A ay magsisimula bukas 8:00 AM sa Pico Cold Storage."
              className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Broadcast SMS (24 Farmers)
            </button>
          </form>
        </div>
      </div>
    </CoopLayout>
  );
}
