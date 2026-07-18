export type GoalKind = 'hours' | 'questions' | 'reviews' | 'mockExams' | 'accuracy';

export interface GoalRecord {
  createdAt: string;
  id: string;
  kind: GoalKind;
  name: string;
  target: number;
  updatedAt: string;
}
