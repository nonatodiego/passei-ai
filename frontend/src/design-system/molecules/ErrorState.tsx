import { TriangleAlert } from 'lucide-react';

import { Button } from '@/design-system/atoms/Button';

export function ErrorState({
  actionLabel,
  description,
  onAction,
  title = 'Não foi possível carregar os dados',
}: {
  actionLabel?: string;
  description: string;
  onAction?: () => void;
  title?: string;
}) {
  return (
    <div
      className="rounded-md border border-red-200 bg-red-50 p-6 text-center text-red-900"
      role="alert"
    >
      <TriangleAlert aria-hidden="true" className="mx-auto h-10 w-10 text-app-danger" />
      <h2 className="mt-4 text-base font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-red-800">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-5" onClick={onAction} variant="danger">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
