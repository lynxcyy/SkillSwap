"use client";

import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  name: string;
  department: string;
  bio?: string;
  avatarUrl?: string;
  onEditProfile: () => void;
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

export function ProfileHeader({
  name,
  department,
  bio,
  avatarUrl,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <Card className="shadow-card">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar className="h-16 w-16 shrink-0">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback
              className={cn("text-lg", getAvatarColorClass(name))}
            >
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold text-foreground">
              {name}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              {department}
            </p>
            {bio && (
              <p className="mt-1 line-clamp-2 max-w-md text-sm text-foreground/80">
                {bio}
              </p>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={onEditProfile}
          className="shrink-0"
        >
          <Pencil className="h-4 w-4" />
          Edit Profil
        </Button>
      </CardContent>
    </Card>
  );
}