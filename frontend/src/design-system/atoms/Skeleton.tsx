import { cn } from '@/utils/cn';

export function Skeleton({
  className,
  label = 'Carregando conteúdo',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      aria-label={label}
      className={cn('block animate-pulse rounded-md bg-slate-200', className)}
      role="status"
    />
  );
}
