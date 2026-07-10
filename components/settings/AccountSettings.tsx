// components/settings/AccountSettings.tsx
"use client";

import { useState } from "react";
import { KeyRound, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AccountSettingsValues {
  email: string;
}

interface AccountSettingsProps {
  initialValues: AccountSettingsValues;
  onSaveEmail: (email: string) => void;
  onChangePassword: (values: {
    currentPassword: string;
    newPassword: string;
  }) => void;
}

interface EmailErrors {
  email?: string;
}

interface PasswordErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AccountSettings({
  initialValues,
  onSaveEmail,
  onChangePassword,
}: AccountSettingsProps) {
  const [email, setEmail] = useState(initialValues.email);
  const [emailErrors, setEmailErrors] = useState<EmailErrors>({});
  const [emailSaved, setEmailSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
  const [passwordSaved, setPasswordSaved] = useState(false);

  function handleEmailSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: EmailErrors = {};
    if (!email.trim()) {
      nextErrors.email = "Email wajib diisi";
    } else if (!EMAIL_REGEX.test(email)) {
      nextErrors.email = "Format email tidak valid";
    }
    setEmailErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSaveEmail(email.trim());
    setEmailSaved(true);
    setTimeout(() => setEmailSaved(false), 2000);
  }

  function handlePasswordSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: PasswordErrors = {};
    if (!currentPassword) {
      nextErrors.currentPassword = "Password saat ini wajib diisi";
    }
    if (!newPassword) {
      nextErrors.newPassword = "Password baru wajib diisi";
    } else if (newPassword.length < 8) {
      nextErrors.newPassword = "Password baru minimum 8 karakter";
    }
    if (confirmPassword !== newPassword) {
      nextErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }
    setPasswordErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onChangePassword({ currentPassword, newPassword });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-card">
        <CardHeader className="p-5">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-md font-semibold text-foreground">Email</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Email digunakan untuk login dan notifikasi
          </p>
        </CardHeader>
        <form onSubmit={handleEmailSubmit}>
          <CardContent className="space-y-1.5 p-5 pt-0">
            <Label htmlFor="settings-email">Alamat Email</Label>
            <Input
              id="settings-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nama@kampus.ac.id"
            />
            {emailErrors.email && (
              <p className="text-2xs text-destructive">{emailErrors.email}</p>
            )}
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-2 p-5 pt-0">
            {emailSaved && (
              <span className="text-2xs text-success">Email diperbarui</span>
            )}
            <Button type="submit">Simpan Email</Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="p-5">
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-md font-semibold text-foreground">
              Ubah Password
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Gunakan password yang kuat dan tidak digunakan di tempat lain
          </p>
        </CardHeader>
        <form onSubmit={handlePasswordSubmit}>
          <CardContent className="space-y-4 p-5 pt-0">
            <div className="space-y-1.5">
              <Label htmlFor="current-password">Password Saat Ini</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
              {passwordErrors.currentPassword && (
                <p className="text-2xs text-destructive">
                  {passwordErrors.currentPassword}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-password">Password Baru</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              {passwordErrors.newPassword && (
                <p className="text-2xs text-destructive">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-2xs text-destructive">
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-2 p-5 pt-0">
            {passwordSaved && (
              <span className="text-2xs text-success">Password diperbarui</span>
            )}
            <Button type="submit">Ubah Password</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}