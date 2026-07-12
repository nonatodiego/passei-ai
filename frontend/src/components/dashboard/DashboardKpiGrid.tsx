import { KPICard } from '@/design-system';
import type { DashboardKpi } from '@/types/dashboard';

const visibleKpiIds = [
  'preparation-index',
  'studied-hours',
  'solved-questions',
  'accuracy-rate',
  'days-until-exam',
  'schedule-progress',
];

const presentationById: Record<
  string,
  Pick<DashboardKpi, 'helper' | 'label' | 'tone'> & { progress?: number }
> = {
  'preparation-index': {
    helper: 'Meta: 85%',
    label: 'Índice de preparação',
    progress: 74,
    tone: 'blue',
  },
  'studied-hours': {
    helper: '15h previstas/semana',
    label: 'Horas estudadas',
    progress: 84,
    tone: 'green',
  },
  'solved-questions': {
    helper: '300 por semana',
    label: 'Questões resolvidas',
    progress: 78,
    tone: 'amber',
  },
  'accuracy-rate': {
    helper: 'Últimas 6 semanas',
    label: 'Taxa de acertos',
    progress: 72,
    tone: 'green',
  },
  'days-until-exam': {
    helper: 'DATAPREV 2026',
    label: 'Dias até a prova',
    tone: 'purple',
  },
  'schedule-progress': {
    helper: 'Definida',
    label: 'Meta de aprovação',
    tone: 'blue',
  },
};

export function DashboardKpiGrid({ items }: { items: DashboardKpi[] }) {
  const orderedItems = visibleKpiIds
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is DashboardKpi => Boolean(item));

  return (
    <section
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
      aria-label="Indicadores do Dashboard"
    >
      {orderedItems.map((item) => {
        const presentation = presentationById[item.id];
        const value = item.id === 'schedule-progress' ? '85%' : item.value;

        return (
        <KPICard
          helper={presentation?.helper ?? item.helper}
          icon={item.icon}
          key={item.id}
          label={presentation?.label ?? item.label}
          progress={presentation?.progress}
          tone={presentation?.tone ?? item.tone}
          value={value}
        />
        );
      })}
    </section>
  );
}
