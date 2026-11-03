'use client';

import React from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, ArrowUpRight } from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/constants/data";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Pricing() {
  return (
    <section id="pricing" className="py-24" style={{ background: "linear-gradient(160deg, #5E1F1F 0%, #321010 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-xl mx-auto">
          <div className="flex justify-center"><Eyebrow no="V" label="Membership Prices & Tiers" dark /></div>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-5 font-bold">
            Exclusive Membership Pricing
          </h2>
          <p className="font-body text-xs text-white/70 mt-3 leading-relaxed">
            Transparent membership packages for male members across all major Indian cities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14 items-stretch">
          {MEMBERSHIP_PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i}
              className={`p-9 flex flex-col ${p.featured
                ? "bg-(--ivory) text-(--ink) shadow-2xl md:-translate-y-4 border-2 border-(--champagne)"
                : "bg-[#421515] text-white border border-white/15 shadow-xl"
                }`}
            >
              {p.featured && (
                <span className="font-body text-[10px] tracking-[0.2em] uppercase bg-(--oxblood) text-white w-fit px-3 py-1 mb-4 font-bold flex items-center gap-1">
                  <ShieldCheck size={12} /> Most Popular Male Plan
                </span>
              )}
              <h3 className="font-display text-2xl mb-1 font-bold">{p.name}</h3>
              <p className={`font-body text-xs mb-6 ${p.featured ? "text-(--ink-soft)" : "text-(--champagne-soft)"}`}>{p.copy}</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className={`font-body text-xs ${p.featured ? "text-(--ink-soft) font-medium" : "text-white/60"}`}>{p.period}</span>
              </div>
              <p className={`font-body text-xs uppercase tracking-wider mb-3 ${p.featured ? "text-(--oxblood) font-bold" : "text-(--champagne)"}`}>Membership Features</p>
              <ul className="flex flex-col gap-3 mb-9 flex-1">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 font-body text-xs font-medium">
                    <Check size={15} className={p.featured ? "text-(--oxblood)" : "text-(--champagne)"} />
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href="#profiles"
                className={`font-body text-xs font-bold tracking-[0.18em] uppercase py-4 transition-colors duration-300 flex items-center justify-center gap-2 ${p.featured
                  ? "bg-(--oxblood) text-white hover:bg-(--ink) shadow-md"
                  : "bg-(--champagne) text-(--ink) hover:bg-white"
                  }`}
              >
                Select {p.name} <ArrowUpRight size={15} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
