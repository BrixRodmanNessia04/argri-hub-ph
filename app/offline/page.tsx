"use client";

import Link from "next/link";
import { CloudOff, Database, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  return (
    <main className="min-h-dvh bg-[#f4faf5] px-4 py-10 flex items-center justify-center text-[#163025]">
      <section className="w-full max-w-md rounded-3xl border border-[#dce9df] bg-white p-6 sm:p-8 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center">
          <CloudOff className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold mt-5">You’re offline</h1>
        <p className="text-sm text-[#5f7469] mt-2 leading-6">
          AgriHub could not load this page from the network. Previously opened pages may still be available.
        </p>
        <div className="mt-5 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] p-4 flex gap-3">
          <Database className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
          <p className="text-xs leading-5 text-[#385747]">
            Farmer and Fisher offline records remain stored on this device. They will synchronize through the existing queue after connectivity returns.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="min-h-11 rounded-xl bg-[#059669] text-white text-sm font-extrabold flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Try again
          </button>
          <Link href="/" className="min-h-11 rounded-xl border border-[#cfe0d4] text-[#047857] text-sm font-extrabold flex items-center justify-center">
            AgriHub home
          </Link>
        </div>
      </section>
    </main>
  );
}
