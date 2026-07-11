import type { LucideIcon } from 'lucide-react';

import { Card } from '@/design-system/molecules/Card';
import { cn } from '@/utils/cn';

export function KPICard({
  className,
  helper,
  icon: Icon,
  label,
  tone = 'blue',
  value,
}: {
  className?: string;
  helper?: string;
  icon: LucideIcon;
  label: string;
  tone?: 'blue' | 'green' | 'amber' | 'red' | 'teal';
  value: string;
}) {
  const toneClass = {
    blue: 'bg-blue-50 text-app-primary',
    green: 'bg-green-50 text-app-success',
    amber: 'bg-amber-50 text-app-warning',
    red: 'bg-red-50 text-app-danger',
    teal: 'bg-teal-50 text-app-teal',
  }[tone];

  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-app-muted">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-app-text">{value}</p>
        </div>
        <span className={cn('rounded-md p-2', toneClass)}>
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>
      {helper ? <p className="mt-3 text-sm text-app-muted">{helper}</p> : null}
    </Card>
  );
}
