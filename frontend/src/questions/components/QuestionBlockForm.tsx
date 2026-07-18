import { useState } from 'react';

import { Button, Card, CardDescription, CardHeader, CardTitle, Input, Select } from '@/design-system';
import { QuestionBlockService, validateQuestionBlock } from '@/questions/services';
import type { QuestionBlockInput } from '@/questions/types';
import { toLocalDateKey } from '@/shared/utils/date';

const initialInput: QuestionBlockInput = {
  annulledAnswers: 0, bank: '', correctAnswers: 0, date: toLocalDateKey(), difficulty: 'medium', discipline: '', durationMinutes: 0, notes: '', platform: '', subject: '', totalQuestions: 0, wrongAnswers: 0,
};

export function QuestionBlockForm() {
  const [input, setInput] = useState(initialInput);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const validationError = validateQuestionBlock(input);
  const updateNumber = (key: keyof QuestionBlockInput, value: string) => setInput((current) => ({ ...current, [key]: Number(value) }));

  async function save() {
    if (isSaving) return;
    setSubmitted(true);
    if (validationError) {
      setMessage(validationError);
      const firstInvalidId = !input.discipline.trim() ? 'question-block-discipline' : !input.subject.trim() ? 'question-block-subject' : 'question-block-total';
      window.requestAnimationFrame(() => document.getElementById(firstInvalidId)?.focus());
      return;
    }
    setIsSaving(true);
    try {
      await QuestionBlockService.create(input);
      setMessage('Bloco de questoes salvo neste navegador.');
      setInput((current) => ({ ...initialInput, date: current.date }));
      setSubmitted(false);
    } catch (reason) { setMessage(reason instanceof Error ? reason.message : 'Nao foi possivel salvar o bloco.'); }
    finally { setIsSaving(false); }
  }

  return <Card className="p-0"><CardHeader className="border-b border-app-border p-5"><CardTitle>Registrar bloco de questoes</CardTitle><CardDescription>Registre resultados de qualquer plataforma em poucos campos.</CardDescription></CardHeader><div className="grid gap-3 p-5 md:grid-cols-2"><Input error={submitted && !input.discipline ? 'Disciplina obrigatoria.' : undefined} label="Disciplina" name="question-block-discipline" onChange={(event) => setInput((current) => ({ ...current, discipline: event.target.value }))} value={input.discipline} /><Input error={submitted && !input.subject ? 'Assunto obrigatorio.' : undefined} label="Assunto" name="question-block-subject" onChange={(event) => setInput((current) => ({ ...current, subject: event.target.value }))} value={input.subject} /><Input label="Data" name="question-block-date" onChange={(event) => setInput((current) => ({ ...current, date: event.target.value }))} type="date" value={input.date} /><Input label="Banca" name="question-block-bank" onChange={(event) => setInput((current) => ({ ...current, bank: event.target.value }))} value={input.bank} /><Input label="Plataforma ou fonte" name="question-block-platform" onChange={(event) => setInput((current) => ({ ...current, platform: event.target.value }))} value={input.platform} /><Select label="Dificuldade" name="question-block-difficulty" onChange={(event) => setInput((current) => ({ ...current, difficulty: event.target.value as QuestionBlockInput['difficulty'] }))} options={[{value:'easy',label:'Facil'},{value:'medium',label:'Moderada'},{value:'hard',label:'Dificil'}]} value={input.difficulty} /><Input label="Quantidade" min={1} name="question-block-total" onChange={(event) => updateNumber('totalQuestions', event.target.value)} type="number" value={input.totalQuestions} /><Input label="Duracao (min)" min={0} name="question-block-duration" onChange={(event) => updateNumber('durationMinutes', event.target.value)} type="number" value={input.durationMinutes} /><Input label="Acertos" min={0} name="question-block-correct" onChange={(event) => updateNumber('correctAnswers', event.target.value)} type="number" value={input.correctAnswers} /><Input label="Erros" min={0} name="question-block-wrong" onChange={(event) => updateNumber('wrongAnswers', event.target.value)} type="number" value={input.wrongAnswers} /><Input label="Anuladas" min={0} name="question-block-annulled" onChange={(event) => updateNumber('annulledAnswers', event.target.value)} type="number" value={input.annulledAnswers} /><Input label="Observacoes" name="question-block-notes" onChange={(event) => setInput((current) => ({ ...current, notes: event.target.value }))} value={input.notes} /></div><div className="flex flex-col items-start justify-between gap-3 border-t border-app-border p-5 sm:flex-row sm:items-center"><p aria-live="polite" className="text-sm text-app-muted">{message || `${input.totalQuestions > 0 ? Math.round((input.correctAnswers / input.totalQuestions) * 100) : 0}% de acertos`}</p><Button isLoading={isSaving} onClick={() => void save()}>Salvar bloco</Button></div></Card>;
}
