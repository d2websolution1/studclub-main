'use client';

import React from "react";
import { Star, ShieldCheck, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { FEMALE_PROFILES, MALE_PROFILES, Profile } from "@/constants/data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { resolveImageUrl } from "@/lib/api";

interface ProfileMarqueeProps {
  onSelectProfile: (profile: Profile) => void;
  profiles?: Profile[];
}

export function ProfileMarquee({ onSelectProfile, profiles }: ProfileMarqueeProps) {
  const femaleSource = profiles && profiles.length > 0 
    ? profiles.filter((p) => p.gender === "female") 
    : FEMALE_PROFILES;
  const maleSource = profiles && profiles.length > 0 
    ? profiles.filter((p) => p.gender === "male") 
    : MALE_PROFILES;

  const femaleMarquee = [...femaleSource, ...femaleSource];
  const maleMarquee = [...maleSource, ...maleSource];

  return (
    <section className="py-16 bg-[#161210] border-y border-(--bronze)/25 relative overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-(--oxblood)/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-(--champagne)/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-10 text-center">
        <Eyebrow no="LIVE SHOWCASE" label="Pan-India Exclusive Marquee" />
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-extrabold mt-3 tracking-tight">
          Verified <span className="text-(--champagne)">Women &amp; Men</span> Spotlight
        </h2>
        <p className="font-body text-xs sm:text-sm text-(--champagne-soft) max-w-xl mx-auto mt-3 font-medium leading-relaxed">
          Hover and click any profile card below to view complete Indian bio, verified credentials, and direct booking details.
        </p>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: marquee-left 40s linear infinite;
        }
        .marquee-track-right {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: marquee-right 40s linear infinite;
        }
        .marquee-container:hover .marquee-track-left,
        .marquee-container:hover .marquee-track-right {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track-left, .marquee-track-right { animation: none; }
        }
      `}</style>

      <div className="marquee-container space-y-6">
        {/* Track 1: Female Profiles (Scrolling Left) */}
        <div className="overflow-hidden py-2 relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#161210] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#161210] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track-left">
            {femaleMarquee.map((profile, i) => (
              <MarqueeCard key={`female-${profile.id}-${i}`} profile={profile} onClick={() => onSelectProfile(profile)} />
            ))}
          </div>
        </div>

        {/* Track 2: Male Profiles (Scrolling Right) */}
        <div className="overflow-hidden py-2 relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-[#161210] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-[#161210] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track-right">
            {maleMarquee.map((profile, i) => (
              <MarqueeCard key={`male-${profile.id}-${i}`} profile={profile} onClick={() => onSelectProfile(profile)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeCard({ profile, onClick }: { profile: Profile; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group relative w-64 sm:w-72 h-88 bg-[#211B18] border border-white/10 hover:border-(--champagne) transition-all duration-500 overflow-hidden cursor-pointer shrink-0 shadow-xl"
    >
      <img
        src={resolveImageUrl(profile.photo)}
        alt={profile.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            profile.gender === "female" ? "/images/w1.jpg" : "/images/m1.jpg";
        }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-[#161210] via-black/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-transparent opacity-60" />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <span className="font-body text-[10px] font-bold uppercase tracking-wider bg-(--oxblood) text-white px-2.5 py-1 shadow-md">
          {profile.gender === "female" ? "Female" : "Male Studd"}
        </span>
        <span className="font-body text-[10px] font-bold uppercase tracking-wider bg-black/60 text-(--champagne) px-2.5 py-1 border border-white/15 flex items-center gap-1 backdrop-blur-xs">
          <Star size={11} className="fill-(--champagne)" /> {profile.rating}
        </span>
      </div>

      {/* Bottom Info Card */}
      <div className="absolute bottom-3 left-3 right-3 text-white z-10">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white group-hover:text-(--champagne) transition-colors">
            {profile.name}, <span className="font-normal text-white/80 text-base">{profile.age}</span>
          </h3>
          {profile.verified && <ShieldCheck size={16} className="text-(--champagne)" aria-label="Verified" />}
        </div>

        <p className="font-body text-xs text-white/70 font-medium flex items-center gap-1 mt-0.5">
          <MapPin size={13} className="text-(--champagne)" /> {profile.locality}, {profile.city}
        </p>

        <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-semibold text-(--champagne-soft)">
          <span className="truncate max-w-42.5">{profile.profession}</span>
          <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Details <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}
