import type { LucideIcon } from 'lucide-react';

import { Card } from '@/design-system/molecules/Card';
import { cn } from '@/utils/cn';

export function KPICard({
  className,
  helper,
  icon: Icon,
  label,
  progress,
  tone = 'blue',
  value,
}: {
  className?: string;
  helper?: string;
  icon: LucideIcon;
  label: string;
  progress?: number;
  tone?: 'blue' | 'green' | 'amber' | 'red' | 'teal' | 'purple';
  value: string;
}) {
  const toneClass = {
    blue: 'bg-blue-100 text-app-primary',
    green: 'bg-green-100 text-app-success',
    amber: 'bg-amber-100 text-app-warning',
    red: 'bg-red-50 text-app-danger',
    teal: 'bg-teal-50 text-app-teal',
    purple: 'bg-violet-100 text-violet-600',
  }[tone];

  const progressClass = {
    blue: 'bg-app-primary',
    green: 'bg-app-success',
    amber: 'bg-app-warning',
    red: 'bg-app-danger',
    teal: 'bg-app-teal',
    purple: 'bg-violet-600',
  }[tone];

  const safeProgress =
    typeof progress === 'number' ? Math.min(100, Math.max(0, progress)) : undefined;

  return (
    <Card className={cn('flex min-h-44 flex-col justify-between p-5', className)}>
      <div className="flex items-start gap-3">
        <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full', toneClass)}>
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-5 text-app-muted">{label}</p>
          <p className="mt-5 text-3xl font-bold leading-none text-app-text">{value}</p>
        </div>
      </div>
      <div>
        {helper ? <p className="mt-3 text-sm text-app-muted">{helper}</p> : null}
        {typeof safeProgress === 'number' ? (
          <div className="mt-5 h-2 rounded-full bg-slate-100">
            <div
              className={cn('h-2 rounded-full', progressClass)}
              style={{ width: `${safeProgress}%` }}
            />
          </div>
        ) : null}
      </div>
    </Card>
  );
}
