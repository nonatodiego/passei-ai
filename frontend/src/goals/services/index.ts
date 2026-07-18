import type { GoalKind, GoalRecord } from '@/goals/types';

export const defaultGoalDefinitions: Array<Pick<GoalRecord, 'id' | 'kind' | 'name' | 'target'>> = [
  { id: 'default-goal-0', name: 'Horas de estudo por semana', kind: 'hours', target: 15 },
  { id: 'default-goal-1', name: 'Questoes por semana', kind: 'questions', target: 300 },
  { id: 'default-goal-2', name: 'Revisoes por semana', kind: 'reviews', target: 7 },
  { id: 'default-goal-3', name: 'Simulados por semana', kind: 'mockExams', target: 1 },
  { id: 'default-goal-4', name: 'Taxa de acertos desejada', kind: 'accuracy', target: 85 },
];

export function normalizeGoals(stored: Array<Partial<GoalRecord>>): GoalRecord[] {
  return defaultGoalDefinitions.map((definition) => {
    const saved = stored.find((goal) => goal.kind === definition.kind || goal.id === definition.id);
    const target = Number(saved?.target ?? saved?.name?.match(/\d+/)?.[0] ?? definition.target);
    const timestamp = new Date().toISOString();
    return {
      ...definition,
      ...saved,
      createdAt: saved?.createdAt ?? timestamp,
      id: saved?.id ?? definition.id,
      kind: definition.kind,
      name: (saved?.name ?? definition.name).replace(/^\d+\s+/, ''),
      target: Number.isFinite(target) && target >= 0 ? target : definition.target,
      updatedAt: saved?.updatedAt ?? timestamp,
    };
  });
}

export function getGoalTarget(
  goals: Array<Partial<GoalRecord>>,
  kind: GoalKind,
  fallback: number,
): number {
  return normalizeGoals(goals).find((goal) => goal.kind === kind)?.target ?? fallback;
}
