'use client';

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Crown, Heart, Sparkles } from "lucide-react";
import { IMG } from "@/constants/images";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";

const TICKER_ITEMS = [
  "16 Verified Female Profiles",
  "12 Verified Male Studd Profiles",
  "100% Authentic Indian Details",
  "24/7 Doorstep Suite Dispatch",
  "Pan-India Major Metros",
  "100% Discreet & Confidential"
];

interface HeroProps {
  onOpenWomen?: () => void;
  onOpenMen?: () => void;
}

export function Hero({ onOpenWomen, onOpenMen }: HeroProps) {
  return (
    <section className="relative bg-(--ivory) border-b border-(--bronze)/15">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-14 md:pt-10 md:pb-16 grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Premium Headline & Actions */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
          className="md:col-span-6 flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Eyebrow no="I" label="Premier Indian Society" />
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] bg-(--ink) text-(--champagne) px-3 py-1.5 flex items-center gap-1 shadow-sm">
              <Crown size={12} className="text-(--champagne)" /> VIP Private Access
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-(--ink) text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.12] tracking-tight mt-4">
            The STUDD CLUB — <br className="hidden sm:inline" />
            <span className="font-semibold text-(--ink)">India's Elite </span>
            <span className="text-(--oxblood) font-bold">Women &amp; Men</span> Companion Society.
          </h1>

          {/* Description */}
          <p className="font-body text-(--ink-soft) text-xs sm:text-sm lg:text-base mt-4 max-w-xl leading-relaxed font-medium">
            Discover 28+ verified Indian female models, corporate executives, independent women &amp; handsome male studs for relaxation spa, outstation trips, luxury dining &amp; doorstep suite visits across all major Indian cities.
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 max-w-xl">
            <a
              href="#women"
              className="w-full py-4 px-4 bg-(--oxblood) text-white hover:bg-(--ink) transition-colors duration-300 font-body text-xs font-bold tracking-[0.12em] uppercase flex items-center justify-center gap-2 shadow-lg text-center"
            >
              <Heart size={15} /> Women Showcase (16)
            </a>
            <a
              href="#men"
              className="w-full py-4 px-4 bg-[#2A4B7C] text-white hover:bg-(--ink) transition-colors duration-300 font-body text-xs font-bold tracking-[0.12em] uppercase flex items-center justify-center gap-2 shadow-lg text-center"
            >
              <Crown size={15} /> Men Showcase (12)
            </a>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-(--bronze)/20 font-body text-xs text-(--ink)">
            <div>
              <p className="font-bold text-(--oxblood) uppercase tracking-wider text-[11px] mb-1">Authentic Profiles:</p>
              <p className="text-(--ink-soft) leading-tight font-medium">100% Indian Names, Cities, Bios, Spoken Languages &amp; Details</p>
            </div>
            <div>
              <p className="font-bold text-(--oxblood) uppercase tracking-wider text-[11px] mb-1">Pan-India Coverage:</p>
              <p className="text-(--ink-soft) leading-tight font-medium">Mumbai, Delhi NCR, Bengaluru, Goa, Pune, Jaipur &amp; 10+ Cities</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Dual Framed Feature Cards (Women & Men) */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          className="md:col-span-6 relative"
        >
          <div className="grid grid-cols-2 gap-4 relative">
            {/* Female Spotlight Card */}
            <div className="relative h-96 sm:h-108 overflow-hidden shadow-2xl group border border-(--oxblood)/30">
              <img
                src={IMG.heroFemale}
                alt="Ananya Sharma - Verified Female Profile"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-90" />
              <div className="absolute top-3 left-3 bg-(--oxblood) text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                Female VIP
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-display font-bold text-base">Ananya, 24</p>
                <p className="font-body text-[11px] text-(--champagne)">Bandra, Mumbai</p>
              </div>
            </div>

            {/* Male Spotlight Card */}
            <div className="relative h-96 sm:h-108 overflow-hidden shadow-2xl group border border-[#2A4B7C]/30 mt-6 sm:mt-8">
              <img
                src={IMG.heroMale}
                alt="Devraj Kapoor - Verified Male Profile"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-90" />
              <div className="absolute top-3 left-3 bg-[#2A4B7C] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                Male Studd
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-display font-bold text-base">Devraj, 28</p>
                <p className="font-body text-[11px] text-(--champagne)">Bandra, Mumbai</p>
              </div>
            </div>

            {/* Central Badge Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-(--ink) text-white border border-(--champagne)/40 px-4 py-2.5 shadow-2xl z-20 text-center backdrop-blur-md">
              <ShieldCheck size={18} className="text-(--champagne) mx-auto mb-0.5" />
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-(--champagne)">
                100% ID Verified
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee Ticker */}
      <div className="overflow-hidden border-t border-(--bronze)/20 bg-(--ink) py-3.5">
        <style>{`
          @keyframes studd-ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .studd-ticker-track {
            display: flex;
            width: max-content;
            animation: studd-ticker 28s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .studd-ticker-track { animation: none; }
          }
        `}</style>
        <div className="studd-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-8 pr-12">
              <span className="font-display font-medium text-xs sm:text-sm tracking-[0.2em] uppercase text-(--champagne) whitespace-nowrap">
                {item}
              </span>
              <span className="w-2 h-2 bg-(--oxblood)" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}