"use client";

import React from "react";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Bell, Clock, ShieldAlert } from "lucide-react";

export default function FarmerRemindersPage() {
  const reminders = [
    { id: "r1", title: "Harvest Safety Interval Alert", desc: "Safe re-entry date for Plot 2 pesticide spray completed.", time: "Today", urgent: true },
    { id: "r2", title: "Cooperative Pickup Schedule", desc: "La Trinidad truck scheduled for 10:00 AM pickup of Class A cabbage.", time: "Tomorrow", urgent: false },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-extrabold text-slate-900">
              In-App Farm Reminders &amp; Safety Alerts
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Local alerts for re-entry dates, pre-harvest intervals, and pickup schedules.
          </p>
        </div>

        <div className="space-y-3">
          {reminders.map((r) => (
            <div
              key={r.id}
              className={`bg-white border rounded-2xl p-4 shadow-sm flex items-start gap-3 ${
                r.urgent ? "border-amber-300 bg-amber-50/40" : "border-gray-200"
              }`}
            >
              <div className={`p-2.5 rounded-xl ${r.urgent ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                {r.urgent ? <ShieldAlert className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="font-bold text-sm text-slate-900">{r.title}</h2>
                <p className="text-xs text-slate-600 mt-0.5">{r.desc}</p>
                <span className="text-[10px] text-slate-400 font-mono mt-1 inline-block">{r.time}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
