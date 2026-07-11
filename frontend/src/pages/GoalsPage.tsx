import { ProgressBar } from '@/components/ui/ProgressBar';
import { goals } from '@/mocks/data';

export function GoalsPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {goals.map((goal) => {
        const progress = Math.round((goal.current / goal.target) * 100);
        return (
          <article
            className="rounded-lg border border-app-border bg-white p-5 shadow-panel"
            key={goal.id}
          >
            <p className="font-semibold text-app-text">{goal.label}</p>
            <p className="mt-2 text-2xl font-semibold text-app-primary">
              {goal.current}
              <span className="ml-1 text-sm text-app-muted">/ {goal.target} {goal.unit}</span>
            </p>
            <div className="mt-5">
              <ProgressBar label="Progresso" value={progress} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
