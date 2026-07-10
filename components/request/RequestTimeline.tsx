import { BookOpen, CheckCircle2, Send, Trophy, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RequestStatusValue } from "@/components/request/RequestStatus";

interface RequestTimelineProps {
  status: RequestStatusValue;
  sentAt?: string;
  acceptedAt?: string;
  sessionAt?: string;
  completedAt?: string;
  className?: string;
}

interface TimelineStep {
  key: string;
  label: string;
  icon: React.ElementType;
  timestamp?: string;
}

const stepOrder = ["sent", "accepted", "session", "completed"] as const;

function getActiveIndex(status: RequestStatusValue) {
  if (status === "pending") return 0;
  if (status === "rejected") return 1;
  if (status === "accepted") return 2;
  return 3;
}

export function RequestTimeline({
  status,
  sentAt,
  acceptedAt,
  sessionAt,
  completedAt,
  className,
}: RequestTimelineProps) {
  const isRejected = status === "rejected";
  const activeIndex = getActiveIndex(status);

  const steps: TimelineStep[] = [
    { key: "sent", label: "Request Sent", icon: Send, timestamp: sentAt },
    {
      key: "accepted",
      label: isRejected ? "Rejected" : "Accepted",
      icon: isRejected ? XCircle : CheckCircle2,
      timestamp: acceptedAt,
    },
    {
      key: "session",
      label: "Learning Session",
      icon: BookOpen,
      timestamp: sessionAt,
    },
    {
      key: "completed",
      label: "Completed",
      icon: Trophy,
      timestamp: completedAt,
    },
  ];

  return (
    <ol className={cn("space-y-0", className)}>
      {steps.map((step, index) => {
        const isDone = !isRejected && index < activeIndex;
        const isCurrent = index === activeIndex;
        const isFailed = isRejected && index === 1;
        const isLast = index === steps.length - 1;
        const Icon = step.icon;

        const circleClass = isFailed
          ? "border-destructive bg-destructive/10 text-destructive"
          : isDone || (isCurrent && !isRejected)
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground";

        const lineClass =
          isDone && !isRejected ? "bg-primary" : "bg-border";

        const labelClass = cn(
          "text-sm font-medium",
          isFailed
            ? "text-destructive"
            : isDone || isCurrent
            ? "text-foreground"
            : "text-muted-foreground"
        );

        return (
          <li key={step.key} className="relative flex gap-3 pb-6 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px",
                  lineClass
                )}
              />
            )}
            <span
              className={cn(
                "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                circleClass
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="flex min-w-0 flex-col justify-center gap-0.5 pt-0.5">
              <p className={labelClass}>{step.label}</p>
              {step.timestamp && (
                <p className="text-2xs text-muted-foreground">
                  {step.timestamp}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}