'use client';

import React from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { IMG } from "@/constants/images";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Features() {
  const items = [
    { no: "01", title: "Professional & Certified Therapists" },
    { no: "02", title: "Natural & Skin-Friendly Products" },
    { no: "03", title: "Calm & Luxurious Environment" },
    { no: "04", title: "Personalised our Treatments" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="relative h-105">
          <img src={IMG.feature1} alt="Spa treatment detail" className="absolute top-0 left-4 w-[68%] h-[75%] object-cover shadow-xl" />
          <img src={IMG.feature2} alt="Relaxation" className="absolute bottom-0 left-0 w-[46%] h-[48%] object-cover border-4 border-(--ivory) shadow-xl" />
          <div
            className="absolute top-8 right-0 w-16 h-16 flex items-center justify-center shadow-xl"
            style={{ background: "linear-gradient(160deg, var(--champagne) 0%, var(--bronze) 100%)" }}
          >
            <Leaf size={22} className="text-(--ink)" />
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={1}>
          <Eyebrow no="VI" label="Our Features" />
          <h2 className="font-display text-4xl md:text-5xl text-(--ink) mt-5 mb-8 leading-tight font-semibold">
            Premium features that enhance
          </h2>
          <div className="flex flex-col divide-y divide-(--bronze)/15">
            {items.map((it) => (
              <div key={it.no} className="flex items-center gap-5 py-5">
                <span className="font-display text-xl text-(--oxblood) w-10 font-medium">{it.no}</span>
                <span className="font-body text-sm md:text-base text-(--ink)">{it.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
