"use client";

import React from "react";
import FarmerSubNav from "@/components/FarmerSubNav";
import { HelpCircle, BookOpen, WifiOff, PhoneCall } from "lucide-react";

export default function FarmerHelpPage() {
  const faqs = [
    {
      q: "Paano gumagana ang offline mode?",
      a: "Lahat ng iyong in-input na ani, gastos, at benta ay awtomatikong nai-save sa storage ng iyong telepono (IndexedDB). Kapag nagkaroon ng internet connection (WiFi o Data), kusa itong mai-sync sa cooperative cloud.",
    },
    {
      q: "Ano ang gagawin kapag walang internet para mag-SMS?",
      a: "Puwede mong gamitin ang 'Send using phone' na button sa SMS section. Bubuksan nito ang iyong normal phone text app para direktang maipadala ang mensahe.",
    },
    {
      q: "Paano ko makikita kung na-approve ng coop ang aking ani?",
      a: "Pumunta sa 'Harvests (Ani)' section. Makikita mo roon ang status: 'PENDING', 'APPROVED', o 'ADJUSTED'.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Farmer Help &amp; Tagalog Manual (Tulong at Gabay)
            </h1>
          </div>
          <p className="text-xs text-slate-600 mb-6">
            Gabay sa paggamit ng AgriHub PH PWA habang nasa bukid at walang internet connection.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-gray-200">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
