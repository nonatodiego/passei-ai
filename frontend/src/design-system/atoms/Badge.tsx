import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type BadgeTone = 'blue' | 'green' | 'amber' | 'red' | 'slate' | 'info';

const toneClass: Record<BadgeTone, string> = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-200',
  green: 'bg-green-50 text-green-700 ring-green-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  red: 'bg-red-50 text-red-700 ring-red-200',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
  info: 'bg-sky-50 text-sky-700 ring-sky-200',
};

export function Badge({
  children,
  className,
  tone = 'slate',
}: {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
