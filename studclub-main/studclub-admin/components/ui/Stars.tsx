import React from "react";
import { Star } from "lucide-react";

interface StarsProps {
  filled?: number;
}

export function Stars({ filled = 5 }: StarsProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < filled
              ? "fill-(--oxblood) text-(--oxblood)"
              : "text-(--bronze)/30"
          }
        />
      ))}
    </div>
  );
}
