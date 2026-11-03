'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function FAQ() {
  const items = [
    { q: "Do I need to book an appointment in advance?", a: "Yes, during this time our staff will guide you and answer all your questions about the spa facility." },
    { q: "Should I break at appointment in advance?", a: "We recommend booking at least 48 hours ahead for weekend slots to guarantee your preferred therapist." },
    { q: "What early should I arrive for my appointment?", a: "Please arrive 15 minutes early so we can walk you through your treatment and settle you in comfortably." },
    { q: "Are you providing therapist based on the visit?", a: "Yes — every guest is paired with a certified therapist suited to the treatment and any preferences noted at booking." },
  ];
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-24" style={{ background: "linear-gradient(180deg, var(--ivory-deep) 0%, var(--champagne-soft) 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
          <Eyebrow no="X" label="Frequently Asked Question" />
          <h2 className="font-display text-4xl text-(--ink) mt-5 mb-8 leading-tight font-semibold">
            Everything you should know about our treatments
          </h2>
          <div
            className="p-7 text-white flex items-center gap-4"
            style={{ background: "linear-gradient(160deg, var(--ink) 0%, var(--oxblood-deep) 140%)" }}
          >
            <div className="w-11 h-11 bg-(--champagne) flex items-center justify-center shrink-0">
              <Phone size={18} className="text-(--ink)" />
            </div>
            <div>
              <p className="font-body text-xs text-(--champagne-soft) uppercase tracking-wider">Contact Information</p>
              <p className="font-display text-lg font-bold">+91 (022) 456-789</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={1} className="flex flex-col gap-4">
          {items.map((item, i) => (
            <div
              key={item.q}
              className="border border-white/70 overflow-hidden"
              style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.7) 0%, var(--champagne-soft) 100%)" }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                className="w-full flex items-center justify-between px-7 py-5 text-left"
                aria-expanded={openIdx === i}
              >
                <span className="font-body text-sm md:text-base text-(--ink)">{item.q}</span>
                <ChevronDown size={18} className={`text-(--bronze) transition-transform duration-300 shrink-0 ml-3 ${openIdx === i ? "rotate-180" : ""}`} />
              </button>
              {openIdx === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.35, ease: "easeOut" }} className="px-7 pb-5">
                  <p className="font-body text-sm text-(--ink-soft) leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
