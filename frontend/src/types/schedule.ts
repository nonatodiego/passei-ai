import type { StudyActivityType, StudyPriority, StudySessionStatus } from '@/study-engine/types';

export type ScheduleViewMode = 'calendar' | 'timeline' | 'list' | 'weekly' | 'daily';

export type ScheduleStatus = 'loading' | 'empty' | 'error' | 'success';

export interface ScheduleActivity {
  id: string;
  date: string;
  time: string;
  discipline: string;
  subject: string;
  type: StudyActivityType;
  priority: StudyPriority;
  estimatedMinutes: number;
  status: StudySessionStatus;
  weight: number;
  source: string;
}

export interface ScheduleStatsData {
  completedActivities: number;
  overdueActivities: number;
  plannedHours: number;
  todayActivities: number;
  weeklyActivities: number;
}

export interface ScheduleFiltersState {
  discipline: string;
  priority: string;
  query: string;
  status: string;
  type: string;
}

export interface ScheduleData {
  activities: ScheduleActivity[];
  stats: ScheduleStatsData;
  engineGeneratedAt: string;
  engineFocus: string;
}
