import { Badge } from '@/components/ui/Badge';
import { priorityTone, statusTone } from '@/components/ui/badgeUtils';
import type { Column } from '@/components/ui/DataTable';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { scheduleItems } from '@/mocks/data';
import type { ScheduleItem } from '@/types';
import { formatDate } from '@/utils/format';

const columns: Column<ScheduleItem>[] = [
  { key: 'date', header: 'Data', render: (row) => formatDate(row.date) },
  { key: 'discipline', header: 'Disciplina', render: (row) => row.discipline },
  { key: 'content', header: 'Conteúdo', render: (row) => row.content },
  { key: 'type', header: 'Tipo', render: (row) => row.type },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <Badge tone={statusTone(row.status)}>{row.status}</Badge>,
  },
  {
    key: 'priority',
    header: 'Prioridade',
    render: (row) => <Badge tone={priorityTone(row.priority)}>{row.priority}</Badge>,
  },
  { key: 'planned', header: 'Previstas', render: (row) => `${row.plannedHours}h` },
  { key: 'done', header: 'Realizadas', render: (row) => `${row.completedHours}h` },
  { key: 'situation', header: 'Situação', render: (row) => row.situation },
  { key: 'notes', header: 'Observações', render: (row) => row.notes },
];

export function SchedulePage() {
  return (
    <div className="space-y-4">
      <FilterBar filters={['Disciplina', 'Tipo', 'Status', 'Período']} />
      <DataTable columns={columns} rows={scheduleItems} />
    </div>
  );
}
