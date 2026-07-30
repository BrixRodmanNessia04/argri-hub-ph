"use client";

import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, SmsQueueEntity } from "@/lib/db";
import { createDeviceSmsUrl } from "@/lib/sms";
import FarmerSubNav from "@/components/FarmerSubNav";
import {
  MessageSquare,
  Send,
  Smartphone,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

export default function FarmerSmsPage() {
  const smsQueue = useLiveQuery(() => db.smsQueue.toArray(), []) || [];
  const [recipient, setRecipient] = useState("09171234567");
  const [message, setMessage] = useState("Ani harvest submission of 150kg Cabbage ready for pickup.");
  const [msgType, setMsgType] = useState<SmsQueueEntity["messageType"]>("HARVEST_CONFIRMATION");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleQueueSms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !message.trim()) return;

    const newSms: SmsQueueEntity = {
      localId: `sms_${Date.now()}`,
      userId: "farmer-123",
      recipientPhone: recipient.trim(),
      message: message.trim(),
      messageType: msgType,
      idempotencyKey: `idemp_${Date.now()}`,
      syncStatus: "local",
      syncAttempts: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.smsQueue.add(newSms);
    setMessage("");
    setFeedback("SMS queued locally! It will automatically send via cloud gateway when online.");
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleDeviceSms = (phone: string, msg: string) => {
    const url = createDeviceSmsUrl(phone, msg);
    window.open(url, "_blank");
  };

  const handleRetry = async (localId: string) => {
    await db.smsQueue.update(localId, {
      syncStatus: "pending",
      syncAttempts: 0,
      syncError: null,
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <h1 className="text-xl font-extrabold text-slate-900">
                SMS Integration &amp; Queue (Mga Mensahe)
              </h1>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              Offline Queue
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Queue automated SMS updates when offline. Messages will dispatch via gateway when connected, or use &quot;Send using phone&quot; for immediate native SMS dispatch.
          </p>

          {feedback && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleQueueSms} className="mt-5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Recipient Phone (Numero)
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. 09171234567"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message Type
                </label>
                <select
                  value={msgType}
                  onChange={(e) => setMsgType(e.target.value as SmsQueueEntity["messageType"])}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="HARVEST_CONFIRMATION">Harvest Confirmation</option>
                  <option value="ANNOUNCEMENT">Coop Announcement</option>
                  <option value="PRICE_UPDATE">Price Update Request</option>
                  <option value="PICKUP_SCHEDULE">Pickup Schedule Request</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Message Content (Mensahe)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Queue SMS for Gateway Sync</span>
              </button>

              <button
                type="button"
                onClick={() => handleDeviceSms(recipient, message)}
                className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>Send using phone (Urgent)</span>
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800">
            Outbound SMS Queue ({smsQueue.length})
          </h2>

          {smsQueue.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center text-xs text-slate-500">
              No outgoing SMS messages in local queue.
            </div>
          ) : (
            <div className="space-y-3">
              {smsQueue.map((item) => (
                <div
                  key={item.localId}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          item.syncStatus === "synced"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.syncStatus === "failed"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.syncStatus.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-500">{item.messageType}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      To: {item.recipientPhone}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 font-semibold bg-slate-50 p-2.5 rounded-xl">
                    &quot;{item.message}&quot;
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                    <span className="text-slate-500">
                      Attempts: {item.syncAttempts || 0}
                      {item.providerMsgId && ` • ID: ${item.providerMsgId}`}
                    </span>

                    <div className="flex items-center gap-2">
                      {item.syncStatus === "failed" && (
                        <button
                          onClick={() => handleRetry(item.localId)}
                          className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-700 font-bold hover:bg-rose-200 flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Retry Gateway
                        </button>
                      )}

                      <button
                        onClick={() => handleDeviceSms(item.recipientPhone, item.message)}
                        className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-bold hover:bg-blue-200 flex items-center gap-1"
                      >
                        <Smartphone className="w-3 h-3" /> Send via Phone
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
