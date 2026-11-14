'use client';

import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck } from "lucide-react";
import { CITIES } from "@/constants/data";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemberRegistrationModal({ isOpen, onClose }: ModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Mumbai",
    plan: "Gold STUDD VIP"
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-(--ink) border border-(--champagne)/30 p-8 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-(--champagne) text-xs font-semibold uppercase tracking-[0.2em] mb-2">
              <ShieldCheck size={16} /> Male Member Verification
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">Join The STUDD CLUB</h2>
            <p className="font-body text-xs text-white/70 mb-6 leading-relaxed">
              Register as an exclusive male member to connect with verified female profiles &amp; luxury wellness services across major Indian cities.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-body text-xs">
              <div>
                <label className="block text-white/80 uppercase tracking-wider mb-1 font-medium">Full Name*</label>
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
                <label className="block text-white/80 uppercase tracking-wider mb-1 font-medium">Phone Number (WhatsApp)*</label>
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
                  <label className="block text-white/80 uppercase tracking-wider mb-1 font-medium">Your City*</label>
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
                  <label className="block text-white/80 uppercase tracking-wider mb-1 font-medium">Preferred Plan*</label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full px-4 py-3 bg-[#241E1B] border border-white/20 text-white focus:outline-none focus:border-(--champagne) font-medium"
                  >
                    <option value="Silver Pass">Silver Pass</option>
                    <option value="Gold STUDD VIP">Gold STUDD VIP</option>
                    <option value="Platinum Elite">Platinum Elite</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-4 bg-(--champagne) text-(--ink) font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors"
              >
                Complete Registration
              </button>

              <p className="text-[10px] text-white/50 text-center leading-tight">
                🔒 100% Confidential. Discretion guaranteed. Male members only.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle size={48} className="text-(--champagne) mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2">Registration Successful!</h3>
            <p className="font-body text-xs text-white/80 leading-relaxed mb-6">
              Welcome to <strong>The STUDD CLUB</strong>, {formData.name}. Our VIP Concierge Manager will contact you on <strong>{formData.phone}</strong> shortly to complete your membership activation.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-(--champagne) text-(--ink) font-bold tracking-widest uppercase hover:bg-white transition-colors"
            >
              Back to Profiles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
