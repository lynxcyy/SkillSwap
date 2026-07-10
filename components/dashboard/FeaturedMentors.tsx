import Link from "next/link";
import { MentorCard, type Mentor } from "@/components/dashboard/MentorCard";

interface FeaturedMentorsProps {
  mentors: Mentor[];
  title?: string;
  seeAllHref?: string;
}

export function FeaturedMentors({
  mentors,
  title = "Mentor Unggulan",
  seeAllHref = "/explore",
}: FeaturedMentorsProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-md font-semibold text-foreground">{title}</h2>
        <Link
          href={seeAllHref}
          className="text-sm font-medium text-primary hover:underline"
        >
          Lihat semua
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </section>
  );
}