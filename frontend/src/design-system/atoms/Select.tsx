import type { SelectHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options: SelectOption[];
}

export function Select({
  className,
  error,
  id,
  label,
  options,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;
  const errorId = error && selectId ? `${selectId}-error` : undefined;

  return (
    <div className="block space-y-2">
      {label ? <label className="block text-sm font-medium text-app-muted" htmlFor={selectId}>{label}</label> : null}
      <select
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        className={cn(
          'h-10 w-full rounded-md border border-app-border bg-white px-3 text-sm text-app-text outline-none transition focus:border-app-primary focus:ring-2 focus:ring-blue-100',
          error && 'border-app-danger focus:border-app-danger focus:ring-red-100',
          className,
        )}
        id={selectId}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <span className="text-xs font-medium text-app-danger" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
