"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setLoading(false);
      setError("Registration is not configured. Add the Supabase public environment variables first.");
      return;
    }

    const supabase = createClient();
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    callbackUrl.searchParams.set(
      "next",
      primaryRole === "fisher" ? "/fisher" : "/select-workspace",
    );

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: callbackUrl.toString(),
        data: {
          full_name: fullName.trim(),
          phone: phone.trim() || null,
          primary_role: primaryRole,
          province: province.trim(),
          city_municipality: city.trim(),
          organization_name: orgName.trim() || null,
          primary_commodity: commodity.trim() || null,
        },
      },
    });

    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.replace(primaryRole === "fisher" ? "/fisher" : "/select-workspace");
      router.refresh();
      return;
    }

    router.push(`/verify-email?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-white border border-[#dce9df] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between border-b border-[#dce9df] pb-4">
            <div>
              <span className="text-[10px] font-black uppercase text-[#059669] tracking-wider">
                STEP {step} OF 4
              </span>
              <h1 className="text-lg font-extrabold text-[#163025]">
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
                  className={`w-6 h-1.5 rounded-full ${i <= step ? "bg-[#059669]" : "bg-[#dce9df]"}`}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[#5f7469] mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Juan Dela Cruz"
                    className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="juan@example.ph"
                    className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Password *</label>
                  <input
                  type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                  required
                  minLength={8}
                  />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Mobile Phone (+63)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09171234567"
                    className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                  />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-3">
                <label className="block text-[#5f7469] mb-2">Choose your primary platform role:</label>
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
                          ? "bg-[#ecfdf5] border-[#059669] text-[#047857] shadow-xs font-black"
                          : "bg-[#f6fbf7] border-[#dce9df] text-[#163025] hover:border-[#059669]"
                      }`}
                    >
                      <span className="font-extrabold text-sm block">{r.label}</span>
                      <span className="text-[11px] text-[#5f7469] font-normal">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#5f7469] mb-1">Province *</label>
                    <input
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#5f7469] mb-1">City / Municipality *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5f7469] mb-1">Primary Commodity / Species</label>
                  <input
                    type="text"
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    placeholder="e.g. Cabbage, Tilapia, Swine"
                    className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                  />
                </div>

                {(primaryRole === "coop" || primaryRole === "buyer" || primaryRole === "processor") && (
                  <div>
                    <label className="block text-[#5f7469] mb-1">Organization Name</label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Benguet Agriculture Cooperative"
                      className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-3 text-[#163025] font-semibold p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df]">
                <h3 className="text-[#163025] font-extrabold text-sm border-b border-[#dce9df] pb-2">Confirm Registration Details</h3>
                <p>Full Name: <span className="text-[#163025] font-bold">{fullName || "Juan Dela Cruz"}</span></p>
                <p>Email: <span className="text-[#163025] font-bold">{email || "juan@example.ph"}</span></p>
                <p>Role: <span className="text-[#059669] font-black uppercase">{primaryRole}</span></p>
                <p>Location: <span className="text-[#163025] font-bold">{city}, {province}</span></p>
              </div>
            )}

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#dce9df]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] hover:bg-[#ecfdf5] font-bold text-xs flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs shadow-md flex items-center gap-1"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs shadow-md flex items-center gap-1"
                >
                  {loading ? <span>Submitting...</span> : <span>Complete Registration</span>}
                </button>
              )}
            </div>
          </form>

          <p className="text-center text-[#5f7469] text-xs pt-2 font-normal">
            Already have an account?{" "}
            <Link href="/login" className="text-[#059669] font-extrabold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
