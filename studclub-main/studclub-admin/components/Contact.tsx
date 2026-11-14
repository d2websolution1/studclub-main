'use client';

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { IMG } from "@/constants/images";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Contact() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}
        className="grid md:grid-cols-2 overflow-hidden shadow-[0_30px_70px_-30px_rgba(43,36,32,0.4)]"
      >
        <div
          className="relative p-10 md:p-12 text-white flex flex-col justify-between min-h-105"
          style={{ background: "linear-gradient(160deg, var(--ink) 0%, var(--oxblood-deep) 140%)" }}
        >
          <img src={IMG.contact} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="relative">
            <Eyebrow no="VIII" label="Book Appointment" dark />
            <h2 className="font-display text-3xl md:text-4xl mt-5 leading-tight font-semibold">
              Relax, refresh, rejuvenate with our spa treatments
            </h2>
          </div>
          <div className="relative flex flex-col gap-4 mt-10 font-body text-sm">
            <div className="flex items-center gap-3"><Phone size={16} className="text-(--champagne)" /> +91 (022) 456-789</div>
            <div className="flex items-center gap-3"><Mail size={16} className="text-(--champagne)" /> hello@copperleaf.co.in</div>
            <div className="flex items-center gap-3"><MapPin size={16} className="text-(--champagne)" /> 6 Ambrose Avenue, Delhi</div>
          </div>
        </div>

        <div className="p-10 md:p-12 bg-white/90 flex flex-col justify-center">
          <h3 className="font-display text-2xl text-(--ink) mb-6 font-semibold">Get In Touch</h3>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Full Name*" className="col-span-1 px-5 py-3.5 font-body text-sm border border-(--bronze)/ 25 bg-(--ivory) focus:outline-none focus:border-(--oxblood)" />
            <input placeholder="Phone Number*" className="col-span-1 px-5 py-3.5 font-body text-sm border border-(--bronze)/25 bg-(--ivory) focus:outline-none focus:border-(--oxblood)" />
            <input placeholder="Email Address*" className="col-span-2 px-5 py-3.5 font-body text-sm border border-(--bronze)/25 bg-(--ivory) focus:outline-none focus:border-(--oxblood)" />
            <textarea placeholder="Any Additional Message" rows={4} className="col-span-2 px-5 py-3.5 font-body text-sm border border-(--bronze)/25 bg-(--ivory) focus:outline-none focus:border-(--oxblood) resize-none" />
          </div>
          <button className="mt-5 font-body text-sm tracking-wide px-7 py-4 bg-(--ink) text-(--ivory) hover:bg-(--oxblood) transition-colors duration-300 inline-flex items-center justify-center gap-2 w-fit">
            Send Message <Send size={15} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
