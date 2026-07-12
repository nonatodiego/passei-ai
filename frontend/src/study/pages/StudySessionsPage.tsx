import { BookOpen } from 'lucide-react';

import {
  StudySessionFilters,
  StudySessionForm,
  StudySessionHistory,
  StudySessionSummaryCards,
  StudySessionTimer,
} from '@/study/components';
import { useStudySessions, useStudyTimer } from '@/study/hooks';
import type {
  StudySession,
  StudySessionFilters as StudySessionFiltersState,
  StudySessionSummary,
  StudySessionViewStatus,
  StudyTimerAction,
  StudyTimerState,
} from '@/study/types';
import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Content,
  EmptyState,
  ErrorState,
  LoadingState,
  Section,
  Toast,
} from '@/design-system';

export function StudySessionsView({
  allSessions,
  dispatchTimer,
  filters,
  onFiltersChange,
  sessions,
  status,
  summary,
  timer,
}: {
  allSessions: StudySession[];
  dispatchTimer: (action: StudyTimerAction) => void;
  filters: StudySessionFiltersState;
  onFiltersChange: (filters: StudySessionFiltersState) => void;
  sessions: StudySession[];
  status: StudySessionViewStatus;
  summary: StudySessionSummary;
  timer: StudyTimerState;
}) {
  if (status === 'loading') {
    return (
      <Content>
        <LoadingState label="Carregando sessoes de estudo" />
        <div className="grid gap-4 md:grid-cols-2">
          <LoadingState />
          <LoadingState />
        </div>
      </Content>
    );
  }

  if (status === 'error') {
    return (
      <ErrorState
        description="As sessoes de estudo mockadas nao puderam ser carregadas nesta visualizacao."
        title="Nao foi possivel carregar sessoes"
      />
    );
  }

  if (status === 'empty') {
    return (
      <Content>
        <StudySessionFilters
          filters={filters}
          onChange={onFiltersChange}
          sessions={allSessions}
        />
        <EmptyState
          description="Registre uma sessao ou ajuste os filtros para acompanhar seu historico."
          icon={BookOpen}
          title="Nenhuma sessao de estudo"
        />
      </Content>
    );
  }

  return (
    <Content className="space-y-8">
      <Toast title="Sessoes de estudo prontas" tone="success">
        Dados locais preparados para alimentar Study Engine, metas, revisoes e analytics no futuro.
      </Toast>
      <Section className="rounded-md border border-app-border bg-white p-6 shadow-panel">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="blue">Estudos</Badge>
              <span className="text-xs font-medium text-app-muted">Dados para Study Engine futuro</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-app-text md:text-3xl">Sessoes de Estudo</h1>
              <p className="mt-2 text-sm leading-6 text-app-muted">
                Registre o que foi estudado, acompanhe consistencia e entenda rapidamente onde seu
                tempo esta gerando desempenho.
              </p>
            </div>
          </div>
          <div className="rounded-md border border-app-border bg-slate-50 px-4 py-3 text-sm text-app-muted">
            <span className="block font-semibold text-app-text">{summary.totalHours}h registradas</span>
            <span>{summary.sessionsCount} sessoes no periodo</span>
          </div>
        </div>
      </Section>
      <StudySessionSummaryCards summary={summary} />
      <Section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <Card className="p-0">
            <CardHeader className="border-b border-app-border p-5">
              <CardTitle>Historico</CardTitle>
              <CardDescription>Sessoes registradas e desempenho por bloco</CardDescription>
            </CardHeader>
            <div className="space-y-4 p-5">
              <StudySessionFilters
                filters={filters}
                onChange={onFiltersChange}
                sessions={allSessions}
              />
              <StudySessionHistory sessions={sessions} />
            </div>
          </Card>
        </div>
        <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <StudySessionTimer dispatch={dispatchTimer} timer={timer} />
          <StudySessionForm />
        </div>
      </Section>
    </Content>
  );
}

export function StudySessionsPage() {
  const { allSessions, filters, sessions, setFilters, status, summary } = useStudySessions();
  const { dispatchTimer, timer } = useStudyTimer();

  return (
    <StudySessionsView
      allSessions={allSessions}
      dispatchTimer={dispatchTimer}
      filters={filters}
      onFiltersChange={setFilters}
      sessions={sessions}
      status={status}
      summary={summary}
      timer={timer}
    />
  );
}
