import type { ReviewRecommendation } from '@/study-engine/types';

export function countPendingReviews(reviews: ReviewRecommendation[]): number {
  return reviews.length;
}
