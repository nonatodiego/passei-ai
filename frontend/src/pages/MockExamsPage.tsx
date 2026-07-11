import type { Column } from '@/components/ui/DataTable';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { mockExams } from '@/mocks/data';
import type { MockExam } from '@/types';
import { formatDate } from '@/utils/format';

const columns: Column<MockExam>[] = [
  { key: 'date', header: 'Data', render: (row) => formatDate(row.date) },
  { key: 'duration', header: 'Duração', render: (row) => `${row.durationMinutes} min` },
  {
    key: 'hits',
    header: 'Acertos por disciplina',
    render: (row) =>
      Object.entries(row.hitsByDiscipline)
        .map(([discipline, hits]) => `${discipline}: ${hits}`)
        .join(' | '),
  },
  { key: 'score', header: 'Nota', render: (row) => row.score },
  { key: 'percentage', header: 'Percentual', render: (row) => `${row.percentage}%` },
  { key: 'trend', header: 'Evolução', render: (row) => row.trend },
  { key: 'notes', header: 'Observações', render: (row) => row.notes },
];

export function MockExamsPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-app-border bg-white p-4">
        <p className="text-sm font-medium text-app-muted">Formato DATAPREV</p>
        <p className="mt-2 text-sm text-app-text">
          70 questões, 115 pontos, com Conhecimentos Específicos valendo peso 2,5.
        </p>
      </div>
      <FilterBar filters={['Data', 'Evolução', 'Percentual']} />
      <DataTable columns={columns} rows={mockExams} />
    </div>
  );
}
