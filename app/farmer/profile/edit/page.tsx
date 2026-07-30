"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { queueSyncOperation } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import AvatarUploader from "@/components/profile/AvatarUploader";
import { ArrowLeft, User, Save, CheckCircle2, ChevronDown } from "lucide-react";

export default function EditFarmerProfilePage() {
  const router = useRouter();

  const session = useLiveQuery(() => db.localSession.toCollection().first(), []) || null;

  // Essential Primary Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [barangay, setBarangay] = useState("Balili");
  const [municipality, setMunicipality] = useState("La Trinidad");
  const [province, setProvince] = useState("Benguet");

  // Advanced / Optional Fields (Progressive Disclosure)
  const [middleName, setMiddleName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [email, setEmail] = useState("");
  const [preferredLang, setPreferredLang] = useState("Tagalog / English");
  const [primaryCommodities, setPrimaryCommodities] = useState("Highland Vegetables, Cabbage, Strawberry");
  const [experienceYears, setExperienceYears] = useState("12");
  const [emergencyContact, setEmergencyContact] = useState("Maria dela Cruz - 0918-987-6543");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const parts = (session.name || "Juan dela Cruz").split(" ");
      setFirstName(parts[0] || "Juan");
      setLastName(parts.slice(1).join(" ") || "dela Cruz");
      setPhone(session.phone || "0917-123-4567");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) return;

    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    if (session?.key) {
      await db.localSession.update(session.key, {
        name: fullName,
        phone: phone.trim(),
        lastActiveAt: new Date().toISOString(),
      });
    }

    const profileData = {
      name: fullName,
      phone: phone.trim(),
      email: email.trim(),
      barangay: barangay.trim(),
      municipality: municipality.trim(),
      province: province.trim(),
      preferredLang,
      primaryCommodities,
      emergencyContact,
      updatedAt: new Date().toISOString(),
    };

    await queueSyncOperation("farmer_profile", session?.userId || "farmer_1", "UPDATE", profileData);

    setFeedback("Profile updated locally & queued for cloud sync!");
    setTimeout(() => {
      router.push("/farmer/profile");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28">
      <FarmerSubNav />

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-2">
        <Link
          href="/farmer/profile"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Farmer Profile
        </Link>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <User className="w-6 h-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                Edit Farmer Profile
              </h1>
              <p className="text-xs text-slate-500">
                Update personal information offline. Synced safely when connected.
              </p>
            </div>
          </div>

          {feedback && (
            <div className="p-3.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{feedback}</span>
            </div>
          )}

          <AvatarUploader
            currentAvatarUrl={avatarUrl}
            onAvatarChange={(res) => setAvatarUrl(res)}
          />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ESSENTIAL MAIN FIELDS */}
            <div className="space-y-3">
              <h2 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                1. Essential Details (Pangunahing Impormasyon)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    First Name (Pangalan) *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Last Name (Apelyido) *
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (CP Number) *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Barangay</label>
                  <input
                    type="text"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City/Town</label>
                  <input
                    type="text"
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Province</label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-gray-300 text-xs font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* PROGRESSIVE DISCLOSURE: EXPANDABLE MORE DETAILS */}
            <details className="group border border-gray-200 rounded-2xl p-4 bg-slate-50">
              <summary className="cursor-pointer font-bold text-xs text-slate-700 flex items-center justify-between select-none">
                <span>More Details (Optional / Karagdagang Impormasyon)</span>
                <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>

              <div className="space-y-3 pt-3 mt-2 border-t border-gray-200 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Middle Name</label>
                    <input
                      type="text"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Suffix (Jr., Sr.)</label>
                    <input
                      type="text"
                      value={suffix}
                      onChange={(e) => setSuffix(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="juan@example.com"
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Crops / Commodities</label>
                  <input
                    type="text"
                    value={primaryCommodities}
                    onChange={(e) => setPrimaryCommodities(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Emergency Contact</label>
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-semibold"
                  />
                </div>
              </div>
            </details>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes (Offline First)</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
