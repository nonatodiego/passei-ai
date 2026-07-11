import type { DailyPlan } from '@/study-engine/types';

export function getDailyPlanTotalHours(plan: DailyPlan): number {
  return Math.round((plan.totalEstimatedMinutes / 60) * 10) / 10;
}
