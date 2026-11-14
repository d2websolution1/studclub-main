'use client';

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { IMG } from "@/constants/images";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";

export function Testimonials() {
  const quotes = [
    {
      name: "Vikram S. (Mumbai)",
      role: "Gold VIP Member",
      img: IMG.avatar1,
      text: "The STUDD CLUB provided exceptional aromatherapy massage and companion services during my business trip to South Mumbai. Highly professional and 100% discreet."
    },
    {
      name: "Rajesh K. (Delhi NCR)",
      role: "Platinum Elite Member",
      img: IMG.avatar2,
      text: "Doorstep service in Gurgaon was fast and seamless. Verified companion profile matched exactly as shown. Premium experience for executives."
    },
    {
      name: "Amit P. (Bengaluru)",
      role: "Gold VIP Member",
      img: IMG.avatar3,
      text: "Outstanding concierge manager support. Arranged an outdoor companion for a weekend getaway in Goa effortlessly. Will renew my membership."
    },
  ];

  return (
    <section id="testimonials" className="py-24 border-b border-white/10" style={{ background: "linear-gradient(180deg, #221C19 0%, #171210 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
            <Eyebrow no="VII" label="Member Testimonials" dark />
            <h2 className="font-display text`2xl md:text-4xl text-white mt-5 max-w-lg font-bold">
              What Male Members Say About The STUDD CLUB
            </h2>
          </motion.div>
          <a href="#pricing" className="font-body text-xs font-bold tracking-widest uppercase px-6 py-3.5 border border-white/30 text-white hover:bg-white hover:text-(--ink) transition-colors duration-300">
            View Membership Prices
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {quotes.map((q, i) => (
            <motion.div
              key={q.name}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={i}
              className="p-8 border border-white/10 shadow-xl flex flex-col justify-between"
              style={{
                background: i % 2 === 0
                  ? "linear-gradient(160deg, #2E2521 0%, #221B18 100%)"
                  : "linear-gradient(160deg, #3D1919 0%, #241313 100%)"
              }}
            >
              <div>
                <Quote size={22} className="text-(--champagne) mb-4" />
                <p className="font-display text-sm text-white/90 leading-relaxed mb-6 font-medium">"{q.text}"</p>
              </div>
              <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/10">
                <img src={q.img} alt={q.name} className="w-10 h-10 object-cover border border-white/20" />
                <div>
                  <p className="font-body text-xs text-white font-bold">{q.name}</p>
                  <p className="font-body text-[10px] text-(--champagne) uppercase tracking-wider">{q.role}</p>
                  <Stars filled={5} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
