"use client";

import React, { useState } from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { Users, Plus, CheckCircle2 } from "lucide-react";

export default function CoopFarmersPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("0917");
  const [municipality, setMunicipality] = useState("La Trinidad");
  const [feedback, setFeedback] = useState<string | null>(null);

  const mockFarmers = [
    { id: "f-1", name: "Jose Reyes", phone: "09171112233", location: "La Trinidad", status: "ACTIVE" },
    { id: "f-2", name: "Maria Santos", phone: "09182223344", location: "Atok", status: "ACTIVE" },
    { id: "f-3", name: "Ricardo Cruz", phone: "09193334455", location: "Tublay", status: "ACTIVE" },
    { id: "f-4", name: "Elena Gomez", phone: "09204445566", location: "Buguias", status: "ACTIVE" },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(`Registered new member farmer: ${name}`);
    setName("");
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            COOPERATIVE MEMBER REGISTRY
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Member Farmers Directory ({mockFarmers.length})
          </h1>
        </div>

        {feedback && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white">Register / Import Member Farmer</h2>
          <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Farmer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-teal-500"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-teal-500"
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

        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-6 font-semibold">Farmer Name</th>
                <th className="py-3.5 px-6 font-semibold">Contact Phone</th>
                <th className="py-3.5 px-6 font-semibold">Municipality</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockFarmers.map((f) => (
                <tr key={f.id} className="hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-bold text-white">{f.name}</td>
                  <td className="py-4 px-6 text-slate-300 font-mono">{f.phone}</td>
                  <td className="py-4 px-6 text-slate-300">{f.location}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
