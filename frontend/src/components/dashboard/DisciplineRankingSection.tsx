import { Badge, Card, CardDescription, CardHeader, CardTitle, Progress } from '@/design-system';
import type { DisciplineRankingItem } from '@/types/dashboard';

const trendTone: Record<DisciplineRankingItem['trend'], 'green' | 'amber' | 'red'> = {
  subiu: 'green',
  estável: 'amber',
  caiu: 'red',
};

export function DisciplineRankingSection({
  items,
}: {
  items: DisciplineRankingItem[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking de disciplinas</CardTitle>
        <CardDescription>Visão por acertos e volume de questões.</CardDescription>
      </CardHeader>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div className="space-y-2" key={item.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-app-text">
                  {index + 1}. {item.name}
                </p>
                <p className="text-sm text-app-muted">
                  {item.solvedQuestions} questões resolvidas
                </p>
              </div>
              <Badge tone={trendTone[item.trend]}>{item.trend}</Badge>
            </div>
            <Progress label={`${item.accuracy}% de acertos`} value={item.accuracy} />
          </div>
        ))}
      </div>
    </Card>
  );
}
