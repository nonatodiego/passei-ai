import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <article
      className={cn('rounded-md border border-app-border bg-white p-4 shadow-panel', className)}
      {...props}
    >
      {children}
    </article>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('mb-4 space-y-1', className)}>{children}</div>;
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={cn('text-base font-semibold text-app-text', className)}>{children}</h2>;
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn('text-sm text-app-muted', className)}>{children}</p>;
}
