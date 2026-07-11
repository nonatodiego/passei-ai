import { useState } from 'react';
import { CalendarDays } from 'lucide-react';

import {
  ScheduleCalendar,
  ScheduleFilters,
  ScheduleList,
  ScheduleSidebar,
  ScheduleStats,
  ScheduleTimeline,
  UpcomingActivities,
} from '@/components/schedule';
import {
  Button,
  Content,
  EmptyState,
  ErrorState,
  LoadingState,
  Section,
  Tabs,
  Toast,
  type TabItem,
} from '@/design-system';
import { useSchedule } from '@/hooks/useSchedule';
import { scheduleMockActivities } from '@/mocks/schedule';
import type {
  ScheduleData,
  ScheduleFiltersState,
  ScheduleStatus,
  ScheduleViewMode,
} from '@/types/schedule';

const initialFilters: ScheduleFiltersState = {
  discipline: 'all',
  priority: 'all',
  query: '',
  status: 'all',
  type: 'all',
};

export function ScheduleView({
  allActivities = scheduleMockActivities,
  data,
  filters,
  onFiltersChange,
  status,
}: {
  allActivities?: ScheduleData['activities'];
  data: ScheduleData;
  filters: ScheduleFiltersState;
  onFiltersChange: (filters: ScheduleFiltersState) => void;
  status: ScheduleStatus;
}) {
  const [activeView, setActiveView] = useState<ScheduleViewMode>('calendar');

  if (status === 'loading') {
    return (
      <Content>
        <LoadingState label="Carregando cronograma" />
        <div className="grid gap-4 lg:grid-cols-3">
          <LoadingState />
          <LoadingState />
          <LoadingState />
        </div>
      </Content>
    );
  }

  if (status === 'error') {
    return (
      <ErrorState
        description="O cronograma mockado nao pode ser carregado nesta visualizacao."
        title="Nao foi possivel carregar o cronograma"
      />
    );
  }

  if (status === 'empty') {
    return (
      <Content>
        <ScheduleFilters
          activities={allActivities}
          filters={filters}
          onChange={onFiltersChange}
        />
        <EmptyState
          description="Ajuste os filtros ou aguarde novas recomendacoes do Study Engine."
          icon={CalendarDays}
          title="Cronograma sem atividades"
        />
      </Content>
    );
  }

  const tabs: TabItem[] = [
    {
      content: <ScheduleCalendar activities={data.activities} />,
      id: 'calendar',
      label: 'Calendario',
    },
    {
      content: <ScheduleTimeline activities={data.activities} />,
      id: 'timeline',
      label: 'Timeline',
    },
    {
      content: <ScheduleList activities={data.activities} />,
      id: 'list',
      label: 'Lista',
    },
    {
      content: <UpcomingActivities activities={data.activities} />,
      id: 'weekly',
      label: 'Semana',
    },
    {
      content: (
        <ScheduleCalendar
          activities={data.activities.filter((activity) => activity.date === '2026-07-11')}
        />
      ),
      id: 'daily',
      label: 'Dia',
    },
  ];

  return (
    <Content>
      <Toast title="Cronograma atualizado" tone="success">
        Prioridades importadas do Study Engine mockado.
      </Toast>
      <Section className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-app-text">Cronograma Inteligente</h1>
          <p className="mt-1 max-w-3xl text-sm text-app-muted">
            Planejamento de estudos orientado pelo Study Engine. O cronograma apresenta a decisao,
            sem recalcular prioridade.
          </p>
        </div>
        <Button icon={<CalendarDays aria-hidden="true" className="h-4 w-4" />} variant="secondary">
          Exportar visao
        </Button>
      </Section>
      <ScheduleStats stats={data.stats} />
      <Section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <ScheduleFilters
            activities={allActivities}
            filters={filters}
            onChange={onFiltersChange}
          />
          <Tabs activeId={activeView} items={tabs} onChange={(id) => setActiveView(id as ScheduleViewMode)} />
        </div>
        <ScheduleSidebar activities={data.activities} engineFocus={data.engineFocus} />
      </Section>
    </Content>
  );
}

export function SchedulePage() {
  const [filters, setFilters] = useState<ScheduleFiltersState>(initialFilters);
  const { data, status } = useSchedule(filters);

  return (
    <ScheduleView
      allActivities={scheduleMockActivities}
      data={data}
      filters={filters}
      onFiltersChange={setFilters}
      status={status}
    />
  );
}
