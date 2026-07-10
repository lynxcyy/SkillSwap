// components/reviews/RatingStars.tsx
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap: Record<NonNullable<RatingStarsProps["size"]>, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function RatingStars({
  value,
  onChange,
  readOnly = false,
  size = "md",
  className,
}: RatingStarsProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const isInteractive = !readOnly && Boolean(onChange);
  const displayValue = hoverValue ?? value;
  const starClass = sizeMap[size];

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role={isInteractive ? "radiogroup" : undefined}
      aria-label={isInteractive ? "Rating bintang" : `Rating ${value} dari 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= displayValue;
        if (!isInteractive) {
          return (
            <Star
              key={star}
              className={cn(
                starClass,
                isFilled ? "fill-star text-star" : "text-border"
              )}
            />
          );
        }
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === value}
            aria-label={`${star} bintang`}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(null)}
            onClick={() => onChange?.(star)}
            className="rounded-sm p-0.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <Star
              className={cn(
                starClass,
                isFilled ? "fill-star text-star" : "text-border"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}