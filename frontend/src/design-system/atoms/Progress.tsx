import { cn } from '@/utils/cn';

export function Progress({
  className,
  label,
  value,
}: {
  className?: string;
  label?: string;
  value: number;
}) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('space-y-2', className)}>
      {label ? (
        <div className="flex items-center justify-between text-sm text-app-muted">
          <span>{label}</span>
          <span className="font-medium text-app-text">{safeValue}%</span>
        </div>
      ) : null}
      <div
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        className="h-2 rounded-full bg-slate-200"
        role="progressbar"
      >
        <div
          className="h-2 rounded-full bg-app-primary"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
