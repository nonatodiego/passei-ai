export type Priority = 'baixa' | 'média' | 'alta';
export type Status = 'pendente' | 'em andamento' | 'concluído' | 'atrasado';

export interface Contest {
  name: string;
  role: string;
  board: string;
  examDate: string;
  approvalTarget: number;
}

export interface Discipline {
  id: string;
  name: string;
  weight: number;
  questions: number;
  color: string;
}

export interface ScheduleItem {
  id: string;
  date: string;
  discipline: string;
  content: string;
  type: 'teoria' | 'questões' | 'revisão' | 'simulado';
  status: Status;
  priority: Priority;
  plannedHours: number;
  completedHours: number;
  situation: string;
  notes: string;
}

export interface StudySession {
  id: string;
  date: string;
  discipline: string;
  subject: string;
  durationMinutes: number;
  materialType: string;
  difficulty: 'baixa' | 'média' | 'alta';
  questions: number;
  hits: number;
  misses: number;
  notes: string;
}

export interface QuestionSession {
  id: string;
  board: string;
  discipline: string;
  subject: string;
  total: number;
  hits: number;
  misses: number;
  canceled: number;
  percentage: number;
  timeSpentMinutes: number;
  source: string;
}

export interface ErrorRecord {
  id: string;
  date: string;
  discipline: string;
  subject: string;
  question: string;
  reason: string;
  category:
    | 'falta de conhecimento'
    | 'interpretação'
    | 'distração'
    | 'cálculo'
    | 'confusão entre conceitos'
    | 'esquecimento'
    | 'chute'
    | 'falta de revisão';
  reviewAction: string;
  priority: Priority;
  reviewed: boolean;
  reviewDate: string;
  recurrence: number;
}

export interface Review {
  id: string;
  subject: string;
  discipline: string;
  dueDate: string;
  status: Status;
  origin: string;
  priority: Priority;
}

export interface MockExam {
  id: string;
  date: string;
  durationMinutes: number;
  hitsByDiscipline: Record<string, number>;
  score: number;
  percentage: number;
  trend: 'subiu' | 'estável' | 'caiu';
  notes: string;
}

export interface Goal {
  id: string;
  label: string;
  target: number;
  current: number;
  unit: string;
}

export interface EvolutionPoint {
  week: string;
  hours: number;
  accuracy: number;
  score: number;
}

export interface TodayPlanItem {
  id: string;
  time: string;
  label: string;
  discipline: string;
}

export interface DashboardSummary {
  contest: Contest;
  scheduleProgress: number;
  studiedHours: number;
  solvedQuestions: number;
  accuracyRate: number;
  mockExamsDone: number;
  bestScore: number;
  pendingReviews: number;
  strongestDiscipline: string;
  weakestDiscipline: string;
  evolution: EvolutionPoint[];
  todayPlan: TodayPlanItem[];
}
