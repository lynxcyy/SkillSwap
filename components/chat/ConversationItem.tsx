"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Conversation {
  id: string;
  mentorName: string;
  mentorDepartment: string;
  mentorAvatarUrl?: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: (conversation: Conversation) => void;
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

function formatRelativeTime(dateString: string) {
  const now = new Date();
  const target = new Date(dateString);
  const diffMs = now.getTime() - target.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "Baru saja";
  if (diffMinutes < 60) return `${diffMinutes} menit lalu`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} jam lalu`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} hari lalu`;

  return target.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

function truncateMessage(message: string, maxLength = 50) {
  if (message.length <= maxLength) return message;
  return `${message.slice(0, maxLength).trimEnd()}...`;
}

export function ConversationItem({
  conversation,
  isActive,
  onClick,
}: ConversationItemProps) {
  const hasUnread = conversation.unreadCount > 0;

  return (
    <button
      type="button"
      onClick={() => onClick(conversation)}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
        isActive
          ? "bg-accent"
          : "hover:bg-accent/60"
      )}
    >
      <div className="relative shrink-0">
        <Avatar className="h-11 w-11">
          <AvatarImage
            src={conversation.mentorAvatarUrl}
            alt={conversation.mentorName}
          />
          <AvatarFallback className={getAvatarColorClass(conversation.mentorName)}>
            {getInitials(conversation.mentorName)}
          </AvatarFallback>
        </Avatar>
        {conversation.isOnline && (
          <span
            aria-label="Online"
            className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-success"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "truncate text-sm",
              hasUnread ? "font-semibold text-foreground" : "font-medium text-foreground"
            )}
          >
            {conversation.mentorName}
          </p>
          <span className="shrink-0 text-2xs text-muted-foreground">
            {formatRelativeTime(conversation.lastMessageAt)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "truncate text-xs",
              hasUnread ? "font-medium text-foreground/80" : "text-muted-foreground"
            )}
          >
            {truncateMessage(conversation.lastMessage)}
          </p>
          {hasUnread && (
            <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-2xs font-medium text-primary-foreground">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}