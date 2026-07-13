import { useMemo, useState } from 'react';
import { CalendarDays, Check, Pencil, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  Badge,
  Button,
  Content,
  DataTable,
  EmptyState,
  ErrorState,
  Input,
  LoadingState,
  Modal,
  Section,
  Select,
  Tabs,
  Toast,
  type TabItem,
} from '@/design-system';
import { completeScheduleItem, updateScheduleItem, type ScheduleItemFilters, type ScheduleWindow } from '@/core/database/scheduleRepository';
import { useScheduleItems } from '@/schedule/hooks';
import type { ScheduleItem } from '@/core/database/types';
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

export function LegacySchedulePage() {
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

const pageSize = 30;
const defaultRealFilters: ScheduleItemFilters = { window: 'all' };

function scheduleTone(status: string) {
  if (status.toLocaleLowerCase().includes('conclu')) return 'green' as const;
  if (status.toLocaleLowerCase().includes('andamento')) return 'blue' as const;
  return 'slate' as const;
}

function ScheduleEditModal({
  item,
  onClose,
}: {
  item?: ScheduleItem;
  onClose: () => void;
}) {
  const [notes, setNotes] = useState(item?.notes ?? '');
  const [plannedDate, setPlannedDate] = useState(item?.plannedDate ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>();

  async function save() {
    if (!item) return;
    setSaving(true);
    try {
      await updateScheduleItem(item.id, { notes, plannedDate });
      onClose();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Nao foi possivel atualizar a atividade.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal description="Altere a data ou registre uma observacao para esta atividade." isOpen={Boolean(item)} onClose={onClose} title="Editar atividade">
      <div className="space-y-4">
        <Input label="Data planejada" name="schedule-planned-date" onChange={(event) => setPlannedDate(event.target.value)} type="date" value={plannedDate} />
        <Input label="Observacoes" name="schedule-notes" onChange={(event) => setNotes(event.target.value)} value={notes} />
        {error ? <p aria-live="polite" className="text-sm text-app-danger">{error}</p> : null}
        <div className="flex justify-end gap-3"><Button onClick={onClose} variant="secondary">Cancelar</Button><Button isLoading={saving} onClick={() => void save()}>Salvar alteracoes</Button></div>
      </div>
    </Modal>
  );
}

export function SchedulePage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ScheduleItemFilters>(defaultRealFilters);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<ScheduleItem>();
  const { error, isLoading, items } = useScheduleItems(filters);
  const disciplines = useMemo(() => Array.from(new Set(items.map((item) => item.disciplineName))).sort(), [items]);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const visibleItems = items.slice((page - 1) * pageSize, page * pageSize);

  async function markCompleted(id: string) {
    await completeScheduleItem(id);
  }

  const columns = [
    { key: 'date', header: 'Data', render: (item: ScheduleItem) => item.plannedDate },
    { key: 'discipline', header: 'Disciplina', render: (item: ScheduleItem) => item.disciplineName },
    { key: 'subject', header: 'Conteudo', render: (item: ScheduleItem) => <span className="block max-w-[280px] whitespace-normal">{item.title}</span> },
    { key: 'type', header: 'Tipo', render: (item: ScheduleItem) => item.activityType || 'Outro' },
    { key: 'status', header: 'Status', render: (item: ScheduleItem) => <Badge tone={scheduleTone(item.status)}>{item.status}</Badge> },
    { key: 'window', header: 'Janela', render: (item: ScheduleItem) => item.outsideExamWindow ? <Badge tone="amber">Fora da janela atual da prova</Badge> : <span className="text-app-muted">Ate a prova</span> },
    { key: 'actions', header: 'Acoes', render: (item: ScheduleItem) => <div className="flex gap-1"><Button aria-label={`Registrar estudo de ${item.title}`} icon={<Play aria-hidden="true" className="h-4 w-4" />} onClick={() => navigate(`/estudos?scheduleItemId=${item.id}`)} size="sm">Estudar</Button>{!item.status.toLocaleLowerCase().includes('conclu') ? <Button aria-label={`Concluir ${item.title}`} icon={<Check aria-hidden="true" className="h-4 w-4" />} onClick={() => void markCompleted(item.id)} size="sm" variant="secondary">Concluir</Button> : null}<Button aria-label={`Editar ${item.title}`} icon={<Pencil aria-hidden="true" className="h-4 w-4" />} onClick={() => setEditing(item)} size="sm" variant="ghost">Editar</Button></div> },
  ];

  if (isLoading) return <Content><LoadingState label="Carregando seu cronograma local" /></Content>;
  if (error) return <ErrorState description={error} title="Nao foi possivel carregar o cronograma" />;

  return (
    <Content className="space-y-6">
      <Section className="flex flex-col gap-4 rounded-md border border-app-border bg-white p-6 shadow-panel lg:flex-row lg:items-center lg:justify-between">
        <div><h1 className="text-2xl font-semibold text-app-text">Cronograma</h1><p className="mt-1 text-sm text-app-muted">{items.length} atividades reais do plano DATAPREV. Suas alteracoes ficam guardadas neste navegador.</p></div>
        <Button icon={<Play aria-hidden="true" className="h-4 w-4" />} onClick={() => navigate('/estudos')}>Registrar estudo</Button>
      </Section>
      <Section className="grid gap-3 rounded-md border border-app-border bg-white p-4 md:grid-cols-2 xl:grid-cols-5">
        <Input label="Pesquisa" name="schedule-real-query" onChange={(event) => { setPage(1); setFilters((current) => ({ ...current, query: event.target.value })); }} placeholder="Disciplina ou conteudo" value={filters.query ?? ''} />
        <Select label="Visao" name="schedule-window" onChange={(event) => { setPage(1); setFilters((current) => ({ ...current, window: event.target.value as ScheduleWindow })); }} options={[['all','Todas'],['today','Hoje'],['overdue','Atrasadas'],['upcoming','Proximas'],['completed','Concluidas'],['beforeExam','Ate a prova'],['outsideExam','Fora da janela da prova']].map(([value,label]) => ({ value, label }))} value={filters.window ?? 'all'} />
        <Select label="Disciplina" name="schedule-real-discipline" onChange={(event) => { setPage(1); setFilters((current) => ({ ...current, discipline: event.target.value })); }} options={[{ value: 'all', label: 'Todas' }, ...disciplines.map((discipline) => ({ value: discipline, label: discipline }))]} value={filters.discipline ?? 'all'} />
        <Input label="De" name="schedule-start-date" onChange={(event) => { setPage(1); setFilters((current) => ({ ...current, startDate: event.target.value })); }} type="date" value={filters.startDate ?? ''} />
        <Input label="Ate" name="schedule-end-date" onChange={(event) => { setPage(1); setFilters((current) => ({ ...current, endDate: event.target.value })); }} type="date" value={filters.endDate ?? ''} />
      </Section>
      {items.length === 0 ? <EmptyState description="Nao ha atividades para este filtro. Ajuste a pesquisa ou a janela do cronograma." icon={CalendarDays} title="Nenhuma atividade encontrada" /> : <Section className="space-y-4"><DataTable columns={columns} rows={visibleItems} /><div className="flex items-center justify-between text-sm text-app-muted"><span>Mostrando {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, items.length)} de {items.length}</span><div className="flex gap-2"><Button disabled={page === 1} onClick={() => setPage((current) => current - 1)} size="sm" variant="secondary">Anterior</Button><Button disabled={page === totalPages} onClick={() => setPage((current) => current + 1)} size="sm" variant="secondary">Proxima</Button></div></div></Section>}
      <ScheduleEditModal item={editing} key={editing?.id ?? 'schedule-editor'} onClose={() => setEditing(undefined)} />
    </Content>
  );
}
