"use client";

import { useEffect, useMemo, useState } from "react";
import { Laptop, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type LearningMode = "online" | "offline";

export interface RequestMentorOption {
  id: string;
  name: string;
  department: string;
}

export interface RequestSkillOption {
  id: string;
  mentorId: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced";
}

export interface RequestFormValues {
  mentorId: string;
  skillId: string;
  mode: LearningMode;
  preferredDate: string;
  preferredTime: string;
  location: string;
  message: string;
}

interface RequestFormProps {
  mentors: RequestMentorOption[];
  skills: RequestSkillOption[];
  defaultMentorId?: string;
  defaultSkillId?: string;
  onSubmit: (values: RequestFormValues) => void;
}

const MESSAGE_MAX = 500;

interface FormErrors {
  mentorId?: string;
  skillId?: string;
  preferredDate?: string;
  preferredTime?: string;
  location?: string;
  message?: string;
}

const selectClassName = cn(
  "flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm transition-colors",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

function todayISODate() {
  return new Date().toISOString().split("T")[0];
}

export function RequestForm({
  mentors,
  skills,
  defaultMentorId,
  defaultSkillId,
  onSubmit,
}: RequestFormProps) {
  const [mentorId, setMentorId] = useState(defaultMentorId ?? "");
  const [skillId, setSkillId] = useState(defaultSkillId ?? "");
  const [mode, setMode] = useState<LearningMode>("online");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSkills = useMemo(
    () => skills.filter((skill) => skill.mentorId === mentorId),
    [skills, mentorId]
  );

  useEffect(() => {
    if (!availableSkills.some((skill) => skill.id === skillId)) {
      setSkillId(availableSkills[0]?.id ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentorId]);

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (!mentorId) nextErrors.mentorId = "Mentor wajib dipilih";
    if (!skillId) nextErrors.skillId = "Skill wajib dipilih";
    if (!preferredDate) {
      nextErrors.preferredDate = "Tanggal wajib diisi";
    } else if (preferredDate < todayISODate()) {
      nextErrors.preferredDate = "Tanggal tidak boleh di masa lalu";
    }
    if (!preferredTime) nextErrors.preferredTime = "Waktu wajib diisi";
    if (mode === "offline" && !location.trim()) {
      nextErrors.location = "Lokasi wajib diisi untuk sesi offline";
    }
    if (message.length > MESSAGE_MAX) {
      nextErrors.message = `Pesan maksimum ${MESSAGE_MAX} karakter`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      onSubmit({
        mentorId,
        skillId,
        mode,
        preferredDate,
        preferredTime,
        location: mode === "offline" ? location.trim() : "",
        message: message.trim(),
      });
      setMentorId("");
      setSkillId("");
      setMode("online");
      setPreferredDate("");
      setPreferredTime("");
      setLocation("");
      setMessage("");
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="request-mentor">Pilih Mentor</Label>
        <select
          id="request-mentor"
          value={mentorId}
          onChange={(event) => setMentorId(event.target.value)}
          className={selectClassName}
        >
          <option value="" disabled>
            Pilih mentor
          </option>
          {mentors.map((mentor) => (
            <option key={mentor.id} value={mentor.id}>
              {mentor.name} — {mentor.department}
            </option>
          ))}
        </select>
        {errors.mentorId && (
          <p className="text-2xs text-destructive">{errors.mentorId}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="request-skill">Skill yang Dipilih</Label>
        <select
          id="request-skill"
          value={skillId}
          onChange={(event) => setSkillId(event.target.value)}
          disabled={!mentorId}
          className={selectClassName}
        >
          <option value="" disabled>
            {mentorId ? "Pilih skill" : "Pilih mentor terlebih dahulu"}
          </option>
          {availableSkills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
        {errors.skillId && (
          <p className="text-2xs text-destructive">{errors.skillId}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Mode Belajar</Label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("online")}
            className={cn(
              "flex h-9 items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors",
              mode === "online"
                ? "border-primary bg-accent text-primary"
                : "border-input bg-background text-foreground/70 hover:bg-accent"
            )}
          >
            <Laptop className="h-4 w-4" />
            Online
          </button>
          <button
            type="button"
            onClick={() => setMode("offline")}
            className={cn(
              "flex h-9 items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors",
              mode === "offline"
                ? "border-primary bg-accent text-primary"
                : "border-input bg-background text-foreground/70 hover:bg-accent"
            )}
          >
            <MapPin className="h-4 w-4" />
            Offline
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="request-date">Tanggal Usulan</Label>
          <Input
            id="request-date"
            type="date"
            min={todayISODate()}
            value={preferredDate}
            onChange={(event) => setPreferredDate(event.target.value)}
          />
          {errors.preferredDate && (
            <p className="text-2xs text-destructive">
              {errors.preferredDate}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="request-time">Waktu Usulan</Label>
          <Input
            id="request-time"
            type="time"
            value={preferredTime}
            onChange={(event) => setPreferredTime(event.target.value)}
          />
          {errors.preferredTime && (
            <p className="text-2xs text-destructive">
              {errors.preferredTime}
            </p>
          )}
        </div>
      </div>

      {mode === "offline" && (
        <div className="space-y-1.5">
          <Label htmlFor="request-location">Lokasi</Label>
          <Input
            id="request-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Contoh: Perpustakaan Kampus, Lantai 2"
          />
          {errors.location && (
            <p className="text-2xs text-destructive">{errors.location}</p>
          )}
        </div>
      )}

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="request-message">Pesan Perkenalan</Label>
          <span className="text-2xs text-muted-foreground">
            {message.length}/{MESSAGE_MAX}
          </span>
        </div>
        <Textarea
          id="request-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Perkenalkan dirimu dan jelaskan apa yang ingin kamu pelajari..."
          maxLength={MESSAGE_MAX}
          rows={4}
        />
        {errors.message && (
          <p className="text-2xs text-destructive">{errors.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        <Send className="h-4 w-4" />
        Kirim Request
      </Button>
    </form>
  );
}