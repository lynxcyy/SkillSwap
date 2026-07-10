"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface ProfileFormValues {
  fullName: string;
  bio: string;
  avatarUrl?: string;
}

interface EditProfileModalProps {
  open: boolean;
  profile: ProfileFormValues;
  onClose: () => void;
  onSave: (values: ProfileFormValues) => void;
}

const BIO_MAX = 300;
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
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

export function EditProfileModal({
  open,
  profile,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>();
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!open) return;
    setFullName(profile.fullName);
    setBio(profile.bio);
    setAvatarPreview(profile.avatarUrl);
    setErrors({});
  }, [open, profile]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

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
    if (bio.length > BIO_MAX)
      nextErrors.bio = `Bio maksimum ${BIO_MAX} karakter`;
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return !nextErrors.fullName && !nextErrors.bio;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    onSave({
      fullName: fullName.trim(),
      bio: bio.trim(),
      avatarUrl: avatarPreview,
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
        aria-labelledby="edit-profile-title"
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border border-border bg-card shadow-dropdown"
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2
            id="edit-profile-title"
            className="text-md font-semibold text-foreground"
          >
            Edit Profil
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
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Avatar className="h-20 w-20">
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
              {errors.avatar && (
                <p className="text-2xs text-destructive">{errors.avatar}</p>
              )}
              <p className="text-2xs text-muted-foreground">
                PNG, JPG, atau WEBP. Maks 2MB.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Nama Lengkap</Label>
              <Input
                id="profile-name"
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
                <Label htmlFor="profile-bio">Bio</Label>
                <span className="text-2xs text-muted-foreground">
                  {bio.length}/{BIO_MAX}
                </span>
              </div>
              <Textarea
                id="profile-bio"
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
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-border p-5">
            <Button type="button" variant="ghost" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </div>
        </form>
      </div>
    </div>
  );
}