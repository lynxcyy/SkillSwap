// components/settings/PrivacySettings.tsx
"use client";

import { useState } from "react";
import { Eye, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type ProfileVisibility = "public" | "students_only" | "private";
export type RequestPreference = "everyone" | "same_department" | "none";

export interface PrivacySettingsValues {
  profileVisibility: ProfileVisibility;
  requestPreference: RequestPreference;
}

interface PrivacySettingsProps {
  initialValues: PrivacySettingsValues;
  onChange: (values: PrivacySettingsValues) => void;
}

const visibilityOptions: { value: ProfileVisibility; label: string; description: string }[] = [
  {
    value: "public",
    label: "Publik",
    description: "Semua orang, termasuk yang belum login, dapat melihat profilmu",
  },
  {
    value: "students_only",
    label: "Mahasiswa Terdaftar",
    description: "Hanya pengguna yang sudah login yang dapat melihat profilmu",
  },
  {
    value: "private",
    label: "Privat",
    description: "Profil disembunyikan dari Explore dan pencarian",
  },
];

const requestOptions: { value: RequestPreference; label: string; description: string }[] = [
  {
    value: "everyone",
    label: "Semua Mahasiswa",
    description: "Siapa pun dapat mengirimkan learning request kepadamu",
  },
  {
    value: "same_department",
    label: "Satu Jurusan Saja",
    description: "Hanya mahasiswa dari jurusan yang sama yang dapat mengirim request",
  },
  {
    value: "none",
    label: "Tutup Sementara",
    description: "Tidak menerima learning request baru untuk saat ini",
  },
];

interface OptionListProps<T extends string> {
  name: string;
  options: { value: T; label: string; description: string }[];
  value: T;
  onChange: (value: T) => void;
}

function OptionList<T extends string>({
  name,
  options,
  value,
  onChange,
}: OptionListProps<T>) {
  return (
    <div className="space-y-2">
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={cn(
              "flex w-full items-start gap-3 rounded-md border p-3 text-left transition-colors",
              isActive
                ? "border-primary bg-accent"
                : "border-border bg-card hover:bg-accent/60"
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                isActive ? "border-primary" : "border-border"
              )}
            >
              {isActive && (
                <span className="h-2 w-2 rounded-full bg-primary" />
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-foreground">
                {option.label}
              </span>
              <span className="block text-xs text-muted-foreground">
                {option.description}
              </span>
            </span>
          </button>
        );
      })}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}

export function PrivacySettings({
  initialValues,
  onChange,
}: PrivacySettingsProps) {
  const [values, setValues] = useState(initialValues);

  function update<K extends keyof PrivacySettingsValues>(
    key: K,
    value: PrivacySettingsValues[K]
  ) {
    const next = { ...values, [key]: value };
    setValues(next);
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-card">
        <CardHeader className="p-5">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-md font-semibold text-foreground">
              Visibilitas Profil
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Atur siapa saja yang dapat melihat profil dan skill kamu
          </p>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <Label className="sr-only">Visibilitas Profil</Label>
          <OptionList
            name="profileVisibility"
            options={visibilityOptions}
            value={values.profileVisibility}
            onChange={(value) => update("profileVisibility", value)}
          />
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-md font-semibold text-foreground">
              Preferensi Learning Request
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Atur siapa yang dapat mengirimkan learning request kepadamu
          </p>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <Label className="sr-only">Preferensi Learning Request</Label>
          <OptionList
            name="requestPreference"
            options={requestOptions}
            value={values.requestPreference}
            onChange={(value) => update("requestPreference", value)}
          />
        </CardContent>
      </Card>
    </div>
  );
}