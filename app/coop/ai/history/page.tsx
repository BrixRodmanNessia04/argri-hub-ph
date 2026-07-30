"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CoopLayout from "@/components/CoopLayout";
import { History, ArrowLeft, Bot, CheckCircle2 } from "lucide-react";
import { getAIAuditLogs, AIAuditEntry } from "@/lib/ai/audit";

export default function CoopAIHistoryPage() {
  const [logs, setLogs] = useState<AIAuditEntry[]>([]);

  useEffect(() => {
    setLogs(getAIAuditLogs());
  }, []);

  return (
    <CoopLayout>
      <div className="space-y-6">
        <Link
          href="/coop/ai"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-teal-300"
        >
          <ArrowLeft className="w-4 h-4" /> Back to AI Assistant
        </Link>

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <History className="w-6 h-6 text-teal-400" />
            AI Query Audit Log ({logs.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Audit history of operational AI queries and data analyses.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
          {logs.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">No recent AI queries logged in this session.</p>
          ) : (
            <div className="space-y-2 text-xs">
              {logs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-white">{log.query}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{log.timestamp} • {log.contextType}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CoopLayout>
  );
}
