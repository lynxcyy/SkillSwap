"use client";

import { ArrowLeft, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  mentorName: string;
  mentorDepartment: string;
  mentorAvatarUrl?: string;
  isOnline?: boolean;
  onBack?: () => void;
  onMoreClick?: () => void;
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

export function ChatHeader({
  mentorName,
  mentorDepartment,
  mentorAvatarUrl,
  isOnline = false,
  onBack,
  onMoreClick,
  className,
}: ChatHeaderProps) {
  return (
    <div
      className={cn(
        "flex h-14 items-center gap-2 border-b border-border px-4",
        className
      )}
    >
      {onBack && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          aria-label="Kembali"
          className="shrink-0 lg:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}

      <div className="relative shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={mentorAvatarUrl} alt={mentorName} />
          <AvatarFallback className={getAvatarColorClass(mentorName)}>
            {getInitials(mentorName)}
          </AvatarFallback>
        </Avatar>
        {isOnline && (
          <span
            aria-label="Online"
            className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-success"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {mentorName}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {isOnline ? "Online" : mentorDepartment}
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onMoreClick}
        aria-label="Menu lainnya"
        className="shrink-0 text-muted-foreground hover:text-foreground"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  );
}