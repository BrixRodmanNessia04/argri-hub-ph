"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import FarmerSubNav from "@/components/FarmerSubNav";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCompletionCard, { CompletionItem } from "@/components/profile/ProfileCompletionCard";
import {
  User,
  Edit,
  Phone,
  Mail,
  Globe,
  MapPin,
  Building2,
  Sprout,
  Plus,
  RefreshCw,
  Users,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function FarmerProfilePage() {
  const router = useRouter();

  const session = useLiveQuery(() => db.localSession.toCollection().first(), []) || null;
  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];
  const cropCycles = useLiveQuery(() => db.cropCycles.filter((c) => !c.isDeleted).toArray(), []) || [];
  const pendingSync = useLiveQuery(() => db.syncQueue.toArray(), []) || [];

  const farmerName = session?.name || "Juan dela Cruz";
  const farmerPhone = session?.phone || "0917-123-4567";
  const farmerEmail = "juan.farmer@agrihub.ph";
  const farmerLang = "Tagalog / English";
  const location = "Sitio Balili, La Trinidad, Benguet";
  const coopName = "Benguet Farmers Cooperative #456";

  const completionItems: CompletionItem[] = [
    { key: "name", label: "Full Name Provided", isComplete: !!farmerName },
    { key: "phone", label: "Mobile Phone Verified", isComplete: !!farmerPhone },
    { key: "location", label: "Farm Location Set", isComplete: !!location },
    { key: "farm", label: "At least 1 Farm Registered", isComplete: farms.length > 0 },
    { key: "lang", label: "Preferred Language Selected", isComplete: !!farmerLang },
  ];

  const handleSignOut = async () => {
    if (confirm("Sign out of AgriHub PH local session? Unsynced records will remain safe in local offline storage.")) {
      await db.localSession.clear();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        {/* Profile Header */}
        <ProfileHeader
          name={farmerName}
          roleTitle="REGISTERED FARMER"
          idBadge="FARM-2026-889"
          isVerified={true}
          isOnline={typeof navigator !== "undefined" ? navigator.onLine : true}
          pendingSyncCount={pendingSync.length}
          onSyncClick={() => router.push("/farmer/sync")}
        />

        {/* Profile Completion Indicator */}
        <ProfileCompletionCard items={completionItems} />

        {/* Quick Actions Grid */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-3">
          <h2 className="text-sm font-extrabold text-slate-900">
            Farmer Quick Actions
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href="/farmer/farms/new"
              className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold flex flex-col items-center text-center gap-1.5 transition-all"
            >
              <Plus className="w-5 h-5 text-emerald-600" />
              <span>Add New Farm</span>
            </Link>

            <Link
              href="/farmer/profile/edit"
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-gray-200 text-slate-800 font-bold flex flex-col items-center text-center gap-1.5 transition-all"
            >
              <Edit className="w-5 h-5 text-slate-700" />
              <span>Edit Details</span>
            </Link>

            <Link
              href="/farmer/cooperative"
              className="p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-bold flex flex-col items-center text-center gap-1.5 transition-all"
            >
              <Users className="w-5 h-5 text-blue-600" />
              <span>My Cooperative</span>
            </Link>

            <Link
              href="/farmer/sync"
              className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold flex flex-col items-center text-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-5 h-5 text-amber-600" />
              <span>Sync Queue</span>
            </Link>
          </div>
        </div>

        {/* Profile Information Cards */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Personal Information
              </h2>
            </div>

            <Link
              href="/farmer/profile/edit"
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 shrink-0"
            >
              <Edit className="w-3.5 h-3.5" /> Edit Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" /> Mobile Number
              </span>
              <p className="font-extrabold text-slate-900 text-sm">{farmerPhone}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-600" /> Email Address
              </span>
              <p className="font-extrabold text-slate-900 text-sm truncate">{farmerEmail}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-600" /> Preferred Language
              </span>
              <p className="font-extrabold text-slate-900 text-sm">{farmerLang}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Location / Address
              </span>
              <p className="font-extrabold text-slate-900 text-sm">{location}</p>
            </div>
          </div>

          {/* Farm Statistics */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100 text-center">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-bold text-slate-600">Registered Farms</span>
              <p className="text-xl font-extrabold text-emerald-700 mt-1">{farms.length}</p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200">
              <span className="text-[11px] font-bold text-slate-600">Active Crop Cycles</span>
              <p className="text-xl font-extrabold text-blue-700 mt-1">{cropCycles.length}</p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200">
              <span className="text-[11px] font-bold text-slate-600">Cooperative</span>
              <p className="text-xs font-extrabold text-purple-800 mt-1 truncate">{coopName}</p>
            </div>
          </div>
        </div>

        {/* Links & Sign Out */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-2 text-xs font-bold">
          <Link
            href="/farmer/help"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-slate-800"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Help &amp; Farmer Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Sign Out of Local Session</span>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </main>
    </div>
  );
}
