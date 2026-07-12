import { Archive, CalendarClock, CheckCircle2, History } from 'lucide-react';

import { Badge, Button, Drawer } from '@/design-system';
import type { ErrorAction, ErrorRecord } from '@/error-bank/types';

export function ErrorDetailsDrawer({
  errorRecord,
  onAction,
  onClose,
}: {
  errorRecord?: ErrorRecord;
  onAction: (action: ErrorAction) => void;
  onClose: () => void;
}) {
  return (
    <Drawer isOpen={Boolean(errorRecord)} onClose={onClose} title="Detalhes do erro">
      {errorRecord ? (
        <div className="space-y-6 text-sm">
          <div className="flex flex-wrap gap-2">
            <Badge tone="red">{errorRecord.priority}</Badge>
            <Badge tone="blue">{errorRecord.status}</Badge>
            <Badge tone="slate">Recorrencia {errorRecord.recurrence}</Badge>
          </div>
          <section><h3 className="font-semibold text-app-text">O que aconteceu</h3><p className="mt-2 text-app-muted">{errorRecord.question}</p><dl className="mt-3 space-y-2"><div><dt className="font-medium">Resposta marcada</dt><dd>{errorRecord.selectedAnswer}</dd></div><div><dt className="font-medium">Resposta correta</dt><dd>{errorRecord.correctAnswer}</dd></div></dl></section>
          <section><h3 className="font-semibold text-app-text">Aprendizado</h3><p className="mt-2"><strong>Explicacao:</strong> {errorRecord.explanation}</p><p className="mt-2"><strong>Motivo:</strong> {errorRecord.reason}</p><p className="mt-2"><strong>Acao corretiva:</strong> {errorRecord.correctiveAction}</p></section>
          <section><h3 className="font-semibold text-app-text">Historico e organizacao</h3><ul className="mt-2 space-y-2">{errorRecord.history.map((item) => <li key={item}>{item}</li>)}</ul><p className="mt-3"><strong>Notas:</strong> {errorRecord.notes || '-'}</p><div className="mt-3 flex flex-wrap gap-2">{errorRecord.tags.map((tag) => <Badge key={tag} tone="slate">{tag}</Badge>)}</div></section>
          <div className="grid gap-2 border-t border-app-border pt-5 sm:grid-cols-2">
            <Button icon={<CheckCircle2 className="h-4 w-4" />} onClick={() => onAction('review')} variant="secondary">Marcar revisado</Button>
            <Button icon={<CheckCircle2 className="h-4 w-4" />} onClick={() => onAction('master')} variant="secondary">Marcar dominado</Button>
            <Button icon={<History className="h-4 w-4" />} onClick={() => onAction('recur')} variant="secondary">Nova ocorrencia</Button>
            <Button icon={<CalendarClock className="h-4 w-4" />} onClick={() => onAction('reschedule')} variant="secondary">Reagendar revisao</Button>
            <Button className="sm:col-span-2" icon={<Archive className="h-4 w-4" />} onClick={() => onAction('archive')} variant="ghost">Arquivar</Button>
          </div>
        </div>
      ) : null}
    </Drawer>
  );
}
