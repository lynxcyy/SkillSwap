"use client";

import { MentorCard, type Mentor } from "@/components/explore/MentorCard";
import { EmptyState } from "@/components/explore/EmptyState";

interface MentorGridProps {
  mentors: Mentor[];
  onRequest?: (mentor: Mentor) => void;
}

export function MentorGrid({ mentors, onRequest }: MentorGridProps) {
  if (mentors.length === 0) {
    return (
      <EmptyState
        title="Tidak ada hasil ditemukan"
        description="Coba gunakan kata kunci lain atau pilih kategori yang berbeda"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} onRequest={onRequest} />
      ))}
    </div>
  );
}