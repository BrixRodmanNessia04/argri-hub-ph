"use client";

import React from "react";
import CoopLayout from "@/components/CoopLayout";
import { Truck } from "lucide-react";

export default function CoopFulfillmentPage() {
  const dispatches = [
    { orderId: "ORD-901", buyer: "Robinsons Supermarket", temp: "4°C (Refrigerated)", destination: "Bulacan DC", status: "SCHEDULED" },
    { orderId: "ORD-902", buyer: "Metro Manila Restaurant", temp: "Ambient", destination: "Taguig Hub", status: "PREPARING" },
  ];

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            COLD-CHAIN DISPATCH FULFILLMENT
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1">
            Refrigerated Transport Dispatch
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {dispatches.map((d) => (
            <div key={d.orderId} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between font-bold">
                <span className="font-mono text-teal-400 text-sm">{d.orderId}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 font-extrabold border border-blue-800 text-[10px]">
                  {d.status}
                </span>
              </div>
              <h3 className="font-extrabold text-base text-white">{d.buyer}</h3>
              <p className="text-slate-400">Destination: {d.destination}</p>
              <p className="text-teal-400 font-semibold">Cold-Chain Temp: {d.temp}</p>
            </div>
          ))}
        </div>
      </div>
    </CoopLayout>
  );
}
