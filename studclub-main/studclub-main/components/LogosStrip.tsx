import React from "react";

export function LogosStrip() {
  return (
    <div className="bg-(--champagne-soft) border-y border-(--champagne-deep)/20 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap items-center justify-center gap-x-16 gap-y-4">
        {["Logo Ipsum", "Logo Ipsum", "Logo Ipsum", "Logo Ipsum", "Logo Ipsum"].map((l, i) => (
          <span key={i} className="font-display text-lg text-(--ink) font-bold tracking-wider opacity-75 uppercase">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
