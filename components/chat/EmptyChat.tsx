"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyChatProps {
  title?: string;
  description?: string;
  className?: string;
}

export function EmptyChat({
  title = "Belum ada percakapan dipilih",
  description = "Pilih salah satu percakapan di sebelah kiri, atau mulai sesi belajar baru untuk membuka ruang chat dengan mentor kamu.",
  className,
}: EmptyChatProps) {
  return (
    <div
      className={cn(
        "flex h-[560px] flex-col items-center justify-center gap-4 p-6 text-center",
        className
      )}
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-primary">
        <MessageCircle className="h-10 w-10" strokeWidth={1.5} />
      </span>
      <div className="max-w-xs space-y-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}