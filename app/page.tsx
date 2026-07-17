import type { ElementType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  MessageSquare,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

interface FeatureItem {
  icon: ElementType;
  title: string;
  description: string;
}

interface StepItem {
  step: string;
  title: string;
  description: string;
}

interface StatItem {
  label: string;
  value: string;
}

const features: FeatureItem[] = [
  {
    icon: Compass,
    title: "Explore Mentor",
    description:
      "Jelajahi ratusan skill dari mahasiswa lain, filter berdasarkan kategori, level, dan rating.",
  },
  {
    icon: Users,
    title: "Learning Request",
    description:
      "Kirim permintaan belajar langsung ke mentor pilihanmu dan pantau statusnya secara real-time.",
  },
  {
    icon: MessageSquare,
    title: "Chat Real-Time",
    description:
      "Diskusikan detail sesi belajar tanpa harus berpindah aplikasi, langsung dari SkillSwap.",
  },
  {
    icon: Star,
    title: "Rating & Review",
    description:
      "Bangun reputasi sebagai mentor lewat ulasan jujur dari mahasiswa yang pernah belajar bersamamu.",
  },
];

const steps: StepItem[] = [
  {
    step: "01",
    title: "Buat Profil & Tambah Skill",
    description:
      "Daftar dengan email kampusmu, lengkapi profil, dan tambahkan skill yang ingin kamu ajarkan.",
  },
  {
    step: "02",
    title: "Temukan atau Ditemukan",
    description:
      "Cari mentor yang kamu butuhkan di halaman Explore, atau tunggu request masuk dari mahasiswa lain.",
  },
  {
    step: "03",
    title: "Belajar & Beri Review",
    description:
      "Sepakati jadwal, chat langsung di platform, lalu beri rating setelah sesi belajar selesai.",
  },
];

const stats: StatItem[] = [
  { label: "Mahasiswa Aktif", value: "1.200+" },
  { label: "Skill Terdaftar", value: "340+" },
  { label: "Sesi Belajar Selesai", value: "980+" },
  { label: "Rating Rata-rata", value: "4.8/5" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
        S
      </span>
      <span className="text-md font-semibold text-foreground">
        {siteConfig.name}
      </span>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Logo />
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/login">Masuk</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Daftar Gratis</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3 w-3" />
            Platform Peer-to-Peer untuk Mahasiswa
          </Badge>
          <h1 className="mx-auto max-w-3xl text-3xl font-semibold text-foreground sm:text-5xl">
            Belajar Skill Baru dari Sesama Mahasiswa, Gratis
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/register">
                Mulai Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Saya Sudah Punya Akun</Link>
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="shadow-card">
                <CardContent className="p-5 text-center">
                  <p className="text-xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-5xl space-y-8 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              Semua yang Kamu Butuhkan untuk Bertukar Skill
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Dari menemukan mentor hingga menyelesaikan sesi belajar, semua
              dalam satu platform.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="shadow-card">
                  <CardContent className="space-y-3 p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-md font-semibold text-foreground">
                        {feature.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border bg-card">
          <div className="mx-auto max-w-5xl space-y-8 px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                Cara Kerja SkillSwap
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tiga langkah sederhana untuk mulai belajar atau berbagi ilmu.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {steps.map((item) => (
                <div key={item.step} className="space-y-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {item.step}
                  </span>
                  <p className="text-md font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <Card className="shadow-card">
            <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                <BookOpen className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xl font-semibold text-foreground">
                  Siap berbagi atau belajar skill baru?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Bergabung dengan mahasiswa lain di kampusmu, gratis tanpa
                  biaya apa pun.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/register">
                  Daftar Sekarang
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left">
          <Logo />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Dibuat untuk
            mahasiswa, oleh mahasiswa.
          </p>
        </div>
      </footer>
    </div>
  );
}