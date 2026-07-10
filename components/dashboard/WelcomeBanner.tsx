import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface WelcomeBannerStat {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface WelcomeBannerProps {
  name: string;
  stats: WelcomeBannerStat[];
}

export function WelcomeBanner({ name, stats }: WelcomeBannerProps) {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold text-foreground">
        Selamat datang kembali, {name}
      </h1>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="shadow-card">
              <CardContent className="flex items-center gap-3 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}