"use client";

import React, { useState } from "react";
import CoopHeader from "./CoopHeader";
import CoopSidebarNav from "./CoopSidebarNav";
import CoopBottomNav from "./CoopBottomNav";
import CoopDrawer from "./CoopDrawer";

export default function CoopLayout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Header */}
      <CoopHeader onOpenDrawer={() => setIsDrawerOpen(true)} />

      {/* Main Body */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <CoopSidebarNav />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-28 lg:pb-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <CoopBottomNav onOpenDrawer={() => setIsDrawerOpen(true)} />

      {/* Mobile Slide-Out Navigation Drawer */}
      <CoopDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
