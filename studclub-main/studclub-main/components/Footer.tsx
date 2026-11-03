import React from "react";
import { CITIES } from "@/constants/data";

export function Footer() {
  return (
    <footer className="text-white pt-20 pb-8 border-t border-white/10" style={{ background: "linear-gradient(160deg, #14100E 0%, #0A0807 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="font-display text-3xl md:text-4xl leading-tight font-bold">
            The STUDD CLUB — Premier Male Executive Society
          </h2>
          <p className="font-body text-xs text-white/60 mt-3 leading-relaxed">
            Exclusive male member registration, verified female companion profiles, and doorstep wellness services across all major Indian cities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 pb-14 border-b border-white/10">
          <div>
            <div className="font-display text-2xl mb-4 font-bold">
              The STUDD CLUB<span className="text-(--oxblood)">.</span>
            </div>
            <p className="font-body text-xs text-white/60 leading-relaxed">
              India's #1 discreet male executive club providing verified companion &amp; massage services in Mumbai, Delhi NCR, Bengaluru &amp; 10+ cities.
            </p>
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-wider text-(--champagne-soft) mb-4 font-semibold">Female Categories</p>
            <ul className="font-body text-xs text-white/70 space-y-2.5">
              <li>High Profile Females</li>
              <li>Housewives</li>
              <li>Widows</li>
              <li>Single Parent Women</li>
              <li>Working Women</li>
              <li>Single Working Girls</li>
            </ul>
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-wider text-(--champagne-soft) mb-4 font-semibold">Our Services</p>
            <ul className="font-body text-xs text-white/70 space-y-2.5">
              <li>Massage Services</li>
              <li>Complete Services</li>
              <li>Outdoor &amp; Travel Companion</li>
              <li>Doorstep &amp; In-Room Visit</li>
            </ul>
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-wider text-(--champagne-soft) mb-4 font-semibold">Major Cities Covered</p>
            <div className="flex flex-wrap gap-1 font-body text-[11px] text-white/70">
              {CITIES.filter((c) => c !== "All Cities").map((city) => (
                <span key={city} className="bg-white/10 px-2 py-1">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-body text-xs text-white/50">
            © {new Date().getFullYear()} The STUDD CLUB. All rights reserved. Exclusively for adult male members.
          </p>
          <div className="flex gap-5 font-body text-xs text-white/60 uppercase tracking-wider">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Discretion Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
