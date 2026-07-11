import { Badge } from '@/components/ui/Badge';
import { priorityTone } from '@/components/ui/badgeUtils';
import type { Column } from '@/components/ui/DataTable';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { errorRecords } from '@/mocks/data';
import type { ErrorRecord } from '@/types';
import { formatDate } from '@/utils/format';

const columns: Column<ErrorRecord>[] = [
  { key: 'date', header: 'Data', render: (row) => formatDate(row.date) },
  { key: 'discipline', header: 'Disciplina', render: (row) => row.discipline },
  { key: 'subject', header: 'Assunto', render: (row) => row.subject },
  { key: 'question', header: 'Questão', render: (row) => row.question },
  { key: 'reason', header: 'Motivo', render: (row) => row.reason },
  { key: 'category', header: 'Categoria', render: (row) => row.category },
  { key: 'action', header: 'Ação', render: (row) => row.reviewAction },
  {
    key: 'priority',
    header: 'Prioridade',
    render: (row) => <Badge tone={priorityTone(row.priority)}>{row.priority}</Badge>,
  },
  { key: 'reviewed', header: 'Revisado', render: (row) => (row.reviewed ? 'Sim' : 'Não') },
  { key: 'reviewDate', header: 'Revisão', render: (row) => formatDate(row.reviewDate) },
  { key: 'recurrence', header: 'Recorrência', render: (row) => row.recurrence },
];

export function ErrorBankPage() {
  return (
    <div className="space-y-4">
      <FilterBar filters={['Disciplina', 'Categoria', 'Prioridade', 'Revisado']} />
      <DataTable columns={columns} rows={errorRecords} />
    </div>
  );
}
