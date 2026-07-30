import React from "react";
import Link from "next/link";
import { AggregateForm } from "./AggregateForm";
import {
  Users,
  Sprout,
  TrendingUp,
  ArrowLeft,
  ShieldCheck,
  PackageCheck,
  Clock,
} from "lucide-react";

interface MemberHarvest {
  id: string;
  farmerId: string;
  farmerName: string;
  crop: string;
  weightKg: number;
  status: "PENDING" | "AGGREGATED";
  submittedAt: string;
}

export default async function CoopDashboardPage() {
  // Mock data representing pending harvest logs submitted by member farmers
  const mockMemberHarvests: MemberHarvest[] = [
    {
      id: "h-101",
      farmerId: "farmer-123",
      farmerName: "Jose Reyes",
      crop: "Cabbage",
      weightKg: 50.0,
      status: "PENDING",
      submittedAt: "10 mins ago",
    },
    {
      id: "h-102",
      farmerId: "farmer-104",
      farmerName: "Maria Santos",
      crop: "Cabbage",
      weightKg: 120.5,
      status: "PENDING",
      submittedAt: "25 mins ago",
    },
    {
      id: "h-103",
      farmerId: "farmer-209",
      farmerName: "Ricardo Cruz",
      crop: "Eggplant",
      weightKg: 85.0,
      status: "PENDING",
      submittedAt: "1 hour ago",
    },
    {
      id: "h-104",
      farmerId: "farmer-311",
      farmerName: "Elena Gomez",
      crop: "Tomato",
      weightKg: 210.0,
      status: "PENDING",
      submittedAt: "2 hours ago",
    },
  ];

  const totalPendingWeight = mockMemberHarvests
    .filter((h) => h.status === "PENDING")
    .reduce((sum, h) => sum + h.weightKg, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-emerald-500/20 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Back to Offline PWA"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Benguet Farmers Cooperative
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  COOP LEADER PORTAL
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Cooperative ID: <code className="text-emerald-400">coop-456</code> • Member Aggregation &amp; B2B Marketplace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>Supabase Connected</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
        {/* KPI Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Pending Member Harvests
              </span>
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                <Sprout className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white mt-3">
              {mockMemberHarvests.length} Lots
            </p>
            <p className="text-xs text-emerald-400 mt-1 font-medium">
              Ready for cooperative bundling
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Total Poolable Volume
              </span>
              <div className="p-2 bg-teal-500/10 rounded-xl text-teal-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white mt-3">
              {totalPendingWeight.toFixed(1)} kg
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Estimated market value @ ₱45/kg
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Active Farmers
              </span>
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white mt-3">
              24 Members
            </p>
            <p className="text-xs text-blue-400 mt-1 font-medium">
              Multi-role B2B network
            </p>
          </div>
        </div>

        {/* Aggregation Control Section */}
        <AggregateForm availableCrops={["Cabbage", "Eggplant", "Tomato"]} coopId="coop-456" />

        {/* Member Harvests Table Section */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                Pending Harvests from Members
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time harvest logs synced from offline farmer PWAs
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3.5 px-6 font-semibold">Farmer Member</th>
                  <th className="py-3.5 px-6 font-semibold">Crop</th>
                  <th className="py-3.5 px-6 font-semibold">Weight</th>
                  <th className="py-3.5 px-6 font-semibold">Status</th>
                  <th className="py-3.5 px-6 font-semibold">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {mockMemberHarvests.map((harvest) => (
                  <tr
                    key={harvest.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-white">
                      <div>
                        <p className="font-semibold">{harvest.farmerName}</p>
                        <p className="text-xs text-slate-500">{harvest.farmerId}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        <Sprout className="w-3.5 h-3.5" />
                        {harvest.crop}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-100">
                      {harvest.weightKg.toFixed(2)} kg
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        <Clock className="w-3.5 h-3.5" />
                        {harvest.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400">
                      {harvest.submittedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        AgriHub PH • Cooperative Dashboard • Supabase Multi-Role B2B Platform
      </footer>
    </div>
  );
}
