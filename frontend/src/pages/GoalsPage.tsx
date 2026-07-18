import { useEffect, useState } from 'react';

import { db } from '@/core/database/database';
import { publishLocalDataChange } from '@/core/database/events';
import { useLocalData } from '@/core/providers/useLocalData';
import { Button, Card, Content, EmptyState, ErrorState, Input, LoadingState, Toast } from '@/design-system';
import { normalizeGoals } from '@/goals/services';
import type { GoalKind, GoalRecord } from '@/goals/types';
import { getLocalWeekRange, toLocalDateKey } from '@/shared/utils/date';

type StudyProgress = Record<GoalKind, number>;

const emptyProgress: StudyProgress = {
  accuracy: 0,
  hours: 0,
  mockExams: 0,
  questions: 0,
  reviews: 0,
};

export function GoalsPage() {
  const [goals, setGoals] = useState<GoalRecord[]>([]);
  const [progress, setProgress] = useState<StudyProgress>(emptyProgress);
  const [accuracyHasData, setAccuracyHasData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; tone: 'danger' | 'success' }>();
  const { revision } = useLocalData();

  useEffect(() => {
    let active = true;

    void (async () => {
      const [stored, sessions, blocks, reviews, exams] = await Promise.all([
        db.goals.toArray(),
        db.studySessions.toArray(),
        db.questionBlocks.toArray(),
        db.reviews.toArray(),
        db.mockExams.toArray(),
      ]);
      const week = getLocalWeekRange().start;
      const today = toLocalDateKey();
      const normalized = normalizeGoals(stored);
      const weeklySessions = (sessions as unknown as Array<{ date: string; durationMinutes: number }>).filter(
        (item) => item.date >= week && item.date <= today,
      );
      const weeklyQuestions = (blocks as unknown as Array<{
        correctAnswers: number;
        date: string;
        totalQuestions: number;
      }>).filter((item) => item.date >= week && item.date <= today);
      const questionCount = weeklyQuestions.reduce((sum, item) => sum + item.totalQuestions, 0);

      if (active) {
        setGoals(normalized);
        setProgress({
          accuracy: questionCount
            ? Math.round(weeklyQuestions.reduce((sum, item) => sum + item.correctAnswers, 0) / questionCount * 100)
            : 0,
          hours: weeklySessions.reduce((sum, item) => sum + item.durationMinutes, 0) / 60,
          mockExams: (exams as unknown as Array<{ date: string }>).filter((item) => item.date >= week).length,
          questions: questionCount,
          reviews: (reviews as unknown as Array<{ completedAt?: string; status: string; updatedAt: string }>).filter(
            (item) => item.status === 'completed' && (item.completedAt ?? item.updatedAt).slice(0, 10) >= week,
          ).length,
        });
        setAccuracyHasData(questionCount > 0);
        setError(false);
        setLoading(false);
      }
    })().catch(() => {
      if (active) {
        setError(true);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [revision]);

  async function save() {
    if (isSaving) return;
    if (goals.some((goal) => !Number.isFinite(goal.target) || goal.target < 0)) {
      setFeedback({ message: 'As metas devem conter valores validos e nao negativos.', tone: 'danger' });
      return;
    }

    setIsSaving(true);
    try {
      const timestamp = new Date().toISOString();
      await db.goals.bulkPut(goals.map((goal) => ({
        ...goal,
        createdAt: goal.createdAt || timestamp,
        name: goal.name.replace(/^\d+\s+/, ''),
        updatedAt: timestamp,
      })) as never);
      publishLocalDataChange();
      setFeedback({ message: 'Metas salvas neste navegador.', tone: 'success' });
    } catch {
      setFeedback({ message: 'Nao foi possivel salvar as metas.', tone: 'danger' });
    } finally {
      setIsSaving(false);
    }
  }

  if (loading) return <Content><LoadingState label="Carregando metas locais" /></Content>;
  if (error) return <Content><ErrorState description="Os dados locais de metas nao puderam ser carregados." title="Nao foi possivel carregar metas" /></Content>;
  if (!goals.length) return <Content><EmptyState description="As configuracoes de metas ainda nao foram inicializadas." title="Metas indisponiveis" /></Content>;

  return (
    <Content className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-app-text">Metas</h1>
        <p className="mt-2 text-app-muted">Objetivos editaveis; o progresso usa somente registros desta semana.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal) => {
          const value = progress[goal.kind];
          const hasData = goal.kind !== 'accuracy' || accuracyHasData;
          const unit = goal.kind === 'hours' ? 'horas' : goal.kind === 'accuracy' ? '%' : '';
          return (
            <Card key={goal.id}>
              <label className="block text-sm font-semibold text-app-text" htmlFor={goal.id}>
                {goal.name.replace(/^\d+\s+/, '')}
              </label>
              <Input
                id={goal.id}
                min={0}
                name={goal.id}
                onChange={(event) => setGoals((current) => current.map((item) => (
                  item.id === goal.id ? { ...item, target: Number(event.target.value) } : item
                )))}
                type="number"
                value={goal.target}
              />
              <p className="mt-4 text-xl font-bold text-app-text">
                {hasData ? `${Math.round(value * 10) / 10} de ${goal.target} ${unit}` : 'Sem dados'}
              </p>
              <p className="mt-1 text-sm text-app-muted">
                {goal.kind === 'accuracy'
                  ? 'Taxa calculada pelas questoes registradas.'
                  : 'Progresso real desta semana.'}
              </p>
              {hasData ? (
                <div className="mt-4 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-app-primary"
                    style={{ width: `${Math.min(100, goal.target ? value / goal.target * 100 : 0)}%` }}
                  />
                </div>
              ) : null}
            </Card>
          );
        })}
      </section>
      <Button isLoading={isSaving} onClick={() => void save()}>Salvar metas</Button>
      {feedback ? <Toast title={feedback.message} tone={feedback.tone} /> : null}
    </Content>
  );
}
