import { CheckCircle2, HelpCircle, Target, XCircle } from 'lucide-react';

import { KPICard } from '@/design-system';
import type { QuestionStats } from '@/questions/types';

export function QuestionStatsCards({ stats }: { stats: QuestionStats }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Estatisticas de questoes">
      <KPICard
        icon={HelpCircle}
        label="Respondidas"
        tone="blue"
        value={`${stats.correct + stats.incorrect}`}
      />
      <KPICard icon={CheckCircle2} label="Taxa de acertos" progress={stats.accuracyRate} tone="green" value={`${stats.accuracyRate}%`} />
      <KPICard icon={Target} label="Corretas" tone="blue" value={`${stats.correct}`} />
      <KPICard icon={XCircle} label="Incorretas" tone="red" value={`${stats.incorrect}`} />
    </section>
  );
}
