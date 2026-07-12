import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={cn('mx-auto max-w-[1500px] px-4 pb-10 md:px-10', className)}>{children}</main>;
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
  return <div className={cn('space-y-8', className)}>{children}</div>;
}
