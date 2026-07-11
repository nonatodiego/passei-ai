import { Card, CardDescription, CardHeader, CardTitle } from '@/design-system';
import type { ScheduleActivity } from '@/types/schedule';

import { ScheduleCard } from './ScheduleCard';

function groupByDate(activities: ScheduleActivity[]) {
  return activities.reduce<Record<string, ScheduleActivity[]>>((groups, activity) => {
    groups[activity.date] = [...(groups[activity.date] ?? []), activity];
    return groups;
  }, {});
}

export function ScheduleCalendar({ activities }: { activities: ScheduleActivity[] }) {
  const grouped = groupByDate(activities);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {Object.entries(grouped).map(([date, items]) => (
        <Card className="space-y-3" key={date}>
          <CardHeader>
            <CardTitle>{date}</CardTitle>
            <CardDescription>{items.length} atividades planejadas</CardDescription>
          </CardHeader>
          <div className="space-y-3">
            {items.map((activity) => (
              <ScheduleCard activity={activity} key={activity.id} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
