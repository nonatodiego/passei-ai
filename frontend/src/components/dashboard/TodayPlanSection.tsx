import { Check, ChevronRight } from 'lucide-react';

import { Card } from '@/design-system';
import type { TodayPlanItem } from '@/types/dashboard';

export function TodayPlanSection({
  items,
}: {
  items: TodayPlanItem[];
  scheduleProgress: number;
}) {
  return (
    <Card className="h-full p-6">
      <h2 className="text-xl font-bold text-app-text">Plano de Hoje</h2>
      <div className="mt-6 space-y-5">
        {items.map((item, index) => {
          const isDone = index === 0;

          return (
            <div className="flex items-start gap-4" key={item.id}>
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                  isDone
                    ? 'border-app-success bg-app-success text-white'
                    : 'border-blue-300 bg-white text-transparent'
                }`}
              >
                <Check aria-hidden="true" className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-app-text">{item.title}</p>
                <p className="mt-1 text-sm text-app-muted">
                  {item.discipline} {item.time ? `• ${item.time}` : ''}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 border-t border-app-border pt-5 text-center">
        <a
          className="inline-flex items-center gap-2 text-sm font-bold text-app-primary hover:text-blue-700"
          href="/cronograma"
        >
          Ver cronograma completo
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </Card>
  );
}
