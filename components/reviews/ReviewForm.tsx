// components/reviews/ReviewForm.tsx
"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "@/components/reviews/RatingStars";

export interface ReviewFormValues {
  rating: number;
  comment: string;
}

interface ReviewFormProps {
  mentorName?: string;
  onSubmit: (values: ReviewFormValues) => void;
}

const COMMENT_MAX = 500;

interface FormErrors {
  rating?: string;
  comment?: string;
}

export function ReviewForm({ mentorName, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (rating < 1) {
      nextErrors.rating = "Rating bintang wajib dipilih";
    }
    if (comment.length > COMMENT_MAX) {
      nextErrors.comment = `Komentar maksimum ${COMMENT_MAX} karakter`;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      onSubmit({ rating, comment: comment.trim() });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-2 py-6 text-center">
        <p className="text-sm font-medium text-foreground">
          Terima kasih atas review kamu!
        </p>
        <p className="text-xs text-muted-foreground">
          Review kamu sudah tersimpan dan tampil di profil mentor.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label>
          {mentorName ? `Beri Rating untuk ${mentorName}` : "Beri Rating"}
        </Label>
        <RatingStars value={rating} onChange={setRating} size="lg" />
        {errors.rating && (
          <p className="text-2xs text-destructive">{errors.rating}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="review-comment">Komentar</Label>
          <span className="text-2xs text-muted-foreground">
            {comment.length}/{COMMENT_MAX}
          </span>
        </div>
        <Textarea
          id="review-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Ceritakan pengalaman belajarmu bersama mentor ini..."
          maxLength={COMMENT_MAX}
          rows={4}
        />
        {errors.comment && (
          <p className="text-2xs text-destructive">{errors.comment}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        <Send className="h-4 w-4" />
        Kirim Review
      </Button>
    </form>
  );
}