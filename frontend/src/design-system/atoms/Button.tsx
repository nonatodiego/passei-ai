import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-app-primary text-white hover:bg-blue-700 focus-visible:ring-app-focus',
  secondary:
    'border border-app-border bg-white text-app-text hover:border-app-primary hover:text-app-primary focus-visible:ring-app-focus',
  ghost: 'text-app-muted hover:bg-slate-100 hover:text-app-text focus-visible:ring-app-focus',
  danger: 'bg-app-danger text-white hover:bg-red-700 focus-visible:ring-red-200',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  isLoading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className,
  disabled,
  icon,
  isLoading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        icon
      )}
      <span>{children}</span>
    </button>
  );
}
