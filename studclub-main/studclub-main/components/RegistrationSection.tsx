'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle, ArrowRight, Star } from "lucide-react";
import { CITIES } from "@/constants/data";
import { fadeUp } from "@/constants/animations";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function RegistrationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Mumbai",
    plan: "Gold STUDD VIP",
    preferredService: "Massage Services"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="register" className="py-24 bg-(--ivory-deep) border-b border-(--bronze)/15">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Information & Member Guarantee */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <Eyebrow no="VI" label="Instant Male Registration" />

            <h2 className="font-display text-4xl md:text-5xl text-(--ink) mt-5 font-bold leading-tight">
              Join The STUDD CLUB Today as an Exclusive Member
            </h2>

            <p className="font-body text-sm text-(--ink-soft) mt-5 leading-relaxed">
              Register your interest to unlock direct access to verified female companion profiles, luxury massage rituals, and 24/7 doorstep visits across all major Indian cities.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-3 bg-white p-4 border border-(--bronze)/20 shadow-sm">
                <ShieldCheck size={20} className="text-(--oxblood) shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-(--ink) uppercase tracking-wider">100% Confidential &amp; Discreet</h4>
                  <p className="font-body text-xs text-(--ink-soft) mt-0.5">Your personal data is encrypted. No public records, no passwords required.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 border border-(--bronze)/20 shadow-sm">
                <Star size={20} className="text-(--oxblood) shrink-0 mt-0.5 fill-(--oxblood)" />
                <div>
                  <h4 className="font-display text-sm font-bold text-(--ink) uppercase tracking-wider">Pan-India Concierge Support</h4>
                  <p className="font-body text-xs text-(--ink-soft) mt-0.5">Direct dispatch in Mumbai, Delhi NCR, Bengaluru, Hyderabad, Goa &amp; 10+ cities.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Display Registration Form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={1}
            className="lg:col-span-6"
          >
            <div className="bg-(--ink) text-white p-8 md:p-10 border-2 border-(--champagne)/40 shadow-2xl">
              {!submitted ? (
                <div>
                  <div className="flex items-center gap-2 text-(--champagne) font-body text-xs font-bold uppercase tracking-[0.2em] mb-2">
                    <ShieldCheck size={16} /> Member Registration Form
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">Apply for Membership</h3>
                  <p className="font-body text-xs text-white/70 mb-6 leading-relaxed">
                    Fill in your contact preferences below. Our VIP manager will verify your details for instant activation.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 font-body text-xs">
                    <div>
                      <label className="block text-white/80 uppercase tracking-wider mb-1 font-medium">Your Name*</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#241E1B] border border-white/20 text-white focus:outline-none focus:border-(--champagne) font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 uppercase tracking-wider mb-1 font-medium">WhatsApp Phone Number*</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#241E1B] border border-white/20 text-white focus:outline-none focus:border-(--champagne) font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 uppercase tracking-wider mb-1 font-medium">City*</label>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 bg-[#241E1B] border border-white/20 text-white focus:outline-none focus:border-(--champagne) font-medium"
                        >
                          {CITIES.filter((c) => c !== "All Cities").map((city) => (
                            <option key={city} value={city} className="bg-(--ink) text-white">
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/80 uppercase tracking-wider mb-1 font-medium">Membership Plan*</label>
                        <select
                          value={formData.plan}
                          onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                          className="w-full px-4 py-3 bg-[#241E1B] border border-white/20 text-white focus:outline-none focus:border-(--champagne) font-medium"
                        >
                          <option value="Silver Pass">Silver Pass (₹9,999)</option>
                          <option value="Gold STUDD VIP">Gold STUDD VIP (₹19,999)</option>
                          <option value="Platinum Elite">Platinum Elite (₹34,999)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 uppercase tracking-wider mb-1 font-medium">Preferred Service Category*</label>
                      <select
                        value={formData.preferredService}
                        onChange={(e) => setFormData({ ...formData, preferredService: e.target.value })}
                        className="w-full px-4 py-3 bg-[#241E1B] border border-white/20 text-white focus:outline-none focus:border-(--champagne) font-medium"
                      >
                        <option value="Massage Services">Massage Services</option>
                        <option value="Complete Companion Services">Complete Companion Services</option>
                        <option value="Outdoor & Travel Services">Outdoor &amp; Travel Services</option>
                        <option value="Doorstep & In-Room Services">Doorstep &amp; In-Room Services</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-4 bg-(--champagne) text-(--ink) font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                      Submit Registration <ArrowRight size={16} />
                    </button>

                    <p className="text-[10px] text-white/50 text-center leading-tight">
                      🔒 No password required. Registration for display &amp; instant concierge callback.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle size={52} className="text-(--champagne) mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold mb-2">Registration Submitted!</h3>
                  <p className="font-body text-xs text-white/80 leading-relaxed mb-6">
                    Thank you, {formData.name}. Your male membership request for <strong>{formData.plan}</strong> in <strong>{formData.city}</strong> has been received. Our VIP manager will reach out via WhatsApp at <strong>{formData.phone}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3.5 bg-(--champagne) text-(--ink) font-bold tracking-widest uppercase hover:bg-white transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
