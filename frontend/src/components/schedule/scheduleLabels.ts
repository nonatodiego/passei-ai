import type { BadgeTone } from '@/design-system';
import type { StudyActivityType, StudyPriority, StudySessionStatus } from '@/study-engine/types';

export const activityTypeLabel: Record<StudyActivityType, string> = {
  mockExam: 'Simulado',
  questions: 'Questoes',
  reading: 'Leitura',
  review: 'Revisao',
  study: 'Estudo',
};

export const priorityLabel: Record<StudyPriority, string> = {
  critical: 'Critica',
  high: 'Alta',
  low: 'Baixa',
  medium: 'Media',
};

export const statusLabel: Record<StudySessionStatus, string> = {
  completed: 'Concluido',
  inProgress: 'Em andamento',
  overdue: 'Atrasado',
  pending: 'Pendente',
};

export const priorityTone: Record<StudyPriority, BadgeTone> = {
  critical: 'red',
  high: 'amber',
  low: 'slate',
  medium: 'blue',
};

export const statusTone: Record<StudySessionStatus, BadgeTone> = {
  completed: 'green',
  inProgress: 'info',
  overdue: 'red',
  pending: 'slate',
};
