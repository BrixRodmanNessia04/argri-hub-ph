"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getUnifiedFarmerLogs, UnifiedLogItem } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Activity,
  TrendingDown,
  Scissors,
  DollarSign,
  Package,
  Bug,
  Users,
  Wrench,
} from "lucide-react";

export default function UnifiedFarmerLogsPage() {
  const [logs, setLogs] = useState<UnifiedLogItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [syncFilter, setSyncFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    getUnifiedFarmerLogs().then(setLogs);
  }, []);

  const getCategoryIcon = (cat: UnifiedLogItem["logCategory"]) => {
    switch (cat) {
      case "activity": return Activity;
      case "expense": return TrendingDown;
      case "harvest": return Scissors;
      case "sale": return DollarSign;
      case "inventory": return Package;
      case "pest": return Bug;
      case "labor": return Users;
      case "equipment": return Wrench;
      default: return FileText;
    }
  };

  const filteredLogs = logs
    .filter((l) => {
      if (categoryFilter !== "all" && l.logCategory !== categoryFilter) return false;
      if (syncFilter !== "all" && l.syncStatus !== syncFilter) return false;
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        return (
          l.title.toLowerCase().includes(query) ||
          l.summary.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-5xl mx-auto p-4 space-y-6 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                Unified Farm Logs Feed (Lahat ng Talaan)
              </h1>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              One centralized place to review activities, expenses, harvests, sales, labor, and notes saved locally.
            </p>
          </div>

          <Link
            href="/farmer/logs/new"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create General Log</span>
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>Filters &amp; Search</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search logs by keyword..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold focus:outline-none"
              >
                <option value="all">All Log Types</option>
                <option value="activity">Field Activities</option>
                <option value="expense">Expenses</option>
                <option value="harvest">Harvests</option>
                <option value="sale">Sales</option>
                <option value="inventory">Inventory</option>
                <option value="pest">Pests &amp; Diseases</option>
                <option value="labor">Labor Logs</option>
                <option value="equipment">Equipment</option>
                <option value="general">General Notes</option>
              </select>
            </div>

            <div>
              <select
                value={syncFilter}
                onChange={(e) => setSyncFilter(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold focus:outline-none"
              >
                <option value="all">All Sync States</option>
                <option value="local">Local Only</option>
                <option value="pending">Pending Sync</option>
                <option value="synced">Synced</option>
                <option value="failed">Sync Failed</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-xs text-slate-500">
            <span>Showing {filteredLogs.length} matching logs</span>
            <button
              onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
              className="font-bold text-emerald-700 hover:underline"
            >
              Sort: {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredLogs.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500 space-y-3">
              <FileText className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold">No log entries found matching your filter criteria.</p>
              <Link
                href="/farmer/logs/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" /> Create New Farm Log
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((item) => {
                const Icon = getCategoryIcon(item.logCategory);
                return (
                  <div
                    key={`${item.logCategory}_${item.id}`}
                    className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-500 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {item.typeBadge}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.syncStatus === "synced"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {item.syncStatus.toUpperCase()}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm text-slate-900 mt-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-1">{item.summary}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      {item.amountOrQty && (
                        <span className="font-extrabold text-sm text-slate-900">
                          {item.amountOrQty}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={item.viewUrl}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={item.editUrl}
                          className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
