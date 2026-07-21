import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import 'fake-indexeddb/auto';

import { defaultStudySessionFilters, defaultStudySessionInput } from '@/study/hooks';
import { studySessionMocks } from '@/study/mocks';
import {
  calculateAccuracyRate,
  calculateStudySessionSummary,
  filterStudySessions,
  StudySessionService,
  studyTimerReducer,
  validateStudySessionInput,
} from '@/study/services';
import { StudySessionsView } from '@/study/pages/StudySessionsPage';
import type { StudySessionSummary, StudyTimerState } from '@/study/types';

const summary: StudySessionSummary = calculateStudySessionSummary(studySessionMocks);
const timer: StudyTimerState = {
  elapsedSeconds: 0,
  status: 'idle',
};

describe('StudySessionsPage', () => {
  it('renders the study sessions page', () => {
    const html = renderToStaticMarkup(
      <StudySessionsView
        allSessions={studySessionMocks}
        dispatchTimer={vi.fn()}
        filters={defaultStudySessionFilters}
        onDeleteSession={vi.fn()}
        onFiltersChange={vi.fn()}
        sessions={studySessionMocks}
        status="success"
        summary={summary}
        timer={timer}
      />,
    );

    expect(html).toContain('Sessoes de Estudo');
    expect(html).toContain('Nova sessao de estudo');
    expect(html).toContain('Historico');
    expect(html).toContain('Timer de estudo');
    expect(html).toContain('Excluir');
  });

  it('creates a valid persisted study session', async () => {
    const session = await StudySessionService.createSession({
      ...defaultStudySessionInput,
      correctAnswers: 8,
      disciplineId: 'banco',
      disciplineName: 'Banco de Dados',
      durationMinutes: 45,
      questionsAnswered: 10,
      subject: 'SQL',
      wrongAnswers: 2,
    });

    expect(session.id).toBeTruthy();
    expect(session.subject).toBe('SQL');
    expect(session.correctAnswers).toBe(8);
  });

  it('updates an existing persisted study session', async () => {
    const session = await StudySessionService.createSession({
      ...defaultStudySessionInput, disciplineId: 'banco', disciplineName: 'Banco de Dados', subject: 'SQL',
    });
    const updated = await StudySessionService.updateSession(session.id, {
      ...session, durationMinutes: 90, notes: 'Sessao corrigida',
    });
    expect(updated.durationMinutes).toBe(90);
    expect(updated.notes).toBe('Sessao corrigida');
  });

  it('validates invalid study session data', () => {
    const result = validateStudySessionInput({
      ...defaultStudySessionInput,
      correctAnswers: 4,
      disciplineId: '',
      disciplineName: '',
      durationMinutes: 0,
      questionsAnswered: 3,
      subject: '',
      wrongAnswers: 1,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.subject).toContain('obrigatorio');
    expect(result.errors.durationMinutes).toContain('maior que zero');
    expect(result.errors.correctAnswers).toContain('superar');
  });

  it('calculates accuracy rate', () => {
    expect(calculateAccuracyRate(8, 10)).toBe(80);
    expect(calculateAccuracyRate(0, 0)).toBe(0);
  });

  it('filters sessions by discipline and subject query', () => {
    const filtered = filterStudySessions(studySessionMocks, {
      ...defaultStudySessionFilters,
      disciplineId: 'banco',
      query: 'sql',
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.disciplineName).toBe('Banco de Dados');
  });

  it('renders the empty state', () => {
    const html = renderToStaticMarkup(
      <StudySessionsView
        allSessions={[]}
        dispatchTimer={vi.fn()}
        filters={defaultStudySessionFilters}
        onFiltersChange={vi.fn()}
        sessions={[]}
        status="empty"
        summary={calculateStudySessionSummary([])}
        timer={timer}
      />,
    );

    expect(html).toContain('Nenhuma sessao de estudo');
  });

  it('renders the error state', () => {
    const html = renderToStaticMarkup(
      <StudySessionsView
        allSessions={[]}
        dispatchTimer={vi.fn()}
        filters={defaultStudySessionFilters}
        onFiltersChange={vi.fn()}
        sessions={[]}
        status="error"
        summary={calculateStudySessionSummary([])}
        timer={timer}
      />,
    );

    expect(html).toContain('Nao foi possivel carregar sessoes');
  });

  it('handles basic timer transitions', () => {
    const started = studyTimerReducer(timer, { type: 'start' });
    const ticked = studyTimerReducer(started, { seconds: 90, type: 'tick' });
    const paused = studyTimerReducer(ticked, { type: 'pause' });
    const resumed = studyTimerReducer(paused, { type: 'resume' });
    const finished = studyTimerReducer(resumed, { type: 'finish' });

    expect(ticked.elapsedSeconds).toBe(90);
    expect(paused.status).toBe('paused');
    expect(resumed.status).toBe('running');
    expect(finished.status).toBe('finished');
  });
});
