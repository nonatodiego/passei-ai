import { Button, Card, CardDescription, CardHeader, CardTitle } from '@/design-system';
import { timerSecondsToMinutes } from '@/study/services';
import type { StudyTimerAction, StudyTimerState } from '@/study/types';

function formatElapsed(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

export function StudySessionTimer({
  dispatch,
  timer,
}: {
  dispatch: (action: StudyTimerAction) => void;
  timer: StudyTimerState;
}) {
  const measuredMinutes = timerSecondsToMinutes(timer.elapsedSeconds);

  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle>Timer de estudo</CardTitle>
        <CardDescription>Controle local para transformar foco em registro</CardDescription>
      </CardHeader>
      <div className="space-y-4">
        <div className="rounded-md border border-app-border bg-slate-50 p-5 text-center">
          <p className="text-4xl font-semibold tracking-normal text-app-text">{formatElapsed(timer.elapsedSeconds)}</p>
          <p className="mt-1 text-xs font-medium uppercase text-app-muted">Status: {timer.status}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => dispatch({ type: 'start' })} size="sm">Iniciar</Button>
          <Button onClick={() => dispatch({ type: 'pause' })} size="sm" variant="secondary">Pausar</Button>
          <Button onClick={() => dispatch({ type: 'resume' })} size="sm" variant="secondary">Continuar</Button>
          <Button onClick={() => dispatch({ type: 'finish' })} size="sm" variant="secondary">Encerrar</Button>
          <Button className="col-span-2" onClick={() => dispatch({ type: 'discard' })} size="sm" variant="ghost">Descartar</Button>
        </div>
        {timer.status === 'finished' ? (
          <p className="text-sm text-app-muted">
            Tempo medido pronto para virar uma sessao: {measuredMinutes} min.
          </p>
        ) : null}
      </div>
    </Card>
  );
}
