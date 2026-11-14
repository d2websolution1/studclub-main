'use client';

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, MapPin, Eye } from "lucide-react";
import { ALL_PROFILES, Profile } from "@/constants/data";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { resolveImageUrl } from "@/lib/api";

interface CategoryProfilesProps {
  onSelectProfile: (profile: Profile) => void;
  profiles?: Profile[];
}

export function CategoryProfiles({ onSelectProfile, profiles }: CategoryProfilesProps) {
  const profileList = profiles && profiles.length > 0 ? profiles : ALL_PROFILES;

  return (
    <section id="profiles" className="py-16 md:py-20 bg-(--ivory) border-b border-(--bronze)/15">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-(--bronze)/20 pb-6">
          <div>
            <Eyebrow no="VERIFIED DIRECTORY" label="Complete Showcase" />
            <h2 className="font-display text-3xl md:text-5xl text-(--ink) font-extrabold mt-2 tracking-tight">
              All Verified <span className="text-(--oxblood)">Indian Profiles</span>
            </h2>
          </div>
          <p className="font-body text-xs md:text-sm text-(--ink-soft) max-w-md font-medium leading-relaxed">
            Browse our 100% verified Indian profiles — models, corporate executives, elite studs &amp; independent companions across major metro cities in India.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profileList.map((p, i) => (
            <motion.div
              key={p.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={i % 6}
              className="group relative bg-(--ink) text-white overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between"
            >
              {/* Photo Container */}
              <div className="relative h-104 sm:h-112 overflow-hidden bg-black">
                <img
                  src={resolveImageUrl(p.photo)}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      p.gender === "female" ? "/images/w1.jpg" : "/images/m1.jpg";
                  }}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-(--ink) via-(--ink)/30 to-transparent opacity-95" />
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-transparent to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span
                    className={`font-body text-xs font-bold uppercase tracking-widest px-3 py-1.5 shadow-md ${
                      p.gender === "female" ? "bg-(--oxblood) text-white" : "bg-[#2A4B7C] text-white"
                    }`}
                  >
                    {p.gender === "female" ? "Female" : "Male Studd"}
                  </span>
                  {p.verified && (
                    <span className="font-body text-xs font-bold uppercase tracking-wider bg-(--champagne) text-(--ink) px-3 py-1.5 flex items-center gap-1 shadow-md">
                      <ShieldCheck size={14} /> Verified
                    </span>
                  )}
                </div>

                {/* Bottom Text Over Image */}
                <div className="absolute bottom-4 left-5 right-5 text-white z-10">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                      {p.name}, <span className="text-xl font-normal text-(--champagne-soft)">{p.age}</span>
                    </h3>
                    <div className="flex items-center gap-1 font-body text-sm font-bold text-(--champagne)">
                      <Star size={16} className="fill-(--champagne)" /> {p.rating}
                    </div>
                  </div>

                  <p className="font-body text-xs text-white/80 font-medium flex items-center gap-1 mb-2">
                    <MapPin size={14} className="text-(--champagne)" /> {p.locality}, {p.city}
                  </p>

                  <p className="font-body text-xs text-white/90 leading-relaxed font-medium italic border-l-2 border-(--champagne) pl-2.5 my-2">
                    "{p.tagline}"
                  </p>
                </div>
              </div>

              {/* Card Footer Action Block */}
              <div className="p-5 bg-[#211B18] border-t border-white/10 flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.services.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="font-body text-[10px] uppercase tracking-wider bg-white/10 text-(--champagne-soft) px-2.5 py-1 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectProfile(p)}
                  className="w-full py-3.5 bg-(--oxblood) text-white hover:bg-(--champagne) hover:text-(--ink) transition-colors duration-300 font-body text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Eye size={16} /> View Profile Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
