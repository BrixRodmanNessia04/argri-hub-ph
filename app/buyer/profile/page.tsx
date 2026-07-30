"use client";

import React, { useState } from "react";
import Link from "next/link";
import BuyerSidebarNav from "@/components/BuyerSidebarNav";
import ProfileHeader from "@/components/profile/ProfileHeader";
import {
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Truck,
  ShoppingBag,
  FileText,
  Users,
  Edit,
  Save,
  CheckCircle2,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function BuyerProfilePage() {
  const [activeTab, setActiveTab] = useState<"PERSONAL" | "ORGANIZATION" | "DELIVERY">("PERSONAL");

  // Personal Profile
  const [name, setName] = useState("Marco Rodriguez");
  const [jobTitle, setJobTitle] = useState("Senior Procurement Manager");
  const [phone, setPhone] = useState("0917-888-9900");
  const [email, setEmail] = useState("m.rodriguez@robinsonssupermarket.ph");

  // Organization Profile
  const [orgName, setOrgName] = useState("Robinsons Supermarket Corp.");
  const [orgType, setOrgType] = useState("RETAILER");
  const [taxId, setTaxId] = useState("TIN 004-123-890-000");
  const [billingAddress, setBillingAddress] = useState("Robinsons Equitable Tower, ADB Ave, Ortigas Center, Pasig City");
  const [preferredCommodities, setPreferredCommodities] = useState("Highland Cabbage, Carrots, Broccoli, Potatoes, Lettuce");
  const [orderVolume, setOrderVolume] = useState("15-20 Metric Tons / Week");

  // Delivery Addresses
  const [deliveryAddresses, setDeliveryAddresses] = useState([
    { id: "addr_1", label: "Central Distribution Center", address: "100 Industrial Road, Meycauayan, Bulacan" },
    { id: "addr_2", label: "NCR Hub", address: "Building 4, Compound B, Taguig City, Metro Manila" },
  ]);

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("Buyer profile updated successfully!");
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      <BuyerSidebarNav />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto space-y-6">
        {/* Header */}
        <ProfileHeader
          name={name}
          roleTitle="VERIFIED B2B BUYER"
          idBadge="BUYER-2026-441"
          isVerified={true}
          isOnline={true}
        />

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab("PERSONAL")}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === "PERSONAL"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-850"
            }`}
          >
            <User className="w-4 h-4" /> Personal
          </button>
          <button
            onClick={() => setActiveTab("ORGANIZATION")}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === "ORGANIZATION"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-850"
            }`}
          >
            <Building className="w-4 h-4" /> Organization
          </button>
          <button
            onClick={() => setActiveTab("DELIVERY")}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === "DELIVERY"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-850"
            }`}
          >
            <Truck className="w-4 h-4" /> Delivery Locations
          </button>
        </div>

        {/* TAB 1: PERSONAL */}
        {activeTab === "PERSONAL" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <User className="w-5 h-5 text-emerald-500" /> Buyer User Information
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" /> Save Personal Details
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: ORGANIZATION */}
        {activeTab === "ORGANIZATION" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Building className="w-5 h-5 text-emerald-500" /> B2B Organization Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold">Organization Name</span>
                <p className="font-extrabold text-white text-sm">{orgName}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold">Business Type</span>
                <p className="font-extrabold text-emerald-400 text-sm">{orgType}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold">Tax Identifier</span>
                <p className="font-extrabold text-white text-sm">{taxId}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold">Typical Weekly Volume</span>
                <p className="font-extrabold text-white text-sm">{orderVolume}</p>
              </div>
              <div className="sm:col-span-2 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold">Billing Office Address</span>
                <p className="font-extrabold text-white text-sm">{billingAddress}</p>
              </div>
              <div className="sm:col-span-2 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold">Preferred Produce Commodities</span>
                <p className="font-extrabold text-white text-sm">{preferredCommodities}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DELIVERY LOCATIONS */}
        {activeTab === "DELIVERY" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-500" /> Delivery Addresses ({deliveryAddresses.length})
              </h2>
            </div>

            <div className="space-y-3">
              {deliveryAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between text-xs space-y-1"
                >
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[11px] font-bold border border-emerald-800">
                      {addr.label}
                    </span>
                    <p className="text-slate-200 font-bold text-sm mt-1">{addr.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
          <Link
            href="/buyer/orders"
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 flex flex-col items-center gap-1.5 text-center"
          >
            <ShoppingBag className="w-5 h-5 text-emerald-500" />
            <span>My Orders</span>
          </Link>

          <Link
            href="/buyer/invoices"
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 flex flex-col items-center gap-1.5 text-center"
          >
            <FileText className="w-5 h-5 text-emerald-500" />
            <span>Invoices &amp; Payments</span>
          </Link>

          <Link
            href="/buyer/team"
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 flex flex-col items-center gap-1.5 text-center"
          >
            <Users className="w-5 h-5 text-emerald-500" />
            <span>Procurement Team</span>
          </Link>

          <Link
            href="/"
            className="p-3.5 rounded-2xl bg-rose-950/40 hover:bg-rose-950/70 border border-rose-900 text-rose-300 flex flex-col items-center gap-1.5 text-center"
          >
            <LogOut className="w-5 h-5 text-rose-500" />
            <span>Sign Out</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
