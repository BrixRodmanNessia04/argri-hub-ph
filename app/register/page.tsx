"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { Sprout, CheckCircle2, ArrowRight, ArrowLeft, User, Building2, MapPin, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [primaryRole, setPrimaryRole] = useState("farmer");
  const [province, setProvince] = useState("Benguet");
  const [city, setCity] = useState("Atok");
  const [orgName, setOrgName] = useState("");
  const [commodity, setCommodity] = useState("Highland Vegetables");

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/verify-email");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                STEP {step} OF 4
              </span>
              <h1 className="text-lg font-extrabold text-white">
                {step === 1 && "Account Information"}
                {step === 2 && "Select Primary Role"}
                {step === 3 && "Location & Production Details"}
                {step === 4 && "Review & Submit"}
              </h1>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-6 h-1.5 rounded-full ${i <= step ? "bg-emerald-500" : "bg-slate-800"}`}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Juan Dela Cruz"
                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="juan@example.ph"
                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Password *</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Mobile Phone (+63)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09171234567"
                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                  />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-3">
                <label className="block text-slate-400 mb-2">Choose your primary platform role:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: "farmer", label: "Farmer", desc: "Crop farming & plots" },
                    { id: "fisher", label: "Fisher", desc: "Capture fishing & vessels" },
                    { id: "coop", label: "Cooperative Rep", desc: "Coop management & aggregations" },
                    { id: "buyer", label: "Commercial Buyer", desc: "B2B produce purchasing" },
                    { id: "processor", label: "Food Processor", desc: "Drying & packaging lines" },
                    { id: "transport", label: "Transport Logistics", desc: "Reefer fleet & logistics" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setPrimaryRole(r.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        primaryRole === r.id
                          ? "bg-emerald-600/20 border-emerald-500 text-white shadow-md"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <span className="font-extrabold text-sm block">{r.label}</span>
                      <span className="text-[11px] text-slate-400 font-normal">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Province *</label>
                    <input
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">City / Municipality *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Primary Commodity / Species</label>
                  <input
                    type="text"
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    placeholder="e.g. Cabbage, Tilapia, Swine"
                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                  />
                </div>

                {(primaryRole === "coop" || primaryRole === "buyer" || primaryRole === "processor") && (
                  <div>
                    <label className="block text-slate-400 mb-1">Organization Name</label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Benguet Agriculture Cooperative"
                      className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-3 text-slate-300 font-semibold p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <h3 className="text-white font-extrabold text-sm border-b border-slate-800 pb-2">Confirm Registration Details</h3>
                <p>Full Name: <span className="text-white font-bold">{fullName || "Juan Dela Cruz"}</span></p>
                <p>Email: <span className="text-white font-bold">{email || "juan@example.ph"}</span></p>
                <p>Role: <span className="text-emerald-400 font-bold uppercase">{primaryRole}</span></p>
                <p>Location: <span className="text-white font-bold">{city}, {province}</span></p>
              </div>
            )}

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1"
                >
                  {loading ? <span>Submitting...</span> : <span>Complete Registration</span>}
                </button>
              )}
            </div>
          </form>

          <p className="text-center text-slate-400 text-xs pt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-400 font-extrabold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
