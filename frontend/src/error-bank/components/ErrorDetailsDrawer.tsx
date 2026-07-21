import { useState } from 'react';
import { Archive, CalendarClock, CheckCircle2, History } from 'lucide-react';

import { Badge, Button, Drawer, Input } from '@/design-system';
import type { ErrorAction, ErrorRecord } from '@/error-bank/types';
import { toLocalDateKey } from '@/shared/utils/date';

export function ErrorDetailsDrawer({
  errorRecord,
  onAction,
  onClose,
}: {
  errorRecord?: ErrorRecord;
  onAction: (action: ErrorAction, date?: string) => Promise<void> | void;
  onClose: () => void;
}) {
  const [busyAction, setBusyAction] = useState<ErrorAction>();
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [reviewDate, setReviewDate] = useState(errorRecord?.nextReview || toLocalDateKey());

  async function run(action: ErrorAction, date?: string) {
    if (busyAction) return;
    setBusyAction(action);
    try {
      await onAction(action, date);
      if (action === 'reschedule') setIsRescheduling(false);
    } finally {
      setBusyAction(undefined);
    }
  }

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
          <section><h3 className="font-semibold text-app-text">Historico e organizacao</h3><ul className="mt-2 space-y-2">{errorRecord.history.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul><p className="mt-3"><strong>Notas:</strong> {errorRecord.notes || '-'}</p><div className="mt-3 flex flex-wrap gap-2">{errorRecord.tags.map((tag) => <Badge key={tag} tone="slate">{tag}</Badge>)}</div></section>
          <div className="grid gap-2 border-t border-app-border pt-5 sm:grid-cols-2">
            <Button disabled={Boolean(busyAction)} icon={<CheckCircle2 className="h-4 w-4" />} isLoading={busyAction === 'review'} onClick={() => void run('review')} variant="secondary">Marcar revisado</Button>
            <Button disabled={Boolean(busyAction)} icon={<CheckCircle2 className="h-4 w-4" />} isLoading={busyAction === 'master'} onClick={() => void run('master')} variant="secondary">Marcar dominado</Button>
            <Button disabled={Boolean(busyAction)} icon={<History className="h-4 w-4" />} isLoading={busyAction === 'recur'} onClick={() => void run('recur')} variant="secondary">Nova ocorrencia</Button>
            <Button disabled={Boolean(busyAction)} icon={<CalendarClock className="h-4 w-4" />} onClick={() => setIsRescheduling((current) => !current)} variant="secondary">Reagendar revisao</Button>
            {isRescheduling ? <div className="space-y-3 rounded-md border border-app-border p-3 sm:col-span-2"><Input label="Nova data da revisao" min={toLocalDateKey()} name="error-reschedule-date" onChange={(event) => setReviewDate(event.target.value)} type="date" value={reviewDate} /><div className="flex justify-end gap-2"><Button disabled={Boolean(busyAction)} onClick={() => setIsRescheduling(false)} size="sm" variant="ghost">Cancelar</Button><Button disabled={!reviewDate} isLoading={busyAction === 'reschedule'} onClick={() => void run('reschedule', reviewDate)} size="sm">Confirmar data</Button></div></div> : null}
            <Button className="sm:col-span-2" disabled={Boolean(busyAction)} icon={<Archive className="h-4 w-4" />} isLoading={busyAction === 'archive'} onClick={() => void run('archive')} variant="ghost">Arquivar</Button>
          </div>
        </div>
      ) : null}
    </Drawer>
  );
}
