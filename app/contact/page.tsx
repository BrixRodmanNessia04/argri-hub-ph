"use client";

import React, { useState } from "react";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-8">
        <div className="space-y-2 text-center">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl font-extrabold text-white">Contact AgriHub PH</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-white">Contact Details</h3>
            <div className="space-y-3 font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>support@agrihub.ph</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+63 (02) 8888-AGRI</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>AgriHub Operations Center, Quezon City, Philippines</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            {submitted ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-white font-extrabold text-sm">Message Received!</h3>
                <p className="text-slate-400 text-xs">Thank you for reaching out. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Your Name</label>
                  <input type="text" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" required />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Email Address</label>
                  <input type="email" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" required />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Message</label>
                  <textarea rows={3} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200" required />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
