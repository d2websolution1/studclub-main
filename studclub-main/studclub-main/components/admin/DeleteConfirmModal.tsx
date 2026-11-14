'use client';

import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Profile } from "@/types/admin";
import { resolveImageUrl } from "@/lib/adminApi";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  profile: Profile | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  profile,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteConfirmModalProps) {
  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#181311] border border-[#8A2E2E]/60 rounded-xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-[#8A2E2E]/20 border border-[#8A2E2E]/40 flex items-center justify-center text-[#B8483F]">
            <AlertTriangle size={24} />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">Delete Profile?</h3>
          <p className="text-xs text-white/60 mt-1">
            Are you sure you want to permanently delete{" "}
            <span className="font-bold text-white">"{profile.name}"</span> (ID: {profile.id})? This action cannot be undone.
          </p>
        </div>

        {/* Profile mini preview */}
        <div className="flex items-center gap-3 p-3 bg-[#211B18] rounded-lg border border-white/10">
          <img
            src={resolveImageUrl(profile.photo)}
            alt={profile.name}
            className="w-12 h-14 object-cover rounded bg-black"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                profile.gender === "female" ? "/images/w1.jpg" : "/images/m1.jpg";
            }}
          />
          <div className="text-xs truncate">
            <div className="font-bold text-white truncate">{profile.name}</div>
            <div className="text-white/50 text-[11px] truncate">
              {profile.category} • {profile.city}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-white/10 text-white/80 hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2 text-xs font-bold rounded-lg bg-[#8A2E2E] hover:bg-[#8A2E2E]/80 text-white flex items-center gap-1.5 shadow-lg shadow-[#8A2E2E]/30 disabled:opacity-50"
          >
            <Trash2 size={14} />
            {isDeleting ? "Deleting..." : "Permanently Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

