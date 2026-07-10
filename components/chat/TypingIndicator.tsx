"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  mentorName?: string;
  mentorAvatarUrl?: string;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getAvatarColorClass(name: string) {
  const tints = [
    "bg-accent text-accent-foreground",
    "bg-warning/15 text-warning",
    "bg-success/15 text-success",
    "bg-destructive/15 text-destructive",
  ];
  const index = (name.charCodeAt(0) || 0) % tints.length;
  return tints[index];
}

export function TypingIndicator({
  mentorName,
  mentorAvatarUrl,
  className,
}: TypingIndicatorProps) {
  return (
    <div className={cn("flex items-end gap-2", className)}>
      {mentorName && (
        <Avatar className="h-6 w-6 shrink-0">
          <AvatarImage src={mentorAvatarUrl} alt={mentorName} />
          <AvatarFallback
            className={cn("text-2xs", getAvatarColorClass(mentorName))}
          >
            {getInitials(mentorName)}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex items-center gap-1 rounded-lg rounded-bl-sm bg-accent px-3 py-2.5">
        <span
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}