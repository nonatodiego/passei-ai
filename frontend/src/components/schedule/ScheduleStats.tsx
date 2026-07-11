import { AlertTriangle, CalendarDays, CheckCircle2, Clock, ListChecks } from 'lucide-react';

import { KPICard } from '@/design-system';
import type { ScheduleStatsData } from '@/types/schedule';

export function ScheduleStats({ stats }: { stats: ScheduleStatsData }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <KPICard
        helper="Atividades planejadas na semana"
        icon={CalendarDays}
        label="Agenda semanal"
        value={String(stats.weeklyActivities)}
      />
      <KPICard
        helper="Blocos previstos para hoje"
        icon={ListChecks}
        label="Agenda diaria"
        tone="teal"
        value={String(stats.todayActivities)}
      />
      <KPICard
        helper="Tempo estimado no periodo"
        icon={Clock}
        label="Horas planejadas"
        tone="green"
        value={`${stats.plannedHours}h`}
      />
      <KPICard
        helper="Atividades finalizadas"
        icon={CheckCircle2}
        label="Concluidas"
        tone="blue"
        value={String(stats.completedActivities)}
      />
      <KPICard
        helper="Precisam de replanejamento"
        icon={AlertTriangle}
        label="Atrasadas"
        tone="amber"
        value={String(stats.overdueActivities)}
      />
    </div>
  );
}
