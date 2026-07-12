import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Target,
} from 'lucide-react';

import { DashboardKpiGrid } from '@/components/dashboard/DashboardKpiGrid';
import { DisciplineRankingSection } from '@/components/dashboard/DisciplineRankingSection';
import { RecentActivitiesSection } from '@/components/dashboard/RecentActivitiesSection';
import { TodayPlanSection } from '@/components/dashboard/TodayPlanSection';
import { WeeklyEvolutionChart } from '@/components/dashboard/WeeklyEvolutionChart';
import {
  Badge,
  Button,
  Card,
  Content,
  EmptyState,
  ErrorState,
  LoadingState,
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

function WelcomeBanner() {
  return (
    <section className="relative overflow-hidden rounded-md border border-blue-100 bg-blue-50/70 px-6 py-7 shadow-panel md:px-8">
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-2xl font-bold text-app-text">Bom dia, Diego!</h2>
        <p className="mt-4 text-base text-slate-700">
          Você está no caminho certo. Foque no que importa e siga evoluindo!
        </p>
      </div>
      <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 items-center gap-4 md:flex">
        <div className="relative h-24 w-32">
          <div className="absolute bottom-6 left-0 h-0.5 w-10 rotate-[-35deg] rounded-full bg-app-primary" />
          <div className="absolute bottom-11 left-8 h-0.5 w-12 rounded-full bg-app-primary" />
          <div className="absolute bottom-16 left-20 h-0.5 w-14 rotate-[-35deg] rounded-full bg-app-primary" />
          <span className="absolute bottom-9 left-7 h-3 w-3 rounded-full bg-app-primary" />
          <span className="absolute bottom-[60px] left-[72px] h-3 w-3 rounded-full bg-app-primary" />
          <span className="absolute bottom-[74px] left-[112px] h-3 w-3 rounded-full bg-app-primary" />
        </div>
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[14px] border-app-primary bg-white">
          <div className="h-12 w-12 rounded-full border-[10px] border-blue-200" />
          <Target className="absolute h-12 w-12 text-app-primary" />
        </div>
      </div>
    </section>
  );
}

function NextReviewCard({ item }: { item: DashboardData['todayPlan'][number] }) {
  return (
    <Card className="flex h-full flex-col items-center justify-between p-6 text-center">
      <div className="w-full text-left">
        <h2 className="text-xl font-bold text-app-text">Próxima revisão</h2>
      </div>
      <div className="flex flex-col items-center py-6">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-app-primary">
          <BookOpen aria-hidden="true" className="h-10 w-10" />
        </span>
        <Badge className="mt-5" tone="blue">
          Hoje
        </Badge>
        <p className="mt-4 text-4xl font-bold text-app-text">{item.time}</p>
        <p className="mt-6 text-lg font-bold text-app-text">
          {item.title.replace('Teoria: ', '')}
        </p>
        <p className="mt-2 text-sm text-app-muted">{item.discipline}</p>
      </div>
      <Button className="w-full" size="lg">
        Iniciar revisão
      </Button>
    </Card>
  );
}

function TimeDistributionSection({
  items,
}: {
  items: DashboardData['disciplineRanking'];
}) {
  return (
    <Card className="h-full p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-app-text">Distribuição do tempo</h2>
        <a className="text-sm font-semibold text-app-primary hover:text-blue-700" href="/estudos">
          Ver todas
        </a>
      </div>
      <div className="space-y-5">
        {items.slice(0, 4).map((item) => (
          <div key={item.id}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-app-text">{item.name}</span>
              <span className="text-app-muted">{item.accuracy}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-app-primary"
                style={{ width: `${item.accuracy}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
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
        icon={Target}
        title="Dashboard sem dados"
      />
    );
  }

  return (
    <Content>
      <WelcomeBanner />
      <DashboardKpiGrid items={data.kpis} />
      <section className="grid gap-6 xl:grid-cols-[minmax(320px,1fr)_minmax(260px,0.66fr)_minmax(420px,1.2fr)]">
        <TodayPlanSection items={data.todayPlan} scheduleProgress={data.scheduleProgress} />
        <NextReviewCard item={data.todayPlan[0]} />
        <WeeklyEvolutionChart data={data.weeklyEvolution} />
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-app-text">Disciplinas em foco</h2>
            <a className="inline-flex items-center gap-1 text-sm font-semibold text-app-primary" href="/estudos">
              Ver todas
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <DisciplineRankingSection items={data.disciplineRanking} />
        </div>
        <TimeDistributionSection items={data.disciplineRanking} />
      </section>
      <section className="rounded-md bg-blue-50/70 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 aria-hidden="true" className="h-8 w-8 text-app-success" />
            <div>
              <p className="text-2xl font-bold text-app-success">+12%</p>
              <p className="text-sm text-app-muted">de evolução</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-app-text">
            Seu desempenho está acima da média!
            <span className="ml-2 font-normal text-app-muted">Continue assim!</span>
          </p>
          <ArrowUpRight aria-hidden="true" className="h-6 w-6 text-app-success" />
        </div>
      </section>
      <RecentActivitiesSection activities={data.activities} />
    </Content>
  );
}

export function DashboardPage() {
  return <DashboardView data={dashboardMock} status="success" />;
}
