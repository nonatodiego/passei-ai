import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={cn('mx-auto max-w-7xl px-4 py-6 md:px-6', className)}>{children}</main>;
}

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn('space-y-4', className)}>{children}</section>;
}

export function Content({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('space-y-6', className)}>{children}</div>;
}
