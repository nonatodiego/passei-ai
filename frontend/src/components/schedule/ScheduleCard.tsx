import { Clock } from 'lucide-react';

import { Badge, Card, CardDescription, CardHeader, CardTitle } from '@/design-system';
import type { ScheduleActivity } from '@/types/schedule';

import {
  activityTypeLabel,
  priorityLabel,
  priorityTone,
  statusLabel,
  statusTone,
} from './scheduleLabels';

export function ScheduleCard({ activity }: { activity: ScheduleActivity }) {
  return (
    <Card className="h-full">
      <CardHeader className="mb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle>{activity.discipline}</CardTitle>
            <CardDescription>{activity.subject}</CardDescription>
          </div>
          <Badge tone={priorityTone[activity.priority]}>
            {priorityLabel[activity.priority]}
          </Badge>
        </div>
      </CardHeader>
      <div className="space-y-3 text-sm text-app-muted">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={statusTone[activity.status]}>{statusLabel[activity.status]}</Badge>
          <Badge tone="blue">{activityTypeLabel[activity.type]}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Clock aria-hidden="true" className="h-4 w-4" />
          <span>
            {activity.date} as {activity.time} - {activity.estimatedMinutes} min
          </span>
        </div>
        <p>Peso {activity.weight} - {activity.source}</p>
      </div>
    </Card>
  );
}
