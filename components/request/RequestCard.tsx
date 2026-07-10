"use client";

import { Clock, Laptop, MapPin, MessageSquare, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { LearningMode } from "@/components/request/RequestForm";

export type RequestStatus = "pending" | "accepted" | "rejected" | "done";

export interface LearningRequest {
  id: string;
  mentorName: string;
  mentorDepartment: string;
  mentorAvatarUrl?: string;
  skillName: string;
  mode: LearningMode;
  proposedDate: string;
  proposedTime: string;
  location?: string;
  message?: string;
  status: RequestStatus;
}

interface RequestCardProps {
  request: LearningRequest;
  onCancel?: (request: LearningRequest) => void;
  onOpenChat?: (request: LearningRequest) => void;
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

function statusBadgeVariant(status: RequestStatus) {
  if (status === "accepted") return "success" as const;
  if (status === "pending") return "warning" as const;
  if (status === "rejected") return "destructive" as const;
  return "default" as const;
}

function statusLabel(status: RequestStatus) {
  if (status === "pending") return "Pending";
  if (status === "accepted") return "Accepted";
  if (status === "rejected") return "Rejected";
  return "Done";
}

function formatDate(dateString: string) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function RequestCard({ request, onCancel, onOpenChat }: RequestCardProps) {
  const canCancel = request.status === "pending";
  const canChat = request.status === "accepted";

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-start justify-between gap-2 p-5">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-11 w-11 shrink-0">
            <AvatarImage src={request.mentorAvatarUrl} alt={request.mentorName} />
            <AvatarFallback className={getAvatarColorClass(request.mentorName)}>
              {getInitials(request.mentorName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-md font-semibold text-foreground">
              {request.mentorName}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {request.mentorDepartment}
            </p>
          </div>
        </div>
        <Badge variant={statusBadgeVariant(request.status)}>
          {statusLabel(request.status)}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3 p-5 pt-0">
        <p className="truncate text-sm font-medium text-foreground">
          {request.skillName}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            {request.mode === "online" ? (
              <Laptop className="h-3.5 w-3.5" />
            ) : (
              <MapPin className="h-3.5 w-3.5" />
            )}
            {request.mode === "online" ? "Online" : "Offline"}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {formatDate(request.proposedDate)} · {request.proposedTime}
          </span>
        </div>

        {request.mode === "offline" && request.location && (
          <p className="flex items-start gap-1.5 text-xs text-foreground/80">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            {request.location}
          </p>
        )}

        {request.message && (
          <p className="line-clamp-2 text-sm text-foreground/80">
            {request.message}
          </p>
        )}
      </CardContent>

      {(canCancel || canChat) && (
        <CardFooter className="gap-2 p-5 pt-0">
          {canChat && (
            <Button
              type="button"
              size="sm"
              className="flex-1"
              onClick={() => onOpenChat?.(request)}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Chat
            </Button>
          )}
          {canCancel && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onCancel?.(request)}
            >
              <X className="h-3.5 w-3.5" />
              Batalkan
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}