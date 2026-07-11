import { Badge, Card, CardDescription, CardHeader, CardTitle, DataTable } from '@/design-system';
import type { Column } from '@/design-system';
import type { RecentActivity } from '@/types/dashboard';
import { formatDate } from '@/utils/format';

const typeTone: Record<RecentActivity['type'], 'blue' | 'green' | 'amber' | 'slate'> = {
  estudo: 'green',
  questões: 'blue',
  revisão: 'amber',
  simulado: 'slate',
};

const columns: Column<RecentActivity>[] = [
  { key: 'date', header: 'Data', render: (row) => formatDate(row.date) },
  {
    key: 'type',
    header: 'Tipo',
    render: (row) => <Badge tone={typeTone[row.type]}>{row.type}</Badge>,
  },
  { key: 'title', header: 'Atividade', render: (row) => row.title },
  { key: 'description', header: 'Resumo', render: (row) => row.description },
];

export function RecentActivitiesSection({
  activities,
}: {
  activities: RecentActivity[];
}) {
  return (
    <Card className="p-0">
      <div className="p-4">
        <CardHeader className="mb-0">
          <CardTitle>Atividades recentes</CardTitle>
          <CardDescription>Últimos registros mockados de estudo, revisão e questões.</CardDescription>
        </CardHeader>
      </div>
      <DataTable columns={columns} rows={activities} />
    </Card>
  );
}
