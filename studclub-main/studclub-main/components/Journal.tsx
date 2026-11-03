'use client';

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "@/constants/images";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Journal() {
  const posts = [
    { img: IMG.blog1, title: "5 Benefits of Regular Massage & Wellness Care", category: "Wellness Rituals" },
    { img: IMG.blog2, title: "How Aromatherapy Reduces Executive Stress", category: "Mind & Rejuvenation" },
    { img: IMG.blog3, title: "Top Skin Renewal Rituals for Glowing Health", category: "Skin & Care" },
    { img: IMG.strip1, title: "Unwind at Luxury Private Suites in Metros", category: "Suite Visits" },
    { img: IMG.strip2, title: "Outstation Companions for Business Getaways", category: "Travel Companion" },
    { img: IMG.strip3, title: "Full Body Relaxation & Deep Muscle Relief", category: "Therapy" },
  ];

  return (
    <section id="journal" className="py-20 bg-(--ivory-deep) border-b border-(--bronze)/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-(--bronze)/20 pb-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
            <Eyebrow no="VI" label="Wellness Journal &amp; Articles" />
            <h2 className="font-display text-3xl md:text-5xl text-(--ink) mt-3 font-bold">
              Experience Premium Care &amp; Deep Relaxation
            </h2>
          </motion.div>
          <a
            href="#pricing"
            className="font-body text-xs font-bold tracking-widest uppercase px-6 py-3.5 bg-(--ink) text-(--ivory) hover:bg-(--oxblood) transition-colors duration-300 flex items-center gap-2 w-fit"
          >
            View Membership Prices <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {/* Continuous Marquee Ticker Slider */}
      <div className="relative w-full overflow-hidden">
        <style>{`
          @keyframes journal-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .journal-marquee-track {
            display: flex;
            width: max-content;
            animation: journal-marquee 32s linear infinite;
          }
          .journal-marquee-track:hover {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .journal-marquee-track { animation: none; }
          }
        `}</style>

        <div className="journal-marquee-track flex gap-6 px-4">
          {[...posts, ...posts].map((p, i) => (
            <div
              key={i}
              className="w-[320px] sm:w-90 shrink-0 bg-white border border-(--bronze)/20 shadow-lg flex flex-col justify-between group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-(--oxblood) text-white font-body text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                  {p.category}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <h3 className="font-display text-base text-(--ink) font-bold mb-4 leading-snug group-hover:text-(--oxblood) transition-colors">
                  {p.title}
                </h3>
                <span className="font-body text-xs tracking-[0.15em] uppercase text-(--oxblood) font-bold inline-flex items-center gap-1">
                  Read Article <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
