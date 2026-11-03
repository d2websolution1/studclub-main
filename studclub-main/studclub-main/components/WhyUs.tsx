'use client';

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "@/constants/images";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function WhyUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="relative h-105 order-2 md:order-1">
          <img src={IMG.why1} alt="Therapist at work" className="absolute top-0 left-0 w-[70%] h-[80%] object-cover shadow-xl" />
          <img src={IMG.why2} alt="Spa detail" className="absolute bottom-0 right-0 w-[50%] h-[50%] object-cover border-4 border-(--ivory) shadow-xl" />
          <div
            className="absolute top-6 right-6 px-5 py-4 text-center shadow-xl"
            style={{ background: "linear-gradient(160deg, var(--oxblood) 0%, var(--oxblood-deep) 100%)" }}
          >
            <p className="font-display text-2xl text-white leading-none font-bold">2015</p>
            <p className="font-body text-[10px] tracking-widest uppercase text-(--champagne-soft) mt-1">Founded In</p>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={1} className="order-1 md:order-2">
          <Eyebrow no="IV" label="Why Choose Us" />
          <h2 className="font-display text-4xl md:text-5xl text-(--ink) mt-5 leading-tight font-semibold">
            The perfect place to relaxation and rejuvenation
          </h2>
          <p className="font-body text-sm md:text-base text-(--ink-soft) mt-5 leading-relaxed max-w-md">
            From our certified therapists to our thoughtful interiors, everything is designed around one
            standard — considered, unhurried care.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mt-9">
            <div className="p-5 border border-(--bronze)/20 bg-white/60">
              <p className="font-display text-2xl text-(--oxblood) mb-1 font-bold">Certified</p>
              <p className="font-body text-xs text-(--ink-soft)">Spa Therapists highly trained &amp; experienced</p>
            </div>
            <div className="p-5 border border-(--bronze)/20 bg-white/60">
              <p className="font-display text-2xl text-(--oxblood) mb-1 font-bold">25+ Years</p>
              <p className="font-body text-xs text-(--ink-soft)">Of combined experience in spa &amp; care</p>
            </div>
          </div>
          <button className="mt-9 font-body text-sm tracking-wide px-7 py-4 bg-(--ink) text-(--ivory) hover:bg-(--oxblood) transition-colors duration-300 inline-flex items-center gap-2">
            Learn More <ArrowUpRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
