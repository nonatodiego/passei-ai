import { Badge } from '@/components/ui/Badge';
import { priorityTone, statusTone } from '@/components/ui/badgeUtils';
import type { Column } from '@/components/ui/DataTable';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { reviews } from '@/mocks/data';
import type { Review } from '@/types';
import { formatDate } from '@/utils/format';

const columns: Column<Review>[] = [
  { key: 'subject', header: 'Assunto', render: (row) => row.subject },
  { key: 'discipline', header: 'Disciplina', render: (row) => row.discipline },
  { key: 'dueDate', header: 'Data prevista', render: (row) => formatDate(row.dueDate) },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <Badge tone={statusTone(row.status)}>{row.status}</Badge>,
  },
  { key: 'origin', header: 'Origem', render: (row) => row.origin },
  {
    key: 'priority',
    header: 'Prioridade',
    render: (row) => <Badge tone={priorityTone(row.priority)}>{row.priority}</Badge>,
  },
];

export function ReviewsPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-5">
        {['24 horas', '7 dias', '15 dias', '30 dias', '60 dias'].map((period) => (
          <div className="rounded-lg border border-app-border bg-white p-4" key={period}>
            <p className="text-sm text-app-muted">Janela</p>
            <p className="mt-1 font-semibold text-app-text">{period}</p>
          </div>
        ))}
      </div>
      <FilterBar filters={['Disciplina', 'Status', 'Origem', 'Prioridade']} />
      <DataTable columns={columns} rows={reviews} />
    </div>
  );
}
