import { Badge, DataTable, type Column } from '@/design-system';
import type { ScheduleActivity } from '@/types/schedule';

import {
  activityTypeLabel,
  priorityLabel,
  priorityTone,
  statusLabel,
  statusTone,
} from './scheduleLabels';

const columns: Column<ScheduleActivity>[] = [
  { key: 'date', header: 'Data', render: (row) => `${row.date} ${row.time}` },
  { key: 'discipline', header: 'Disciplina', render: (row) => row.discipline },
  { key: 'subject', header: 'Assunto', render: (row) => row.subject },
  { key: 'type', header: 'Tipo', render: (row) => activityTypeLabel[row.type] },
  {
    key: 'priority',
    header: 'Prioridade',
    render: (row) => <Badge tone={priorityTone[row.priority]}>{priorityLabel[row.priority]}</Badge>,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <Badge tone={statusTone[row.status]}>{statusLabel[row.status]}</Badge>,
  },
  { key: 'duration', header: 'Tempo', render: (row) => `${row.estimatedMinutes} min` },
  { key: 'source', header: 'Origem', render: (row) => row.source },
];

export function ScheduleList({ activities }: { activities: ScheduleActivity[] }) {
  return <DataTable columns={columns} emptyMessage="Nenhuma atividade encontrada." rows={activities} />;
}
