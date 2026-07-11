import type { LucideIcon } from 'lucide-react';

export function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = 'blue',
}: {
  label: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
  tone?: 'blue' | 'green' | 'amber' | 'red' | 'teal';
}) {
  const toneClass = {
    blue: 'bg-blue-50 text-app-primary',
    green: 'bg-green-50 text-app-success',
    amber: 'bg-amber-50 text-app-warning',
    red: 'bg-red-50 text-app-danger',
    teal: 'bg-teal-50 text-app-teal',
  }[tone];

  return (
    <article className="rounded-lg border border-app-border bg-app-card p-4 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-app-muted">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-app-text">{value}</p>
        </div>
        <span className={`rounded-lg p-2 ${toneClass}`}>
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>
      {helper ? <p className="mt-3 text-sm text-app-muted">{helper}</p> : null}
    </article>
  );
}
