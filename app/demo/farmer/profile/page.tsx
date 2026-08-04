"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { demoDb } from "@/lib/demoDb";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCompletionChecklist from "@/components/profile/ProfileCompletionChecklist";
import { ProducerWorkspaceProvider, useProducerWorkspace } from "@/lib/producerContext";
import DemoBanner from "@/components/demo/DemoBanner";
import {
  User,
  Edit,
  Phone,
  Globe,
  MapPin,
  Building2,
  Sprout,
  Plus,
  Users,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

function DemoFarmerProfileContent() {
  const router = useRouter();
  const { buildPath, userId } = useProducerWorkspace();

  const profile = useLiveQuery(() => demoDb.demoRsbsaProfiles.filter((p) => p.userId === userId).first(), [userId]) || null;
  const farms = useLiveQuery(() => demoDb.demoFarms.toArray(), []) || [];
  const cropCycles = useLiveQuery(() => demoDb.demoCropCycles.toArray(), []) || [];

  const farmerName = profile ? `${profile.firstName} ${profile.surname}` : "Juan dela Cruz";
  const farmerPhone = profile?.mobileNumber || "0917-123-4567";
  const farmerLang = profile?.preferredLanguage || "Filipino";
  const location = profile
    ? `${profile.barangay}, ${profile.cityMunicipality}, ${profile.province}`
    : "Sayangan, Atok, Benguet";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28 font-sans">
      <DemoBanner roleName="Farmer" />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <ProfileHeader
          name={farmerName}
          roleTitle="FARMER DEMO PROFILE (ISOLATED FICTIONAL DATA)"
          idBadge="DEMO-FARM-001"
          isVerified={true}
          isOnline={true}
          pendingSyncCount={0}
        />

        <ProfileCompletionChecklist percentage={profile?.profileCompletionPercentage || 100} role="farmer" />

        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs space-y-3">
          <h2 className="text-sm font-extrabold text-slate-900">
            Demo Farmer Actions
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <Link
              href={buildPath("/demo/farmer/farms")}
              className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold flex flex-col items-center text-center gap-1.5 transition-all"
            >
              <Sprout className="w-5 h-5 text-emerald-600" />
              <span>Demo Farms ({farms.length})</span>
            </Link>

            <Link
              href={buildPath("/demo/farmer/profile/personal")}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-gray-200 text-slate-800 font-bold flex flex-col items-center text-center gap-1.5 transition-all"
            >
              <Edit className="w-5 h-5 text-slate-700" />
              <span>Edit Demo Profile</span>
            </Link>

            <Link
              href={buildPath("/demo/coop")}
              className="p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-bold flex flex-col items-center text-center gap-1.5 transition-all"
            >
              <Users className="w-5 h-5 text-blue-600" />
              <span>Demo Coop</span>
            </Link>

            <Link
              href={buildPath("/demo/onboarding/welcome")}
              className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold flex flex-col items-center text-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Restart Demo Onboarding</span>
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Demo Personal &amp; RSBSA Information
              </h2>
            </div>

            <Link
              href={buildPath("/demo/farmer/profile/personal")}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 shrink-0"
            >
              <Edit className="w-3.5 h-3.5" /> Edit RSBSA Sections
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
                <Globe className="w-3.5 h-3.5 text-emerald-600" /> Preferred Language
              </span>
              <p className="font-extrabold text-slate-900 text-sm">{farmerLang}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1 sm:col-span-2">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Location / Address
              </span>
              <p className="font-extrabold text-slate-900 text-sm">{location}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DemoFarmerProfilePage() {
  return (
    <ProducerWorkspaceProvider overrideMode="demo" overrideRole="farmer">
      <DemoFarmerProfileContent />
    </ProducerWorkspaceProvider>
  );
}
