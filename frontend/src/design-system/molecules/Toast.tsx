import type { ReactNode } from 'react';
import { CheckCircle2, Info, TriangleAlert, XCircle } from 'lucide-react';

import { cn } from '@/utils/cn';

type ToastTone = 'success' | 'info' | 'warning' | 'danger';

const toneMap = {
  success: { className: 'border-green-200 bg-green-50 text-green-800', icon: CheckCircle2 },
  info: { className: 'border-sky-200 bg-sky-50 text-sky-800', icon: Info },
  warning: { className: 'border-amber-200 bg-amber-50 text-amber-800', icon: TriangleAlert },
  danger: { className: 'border-red-200 bg-red-50 text-red-800', icon: XCircle },
} satisfies Record<ToastTone, { className: string; icon: typeof Info }>;

export function Toast({
  children,
  title,
  tone = 'info',
}: {
  children?: ReactNode;
  title: string;
  tone?: ToastTone;
}) {
  const Icon = toneMap[tone].icon;

  return (
    <div
      className={cn(
        'flex max-w-sm items-start gap-3 rounded-md border p-4 shadow-floating',
        toneMap[tone].className,
      )}
      role="status"
    >
      <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        {children ? <p className="mt-1 text-sm">{children}</p> : null}
      </div>
    </div>
  );
}
