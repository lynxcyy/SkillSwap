import { BookOpen, Sparkles, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileInfoCardProps {
  totalSkills: number;
  totalSessions: number;
  averageRating: number;
}

interface StatItem {
  label: string;
  value: string;
  icon: React.ElementType;
}

export function ProfileInfoCard({
  totalSkills,
  totalSessions,
  averageRating,
}: ProfileInfoCardProps) {
  const stats: StatItem[] = [
    { label: "Skill Aktif", value: String(totalSkills), icon: Sparkles },
    { label: "Sesi Selesai", value: String(totalSessions), icon: BookOpen },
    {
      label: "Rating Rata-rata",
      value: averageRating > 0 ? averageRating.toFixed(1) : "—",
      icon: Star,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="shadow-card">
            <CardContent className="flex items-center gap-3 p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}