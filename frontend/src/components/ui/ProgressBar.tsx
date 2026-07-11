export function ProgressBar({
  value,
  label,
}: {
  value: number;
  label?: string;
}) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-sm text-app-muted">
          <span>{label}</span>
          <span className="font-medium text-app-text">{safeValue}%</span>
        </div>
      ) : null}
      <div className="h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-app-primary"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
