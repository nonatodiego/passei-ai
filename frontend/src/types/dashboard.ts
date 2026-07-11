import type { LucideIcon } from 'lucide-react';

export type DashboardStatus = 'loading' | 'empty' | 'error' | 'success';

export interface DashboardKpi {
  helper?: string;
  icon: LucideIcon;
  id: string;
  label: string;
  tone: 'blue' | 'green' | 'amber' | 'red' | 'teal';
  value: string;
}

export interface TodayPlanItem {
  id: string;
  time: string;
  title: string;
  discipline: string;
  status: 'pendente' | 'em andamento' | 'concluído';
}

export interface WeeklyEvolutionPoint {
  week: string;
  hours: number;
  accuracy: number;
  preparationIndex: number;
}

export interface DisciplineRankingItem {
  id: string;
  name: string;
  accuracy: number;
  solvedQuestions: number;
  trend: 'subiu' | 'estável' | 'caiu';
}

export interface RecentActivity {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'estudo' | 'questões' | 'revisão' | 'simulado';
}

export interface DashboardData {
  activities: RecentActivity[];
  disciplineRanking: DisciplineRankingItem[];
  kpis: DashboardKpi[];
  scheduleProgress: number;
  statusMessage: string;
  todayPlan: TodayPlanItem[];
  weeklyEvolution: WeeklyEvolutionPoint[];
}
