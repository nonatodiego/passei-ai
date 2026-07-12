import { Badge, DataTable, type Column } from '@/design-system';
import { calculateAccuracyRate } from '@/study/services';
import type { StudySession } from '@/study/types';

import { materialTypeLabel, studyStatusLabel, studyStatusTone } from './studySessionLabels';

const columns: Column<StudySession>[] = [
  { key: 'date', header: 'Data', render: (session) => session.date },
  { key: 'discipline', header: 'Disciplina', render: (session) => session.disciplineName },
  { key: 'subject', header: 'Assunto', render: (session) => session.subject },
  { key: 'duration', header: 'Duracao', render: (session) => `${session.durationMinutes} min` },
  { key: 'material', header: 'Material', render: (session) => materialTypeLabel[session.materialType] },
  { key: 'questions', header: 'Questoes', render: (session) => session.questionsAnswered },
  {
    key: 'accuracy',
    header: 'Acertos',
    render: (session) => `${calculateAccuracyRate(session.correctAnswers, session.questionsAnswered)}%`,
  },
  {
    key: 'status',
    header: 'Status',
    render: (session) => (
      <Badge tone={studyStatusTone[session.status]}>{studyStatusLabel[session.status]}</Badge>
    ),
  },
];

export function StudySessionHistory({ sessions }: { sessions: StudySession[] }) {
  return (
    <DataTable
      columns={columns}
      emptyMessage="Nenhuma sessao encontrada."
      rows={sessions}
    />
  );
}
