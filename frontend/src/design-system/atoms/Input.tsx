import type { InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export function Input({ className, error, id, label, ...props }: InputProps) {
  const inputId = id ?? props.name;
  const errorId = error && inputId ? `${inputId}-error` : undefined;

  return (
    <div className="block space-y-2">
      {label ? <label className="block text-sm font-medium text-app-muted" htmlFor={inputId}>{label}</label> : null}
      <input
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        className={cn(
          'h-10 w-full rounded-md border border-app-border bg-white px-3 text-sm text-app-text outline-none transition placeholder:text-slate-400 focus:border-app-primary focus:ring-2 focus:ring-blue-100',
          error && 'border-app-danger focus:border-app-danger focus:ring-red-100',
          className,
        )}
        id={inputId}
        {...props}
      />
      {error ? (
        <span className="text-xs font-medium text-app-danger" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
