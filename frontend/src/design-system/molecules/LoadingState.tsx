import { Skeleton } from '@/design-system/atoms/Skeleton';

export function LoadingState({ label = 'Carregando dados' }: { label?: string }) {
  return (
    <div aria-label={label} className="space-y-3 rounded-md border border-app-border bg-white p-4" role="status">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
