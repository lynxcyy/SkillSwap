import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes intelligently, resolving conflicts
 * (e.g. "p-2 p-4" → "p-4"). Used by every shadcn/ui component
 * and every feature component across dashboard, profile, explore,
 * request, chat, reviews, and settings.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}