import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

import { Button } from '@/design-system/atoms/Button';

export function EmptyState({
  actionLabel,
  description,
  icon: Icon = Inbox,
  onAction,
  title,
}: {
  actionLabel?: string;
  description: string;
  icon?: LucideIcon;
  onAction?: () => void;
  title: string;
}) {
  return (
    <div className="rounded-md border border-dashed border-app-border bg-white p-8 text-center">
      <Icon aria-hidden="true" className="mx-auto h-10 w-10 text-app-muted" />
      <h2 className="mt-4 text-base font-semibold text-app-text">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-app-muted">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-5" onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
