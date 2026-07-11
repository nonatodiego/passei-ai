import { BarChart3 } from 'lucide-react';

import { DashboardKpiGrid } from '@/components/dashboard/DashboardKpiGrid';
import { DisciplineRankingSection } from '@/components/dashboard/DisciplineRankingSection';
import { RecentActivitiesSection } from '@/components/dashboard/RecentActivitiesSection';
import { TodayPlanSection } from '@/components/dashboard/TodayPlanSection';
import { WeeklyEvolutionChart } from '@/components/dashboard/WeeklyEvolutionChart';
import {
  Content,
  EmptyState,
  ErrorState,
  LoadingState,
  Section,
  Toast,
} from '@/design-system';
import { dashboardMock } from '@/mocks/dashboard';
import type { DashboardData, DashboardStatus } from '@/types/dashboard';

function isDashboardEmpty(data: DashboardData): boolean {
  return (
    data.kpis.length === 0 &&
    data.todayPlan.length === 0 &&
    data.weeklyEvolution.length === 0 &&
    data.disciplineRanking.length === 0 &&
    data.activities.length === 0
  );
}

export function DashboardView({
  data,
  onRetry,
  status,
}: {
  data: DashboardData;
  onRetry?: () => void;
  status: DashboardStatus;
}) {
  if (status === 'loading') {
    return (
      <Content>
        <LoadingState label="Carregando Dashboard" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingState key={index} />
          ))}
        </div>
      </Content>
    );
  }

  if (status === 'error') {
    return (
      <ErrorState
        actionLabel={onRetry ? 'Tentar novamente' : undefined}
        description="Os dados mockados do Dashboard não puderam ser carregados nesta visualização."
        onAction={onRetry}
      />
    );
  }

  if (status === 'empty' || isDashboardEmpty(data)) {
    return (
      <EmptyState
        description="Ainda não há indicadores, plano do dia ou atividades para exibir."
        icon={BarChart3}
        title="Dashboard sem dados"
      />
    );
  }

  return (
    <Content>
      <Toast title="Dashboard atualizado" tone="success">
        {data.statusMessage}
      </Toast>
      <DashboardKpiGrid items={data.kpis} />
      <Section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <WeeklyEvolutionChart data={data.weeklyEvolution} />
        <TodayPlanSection items={data.todayPlan} scheduleProgress={data.scheduleProgress} />
      </Section>
      <Section className="grid gap-6 xl:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.4fr)]">
        <DisciplineRankingSection items={data.disciplineRanking} />
        <RecentActivitiesSection activities={data.activities} />
      </Section>
    </Content>
  );
}

export function DashboardPage() {
  return <DashboardView data={dashboardMock} status="success" />;
}
