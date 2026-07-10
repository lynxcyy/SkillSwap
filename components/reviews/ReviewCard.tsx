// components/reviews/ReviewCard.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RatingStars } from "@/components/reviews/RatingStars";

export interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatarUrl?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewCardProps {
  review: Review;
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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-start justify-between gap-2 p-5">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-11 w-11 shrink-0">
            <AvatarImage src={review.reviewerAvatarUrl} alt={review.reviewerName} />
            <AvatarFallback className={getAvatarColorClass(review.reviewerName)}>
              {getInitials(review.reviewerName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-md font-semibold text-foreground">
              {review.reviewerName}
            </p>
            <p className="truncate text-2xs text-muted-foreground">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>
        <RatingStars value={review.rating} readOnly size="sm" />
      </CardHeader>

      {review.comment && (
        <CardContent className="p-5 pt-0">
          <p className="text-sm text-foreground/80">{review.comment}</p>
        </CardContent>
      )}
    </Card>
  );
}