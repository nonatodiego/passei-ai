import { Card, CardDescription, CardHeader, CardTitle, Progress } from '@/design-system';
import type { ScheduleActivity } from '@/types/schedule';

import { statusLabel } from './scheduleLabels';

export function ScheduleSidebar({
  activities,
  engineFocus,
}: {
  activities: ScheduleActivity[];
  engineFocus: string;
}) {
  const completed = activities.filter((activity) => activity.status === 'completed').length;
  const progress = activities.length > 0 ? Math.round((completed / activities.length) * 100) : 0;

  return (
    <aside className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Agenda semanal</CardTitle>
          <CardDescription>{engineFocus}</CardDescription>
        </CardHeader>
        <Progress label="Progresso do periodo" value={progress} />
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Agenda diaria</CardTitle>
          <CardDescription>Blocos previstos para hoje</CardDescription>
        </CardHeader>
        <div className="space-y-3">
          {activities
            .filter((activity) => activity.date === '2026-07-11')
            .map((activity) => (
              <div className="rounded-md border border-app-border p-3" key={activity.id}>
                <p className="text-sm font-semibold text-app-text">{activity.time} - {activity.discipline}</p>
                <p className="text-sm text-app-muted">{activity.subject}</p>
                <p className="mt-1 text-xs text-app-muted">{statusLabel[activity.status]}</p>
              </div>
            ))}
        </div>
      </Card>
    </aside>
  );
}
