"use client";

import React, { useState } from "react";
import { Camera, Upload, AlertCircle } from "lucide-react";

interface AvatarUploaderProps {
  currentAvatarUrl?: string | null;
  onAvatarChange: (base64OrUrl: string) => void;
}

export default function AvatarUploader({ currentAvatarUrl, onAvatarChange }: AvatarUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentAvatarUrl || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setError("Image size must be under 3MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      setPreview(res);
      onAvatarChange(res);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-emerald-500 shrink-0">
          {preview ? (
            <img src={preview} alt="Avatar Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <Camera className="w-6 h-6" />
            </div>
          )}
        </div>

        <div>
          <label className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1.5 shadow-sm">
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
          <p className="text-[11px] text-slate-500 mt-1">
            JPG, PNG or WebP (max 3MB)
          </p>
        </div>
      </div>

      {error && (
        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
