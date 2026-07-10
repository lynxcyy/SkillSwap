"use client";
 
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SkillCard } from "@/components/profile/SkillCard";
 
export type SkillLevel = "beginner" | "intermediate" | "advanced";
 
export interface Skill {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  level: SkillLevel;
  description: string;
  hasActiveRequest?: boolean;
}
 
interface SkillListProps {
  skills: Skill[];
  maxSkills?: number;
  onAddSkill: () => void;
  onEditSkill: (skill: Skill) => void;
  onDeleteSkill: (skill: Skill) => void;
}
 
export function SkillList({
  skills,
  maxSkills = 10,
  onAddSkill,
  onEditSkill,
  onDeleteSkill,
}: SkillListProps) {
  const isAtLimit = skills.length >= maxSkills;
 
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-md font-semibold text-foreground">Skill Saya</h2>
          <p className="text-xs text-muted-foreground">
            {skills.length}/{maxSkills} skill aktif
          </p>
        </div>
        <Button onClick={onAddSkill} disabled={isAtLimit}>
          <Plus className="h-4 w-4" />
          Tambah Skill
        </Button>
      </div>
 
      {skills.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
              <Sparkles className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                Belum ada skill yang ditambahkan
              </p>
              <p className="text-xs text-muted-foreground">
                Tambahkan skill yang kamu kuasai agar mahasiswa lain dapat
                menemukanmu
              </p>
            </div>
            <Button onClick={onAddSkill}>
              <Plus className="h-4 w-4" />
              Tambah Skill Pertama
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onEdit={onEditSkill}
              onDelete={onDeleteSkill}
            />
          ))}
        </div>
      )}
 
      {isAtLimit && (
        <p className="text-xs text-warning">
          Batas maksimum {maxSkills} skill aktif telah tercapai.
        </p>
      )}
    </section>
  );
}