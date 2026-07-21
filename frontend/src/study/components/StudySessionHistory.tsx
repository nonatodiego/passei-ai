import { Pencil, Trash2 } from 'lucide-react';
import { Badge, Button, DataTable, type Column } from '@/design-system';
import { calculateAccuracyRate } from '@/study/services';
import type { StudySession } from '@/study/types';

import { materialTypeLabel, studyStatusLabel, studyStatusTone } from './studySessionLabels';

function columns(
  onEdit?: (session: StudySession) => void,
  onDelete?: (session: StudySession) => void,
): Column<StudySession>[] { return [
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
  ...(onEdit || onDelete ? [{
    key: 'actions',
    header: 'Acoes',
    render: (session: StudySession) => (
      <div className="flex gap-1">
        {onEdit ? <Button aria-label={`Editar sessao ${session.subject}`} icon={<Pencil aria-hidden="true" className="h-4 w-4" />} onClick={() => onEdit(session)} size="sm" variant="ghost">Editar</Button> : null}
        {onDelete ? <Button aria-label={`Excluir sessao ${session.subject}`} icon={<Trash2 aria-hidden="true" className="h-4 w-4" />} onClick={() => onDelete(session)} size="sm" variant="danger">Excluir</Button> : null}
      </div>
    ),
  }] : []),
]; }

export function StudySessionHistory({
  onDelete,
  onEdit,
  sessions,
}: {
  onDelete?: (session: StudySession) => void;
  onEdit?: (session: StudySession) => void;
  sessions: StudySession[];
}) {
  return (
    <DataTable
      columns={columns(onEdit, onDelete)}
      emptyMessage="Nenhuma sessao encontrada."
      rows={sessions}
    />
  );
}
