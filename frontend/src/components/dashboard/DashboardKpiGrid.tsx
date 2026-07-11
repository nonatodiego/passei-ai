import { KPICard } from '@/design-system';
import type { DashboardKpi } from '@/types/dashboard';

export function DashboardKpiGrid({ items }: { items: DashboardKpi[] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores do Dashboard">
      {items.map((item) => (
        <KPICard
          helper={item.helper}
          icon={item.icon}
          key={item.id}
          label={item.label}
          tone={item.tone}
          value={item.value}
        />
      ))}
    </section>
  );
}
