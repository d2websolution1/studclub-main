'use client';

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, MapPin, Sparkles, ArrowRight, Heart } from "lucide-react";
import { FEMALE_PROFILES, Profile } from "@/constants/data";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { resolveImageUrl } from "@/lib/api";

interface WomenSectionProps {
  onSelectProfile: (profile: Profile) => void;
  profiles?: Profile[];
}

export function WomenSection({ onSelectProfile, profiles }: WomenSectionProps) {
  const womenList = profiles && profiles.length > 0 ? profiles : FEMALE_PROFILES;
  const featuredWomen = womenList.slice(0, 6);

  return (
    <section id="women" className="py-16 md:py-24 bg-[#181311] text-white relative overflow-hidden border-b border-(--bronze)/20">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-(--oxblood)/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-(--champagne)/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2">
              <Eyebrow no="WOMEN SHOWCASE" label="Female Companions & Wellness" />
              <span className="font-body text-[10px] font-bold uppercase tracking-widest bg-(--oxblood) text-white px-2.5 py-1 flex items-center gap-1 shadow-sm">
                <Heart size={12} className="fill-white" /> {womenList.length} Verified Females
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Elite <span className="text-(--champagne)">Female Companions</span> &amp; Models
            </h2>
          </div>
          <p className="font-body text-xs md:text-sm text-(--champagne-soft) max-w-md font-medium leading-relaxed">
            Handpicked, verified female companions across India's top metros — high profile models, housewives, working executives &amp; independent ladies.
          </p>
        </div>

        {/* Feature Cards Showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredWomen.map((p, i) => (
            <motion.div
              key={p.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={i}
              className="group relative bg-[#211B18] border border-white/10 hover:border-(--champagne)/50 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-100 sm:h-108 overflow-hidden bg-black">
                <img
                  src={resolveImageUrl(p.photo)}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/w1.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#181311] via-black/30 to-transparent opacity-90" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="font-body text-xs font-bold uppercase tracking-widest bg-(--oxblood) text-white px-3 py-1.5 shadow-md">
                    {p.category}
                  </span>
                  <span className="font-body text-xs font-bold uppercase tracking-wider bg-(--champagne) text-(--ink) px-3 py-1.5 flex items-center gap-1 shadow-md">
                    <ShieldCheck size={14} /> ID Verified
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-5 right-5 text-white z-10">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-(--champagne) transition-colors">
                      {p.name}, <span className="text-xl font-normal text-(--champagne-soft)">{p.age}</span>
                    </h3>
                    <div className="flex items-center gap-1 font-body text-sm font-bold text-(--champagne)">
                      <Star size={15} className="fill-(--champagne)" /> {p.rating}
                    </div>
                  </div>

                  <p className="font-body text-xs text-white/70 font-medium flex items-center gap-1 mb-2">
                    <MapPin size={14} className="text-(--champagne)" /> {p.locality}, {p.city}
                  </p>

                  <p className="font-body text-xs text-white/90 leading-relaxed font-medium italic border-l-2 border-(--oxblood) pl-2.5 my-2">
                    "{p.tagline}"
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 bg-[#1B1513] border-t border-white/10 flex flex-col gap-3">
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
                  className="w-full py-3.5 bg-(--oxblood) text-white hover:bg-(--champagne) hover:text-(--ink) transition-colors duration-300 font-body text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
                >
                  View Details &amp; Book <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
