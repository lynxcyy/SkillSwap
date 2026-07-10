"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Skill, SkillLevel } from "@/components/profile/SkillList";

export interface SkillCategoryOption {
  id: string;
  name: string;
  iconEmoji?: string;
}

export interface SkillFormValues {
  id?: string;
  name: string;
  categoryId: string;
  level: SkillLevel;
  description: string;
}

interface AddSkillModalProps {
  open: boolean;
  categories: SkillCategoryOption[];
  skill?: Skill | null;
  onClose: () => void;
  onSave: (values: SkillFormValues) => void;
}

const NAME_MAX = 100;
const DESCRIPTION_MAX = 500;

const levelOptions: { value: SkillLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

interface FormErrors {
  name?: string;
  categoryId?: string;
  description?: string;
}

const selectClassName = cn(
  "flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm transition-colors",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

export function AddSkillModal({
  open,
  categories,
  skill,
  onClose,
  onSave,
}: AddSkillModalProps) {
  const isEditMode = Boolean(skill);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [level, setLevel] = useState<SkillLevel>("beginner");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!open) return;
    setName(skill?.name ?? "");
    setCategoryId(skill?.categoryId ?? categories[0]?.id ?? "");
    setLevel(skill?.level ?? "beginner");
    setDescription(skill?.description ?? "");
    setErrors({});
  }, [open, skill, categories]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = "Nama skill wajib diisi";
    } else if (name.length > NAME_MAX) {
      nextErrors.name = `Nama skill maksimum ${NAME_MAX} karakter`;
    }
    if (!categoryId) {
      nextErrors.categoryId = "Kategori wajib dipilih";
    }
    if (description.length > DESCRIPTION_MAX) {
      nextErrors.description = `Deskripsi maksimum ${DESCRIPTION_MAX} karakter`;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    onSave({
      id: skill?.id,
      name: name.trim(),
      categoryId,
      level,
      description: description.trim(),
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-skill-title"
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border border-border bg-card shadow-dropdown"
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2
            id="add-skill-title"
            className="text-md font-semibold text-foreground"
          >
            {isEditMode ? "Edit Skill" : "Tambah Skill"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-5">
            <div className="space-y-1.5">
              <Label htmlFor="skill-name">Nama Skill</Label>
              <Input
                id="skill-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Contoh: React.js"
                maxLength={NAME_MAX}
              />
              {errors.name && (
                <p className="text-2xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="skill-category">Kategori</Label>
              <select
                id="skill-category"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                className={selectClassName}
              >
                <option value="" disabled>
                  Pilih kategori
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.iconEmoji ? `${category.iconEmoji} ` : ""}
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-2xs text-destructive">
                  {errors.categoryId}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="skill-level">Level</Label>
              <select
                id="skill-level"
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as SkillLevel)
                }
                className={selectClassName}
              >
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="skill-description">Deskripsi</Label>
                <span className="text-2xs text-muted-foreground">
                  {description.length}/{DESCRIPTION_MAX}
                </span>
              </div>
              <Textarea
                id="skill-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Jelaskan apa yang bisa kamu ajarkan..."
                maxLength={DESCRIPTION_MAX}
                rows={4}
              />
              {errors.description && (
                <p className="text-2xs text-destructive">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-border p-5">
            <Button type="button" variant="ghost" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {isEditMode ? "Simpan Perubahan" : "Tambah Skill"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}