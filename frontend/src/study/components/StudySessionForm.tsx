import { useEffect, useState } from 'react';

import { Button, Card, CardDescription, CardHeader, CardTitle, Input, Select } from '@/design-system';
import { db } from '@/core/database/database';
import { StudySessionService, validateStudySessionInput } from '@/study/services';
import type { StudySessionInput } from '@/study/types';

import { defaultStudySessionInput } from '../hooks';
import { difficultyLabel, materialTypeLabel, studyStatusLabel } from './studySessionLabels';

const fallbackDisciplineOptions = [
  { label: 'Selecione', value: '' },
  { label: 'Gestao e Governanca de TI', value: 'governanca' },
  { label: 'Banco de Dados', value: 'banco' },
  { label: 'Redes de Computadores', value: 'redes' },
  { label: 'Lingua Portuguesa', value: 'portugues' },
];

export function StudySessionForm({
  initialInput,
  onSaved,
}: {
  initialInput?: Partial<StudySessionInput>;
  onSaved?: () => void;
}) {
  const [input, setInput] = useState<StudySessionInput>({ ...defaultStudySessionInput, ...initialInput });
  const [message, setMessage] = useState('');
  const [disciplineOptions, setDisciplineOptions] = useState(fallbackDisciplineOptions);
  const [submitted, setSubmitted] = useState(false);
  const validation = validateStudySessionInput(input);
  const errors = submitted ? validation.errors : {};

  useEffect(() => {
    let active = true;
    void db.disciplines.orderBy('name').toArray().then((disciplines) => {
      if (!active || disciplines.length === 0) return;
      setDisciplineOptions([
        { label: 'Selecione', value: '' },
        ...disciplines.map((discipline) => ({ label: discipline.name, value: discipline.id })),
      ]);
    });
    return () => { active = false; };
  }, []);

  function updateNumber(field: keyof StudySessionInput, value: string) {
    setInput((current) => ({ ...current, [field]: Number(value) }));
  }

  async function handleSubmit() {
    setSubmitted(true);
    const result = validateStudySessionInput(input);

    if (!result.isValid) {
      setMessage('Revise os campos obrigatorios.');
      return;
    }

    try {
      await StudySessionService.createSession(input, Boolean(input.scheduleItemId));
      setMessage('Sessao registrada com sucesso e salva neste navegador.');
      onSaved?.();
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : 'Nao foi possivel registrar a sessao.');
    }
  }

  return (
    <Card className="p-0">
      <CardHeader className="border-b border-app-border p-5">
        <CardTitle>Registrar sessao</CardTitle>
        <CardDescription>Preencha apenas os fatos do bloco estudado</CardDescription>
      </CardHeader>
      <div className="space-y-5 px-4 pb-4">
        <fieldset className="space-y-3">
          <legend className="mb-3 text-sm font-semibold text-app-text">Identificacao</legend>
          <div className="grid gap-3 md:grid-cols-2">
        <Select
          error={errors.disciplineId}
          label="Disciplina"
          name="discipline"
          onChange={(event) =>
            setInput((current) => ({
              ...current,
              disciplineId: event.target.value,
              disciplineName: disciplineOptions.find((option) => option.value === event.target.value)?.label ?? '',
            }))
          }
          options={disciplineOptions}
          value={input.disciplineId}
        />
        <Input
          error={errors.subject}
          label="Assunto"
          name="subject"
          onChange={(event) => setInput((current) => ({ ...current, subject: event.target.value }))}
          value={input.subject}
        />
          </div>
        </fieldset>
        <fieldset className="space-y-3 border-t border-app-border pt-4">
          <legend className="text-sm font-semibold text-app-text">Bloco de estudo</legend>
          <div className="grid gap-3 md:grid-cols-2">
        <Select
          label="Tipo de material"
          name="material"
          onChange={(event) =>
            setInput((current) => ({ ...current, materialType: event.target.value as StudySessionInput['materialType'] }))
          }
          options={Object.entries(materialTypeLabel).map(([value, label]) => ({ label, value }))}
          value={input.materialType}
        />
        <Input
          label="Data"
          name="date"
          onChange={(event) => setInput((current) => ({ ...current, date: event.target.value }))}
          type="date"
          value={input.date}
        />
        <Input
          error={errors.durationMinutes}
          label="Duracao"
          min={1}
          name="duration"
          onChange={(event) => updateNumber('durationMinutes', event.target.value)}
          type="number"
          value={input.durationMinutes}
        />
        <Select
          label="Dificuldade"
          name="difficulty"
          onChange={(event) =>
            setInput((current) => ({ ...current, difficulty: event.target.value as StudySessionInput['difficulty'] }))
          }
          options={Object.entries(difficultyLabel).map(([value, label]) => ({ label, value }))}
          value={input.difficulty}
        />
          </div>
        </fieldset>
        <fieldset className="space-y-3 border-t border-app-border pt-4">
          <legend className="text-sm font-semibold text-app-text">Desempenho</legend>
          <div className="grid gap-3 md:grid-cols-3">
        <Input
          error={errors.questionsAnswered}
          label="Questoes"
          min={0}
          name="questions"
          onChange={(event) => updateNumber('questionsAnswered', event.target.value)}
          type="number"
          value={input.questionsAnswered}
        />
        <Input
          error={errors.correctAnswers}
          label="Acertos"
          min={0}
          name="correct"
          onChange={(event) => updateNumber('correctAnswers', event.target.value)}
          type="number"
          value={input.correctAnswers}
        />
        <Input
          error={errors.wrongAnswers}
          label="Erros"
          min={0}
          name="wrong"
          onChange={(event) => updateNumber('wrongAnswers', event.target.value)}
          type="number"
          value={input.wrongAnswers}
        />
          </div>
        </fieldset>
        <fieldset className="space-y-3 border-t border-app-border pt-4">
          <legend className="text-sm font-semibold text-app-text">Contexto</legend>
          <div className="grid gap-3 md:grid-cols-2">
        <Select
          label="Status"
          name="session-status"
          onChange={(event) =>
            setInput((current) => ({ ...current, status: event.target.value as StudySessionInput['status'] }))
          }
          options={Object.entries(studyStatusLabel).map(([value, label]) => ({ label, value }))}
          value={input.status}
        />
        <Input
          label="Origem"
          name="source"
          onChange={(event) => setInput((current) => ({ ...current, source: event.target.value }))}
          value={input.source}
        />
        <Input
          label="Observacoes"
          name="notes"
          onChange={(event) => setInput((current) => ({ ...current, notes: event.target.value }))}
          value={input.notes}
        />
          </div>
        </fieldset>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-app-border px-4 py-4">
        <p className="text-sm text-app-muted" role="status">
          {message}
        </p>
        <Button onClick={() => void handleSubmit()}>Registrar</Button>
      </div>
    </Card>
  );
}
