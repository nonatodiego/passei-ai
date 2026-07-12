import type { BadgeTone } from '@/design-system';
import type { QuestionDifficulty, QuestionStatus } from '@/questions/types';

export const difficultyLabel: Record<QuestionDifficulty, string> = {
  easy: 'Facil',
  hard: 'Dificil',
  medium: 'Moderada',
};

export const statusLabel: Record<QuestionStatus, string> = {
  correct: 'Correta',
  incorrect: 'Incorreta',
  unanswered: 'Nao respondida',
};

export const statusTone: Record<QuestionStatus, BadgeTone> = {
  correct: 'green',
  incorrect: 'red',
  unanswered: 'slate',
};

export const difficultyTone: Record<QuestionDifficulty, BadgeTone> = {
  easy: 'green',
  hard: 'red',
  medium: 'amber',
};
