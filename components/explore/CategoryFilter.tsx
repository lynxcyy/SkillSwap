"use client";

import { cn } from "@/lib/utils";

export interface CategoryFilterOption {
  id: string;
  name: string;
  iconEmoji?: string;
}

interface CategoryFilterProps {
  categories: CategoryFilterOption[];
  activeCategoryId: string;
  onChange: (categoryId: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  activeCategoryId,
  onChange,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      {categories.map((category) => {
        const isActive = category.id === activeCategoryId;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors",
              isActive
                ? "border-primary bg-accent font-medium text-primary"
                : "border-border bg-card text-foreground/70 hover:bg-accent hover:text-foreground"
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