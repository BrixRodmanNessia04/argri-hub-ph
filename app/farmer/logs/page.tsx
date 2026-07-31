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
  SortAsc,
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

  const getCategoryColors = (cat: UnifiedLogItem["logCategory"]) => {
    switch (cat) {
      case "sale": return { badge: "bg-[#ecfdf5] text-[#047857]", icon: "bg-[#ecfdf5] text-[#059669]" };
      case "expense": return { badge: "bg-[#fff7ed] text-[#c2410c]", icon: "bg-[#fff7ed] text-[#ea580c]" };
      case "harvest": return { badge: "bg-[#fef3c7] text-[#92400e]", icon: "bg-[#fef3c7] text-[#d97706]" };
      case "labor": return { badge: "bg-[#f3e8ff] text-[#7e22ce]", icon: "bg-[#f3e8ff] text-[#9333ea]" };
      case "pest": return { badge: "bg-[#fef2f2] text-[#b91c1c]", icon: "bg-[#fef2f2] text-[#ef4444]" };
      case "inventory": return { badge: "bg-[#e0f2fe] text-[#0369a1]", icon: "bg-[#e0f2fe] text-[#0ea5e9]" };
      case "activity": return { badge: "bg-[#ecfdf5] text-[#047857]", icon: "bg-[#ecfdf5] text-[#059669]" };
      default: return { badge: "bg-[#f1f5f9] text-[#475569]", icon: "bg-[#f1f5f9] text-[#64748b]" };
    }
  };

  const getAmountColor = (val?: string) => {
    if (!val) return "text-[#163025]";
    if (val.startsWith("+")) return "text-[#059669]";
    if (val.startsWith("-")) return "text-[#dc2626]";
    return "text-[#163025]";
  };

  const filteredLogs = logs
    .filter((l) => {
      if (categoryFilter !== "all" && l.logCategory !== categoryFilter) return false;
      if (syncFilter !== "all" && l.syncStatus !== syncFilter) return false;
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        return (
          l.title.toLowerCase().includes(query) ||
          (l.summary || "").toLowerCase().includes(query)
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
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] pb-24">
      <FarmerSubNav />

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-4 space-y-4 mt-2">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#dce9df] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#059669]" />
              <h1 className="text-lg sm:text-xl font-extrabold text-[#163025]">
                Farm Logs <span className="hidden sm:inline">(Lahat ng Talaan)</span>
              </h1>
            </div>
            <p className="text-[11px] sm:text-xs text-[#5f7469] mt-1 leading-relaxed">
              Activities, expenses, harvests, sales, labor and notes — all in one feed.
            </p>
          </div>

          <Link
            href="/farmer/logs/new"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] active:bg-[#065f46] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 shrink-0 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create General Log</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#dce9df] rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#163025]">
            <Filter className="w-4 h-4 text-[#059669]" />
            <span>Filters &amp; Search</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
            {/* Search */}
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 text-[#9db5a5] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search logs..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-xs font-semibold text-[#163025] placeholder:text-[#9db5a5] focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
              />
            </div>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-xs font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
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

            {/* Sync status */}
            <select
              value={syncFilter}
              onChange={(e) => setSyncFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-xs font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
            >
              <option value="all">All Sync States</option>
              <option value="local">Local Only</option>
              <option value="pending">Pending Sync</option>
              <option value="synced">Synced</option>
              <option value="failed">Sync Failed</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#dce9df] text-[11px] text-[#5f7469]">
            <span className="font-semibold">{filteredLogs.length} log{filteredLogs.length !== 1 ? "s" : ""} found</span>
            <button
              onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
              className="flex items-center gap-1.5 font-bold text-[#059669] hover:text-[#047857] transition-colors"
            >
              <SortAsc className="w-3.5 h-3.5" />
              {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </button>
          </div>
        </div>

        {/* Log List */}
        <div className="space-y-2.5">
          {filteredLogs.length === 0 ? (
            <div className="bg-white border border-dashed border-[#dce9df] rounded-2xl p-8 sm:p-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-[#9db5a5] mx-auto" />
              <p className="font-extrabold text-[#163025] text-sm">No log entries found</p>
              <p className="text-xs text-[#5f7469]">Try changing your filters or create a new log entry.</p>
              <Link
                href="/farmer/logs/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create New Farm Log
              </Link>
            </div>
          ) : (
            filteredLogs.map((item) => {
              const Icon = getCategoryIcon(item.logCategory);
              const colors = getCategoryColors(item.logCategory);
              const amountColor = getAmountColor(item.amountOrQty);

              return (
                <div
                  key={`${item.logCategory}_${item.id}`}
                  className="bg-white border border-[#dce9df] rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#059669]/60 hover:shadow-sm transition-all"
                >
                  {/* Left: Icon + Info */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 mt-0.5 ${colors.icon}`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      {/* Badges row */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${colors.badge}`}>
                          {item.typeBadge}
                        </span>
                        <span className="text-[10px] text-[#9db5a5] font-mono">
                          {item.date ? new Date(item.date).toLocaleDateString("en-PH", { month: "short", day: "numeric" }) : "—"}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.syncStatus === "synced"
                              ? "bg-[#ecfdf5] text-[#059669]"
                              : item.syncStatus === "pending"
                              ? "bg-[#fef3c7] text-[#d97706]"
                              : item.syncStatus === "failed"
                              ? "bg-[#fef2f2] text-[#dc2626]"
                              : "bg-[#f1f5f9] text-[#64748b]"
                          }`}
                        >
                          {item.syncStatus.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#163025] truncate">{item.title}</h3>
                      <p className="text-[11px] text-[#5f7469] line-clamp-1 mt-0.5">
                        {item.summary || "No description"}
                      </p>
                    </div>
                  </div>

                  {/* Right: Amount + Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-[#dce9df] shrink-0">
                    {item.amountOrQty && (
                      <span className={`font-extrabold text-sm tabular-nums ${amountColor}`}>
                        {item.amountOrQty}
                      </span>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={item.viewUrl}
                        className="p-2 rounded-lg bg-[#f6fbf7] hover:bg-[#dce9df] text-[#163025] transition-colors"
                        title="View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={item.editUrl}
                        className="p-2 rounded-lg bg-[#ecfdf5] hover:bg-[#a7f3d0] text-[#059669] transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
