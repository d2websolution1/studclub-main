'use client';

import React, { useState } from "react";
import { Menu, X, ArrowUpRight, Crown, Heart } from "lucide-react";

interface NavbarProps {
  dark?: boolean;
}

export function Navbar({ dark = false }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Women (16)", href: "#women" },
    { name: "Men (12)", href: "#men" },
    { name: "All Directory", href: "#profiles" },
    { name: "Services", href: "#services" },
    { name: "Major Cities", href: "#cities" },
    { name: "VIP Pricing", href: "#pricing" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full ${dark ? "bg-(--ink) text-white" : "bg-(--ivory)/95 backdrop-blur-md text-(--ink)"} border-b border-(--bronze)/15 transition-all shadow-sm`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex flex-col group">
          <span className="font-display text-xl sm:text-2xl font-extrabold tracking-widest uppercase">
            The STUDD CLUB<span className="text-(--oxblood)">.</span>
          </span>
          <span className="font-body text-[9px] tracking-[0.25em] uppercase text-(--ink-soft) font-semibold">
            Premier Indian Companion Society
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-body text-xs tracking-[0.12em] uppercase font-semibold">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="relative py-1 text-(--ink) hover:text-(--oxblood) transition-colors duration-300 group"
            >
              {l.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-(--oxblood) transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 font-body text-xs font-bold tracking-[0.15em] uppercase px-5 py-3 bg-(--oxblood) text-white hover:bg-(--ink) transition-colors duration-300 shadow-md"
          >
            VIP Pricing <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          aria-label="Toggle Menu"
          className="md:hidden p-2 text-(--ink)"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-(--bronze)/15 bg-(--ivory-deep) px-6 py-6 flex flex-col gap-4 font-body text-xs uppercase tracking-widest shadow-xl">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-1 text-(--ink) hover:text-(--oxblood) font-bold"
            >
              {l.name}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="mt-2 text-center font-body text-xs font-bold tracking-[0.18em] uppercase px-6 py-3.5 bg-(--oxblood) text-white hover:bg-(--ink) transition-colors"
          >
            Membership Prices
          </a>
        </div>
      )}
    </header>
  );
}
