"use client";

import React from "react";
import FarmerSubNav from "@/components/FarmerSubNav";
import { CloudRain, Sun, Thermometer, Wind, Droplets } from "lucide-react";

export default function FarmerWeatherPage() {
  const forecast = [
    { day: "Today", temp: "22°C", cond: "Light Rain", rainChance: "70%", icon: CloudRain },
    { day: "Tomorrow", temp: "24°C", cond: "Partly Cloudy", rainChance: "30%", icon: Sun },
    { day: "Friday", temp: "21°C", cond: "Heavy Showers", rainChance: "85%", icon: CloudRain },
    { day: "Saturday", temp: "23°C", cond: "Sunny Spells", rainChance: "20%", icon: Sun },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white border border-emerald-700 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-xs font-bold">
                BENGUET HIGHLANDS WEATHER
              </span>
              <h1 className="text-2xl font-extrabold mt-1">La Trinidad, Benguet</h1>
            </div>
            <Sun className="w-10 h-10 text-amber-400" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1">
              <span className="text-emerald-200 flex items-center gap-1"><Thermometer className="w-3.5 h-3.5" /> Temp</span>
              <p className="text-lg font-extrabold">22°C</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1">
              <span className="text-emerald-200 flex items-center gap-1"><Droplets className="w-3.5 h-3.5" /> Humidity</span>
              <p className="text-lg font-extrabold">85%</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1">
              <span className="text-emerald-200 flex items-center gap-1"><Wind className="w-3.5 h-3.5" /> Wind</span>
              <p className="text-lg font-extrabold">12 km/h</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1">
              <span className="text-emerald-200 flex items-center gap-1"><CloudRain className="w-3.5 h-3.5" /> Rain</span>
              <p className="text-lg font-extrabold">70%</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900">4-Day Agricultural Forecast</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {forecast.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.day} className="p-4 rounded-xl border border-gray-200 bg-slate-50 flex flex-col items-center text-center space-y-1">
                  <Icon className="w-6 h-6 text-emerald-600" />
                  <span className="font-bold text-xs text-slate-900">{f.day}</span>
                  <span className="text-sm font-extrabold text-slate-800">{f.temp}</span>
                  <span className="text-[11px] text-slate-500">{f.cond}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
