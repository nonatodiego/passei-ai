import { BarChart3, BookOpen, CheckCircle2, Clock, ListChecks, Timer } from 'lucide-react';

import { KPICard } from '@/design-system';
import type { StudySessionSummary } from '@/study/types';

export function StudySessionSummaryCards({ summary }: { summary: StudySessionSummary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      <KPICard
        helper="Tempo acumulado no periodo"
        icon={Clock}
        label="Horas estudadas"
        value={`${summary.totalHours}h`}
      />
      <KPICard
        helper="Blocos registrados"
        icon={BookOpen}
        label="Sessoes"
        tone="teal"
        value={String(summary.sessionsCount)}
      />
      <KPICard
        helper="Volume praticado"
        icon={ListChecks}
        label="Questoes"
        tone="blue"
        value={String(summary.totalQuestions)}
      />
      <KPICard
        helper="Acertos sobre questoes"
        icon={CheckCircle2}
        label="Taxa de acertos"
        tone="green"
        value={`${summary.accuracyRate}%`}
      />
      <KPICard
        helper={summary.mostStudiedDiscipline}
        icon={BarChart3}
        label="Mais estudada"
        tone="amber"
        value="Disciplina"
      />
      <KPICard
        icon={Timer}
        label="Media"
        tone="blue"
        value={`${summary.averageDurationMinutes} min`}
      />
    </div>
  );
}
