"use client";

import type { ElementType } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Inbox,
  MessageSquare,
  User,
  Star,
  BookOpen,
  Users,
  Sparkles,
  X,
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileDrawer } from "@/components/dashboard/MobileDrawer";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { BottomNavigation } from "@/components/dashboard/BottomNavigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { FeaturedMentors } from "@/components/dashboard/FeaturedMentors";

interface MobileNavItem {
  label: string;
  href: string;
  icon: ElementType;
  badge?: number;
}

const mobileNavItems: MobileNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Requests", href: "/requests", icon: Inbox, badge: 3 },
  { label: "Chat", href: "/chat", icon: MessageSquare, badge: 2 },
  { label: "Profile", href: "/profile", icon: User },
];

interface StatCard {
  label: string;
  value: string;
  icon: ElementType;
}

const stats: StatCard[] = [
  { label: "Skill Aktif", value: "4", icon: Sparkles },
  { label: "Sesi Selesai", value: "12", icon: BookOpen },
  { label: "Rating Rata-rata", value: "4.8", icon: Star },
  { label: "Request Masuk", value: "3", icon: Users },
];

type SkillLevel = "beginner" | "intermediate" | "advanced";

interface MentorData {
  id: string;
  name: string;
  department: string;
  skillName: string;
  skillId: string;
  level: SkillLevel;
  rating: number;
}

const featuredMentors: MentorData[] = [
  {
    id: "1",
    name: "Dimas Pratama",
    department: "Teknik Informatika",
    skillName: "React.js",
    skillId: "skill-1",
    level: "advanced",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Sari Dewi",
    department: "Desain Komunikasi Visual",
    skillName: "UI/UX Design",
    skillId: "skill-2",
    level: "intermediate",
    rating: 4.7,
  },
  {
    id: "3",
    name: "Rina Kusuma",
    department: "Sastra Jepang",
    skillName: "Bahasa Jepang",
    skillId: "skill-3",
    level: "beginner",
    rating: 4.6,
  },
  {
    id: "4",
    name: "Budi Santoso",
    department: "Manajemen",
    skillName: "Public Speaking",
    skillId: "skill-4",
    level: "advanced",
    rating: 5.0,
  },
];



export default function DashboardPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar />
      {isDrawerOpen && (
        <MobileDrawer onClose={() => setIsDrawerOpen(false)} />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar onMenuClick={() => setIsDrawerOpen(true)} />

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <div className="mx-auto max-w-6xl space-y-8 p-4 sm:p-6">
            <WelcomeBanner name="Dimas" stats={stats as any} />
            <FeaturedMentors mentors={featuredMentors} />
          </div>
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
}