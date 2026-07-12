import type { BadgeTone } from '@/design-system';
import type { StudyDifficulty, StudyMaterialType, StudySessionStatus } from '@/study/types';

export const materialTypeLabel: Record<StudyMaterialType, string> = {
  law: 'Lei seca',
  mockExam: 'Simulado',
  other: 'Outro',
  pdf: 'PDF',
  questions: 'Questoes',
  review: 'Revisao',
  summary: 'Resumo',
  video: 'Videoaula',
};

export const difficultyLabel: Record<StudyDifficulty, string> = {
  easy: 'Facil',
  hard: 'Dificil',
  moderate: 'Moderada',
};

export const studyStatusLabel: Record<StudySessionStatus, string> = {
  completed: 'Concluida',
  inProgress: 'Em andamento',
  interrupted: 'Interrompida',
  planned: 'Planejada',
};

export const studyStatusTone: Record<StudySessionStatus, BadgeTone> = {
  completed: 'green',
  inProgress: 'info',
  interrupted: 'amber',
  planned: 'slate',
};
