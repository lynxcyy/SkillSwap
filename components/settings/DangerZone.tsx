// components/settings/DangerZone.tsx
"use client";

import { useState } from "react";
import { AlertTriangle, LogOut, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DangerZoneProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
}

const CONFIRM_PHRASE = "HAPUS AKUN";

export function DangerZone({ onLogout, onDeleteAccount }: DangerZoneProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | undefined>();

  const canConfirmDelete = confirmText.trim() === CONFIRM_PHRASE;

  function openDialog() {
    setConfirmText("");
    setError(undefined);
    setIsDeleteDialogOpen(true);
  }

  function closeDialog() {
    setIsDeleteDialogOpen(false);
    setConfirmText("");
    setError(undefined);
  }

  function handleConfirmDelete() {
    if (!canConfirmDelete) {
      setError(`Ketik "${CONFIRM_PHRASE}" untuk konfirmasi`);
      return;
    }
    onDeleteAccount();
    closeDialog();
  }

  return (
    <>
      <Card className="border-destructive/30 shadow-card">
        <CardHeader className="p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <h2 className="text-md font-semibold text-foreground">
              Danger Zone
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Tindakan di bawah ini bersifat sensitif, lakukan dengan hati-hati
          </p>
        </CardHeader>
        <CardContent className="space-y-3 p-5 pt-0">
          <div className="flex items-center justify-between gap-4 rounded-md border border-border p-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                Keluar dari Akun
              </p>
              <p className="text-xs text-muted-foreground">
                Kamu akan diarahkan ke halaman login
              </p>
            </div>
            <Button type="button" variant="outline" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-md border border-destructive/30 bg-destructive/5 p-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-destructive">
                Hapus Akun Secara Permanen
              </p>
              <p className="text-xs text-muted-foreground">
                Semua data profil, skill, request, dan riwayat chat akan dihapus
                dan tidak dapat dikembalikan
              </p>
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={openDialog}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
              Hapus Akun
            </Button>
          </div>
        </CardContent>
      </Card>

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={closeDialog}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            className="relative w-full max-w-md rounded-lg border border-border bg-card shadow-dropdown"
          >
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2
                id="delete-account-title"
                className="flex items-center gap-2 text-md font-semibold text-destructive"
              >
                <AlertTriangle className="h-4 w-4" />
                Hapus Akun
              </h2>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Tutup"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <p className="text-sm text-foreground/80">
                Tindakan ini tidak dapat dibatalkan. Semua data akunmu termasuk
                profil, skill, learning request, chat, dan review akan dihapus
                secara permanen.
              </p>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-delete">
                  Ketik <span className="font-semibold">{CONFIRM_PHRASE}</span>{" "}
                  untuk konfirmasi
                </Label>
                <Input
                  id="confirm-delete"
                  value={confirmText}
                  onChange={(event) => {
                    setConfirmText(event.target.value);
                    setError(undefined);
                  }}
                  placeholder={CONFIRM_PHRASE}
                />
                {error && (
                  <p className="text-2xs text-destructive">{error}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border p-5">
              <Button type="button" variant="ghost" onClick={closeDialog}>
                Batal
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={!canConfirmDelete}
              >
                <Trash2 className="h-4 w-4" />
                Hapus Akun Permanen
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}