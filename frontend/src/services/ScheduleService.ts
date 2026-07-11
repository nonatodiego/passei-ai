import { scheduleMockActivities } from '@/mocks/schedule';
import type { EngineResult } from '@/study-engine/types';
import type { ScheduleActivity, ScheduleData, ScheduleFiltersState } from '@/types/schedule';

const defaultFilters: ScheduleFiltersState = {
  discipline: 'all',
  priority: 'all',
  query: '',
  status: 'all',
  type: 'all',
};

function calculateStats(activities: ScheduleActivity[]) {
  const plannedMinutes = activities.reduce((total, activity) => total + activity.estimatedMinutes, 0);

  return {
    completedActivities: activities.filter((activity) => activity.status === 'completed').length,
    overdueActivities: activities.filter((activity) => activity.status === 'overdue').length,
    plannedHours: Math.round((plannedMinutes / 60) * 10) / 10,
    todayActivities: activities.filter((activity) => activity.date === '2026-07-11').length,
    weeklyActivities: activities.length,
  };
}

export function applyScheduleFilters(
  activities: ScheduleActivity[],
  filters: ScheduleFiltersState = defaultFilters,
): ScheduleActivity[] {
  const query = filters.query.trim().toLowerCase();

  return activities.filter((activity) => {
    const matchesDiscipline =
      filters.discipline === 'all' || activity.discipline === filters.discipline;
    const matchesPriority = filters.priority === 'all' || activity.priority === filters.priority;
    const matchesStatus = filters.status === 'all' || activity.status === filters.status;
    const matchesType = filters.type === 'all' || activity.type === filters.type;
    const matchesQuery =
      query.length === 0 ||
      activity.discipline.toLowerCase().includes(query) ||
      activity.subject.toLowerCase().includes(query);

    return matchesDiscipline && matchesPriority && matchesStatus && matchesType && matchesQuery;
  });
}

export function createScheduleData(
  engineResult: EngineResult,
  filters: ScheduleFiltersState = defaultFilters,
): ScheduleData {
  const engineActivities: ScheduleActivity[] = engineResult.sessions.map((session) => ({
    date: session.scheduledFor.slice(0, 10),
    discipline: session.discipline,
    estimatedMinutes: session.estimatedMinutes,
    id: session.id,
    priority: session.priority,
    source: session.source,
    status: session.status,
    subject: session.subject,
    time: session.scheduledFor.slice(11, 16),
    type: session.type,
    weight: session.weight,
  }));

  const activityById = new Map(engineActivities.map((activity) => [activity.id, activity]));
  const mergedActivities = [
    ...engineActivities,
    ...scheduleMockActivities.filter((activity) => !activityById.has(activity.id)),
  ];
  const filteredActivities = applyScheduleFilters(mergedActivities, filters);

  return {
    activities: filteredActivities,
    engineFocus: engineResult.dailyPlan.focus,
    engineGeneratedAt: engineResult.generatedAt,
    stats: calculateStats(filteredActivities),
  };
}
