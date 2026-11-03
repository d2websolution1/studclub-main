'use client';

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  ShieldCheck,
  MapPin,
  MessageCircle,
  PhoneCall,
  Crown,
  Sparkles,
  CheckCircle2,
  Lock,
  Globe2,
  Briefcase,
  Ruler
} from "lucide-react";
import { Profile } from "@/constants/data";
import { resolveImageUrl } from "@/lib/api";

interface ProfileDetailModalProps {
  profile: Profile | null;
  onClose: () => void;
}

export function ProfileDetailModal({ profile, onClose }: ProfileDetailModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (profile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [profile]);

  if (!profile) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello STUDD CLUB Concierge! I am interested in booking / inquiring about Profile ID: #${profile.id} (${profile.name}, ${profile.city}). Please provide availability & VIP access details.`
  );

  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
          className="relative w-full max-w-4xl bg-[#1C1715] text-white border border-(--champagne)/30 shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col md:flex-row"
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-(--oxblood) hover:border-(--oxblood) transition-all duration-300 shadow-xl"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Left Column: Portrait Photo & Badges */}
          <div className="md:w-5/12 relative h-80 md:h-auto min-h-85 overflow-hidden bg-black shrink-0">
            <img
              src={resolveImageUrl(profile.photo)}
              alt={profile.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  profile.gender === "female" ? "/images/w1.jpg" : "/images/m1.jpg";
              }}
            />
            {/* Vignette Gradients */}
            <div className="absolute inset-0 bg-linear-to-t from-[#1C1715] via-transparent to-black/50 md:bg-linear-to-r md:from-transparent md:to-[#1C1715]/90" />

            {/* Floating Top Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <span className="font-body text-[11px] font-bold uppercase tracking-widest bg-(--oxblood) text-white px-3 py-1 shadow-md">
                {profile.category}
              </span>
              {profile.badge && (
                <span className="font-body text-[11px] font-bold uppercase tracking-widest bg-(--champagne) text-(--ink) px-3 py-1 flex items-center gap-1 shadow-md">
                  <Sparkles size={13} /> {profile.badge}
                </span>
              )}
            </div>

            {/* Bottom Overlay Info on Mobile */}
            <div className="absolute bottom-4 left-4 right-4 md:hidden">
              <span className="text-xs font-semibold uppercase tracking-wider text-(--champagne-soft) bg-black/60 px-2.5 py-1 backdrop-blur-sm border border-white/10">
                {profile.gender === "female" ? "Female Companion" : "Male Gentleman"} • ID #{profile.id}
              </span>
            </div>
          </div>

          {/* Right Column: Detailed Indian Attributes & Action Buttons */}
          <div className="md:w-7/12 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
            <div>
              {/* Gender & ID Header */}
              <div className="hidden md:flex items-center justify-between text-xs text-(--champagne-soft) font-semibold uppercase tracking-widest mb-1">
                <span>{profile.gender === "female" ? "Verified Female Companion" : "Verified Male Gentleman"}</span>
                <span>Profile ID: #{profile.id}</span>
              </div>

              {/* Name & Age */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                    {profile.name}
                    {profile.verified && (
                      <ShieldCheck size={24} className="text-(--champagne) inline" aria-label="100% ID Verified" />
                    )}
                  </h2>
                  <p className="font-body text-sm text-(--champagne) font-medium flex items-center gap-1 mt-1">
                    <MapPin size={15} /> {profile.locality}, {profile.city}, India
                  </p>
                </div>

                {/* Rating Badge */}
                <div className="bg-white/10 border border-(--champagne)/30 px-3.5 py-1.5 flex items-center gap-1.5">
                  <Star size={18} className="fill-(--champagne) text-(--champagne)" />
                  <span className="font-body text-base font-bold text-white">{profile.rating}</span>
                  <span className="font-body text-xs text-white/60">({profile.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Tagline & Bio */}
              <div className="mt-4">
                <p className="font-body text-xs md:text-sm text-(--champagne-soft) italic border-l-2 border-(--oxblood) pl-3 py-1 font-medium">
                  "{profile.tagline}"
                </p>
                <p className="font-body text-xs md:text-sm text-white/80 leading-relaxed mt-3">
                  {profile.bio}
                </p>
              </div>

              {/* Attributes Grid (Height, Profession, Languages) */}
              <div className="grid grid-cols-3 gap-3 mt-5 p-3.5 bg-white/5 border border-white/10 font-body text-xs">
                <div className="flex items-center gap-2">
                  <Ruler size={16} className="text-(--champagne)" />
                  <div>
                    <p className="text-white/50 text-[10px] uppercase font-bold">Height</p>
                    <p className="font-semibold text-white">{profile.height}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-(--champagne)" />
                  <div>
                    <p className="text-white/50 text-[10px] uppercase font-bold">Profession</p>
                    <p className="font-semibold text-white truncate">{profile.profession}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 size={16} className="text-(--champagne)" />
                  <div>
                    <p className="text-white/50 text-[10px] uppercase font-bold">Languages</p>
                    <p className="font-semibold text-white truncate">{profile.languages.join(", ")}</p>
                  </div>
                </div>
              </div>

              {/* Services Offered */}
              <div className="mt-5">
                <p className="font-body text-xs font-bold uppercase tracking-wider text-(--champagne) mb-2.5">
                  Available Services &amp; Rituals:
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.services.map((service, idx) => (
                    <span
                      key={idx}
                      className="font-body text-xs font-medium bg-white/10 border border-white/15 text-white/90 px-3 py-1 flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={13} className="text-(--champagne)" /> {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Membership & Rate Tier */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-white/60">Access Required: </span>
                  <span className="font-bold text-(--champagne) inline-flex items-center gap-1">
                    <Crown size={14} /> {profile.membershipTierRequired || "Gold STUDD VIP"}
                  </span>
                </div>
                {profile.consultationRate && (
                  <div>
                    <span className="text-white/60">Starting Fee: </span>
                    <span className="font-bold text-white font-display text-sm">{profile.consultationRate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions & Privacy Guarantee */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 bg-[#25D366] text-black hover:bg-[#1eb956] transition-colors duration-300 font-body text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle size={17} className="fill-black" /> Instant WhatsApp Booking
                </a>
                <a
                  href="tel:+919876543210"
                  className="py-3.5 px-4 bg-(--oxblood) text-white hover:bg-(--oxblood-soft) transition-colors duration-300 font-body text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <PhoneCall size={16} /> Call VIP Concierge
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-white/70 font-medium pt-1">
                <Lock size={13} className="text-(--champagne)" />
                <span>100% Confidential • Discreet Pan-India Doorstep Dispatch</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
