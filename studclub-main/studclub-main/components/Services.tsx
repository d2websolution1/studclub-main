'use client';

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, HeartHandshake, Globe, Home } from "lucide-react";
import { SERVICES } from "@/constants/data";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Services() {
  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles size={24} className="text-(--champagne)" />,
    HeartHandshake: <HeartHandshake size={24} className="text-(--champagne)" />,
    Globe: <Globe size={24} className="text-(--champagne)" />,
    Home: <Home size={24} className="text-(--champagne)" />,
  };

  return (
    <section id="services" className="py-24" style={{ background: "linear-gradient(160deg, #4A1818 0%, #2B1212 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
            <Eyebrow no="III" label="Our Specialised Services" dark />
            <h2 className="font-display text-2xl md:text-4xl text-white mt-5 max-w-xl font-bold">
              Services Tailored for Male Members Across India
            </h2>
          </motion.div>
          <a
            href="#pricing"
            className="font-body text-xs font-semibold tracking-widest uppercase px-6 py-3.5 border border-(--champagne)/40 text-(--champagne) hover:bg-(--champagne) hover:text-(--ink) transition-colors duration-300 flex items-center gap-2"
          >
            Membership Packages <ChevronRight size={15} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={i}
              className="bg-[#3A1313] border border-white/10 p-7 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-black/40 border border-white/10">
                    {iconMap[s.icon]}
                  </div>
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest bg-(--champagne) text-(--ink) px-2.5 py-1">
                    {s.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl text-white mb-2 font-bold">{s.title}</h3>
                <p className="font-body text-xs text-(--champagne-soft) font-medium mb-3">{s.subtitle}</p>
                <p className="font-body text-xs text-white/70 leading-relaxed mb-6">{s.description}</p>
              </div>

              <a
                href="#profiles"
                className="mt-4 pt-4 border-t border-white/10 font-body text-xs font-semibold text-(--champagne) uppercase tracking-wider flex items-center justify-between hover:text-white transition-colors"
              >
                <span>Connect Service</span>
                <ChevronRight size={15} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
