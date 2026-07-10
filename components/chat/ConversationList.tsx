"use client";

import { MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ConversationItem,
  type Conversation,
} from "@/components/chat/ConversationItem";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelect: (conversation: Conversation) => void;
}

export function ConversationList({
  conversations,
  activeConversationId,
  onSelect,
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <Card className="shadow-card">
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
            <MessageSquare className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">
              Belum ada percakapan
            </p>
            <p className="text-xs text-muted-foreground">
              Percakapan akan muncul setelah request kamu diterima
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === activeConversationId}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}