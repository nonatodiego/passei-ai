import { Badge, Card, CardDescription, CardHeader, CardTitle, Progress } from '@/design-system';
import type { TodayPlanItem } from '@/types/dashboard';

const statusTone: Record<TodayPlanItem['status'], 'blue' | 'green' | 'amber'> = {
  pendente: 'amber',
  'em andamento': 'blue',
  concluído: 'green',
};

export function TodayPlanSection({
  items,
  scheduleProgress,
}: {
  items: TodayPlanItem[];
  scheduleProgress: number;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Plano de Hoje</CardTitle>
        <CardDescription>Prioridades para manter execução e revisão em dia.</CardDescription>
      </CardHeader>
      <div className="space-y-3">
        {items.map((item) => (
          <div className="rounded-md border border-app-border p-3" key={item.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-app-text">{item.title}</p>
                <p className="mt-1 text-sm text-app-muted">{item.discipline}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-app-primary">
                  {item.time}
                </span>
                <Badge tone={statusTone[item.status]}>{item.status}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Progress className="mt-5" label="Progresso do cronograma" value={scheduleProgress} />
    </Card>
  );
}
