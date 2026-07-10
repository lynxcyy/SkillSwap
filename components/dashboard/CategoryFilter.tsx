"use client";

import { cn } from "@/lib/utils";

export interface Category {
  id: string;
  name: string;
  iconEmoji?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategoryId: string | null;
  onChange: (categoryId: string | null) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  activeCategoryId,
  onChange,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto", className)}>
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(
          "shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors",
          activeCategoryId === null
            ? "border-primary bg-accent font-medium text-primary"
            : "border-border text-muted-foreground hover:bg-accent"
        )}
      >
        Semua
      </button>
      {categories.map((category) => {
        const isActive = activeCategoryId === category.id;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors",
              isActive
                ? "border-primary bg-accent font-medium text-primary"
                : "border-border text-muted-foreground hover:bg-accent"
            )}
          >
            {category.iconEmoji ? `${category.iconEmoji} ` : ""}
            {category.name}
          </button>
        );
      })}
    </div>
  );
}