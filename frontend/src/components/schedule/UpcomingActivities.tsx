import { Card, CardDescription, CardHeader, CardTitle } from '@/design-system';
import type { ScheduleActivity } from '@/types/schedule';

import { ScheduleCard } from './ScheduleCard';

export function UpcomingActivities({ activities }: { activities: ScheduleActivity[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proximas atividades</CardTitle>
        <CardDescription>Ordenadas pela agenda gerada pelo Study Engine</CardDescription>
      </CardHeader>
      <div className="grid gap-3 md:grid-cols-2">
        {activities.slice(0, 4).map((activity) => (
          <ScheduleCard activity={activity} key={activity.id} />
        ))}
      </div>
    </Card>
  );
}
