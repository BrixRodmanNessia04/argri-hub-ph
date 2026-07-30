"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  Activity,
  TrendingDown,
  Scissors,
  DollarSign,
  Package,
  Bug,
  Users,
  Wrench,
  FileText,
} from "lucide-react";

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickAddModal({ isOpen, onClose }: QuickAddModalProps) {
  if (!isOpen) return null;

  const quickOptions = [
    {
      title: "Field Activity",
      desc: "Planting, watering, fertilizer, spraying",
      icon: Activity,
      color: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
      href: "/farmer/activities/new",
    },
    {
      title: "Expense Log",
      desc: "Seeds, inputs, transport, repairs",
      icon: TrendingDown,
      color: "bg-rose-500/15 text-rose-600 border-rose-500/30",
      href: "/farmer/expenses/new",
    },
    {
      title: "Harvest Record",
      desc: "Harvest weight, grade, plot mapping",
      icon: Scissors,
      color: "bg-teal-500/15 text-teal-600 border-teal-500/30",
      href: "/farmer/harvests/new",
    },
    {
      title: "Sale Entry",
      desc: "Record crop sale & buyer revenue",
      icon: DollarSign,
      color: "bg-amber-500/15 text-amber-600 border-amber-500/30",
      href: "/farmer/sales/new",
    },
    {
      title: "Inventory Adjustment",
      desc: "Add, use, or correct seed & produce stock",
      icon: Package,
      color: "bg-blue-500/15 text-blue-600 border-blue-500/30",
      href: "/farmer/inventory/adjustment",
    },
    {
      title: "Pest / Disease Observation",
      desc: "Log suspected crop issues & severity",
      icon: Bug,
      color: "bg-purple-500/15 text-purple-600 border-purple-500/30",
      href: "/farmer/pests-diseases/new",
    },
    {
      title: "Labor Log",
      desc: "Worker count, task, and wages paid",
      icon: Users,
      color: "bg-orange-500/15 text-orange-600 border-orange-500/30",
      href: "/farmer/labor/new",
    },
    {
      title: "Equipment Log",
      desc: "Tractor, pump usage, fuel, and repairs",
      icon: Wrench,
      color: "bg-indigo-500/15 text-indigo-600 border-indigo-500/30",
      href: "/farmer/equipment/new",
    },
    {
      title: "General Farm Note",
      desc: "Observations, weather, or custom notes",
      icon: FileText,
      color: "bg-slate-500/15 text-slate-700 border-slate-500/30",
      href: "/farmer/logs/new",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Quick Add Farm Record (Magdagdag)
            </h2>
            <p className="text-xs text-slate-500">
              Select record type. Saved locally first &amp; queued for sync.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {quickOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <Link
                key={opt.title}
                href={opt.href}
                onClick={onClose}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group"
              >
                <div className={`p-2.5 rounded-xl border ${opt.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">{opt.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
