import React from "react";

interface EyebrowProps {
  no: string;
  label: string;
  dark?: boolean;
}

export function Eyebrow({ no, label, dark = false }: EyebrowProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase px-4 py-2 w-fit ${dark ? "bg-white/10 text-(--champagne-soft)" : "bg-white/70 text-(--oxblood)"
        }`}
      style={!dark ? { boxShadow: "0 6px 16px -8px rgba(138,46,46,0.25)" } : {}}
    >
      <span className="font-display font-medium text-sm">{no}</span>
      <span className="w-6 h-px bg-current opacity-50" />
      <span>{label}</span>
    </div>
  );
}
