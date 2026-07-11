import type { ReactNode } from 'react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/molecules/Card';
import { cn } from '@/utils/cn';

export function ChartCard({
  children,
  className,
  description,
  title,
}: {
  children: ReactNode;
  className?: string;
  description?: string;
  title: string;
}) {
  return (
    <Card className={cn('p-4', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <div className="min-h-72">{children}</div>
    </Card>
  );
}
