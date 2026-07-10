"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Skill } from "@/components/profile/SkillList";

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
}

function levelBadgeVariant(level: Skill["level"]) {
  if (level === "beginner") return "success" as const;
  if (level === "intermediate") return "warning" as const;
  return "default" as const;
}

function levelLabel(level: Skill["level"]) {
  if (level === "beginner") return "Beginner";
  if (level === "intermediate") return "Intermediate";
  return "Advanced";
}

export function SkillCard({ skill, onEdit, onDelete }: SkillCardProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-start justify-between gap-2 p-5">
        <div className="min-w-0">
          <p className="truncate text-md font-semibold text-foreground">
            {skill.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {skill.categoryName}
          </p>
        </div>
        <Badge variant={levelBadgeVariant(skill.level)}>
          {levelLabel(skill.level)}
        </Badge>
      </CardHeader>

      {skill.description && (
        <CardContent className="p-5 pt-0">
          <p className="line-clamp-2 text-sm text-foreground/80">
            {skill.description}
          </p>
        </CardContent>
      )}

      <CardFooter className="gap-2 p-5 pt-0">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(skill)}
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onDelete(skill)}
          disabled={skill.hasActiveRequest}
          title={
            skill.hasActiveRequest
              ? "Skill tidak dapat dihapus karena memiliki request aktif"
              : undefined
          }
        >
          <Trash2 className="h-3.5 w-3.5" />
          Hapus
        </Button>
      </CardFooter>
    </Card>
  );
}