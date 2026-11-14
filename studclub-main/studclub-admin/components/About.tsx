'use client';

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "@/constants/images";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function About() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
          <Eyebrow no="II" label="About Us" />
          <h2 className="font-display text-4xl md:text-5xl text-(--ink) mt-5 leading-tight font-semibold">
            Bringing our relaxation and care together
          </h2>
          <p className="font-body text-sm md:text-base text-(--ink-soft) mt-5 leading-relaxed max-w-md">
            We are a passionate wellness house that brings together the finest spa treatments and dedicated therapists.
            Every ritual is designed to renew both body and mind.
          </p>
          <div className="grid grid-cols-2 gap-5 mt-9 max-w-sm">
            <div className="p-5" style={{ background: "linear-gradient(155deg, var(--champagne-soft) 0%, var(--ivory) 90%)" }}>
              <p className="font-display text-3xl text-(--oxblood) font-bold">100+</p>
              <p className="font-body text-xs text-(--ink-soft) mt-1">Luxury Spa Treatments</p>
            </div>
            <div className="p-5" style={{ background: "linear-gradient(155deg, rgba(138,46,46,0.08) 0%, var(--ivory) 90%)" }}>
              <p className="font-display text-3xl text-(--oxblood) font-bold">40+</p>
              <p className="font-body text-xs text-(--ink-soft) mt-1">Certified Spa Experts</p>
            </div>
          </div>
          <button className="mt-9 font-body text-sm tracking-wide px-7 py-4 bg-(--ink) text-(--ivory) hover:bg-(--oxblood) transition-colors duration-300 inline-flex items-center gap-2">
            More About Us <ArrowUpRight size={16} />
          </button>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={1} className="relative h-110">
          <img src={IMG.about1} alt="Spa care" className="absolute top-0 right-0 w-[72%] h-[85%] object-cover shadow-xl" />
          <img src={IMG.about2} alt="Facial treatment" className="absolute bottom-0 left-0 w-[52%] h-[52%] object-cover border-4 border-(--ivory) shadow-xl" />
          <div className="absolute bottom-6 left-[40%] px-4 py-3 bg-(--ink) text-white font-body text-xs shadow-xl">
            25+ years of care
          </div>
        </motion.div>
      </div>
    </section>
  );
}
