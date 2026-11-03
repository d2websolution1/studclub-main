'use client';

import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Profile } from "../types";
import { resolveImageUrl } from "../lib/api";

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
      <div className="relative w-full max-w-md bg-[#181311] border border-[#8A2E2E]/60 rounded-xl shadow-2xl p-6 text-center space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white p-1"
        >
          <X size={18} />
        </button>

        <div className="w-16 h-16 rounded-full bg-[#8A2E2E]/20 border border-[#8A2E2E] mx-auto flex items-center justify-center text-[#B8483F]">
          <AlertTriangle size={32} />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Delete Profile?</h3>
          <p className="text-xs text-white/70 leading-relaxed">
            Are you sure you want to permanently delete profile{" "}
            <span className="font-semibold text-[#E8C88A]">{profile.name}</span>{" "}
            (ID: {profile.id})? This action cannot be undone.
          </p>
        </div>

        {/* Mini Preview */}
        <div className="flex items-center gap-3 p-3 bg-[#211B18] rounded-lg border border-white/10 text-left">
          <img
            src={resolveImageUrl(profile.photo)}
            alt={profile.name}
            className="w-12 h-14 object-cover rounded-md border border-white/10 shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/w1.jpg";
            }}
          />
          <div className="overflow-hidden">
            <h4 className="font-semibold text-white text-sm truncate">{profile.name}</h4>
            <p className="text-xs text-white/50 truncate">
              {profile.city} • {profile.category}
            </p>
            <span className="text-[10px] uppercase font-bold text-[#E8C88A]">
              {profile.gender === "female" ? "Female" : "Male Studd"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="w-1/2 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-white/80 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-1/2 py-2.5 rounded-lg bg-[#8A2E2E] hover:bg-[#B8483F] text-white text-sm font-bold shadow-lg shadow-[#8A2E2E]/40 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <Trash2 size={16} />
            {isDeleting ? "Deleting..." : "Delete Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
