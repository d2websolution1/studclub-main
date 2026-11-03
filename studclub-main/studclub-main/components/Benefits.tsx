'use client';

import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { IMG } from "@/constants/images";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";

export function Benefits() {
  const benefits = [
    { img: IMG.benefit1, title: "Improved Skin Health", copy: "Professional spa therapy and botanical facial treatments." },
    { img: IMG.benefit2, title: "Deep Relaxation", copy: "Spa treatments that relieve stress and restore natural balance." },
  ];

  return (
    <section className="py-24" style={{ background: "linear-gradient(170deg, #1A1614 0%, #29211D 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
            <Eyebrow no="V" label="Wellness Benefits" dark />
            <h2 className="font-display text-4xl md:text-5xl text-white mt-5 max-w-lg font-semibold">
              Experience the true benefits of relaxation &amp; self care
            </h2>
          </motion.div>
          <button className="font-body text-sm tracking-wide px-6 py-3.5 bg-(--champagne) text-(--ink) hover:bg-white transition-colors duration-300 font-medium">
            Contact Us
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={i}
              className="bg-[#241E1B] border border-white/10 shadow-xl"
            >
              <img src={b.img} alt={b.title} className="w-full h-40 object-cover" />
              <div className="p-6">
                <h3 className="font-display text-lg text-white mb-2 font-semibold">{b.title}</h3>
                <p className="font-body text-sm text-white/70 leading-relaxed">{b.copy}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={2}
            className="p-7 flex flex-col justify-between text-white border border-(--oxblood)/40"
            style={{ background: "linear-gradient(160deg, #4A1818 0%, #2B1212 130%)" }}
          >
            <div>
              <Clock size={22} className="text-(--champagne) mb-4" />
              <h3 className="font-display text-lg mb-3 font-semibold text-(--champagne)">Working Hours</h3>
              <ul className="font-body text-sm text-white/90 space-y-2">
                <li className="flex justify-between border-b border-white/10 pb-1"><span>Mon – Fri</span><span>9am – 8pm</span></li>
                <li className="flex justify-between pt-1"><span>Sat – Sun</span><span>10am – 6pm</span></li>
              </ul>
            </div>
            <button className="mt-6 font-body text-xs tracking-wide px-5 py-3 bg-(--champagne) text-(--ink) w-fit hover:bg-white transition-colors duration-300 font-medium">
              Book a Slot
            </button>
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-14 pt-10 border-t border-white/10">
          <div className="flex -space-x-2">
            {[IMG.avatar1, IMG.avatar2, IMG.avatar3].map((a) => (
              <img key={a} src={a} alt="" className="w-9 h-9 border-2 border-(--ink) object-cover" />
            ))}
          </div>
          <div>
            <Stars filled={5} />
            <p className="font-body text-xs text-white/70 mt-1">Trusted by 850+ clients who value relaxation</p>
          </div>
        </div>
      </div>
    </section>
  );
}
