"use client";

import React, { useState } from "react";
import CoopLayout from "@/components/CoopLayout";
import { Users, Plus, CheckCircle2, Phone, MapPin, Search, Eye, Filter } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

export default function CoopFarmersPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("0917");
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const localFarms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];

  const defaultFarmers = [
    { id: "f-1", name: "Jose Reyes", phone: "09171112233", location: "La Trinidad, Benguet", commodities: "Cabbage, Potato", status: "ACTIVE" },
    { id: "f-2", name: "Maria Santos", phone: "09182223344", location: "Atok, Benguet", commodities: "Carrot, Broccoli", status: "ACTIVE" },
    { id: "f-3", name: "Ricardo Cruz", phone: "09193334455", location: "Tublay, Benguet", commodities: "Strawberry, Lettuce", status: "ACTIVE" },
    { id: "f-4", name: "Elena Gomez", phone: "09204445566", location: "Buguias, Benguet", commodities: "Highland Cabbage", status: "ACTIVE" },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setFeedback(`Registered new member farmer: ${name}`);
    setName("");
    setTimeout(() => setFeedback(null), 3000);
  };

  const filteredFarmers = defaultFarmers.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            COOPERATIVE MEMBER REGISTRY
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            Member Farmers Directory ({filteredFarmers.length})
          </h1>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Registration Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <h2 className="text-sm sm:text-base font-extrabold text-white">Register Member Farmer</h2>
          <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Farmer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-teal-500"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-teal-500"
              required
            />
            <button
              type="submit"
              className="py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Register Farmer</span>
            </button>
          </form>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search farmer by name or location..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-6 font-semibold">Farmer Name</th>
                <th className="py-3.5 px-6 font-semibold">Contact Phone</th>
                <th className="py-3.5 px-6 font-semibold">Location</th>
                <th className="py-3.5 px-6 font-semibold">Commodities</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-semibold">
              {filteredFarmers.map((f) => (
                <tr key={f.id} className="hover:bg-slate-850 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{f.name}</td>
                  <td className="py-4 px-6 text-slate-300 font-mono">{f.phone}</td>
                  <td className="py-4 px-6 text-slate-300">{f.location}</td>
                  <td className="py-4 px-6 text-slate-300">{f.commodities}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="md:hidden space-y-3">
          {filteredFarmers.map((f) => (
            <div key={f.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-extrabold border border-emerald-800">
                  {f.status}
                </span>
                <span className="text-xs font-mono text-slate-400">{f.phone}</span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-white">{f.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{f.location}</span>
                </p>
                <p className="text-xs text-teal-400 font-semibold mt-1">
                  Crops: {f.commodities}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2 text-xs">
                <a
                  href={`tel:${f.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-400" /> Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CoopLayout>
  );
}
