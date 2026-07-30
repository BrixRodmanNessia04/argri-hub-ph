"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProfileHeader from "@/components/profile/ProfileHeader";
import {
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Edit,
  Save,
  CheckCircle2,
  Lock,
  Users,
  Warehouse,
  CreditCard,
  LogOut,
} from "lucide-react";

export default function CooperativeProfilePage() {
  const [activeTab, setActiveTab] = useState<"USER" | "ORGANIZATION">("USER");

  // Permission simulation (True = Coop Admin, False = Coop Staff)
  const [isCoopAdmin, setIsCoopAdmin] = useState(true);
  const [isEditingOrg, setIsEditingOrg] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Personal Profile
  const [userName, setUserName] = useState("Elena Santos");
  const [userTitle, setUserTitle] = useState("Cooperative General Manager");
  const [userPhone, setUserPhone] = useState("0918-555-0199");
  const [userEmail, setUserEmail] = useState("elena.santos@benguetcoop.ph");

  // Organization Profile
  const [orgName, setOrgName] = useState("Benguet Farmers Agricultural Cooperative");
  const [regNumber, setRegNumber] = useState("CDA-REG-2018-99412");
  const [coopType, setCoopType] = useState("Producers & Marketing Cooperative");
  const [officeAddress, setOfficeAddress] = useState("KM 5, Pico, La Trinidad, Benguet");
  const [contactPhone, setContactPhone] = useState("(074) 422-1088");
  const [contactEmail, setContactEmail] = useState("info@benguetcoop.ph");
  const [coverageAreas, setCoverageAreas] = useState("La Trinidad, Tublay, Atok, Buguias");
  const [primaryCommodities, setPrimaryCommodities] = useState("Highland Cabbage, Carrot, Potato, Broccoli, Strawberry");
  const [activeFarmersCount, setActiveFarmersCount] = useState("342");
  const [warehouseLocations, setWarehouseLocations] = useState("Pico Central Cold Storage, Buguias Trading Post");

  const handleSaveOrg = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingOrg(false);
    setFeedback("Cooperative organization details updated!");
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20 font-sans">
      {/* Header Bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-slate-900">
                Cooperative Profile &amp; Organization Details
              </h1>
              <p className="text-xs text-blue-700 font-semibold">
                AgriHub PH Cooperative Management
              </p>
            </div>
          </div>

          <Link
            href="/coop/dashboard"
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 space-y-6 mt-3">
        {/* Profile Header Card */}
        <ProfileHeader
          name={userName}
          roleTitle={userTitle}
          idBadge="COOP-OFFICER-007"
          isVerified={true}
          isOnline={true}
        />

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 p-1.5 rounded-2xl shadow-sm">
          <button
            onClick={() => setActiveTab("USER")}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === "USER"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <User className="w-4 h-4" /> Personal Profile
          </button>
          <button
            onClick={() => setActiveTab("ORGANIZATION")}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === "ORGANIZATION"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Building2 className="w-4 h-4" /> Cooperative Organization
          </button>
        </div>

        {/* TAB 1: PERSONAL USER PROFILE */}
        {activeTab === "USER" && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" /> User Officer Information
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                {isCoopAdmin ? "ADMIN PERMISSIONS" : "STAFF USER"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                <span className="text-slate-400 font-bold">Full Name</span>
                <p className="font-extrabold text-slate-900 text-sm">{userName}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                <span className="text-slate-400 font-bold">Official Position</span>
                <p className="font-extrabold text-slate-900 text-sm">{userTitle}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                <span className="text-slate-400 font-bold flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-blue-600" /> Mobile Contact
                </span>
                <p className="font-extrabold text-slate-900 text-sm">{userPhone}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                <span className="text-slate-400 font-bold flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-600" /> Official Email
                </span>
                <p className="font-extrabold text-slate-900 text-sm">{userEmail}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
                <Link href="/coop/farmers" className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-gray-200 flex flex-col items-center gap-1.5 text-center text-slate-800">
                  <Users className="w-5 h-5 text-blue-600" /> Member Farmers
                </Link>
                <Link href="/coop/inventory" className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-gray-200 flex flex-col items-center gap-1.5 text-center text-slate-800">
                  <Warehouse className="w-5 h-5 text-blue-600" /> Storage &amp; Inventory
                </Link>
                <Link href="/coop/payouts" className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-gray-200 flex flex-col items-center gap-1.5 text-center text-slate-800">
                  <CreditCard className="w-5 h-5 text-blue-600" /> Payout Settings
                </Link>
                <Link href="/" className="p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 flex flex-col items-center gap-1.5 text-center text-rose-700">
                  <LogOut className="w-5 h-5 text-rose-600" /> Sign Out
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COOPERATIVE ORGANIZATION PROFILE */}
        {activeTab === "ORGANIZATION" && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" /> {orgName}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">CDA Registration: {regNumber}</p>
              </div>

              {isCoopAdmin ? (
                <button
                  onClick={() => setIsEditingOrg(!isEditingOrg)}
                  className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
                >
                  <Edit className="w-4 h-4" /> {isEditingOrg ? "Cancel Edit" : "Edit Org Details"}
                </button>
              ) : (
                <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-500 text-xs font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Read-Only for Staff
                </span>
              )}
            </div>

            {isEditingOrg ? (
              <form onSubmit={handleSaveOrg} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Cooperative Name</label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">CDA Registration No.</label>
                    <input
                      type="text"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 font-semibold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Office Address</label>
                  <input
                    type="text"
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 font-semibold"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Commodities</label>
                  <input
                    type="text"
                    value={primaryCommodities}
                    onChange={(e) => setPrimaryCommodities(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 font-semibold"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Cooperative Details
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                  <span className="text-slate-400 font-bold">Cooperative Type</span>
                  <p className="font-extrabold text-slate-900 text-sm">{coopType}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                  <span className="text-slate-400 font-bold">Registered Members</span>
                  <p className="font-extrabold text-blue-700 text-sm">{activeFarmersCount} Member Farmers</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                  <span className="text-slate-400 font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" /> Office Address
                  </span>
                  <p className="font-extrabold text-slate-900 text-sm">{officeAddress}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                  <span className="text-slate-400 font-bold">Coverage Municipalities</span>
                  <p className="font-extrabold text-slate-900 text-sm">{coverageAreas}</p>
                </div>

                <div className="sm:col-span-2 p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                  <span className="text-slate-400 font-bold">Primary Commodities Handled</span>
                  <p className="font-extrabold text-slate-900 text-sm">{primaryCommodities}</p>
                </div>

                <div className="sm:col-span-2 p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-1">
                  <span className="text-slate-400 font-bold">Warehouse &amp; Cold Storage Facilities</span>
                  <p className="font-extrabold text-slate-900 text-sm">{warehouseLocations}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
