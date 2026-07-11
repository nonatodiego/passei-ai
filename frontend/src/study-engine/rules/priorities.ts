import type { StudyPriority } from '@/study-engine/types';

export const priorityRank: Record<StudyPriority, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export function compareStudyPriority(left: StudyPriority, right: StudyPriority): number {
  return priorityRank[right] - priorityRank[left];
}
