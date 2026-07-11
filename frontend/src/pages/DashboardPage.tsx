import {
  Award,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Flag,
  Gauge,
  Target,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

import { EvolutionChart } from '@/components/charts/EvolutionChart';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StatCard } from '@/components/ui/StatCard';
import { dashboardSummary } from '@/mocks/data';
import { formatHours, getDaysUntil, percentage } from '@/utils/format';

export function DashboardPage() {
  const summary = dashboardSummary;
  const daysUntilExam = getDaysUntil(summary.contest.examDate);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          helper={summary.contest.role}
          icon={CalendarClock}
          label="Dias até a prova"
          value={String(daysUntilExam)}
        />
        <StatCard
          helper="Cronograma concluído"
          icon={Gauge}
          label="Progresso"
          tone="teal"
          value={percentage(summary.scheduleProgress)}
        />
        <StatCard
          icon={BookOpen}
          label="Horas estudadas"
          tone="green"
          value={formatHours(summary.studiedHours)}
        />
        <StatCard
          icon={ClipboardList}
          label="Questões resolvidas"
          value={summary.solvedQuestions.toLocaleString('pt-BR')}
        />
        <StatCard
          icon={CheckCircle2}
          label="Taxa de acertos"
          tone="green"
          value={percentage(summary.accuracyRate)}
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          icon={Flag}
          label="Simulados"
          tone="amber"
          value={String(summary.mockExamsDone)}
        />
        <StatCard
          icon={Award}
          label="Melhor nota"
          tone="amber"
          value={summary.bestScore.toLocaleString('pt-BR')}
        />
        <StatCard
          icon={Target}
          label="Revisões pendentes"
          tone="red"
          value={String(summary.pendingReviews)}
        />
        <StatCard
          helper="Disciplina mais forte"
          icon={TrendingUp}
          label={summary.strongestDiscipline}
          tone="green"
          value="86%"
        />
        <StatCard
          helper="Disciplina mais fraca"
          icon={TrendingDown}
          label={summary.weakestDiscipline}
          tone="red"
          value="61%"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <EvolutionChart data={summary.evolution} />
        <aside className="rounded-lg border border-app-border bg-app-card p-4 shadow-panel">
          <h2 className="text-base font-semibold text-app-text">Plano de hoje</h2>
          <p className="mt-1 text-sm text-app-muted">
            Prioridades para manter revisões e prática em movimento.
          </p>
          <div className="mt-5 space-y-4">
            {summary.todayPlan.map((item) => (
              <div className="rounded-lg border border-app-border p-3" key={item.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-app-text">{item.label}</p>
                    <p className="mt-1 text-sm text-app-muted">{item.discipline}</p>
                  </div>
                  <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-app-primary">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <ProgressBar
              label={`Meta de aprovação ${summary.contest.approvalTarget}%`}
              value={summary.accuracyRate}
            />
          </div>
        </aside>
      </section>
    </div>
  );
}
