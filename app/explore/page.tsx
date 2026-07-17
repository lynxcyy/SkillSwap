"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Star, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileDrawer } from "@/components/dashboard/MobileDrawer";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { BottomNavigation } from "@/components/dashboard/BottomNavigation";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { CategoryFilter, type Category } from "@/components/dashboard/CategoryFilter";
import { MentorCard } from "@/components/dashboard/MentorCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type SkillLevel = "beginner" | "intermediate" | "advanced";

interface Mentor {
  id: string;
  name: string;
  department: string;
  avatarUrl?: string;
  skillName: string;
  skillId: string;
  categoryId: string;
  level: SkillLevel;
  rating: number;
}

const categories: Category[] = [
  { id: "cat-teknologi", name: "Teknologi", iconEmoji: "💻" },
  { id: "cat-desain", name: "Desain", iconEmoji: "🎨" },
  { id: "cat-bahasa", name: "Bahasa", iconEmoji: "🌍" },
  { id: "cat-bisnis", name: "Bisnis", iconEmoji: "📊" },
  { id: "cat-seni", name: "Seni & Musik", iconEmoji: "🎵" },
  { id: "cat-akademik", name: "Akademik", iconEmoji: "📚" },
  { id: "cat-sport", name: "Kesehatan & Sport", iconEmoji: "⚽" },
];

const mentors: Mentor[] = [
  {
    id: "mentor-1",
    name: "Dimas Pratama",
    department: "Teknik Informatika",
    skillName: "React.js",
    skillId: "skill-1",
    categoryId: "cat-teknologi",
    level: "advanced",
    rating: 4.8,
  },
  {
    id: "mentor-2",
    name: "Rina Kusuma",
    department: "Desain Komunikasi Visual",
    skillName: "UI/UX Design",
    skillId: "skill-2",
    categoryId: "cat-desain",
    level: "intermediate",
    rating: 4.6,
  },
  {
    id: "mentor-3",
    name: "Sari Dewi",
    department: "Sastra Inggris",
    skillName: "Conversational English",
    skillId: "skill-3",
    categoryId: "cat-bahasa",
    level: "advanced",
    rating: 4.9,
  },
  {
    id: "mentor-4",
    name: "Bayu Aditya",
    department: "Manajemen",
    skillName: "Public Speaking",
    skillId: "skill-4",
    categoryId: "cat-bisnis",
    level: "beginner",
    rating: 4.2,
  },
  {
    id: "mentor-5",
    name: "Putri Amalia",
    department: "Seni Musik",
    skillName: "Gitar Akustik",
    skillId: "skill-5",
    categoryId: "cat-seni",
    level: "intermediate",
    rating: 4.7,
  },
  {
    id: "mentor-6",
    name: "Fajar Nugroho",
    department: "Fisika",
    skillName: "Kalkulus Dasar",
    skillId: "skill-6",
    categoryId: "cat-akademik",
    level: "advanced",
    rating: 4.5,
  },
];



export default function ExplorePage() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredMentors = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return mentors.filter((mentor) => {
      const matchesCategory =
        activeCategory === null || mentor.categoryId === activeCategory;
      const matchesQuery =
        query.length === 0 ||
        mentor.name.toLowerCase().includes(query) ||
        mentor.skillName.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      {isDrawerOpen && (
        <MobileDrawer onClose={() => setIsDrawerOpen(false)} />
      )}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar onMenuClick={() => setIsDrawerOpen(true)} searchPlaceholder="Search mentor..." />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <div className="mx-auto max-w-6xl space-y-8 p-4 sm:p-6">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-foreground">
                Explore
              </h1>
              <p className="text-sm text-muted-foreground">
                Temukan mentor dan skill yang ingin kamu pelajari
              </p>
            </div>

            <div className="space-y-4">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search mentor..."
              />
              <CategoryFilter
                categories={categories}
                activeCategoryId={activeCategory}
                onChange={setActiveCategory}
              />
            </div>

            {filteredMentors.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                    <Compass className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Tidak ada hasil ditemukan
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Coba gunakan kata kunci lain atau pilih kategori yang
                      berbeda
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {filteredMentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
            )}
          </div>
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
}