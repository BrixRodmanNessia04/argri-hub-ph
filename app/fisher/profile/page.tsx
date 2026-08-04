"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCompletionChecklist from "@/components/profile/ProfileCompletionChecklist";
import RsbsaDisclaimerBanner from "@/components/rsbsa/RsbsaDisclaimerBanner";
import { ProducerWorkspaceProvider, useProducerWorkspace } from "@/lib/producerContext";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import {
  Waves,
  Edit,
  ShieldCheck,
  Building2,
  FileText,
  Plus,
  LogOut,
  ChevronRight,
  Fish,
} from "lucide-react";

function FisherProfileContent() {
  const router = useRouter();
  const { buildPath, userId } = useProducerWorkspace();

  const session = useLiveQuery(() => db.localSession.toCollection().first(), []) || null;
  const profile = useLiveQuery(() => db.rsbsaProfiles.filter((p) => p.userId === userId).first(), [userId]) || null;
  const address = useLiveQuery(() => db.profileAddresses.filter((a) => a.userId === userId).first(), [userId]) || null;

  const contact = useLiveQuery(() => db.profileMobileContacts.filter((c) => c.userId === userId).first(), [userId]) || null;

  const fisherName = profile ? `${profile.firstName} ${profile.surname}` : session?.name || "Pedro Penduko";
  const fisherPhone = contact?.mobileNumber || session?.phone || "0918-987-6543";
  const location = address
    ? `${address.barangay}, ${address.cityMunicipality}, ${address.province}`
    : "Bolinao, Pangasinan";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28 font-sans">
      <div className="bg-[#0284c7] text-white p-4 shadow-xs flex items-center justify-between">
        <h1 className="text-base font-extrabold flex items-center gap-2">
          <Waves className="w-5 h-5" />
          <span>Fisherfolk Account &amp; Profile</span>
        </h1>
        <Link href={buildPath("/fisher")} className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
          Dashboard
        </Link>
      </div>

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <ProfileHeader
          name={fisherName}
          roleTitle="REGISTERED FISHERFOLK"
          idBadge="FISH-2026-992"
          isVerified={true}
          isOnline={true}
          pendingSyncCount={0}
        />

        <ProfileCompletionChecklist percentage={profile?.profileCompletionPercentage || 80} role="fisher" />

        <RsbsaDisclaimerBanner />

        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs space-y-3">
          <h2 className="text-sm font-extrabold text-slate-900">
            Fisherfolk Profile Sections
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link
              href={buildPath("/fisher/profile/personal")}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-gray-200 text-slate-800 font-bold flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Edit className="w-4 h-4 text-[#0284c7]" />
                <span>Personal Information</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link
              href={buildPath("/fisher/profile/rsbsa")}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-gray-200 text-slate-800 font-bold flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
                <span>RSBSA Identity &amp; Background</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link
              href={buildPath("/fisher/profile/farm-parcels")}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-gray-200 text-slate-800 font-bold flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Fish className="w-4 h-4 text-[#0284c7]" />
                <span>Fisheries Profile &amp; Vessels</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link
              href={buildPath("/fisher/profile/memberships")}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-gray-200 text-slate-800 font-bold flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-[#0284c7]" />
                <span>Fisherfolk Association Memberships</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function FisherProfilePage() {
  return (
    <ProducerWorkspaceProvider overrideMode="production" overrideRole="fisher">
      <FisherProfileContent />
    </ProducerWorkspaceProvider>
  );
}
