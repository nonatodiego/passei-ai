import { Badge } from '@/components/ui/Badge';
import { priorityTone } from '@/components/ui/badgeUtils';
import type { Column } from '@/components/ui/DataTable';
import { DataTable } from '@/components/ui/DataTable';
import { FilterBar } from '@/components/ui/FilterBar';
import { studySessions } from '@/mocks/data';
import type { StudySession } from '@/types';
import { formatDate } from '@/utils/format';

const columns: Column<StudySession>[] = [
  { key: 'date', header: 'Data', render: (row) => formatDate(row.date) },
  { key: 'discipline', header: 'Disciplina', render: (row) => row.discipline },
  { key: 'subject', header: 'Assunto', render: (row) => row.subject },
  { key: 'duration', header: 'Duração', render: (row) => `${row.durationMinutes} min` },
  { key: 'material', header: 'Material', render: (row) => row.materialType },
  {
    key: 'difficulty',
    header: 'Dificuldade',
    render: (row) => <Badge tone={priorityTone(row.difficulty)}>{row.difficulty}</Badge>,
  },
  { key: 'questions', header: 'Questões', render: (row) => row.questions },
  { key: 'hits', header: 'Acertos', render: (row) => row.hits },
  { key: 'misses', header: 'Erros', render: (row) => row.misses },
  { key: 'notes', header: 'Observações', render: (row) => row.notes },
];

export function StudiesPage() {
  return (
    <div className="space-y-4">
      <FilterBar filters={['Disciplina', 'Material', 'Dificuldade']} />
      <DataTable columns={columns} rows={studySessions} />
    </div>
  );
}
