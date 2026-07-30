"use client";

import React from "react";
import { User, CheckCircle2, ShieldCheck, Wifi, WifiOff } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  roleTitle: string;
  idBadge?: string;
  avatarUrl?: string | null;
  isVerified?: boolean;
  isOnline?: boolean;
  pendingSyncCount?: number;
  onSyncClick?: () => void;
}

export default function ProfileHeader({
  name,
  roleTitle,
  idBadge,
  avatarUrl,
  isVerified = true,
  isOnline = true,
  pendingSyncCount = 0,
  onSyncClick,
}: ProfileHeaderProps) {
  const getInitials = (nameStr: string) => {
    if (!nameStr) return "U";
    const parts = nameStr.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        {/* Avatar / Initials */}
        <div className="relative shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-emerald-600 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-emerald-500 shadow-sm">
              {getInitials(name)}
            </div>
          )}
          {isVerified && (
            <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600 fill-emerald-100" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
              {roleTitle}
            </span>
            {idBadge && (
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-mono font-bold border border-gray-200">
                ID: {idBadge}
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 truncate">
            {name}
          </h1>

          {onSyncClick && (
            <div className="pt-1 flex items-center justify-center sm:justify-start">
              <button
                onClick={onSyncClick}
                className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all ${
                  isOnline
                    ? pendingSyncCount === 0
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-blue-50 text-blue-800 border-blue-300"
                    : "bg-amber-50 text-amber-800 border-amber-300"
                }`}
              >
                {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                <span>
                  {isOnline
                    ? pendingSyncCount === 0
                      ? "Online & Synced"
                      : `Online (${pendingSyncCount} pending)`
                    : `Offline (${pendingSyncCount} queued)`}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
