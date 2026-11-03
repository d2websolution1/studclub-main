'use client';

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { IMG } from "@/constants/images";
import { fadeUp } from "@/constants/animations";

export function VideoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}
        className="relative overflow-hidden h-105 md:h-125"
      >
        <img src={IMG.video} alt="Spa relaxation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-(--ink)/60 via-transparent to-transparent" />
        <button className="absolute inset-0 m-auto w-20 h-20 bg-white/90 flex items-center justify-center hover:bg-white transition-colors duration-300">
          <Play size={26} className="text-(--oxblood) ml-1" fill="currentColor" />
        </button>
      </motion.div>
    </section>
  );
}
