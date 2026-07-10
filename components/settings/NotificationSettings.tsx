// components/settings/NotificationSettings.tsx
"use client";

import { useState } from "react";
import { Bell, Mail } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface NotificationSettingsValues {
  pushNewRequest: boolean;
  pushRequestUpdate: boolean;
  pushNewMessage: boolean;
  emailNewRequest: boolean;
  emailWeeklySummary: boolean;
}

interface NotificationSettingsProps {
  initialValues: NotificationSettingsValues;
  onChange: (values: NotificationSettingsValues) => void;
}

interface ToggleRowProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          checked ? "bg-primary" : "bg-border"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-card transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}

export function NotificationSettings({
  initialValues,
  onChange,
}: NotificationSettingsProps) {
  const [values, setValues] = useState(initialValues);

  function update<K extends keyof NotificationSettingsValues>(
    key: K,
    value: NotificationSettingsValues[K]
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
            <Bell className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-md font-semibold text-foreground">
              Push Notification
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Notifikasi yang muncul langsung di perangkat kamu
          </p>
        </CardHeader>
        <CardContent className="divide-y divide-border p-5 pt-0">
          <ToggleRow
            id="push-new-request"
            label="Request Baru"
            description="Saat ada learning request baru masuk ke kamu"
            checked={values.pushNewRequest}
            onCheckedChange={(checked) => update("pushNewRequest", checked)}
          />
          <ToggleRow
            id="push-request-update"
            label="Update Status Request"
            description="Saat request kamu diterima, ditolak, atau selesai"
            checked={values.pushRequestUpdate}
            onCheckedChange={(checked) => update("pushRequestUpdate", checked)}
          />
          <ToggleRow
            id="push-new-message"
            label="Pesan Baru"
            description="Saat ada pesan chat baru dari mentor atau learner"
            checked={values.pushNewMessage}
            onCheckedChange={(checked) => update("pushNewMessage", checked)}
          />
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="p-5">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-md font-semibold text-foreground">
              Email Notification
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Notifikasi yang dikirim ke alamat email kamu
          </p>
        </CardHeader>
        <CardContent className="divide-y divide-border p-5 pt-0">
          <ToggleRow
            id="email-new-request"
            label="Request Baru"
            description="Kirim email saat ada learning request baru"
            checked={values.emailNewRequest}
            onCheckedChange={(checked) => update("emailNewRequest", checked)}
          />
          <ToggleRow
            id="email-weekly-summary"
            label="Ringkasan Mingguan"
            description="Ringkasan aktivitas dan statistik profil setiap minggu"
            checked={values.emailWeeklySummary}
            onCheckedChange={(checked) => update("emailWeeklySummary", checked)}
          />
        </CardContent>
      </Card>
    </div>
  );
}