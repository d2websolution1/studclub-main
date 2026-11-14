'use client';

import React from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";

const MAJOR_CITIES_DETAILS = [
  { name: "Mumbai", profiles: "250+ Verified", area: "South Mumbai, Bandra, Juhu, Thane, Navi Mumbai" },
  { name: "Delhi NCR", profiles: "300+ Verified", area: "Connaught Place, Gurgaon, Noida, South Delhi" },
  { name: "Bengaluru", profiles: "220+ Verified", area: "Indiranagar, Koramangala, UB City, Whitefield" },
  { name: "Hyderabad", profiles: "180+ Verified", area: "Banjara Hills, Jubilee Hills, Gachibowli" },
  { name: "Pune", profiles: "160+ Verified", area: "Koregaon Park, Viman Nagar, Kalyani Nagar" },
  { name: "Goa", profiles: "200+ Verified", area: "North Goa Beaches, Candolim, Panaji, Baga" },
  { name: "Chennai", profiles: "140+ Verified", area: "Nungambakkam, ECR, Poes Garden" },
  { name: "Kolkata", profiles: "130+ Verified", area: "Park Street, Salt Lake, New Town" }
];

export function CityCoverage() {
  return (
    <section id="cities" className="py-24 bg-(--ivory-deep) border-b border-(--bronze)/15">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
            <Eyebrow no="IV" label="Pan-India Network" />
            <h2 className="font-display text-4xl md:text-5xl text-(--ink) mt-5 max-w-lg font-bold">
              Services Available in All Major Indian Cities
            </h2>
          </motion.div>
          <a
            href="#profiles"
            className="font-body text-xs font-semibold tracking-widest uppercase px-6 py-3.5 border border-(--bronze)/40 text-(--ink) hover:border-(--oxblood) hover:text-(--oxblood) transition-colors duration-300 flex items-center gap-2"
          >
            View All Cities <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-14">
          {MAJOR_CITIES_DETAILS.map((c, i) => (
            <motion.div
              key={c.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={i}
              className="bg-white p-6 border border-(--bronze)/20 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest bg-(--oxblood) text-white px-2.5 py-0.5">
                    {c.profiles}
                  </span>
                  <MapPin size={16} className={`text-(--oxblood)`} />
                </div>
                <h3 className={`font-display text-2xl font-bold text-(--ink) mb-2`}>{c.name}</h3>
                <p className="font-body text-xs text-(--ink-soft) leading-relaxed">{c.area}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-(--bronze)/15 font-body text-[11px] font-semibold text-text-(--oxblood) tracking-wider flex items-center gap-1">
                24/7 Doorstep Service <ArrowUpRight size={13} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
