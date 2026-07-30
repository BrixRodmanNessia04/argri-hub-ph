"use client";

import React from "react";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Bell, CheckCircle2, Info, AlertTriangle } from "lucide-react";

export default function FarmerNotificationsPage() {
  const notifications = [
    {
      id: "n-1",
      title: "Harvest Submission Received",
      message: "Cooperative leadership received 150 kg Cabbage submission for grading.",
      type: "SUCCESS",
      time: "10 mins ago",
    },
    {
      id: "n-2",
      title: "Rain Forecast Alert",
      message: "60% probability of heavy rain in Atok/La Trinidad at 3:00 PM today.",
      type: "WARNING",
      time: "1 hour ago",
    },
    {
      id: "n-3",
      title: "Cooperative Price Update",
      message: "Highland Sweet Carrots purchase price updated to ₱55.00/kg Class A.",
      type: "INFO",
      time: "Yesterday",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Notifications &amp; Advisories (Mga Pabisita)
            </h1>
          </div>
          <p className="text-xs text-slate-600">
            Weather alerts, cooperative harvest feedback, and market price announcements.
          </p>

          <div className="space-y-3 mt-5">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="bg-slate-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-white border border-gray-200 shrink-0">
                  {n.type === "SUCCESS" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {n.type === "WARNING" && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  {n.type === "INFO" && <Info className="w-4 h-4 text-blue-600" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900">{n.title}</h3>
                    <span className="text-[11px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
