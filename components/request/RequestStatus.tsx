import { CheckCircle2, Clock, Trophy, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type RequestStatusValue = "pending" | "accepted" | "rejected" | "completed";

interface RequestStatusProps {
  status: RequestStatusValue;
  className?: string;
}

const statusConfig: Record
  RequestStatusValue,
  {
    label: string;
    icon: React.ElementType;
    variant: "success" | "warning" | "destructive" | "default";
  }
> = {
  pending: {
    label: "Pending",
    icon: Clock,
    variant: "warning",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    variant: "success",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    variant: "destructive",
  },
  completed: {
    label: "Completed",
    icon: Trophy,
    variant: "default",
  },
};

export function RequestStatus({ status, className }: RequestStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={cn("gap-1", className)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}