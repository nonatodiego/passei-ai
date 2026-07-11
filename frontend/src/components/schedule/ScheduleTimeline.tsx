import { Badge, Card } from '@/design-system';
import type { ScheduleActivity } from '@/types/schedule';

import { activityTypeLabel, priorityLabel, priorityTone, statusLabel } from './scheduleLabels';

export function ScheduleTimeline({ activities }: { activities: ScheduleActivity[] }) {
  return (
    <Card>
      <ol className="space-y-4">
        {activities.map((activity) => (
          <li className="grid gap-3 border-l-2 border-app-border pl-4 md:grid-cols-[120px_1fr]" key={activity.id}>
            <div className="text-sm font-semibold text-app-primary">
              {activity.date}
              <span className="block text-app-muted">{activity.time}</span>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-app-text">{activity.discipline}</h3>
                <Badge tone={priorityTone[activity.priority]}>{priorityLabel[activity.priority]}</Badge>
              </div>
              <p className="text-sm text-app-muted">{activity.subject}</p>
              <p className="text-xs text-app-muted">
                {activityTypeLabel[activity.type]} - {statusLabel[activity.status]} - {activity.estimatedMinutes} min
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
