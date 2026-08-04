"use client";

import React from "react";
import { ShieldCheck, Mail, Lock, Phone, User } from "lucide-react";

interface Step1AccountProps {
  fullName: string;
  email: string;
  phone: string;
  onChange: (updates: { fullName?: string; email?: string; phone?: string }) => void;
}

export default function Step1Account({
  fullName,
  email,
  phone,
  onChange,
}: Step1AccountProps) {
  return (
    <div className="space-y-4">
      <div className="bg-[#e6f4ea] text-[#059669] p-3.5 rounded-2xl text-xs font-semibold border border-[#bce3c6] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>Step 1: Account Setup & Credentials</span>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#163025] mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-[#52796f] absolute left-3 top-3" />
          <input
            type="text"
            value={fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Juan dela Cruz"
            className="w-full bg-white border border-[#dce9df] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#163025] mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-[#52796f] absolute left-3 top-3" />
          <input
            type="email"
            value={email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="juan.farmer@example.com"
            className="w-full bg-white border border-[#dce9df] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#163025] mb-1">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 text-[#52796f] absolute left-3 top-3" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="0917-123-4567"
            className="w-full bg-white border border-[#dce9df] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
          />
        </div>
      </div>
    </div>
  );
}
