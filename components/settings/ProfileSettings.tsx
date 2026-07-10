// components/settings/ProfileSettings.tsx
"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface ProfileSettingsValues {
  fullName: string;
  bio: string;
  avatarUrl?: string;
}

interface ProfileSettingsProps {
  initialValues: ProfileSettingsValues;
  onSave: (values: ProfileSettingsValues) => void;
}

const BIO_MAX = 300;
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

interface FormErrors {
  fullName?: string;
  bio?: string;
  avatar?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ProfileSettings({
  initialValues,
  onSave,
}: ProfileSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(initialValues.fullName);
  const [bio, setBio] = useState(initialValues.bio);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    initialValues.avatarUrl
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaved, setIsSaved] = useState(false);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Format harus PNG, JPG, atau WEBP",
      }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Foto melebihi ukuran maksimum 2MB",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, avatar: undefined }));
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!fullName.trim()) nextErrors.fullName = "Nama lengkap wajib diisi";
    if (bio.length > BIO_MAX) nextErrors.bio = `Bio maksimum ${BIO_MAX} karakter`;
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return !nextErrors.fullName && !nextErrors.bio;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    onSave({ fullName: fullName.trim(), bio: bio.trim(), avatarUrl: avatarPreview });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  }

  return (
    <Card className="shadow-card">
      <CardHeader className="p-5">
        <h2 className="text-md font-semibold text-foreground">Profil</h2>
        <p className="text-xs text-muted-foreground">
          Kelola informasi profil yang tampil ke pengguna lain
        </p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 p-5 pt-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src={avatarPreview} alt={fullName} />
                <AvatarFallback className="bg-accent text-lg text-accent-foreground">
                  {getInitials(fullName || "?")}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Ubah foto profil"
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-foreground/70 shadow-card hover:bg-accent"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Foto Profil</p>
              <p className="text-2xs text-muted-foreground">
                PNG, JPG, atau WEBP. Maks 2MB.
              </p>
              {errors.avatar && (
                <p className="text-2xs text-destructive">{errors.avatar}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="settings-name">Nama Lengkap</Label>
            <Input
              id="settings-name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Nama lengkap kamu"
            />
            {errors.fullName && (
              <p className="text-2xs text-destructive">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="settings-bio">Bio</Label>
              <span className="text-2xs text-muted-foreground">
                {bio.length}/{BIO_MAX}
              </span>
            </div>
            <Textarea
              id="settings-bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Ceritakan sedikit tentang dirimu..."
              maxLength={BIO_MAX}
              rows={4}
            />
            {errors.bio && (
              <p className="text-2xs text-destructive">{errors.bio}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2 p-5 pt-0">
          {isSaved && (
            <span className="text-2xs text-success">Perubahan disimpan</span>
          )}
          <Button type="submit">Simpan Perubahan</Button>
        </CardFooter>
      </form>
    </Card>
  );
}