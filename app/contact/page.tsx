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
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-8">
        <div className="space-y-2 text-center">
          <span className="px-3 py-1 rounded-full bg-[#ecfdf5] text-[#047857] text-xs font-extrabold border border-[#a7f3d0]">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl font-extrabold text-[#163025]">Contact AgriHub PH</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-[#163025]">Contact Details</h3>
            <div className="space-y-3 font-semibold text-[#163025]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#059669]" />
                <span>support@agrihub.ph</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#059669]" />
                <span>+63 (02) 8888-AGRI</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#059669]" />
                <span>AgriHub Operations Center, Quezon City, Philippines</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 shadow-xs">
            {submitted ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-[#059669] mx-auto" />
                <h3 className="text-[#163025] font-extrabold text-sm">Message Received!</h3>
                <p className="text-[#5f7469] text-xs font-normal">Thank you for reaching out. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 font-bold text-xs">
                <div>
                  <label className="block text-[#5f7469] mb-1">Your Name</label>
                  <input type="text" className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold" required />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Email Address</label>
                  <input type="email" className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold" required />
                </div>
                <div>
                  <label className="block text-[#5f7469] mb-1">Message</label>
                  <textarea rows={3} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold shadow-md flex items-center justify-center gap-2">
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
