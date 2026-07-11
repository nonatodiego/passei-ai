import type { Column } from '@/components/ui/DataTable';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { questionSessions } from '@/mocks/data';
import type { QuestionSession } from '@/types';

const columns: Column<QuestionSession>[] = [
  { key: 'board', header: 'Banca', render: (row) => row.board },
  { key: 'discipline', header: 'Disciplina', render: (row) => row.discipline },
  { key: 'subject', header: 'Assunto', render: (row) => row.subject },
  { key: 'total', header: 'Quantidade', render: (row) => row.total },
  { key: 'hits', header: 'Acertos', render: (row) => row.hits },
  { key: 'misses', header: 'Erros', render: (row) => row.misses },
  { key: 'canceled', header: 'Anuladas', render: (row) => row.canceled },
  { key: 'percentage', header: 'Percentual', render: (row) => `${row.percentage}%` },
  { key: 'time', header: 'Tempo', render: (row) => `${row.timeSpentMinutes} min` },
  { key: 'source', header: 'Origem', render: (row) => row.source },
];

export function QuestionsPage() {
  return (
    <div className="space-y-4">
      <FilterBar filters={['Banca', 'Disciplina', 'Origem']} />
      <DataTable columns={columns} rows={questionSessions} />
    </div>
  );
}
