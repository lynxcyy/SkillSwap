"use client";

import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageBubble, type Message } from "@/components/chat/MessageBubble";
import { MessageInput } from "@/components/chat/MessageInput";

interface ChatWindowProps {
  mentorName?: string;
  mentorDepartment?: string;
  mentorAvatarUrl?: string;
  isOnline?: boolean;
  currentUserId: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onAttach?: () => void;
  onEmojiClick?: () => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getAvatarColorClass(name: string) {
  const tints = [
    "bg-accent text-accent-foreground",
    "bg-warning/15 text-warning",
    "bg-success/15 text-success",
    "bg-destructive/15 text-destructive",
  ];
  const index = (name.charCodeAt(0) || 0) % tints.length;
  return tints[index];
}

export function ChatWindow({
  mentorName,
  mentorDepartment,
  mentorAvatarUrl,
  isOnline = false,
  currentUserId,
  messages,
  onSendMessage,
  onAttach,
  onEmojiClick,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  if (!mentorName) {
    return (
      <div className="flex h-[560px] flex-col items-center justify-center gap-3 p-5 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
          <MessageSquare className="h-6 w-6" />
        </span>
        <div>
          <p className="text-sm font-medium text-foreground">
            Pilih percakapan
          </p>
          <p className="text-xs text-muted-foreground">
            Pilih salah satu percakapan di sebelah kiri untuk mulai chat
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[560px] flex-col">
      <div className="flex items-center gap-3 border-b border-border p-4">
        <div className="relative shrink-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src={mentorAvatarUrl} alt={mentorName} />
            <AvatarFallback className={getAvatarColorClass(mentorName)}>
              {getInitials(mentorName)}
            </AvatarFallback>
          </Avatar>
          {isOnline && (
            <span
              aria-label="Online"
              className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-success"
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {mentorName}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {isOnline ? "Online" : mentorDepartment}
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto p-4"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-foreground">
              Belum ada pesan
            </p>
            <p className="text-xs text-muted-foreground">
              Mulai percakapan dengan mengirim pesan pertama
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === currentUserId}
            />
          ))
        )}
      </div>

      <MessageInput
        onSend={onSendMessage}
        onAttach={onAttach}
        onEmojiClick={onEmojiClick}
        placeholder="Tulis pesan..."
      />
    </div>
  );
}