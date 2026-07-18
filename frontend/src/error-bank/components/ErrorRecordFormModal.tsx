import { useState, type FormEvent } from 'react';

import { Button, Input, Modal, Select } from '@/design-system';
import { emptyErrorRecordInput, validateErrorRecord } from '@/error-bank/services';
import type {
  ErrorRecordInput,
  ErrorRecordValidationErrors,
} from '@/error-bank/types';
import { toLocalDateKey } from '@/shared/utils/date';

const priorityOptions = [
  { label: 'Selecione', value: '' },
  { label: 'Alta', value: 'high' },
  { label: 'Media', value: 'medium' },
  { label: 'Baixa', value: 'low' },
];

export function ErrorRecordFormModal({
  initialInput,
  isOpen,
  onClose,
  onSubmit,
}: {
  initialInput?: Partial<ErrorRecordInput>;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: ErrorRecordInput) => Promise<void> | void;
}) {
  const [input, setInput] = useState<ErrorRecordInput>(() => ({ ...emptyErrorRecordInput, ...initialInput }));
  const [errors, setErrors] = useState<ErrorRecordValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function update(field: keyof ErrorRecordInput, value: string) {
    setInput((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const nextErrors = validateErrorRecord(input);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0] as keyof ErrorRecordInput | undefined;
    if (firstInvalid) {
      window.requestAnimationFrame(() =>
        document.getElementById(`error-${firstInvalid}`)?.focus(),
      );
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await onSubmit(input);
      setInput(emptyErrorRecordInput);
      setErrors({});
      onClose();
    } catch (reason) {
      setSubmitError(reason instanceof Error ? reason.message : 'Nao foi possivel registrar o erro.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal
      description="Organize o que aconteceu e defina uma acao simples para evitar a recorrencia."
      initialFocusId="error-discipline"
      isOpen={isOpen}
      onClose={() => { if (!isSubmitting) onClose(); }}
      title="Registrar erro manual"
    >
      <form className="space-y-6" noValidate onSubmit={handleSubmit}>
        <fieldset className="grid gap-4 md:grid-cols-2">
          <legend className="mb-3 text-sm font-semibold text-app-text">Identificacao</legend>
          <Input error={errors.discipline} id="error-discipline" label="Disciplina" onChange={(event) => update('discipline', event.target.value)} value={input.discipline} />
          <Input error={errors.subject} id="error-subject" label="Assunto" onChange={(event) => update('subject', event.target.value)} value={input.subject} />
          <Input error={errors.category} id="error-category" label="Categoria do erro" onChange={(event) => update('category', event.target.value)} value={input.category} />
          <Select error={errors.priority} id="error-priority" label="Prioridade" onChange={(event) => update('priority', event.target.value)} options={priorityOptions} value={input.priority} />
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="mb-3 text-sm font-semibold text-app-text">O que aconteceu</legend>
          <Input error={errors.context} id="error-context" label="Contexto ou enunciado" onChange={(event) => update('context', event.target.value)} value={input.context} />
          <Input id="error-selectedAnswer" label="Resposta selecionada (opcional)" onChange={(event) => update('selectedAnswer', event.target.value)} value={input.selectedAnswer} />
          <Input error={errors.reason} id="error-reason" label="Motivo do erro" onChange={(event) => update('reason', event.target.value)} value={input.reason} />
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="mb-3 text-sm font-semibold text-app-text">Aprendizado</legend>
          <Input error={errors.correctConcept} id="error-correctConcept" label="Conceito ou resposta correta" onChange={(event) => update('correctConcept', event.target.value)} value={input.correctConcept} />
          <Input error={errors.correctiveAction} id="error-correctiveAction" label="Acao corretiva" onChange={(event) => update('correctiveAction', event.target.value)} value={input.correctiveAction} />
        </fieldset>

        <fieldset className="grid gap-4 md:grid-cols-2">
          <legend className="mb-3 text-sm font-semibold text-app-text">Organizacao</legend>
          <Input id="error-tags" label="Tags (separadas por virgula)" onChange={(event) => update('tags', event.target.value)} value={input.tags} />
          <Input error={errors.nextReview} id="error-nextReview" label="Proxima revisao (opcional)" min={toLocalDateKey()} onChange={(event) => update('nextReview', event.target.value)} type="date" value={input.nextReview} />
          <Input id="error-source" label="Origem (opcional)" onChange={(event) => update('source', event.target.value)} value={input.source} />
          <Input id="error-notes" label="Notas (opcional)" onChange={(event) => update('notes', event.target.value)} value={input.notes} />
          <Input className="md:col-span-2" id="error-complementaryNotes" label="Observacoes complementares" onChange={(event) => update('complementaryNotes', event.target.value)} value={input.complementaryNotes} />
        </fieldset>

        {submitError ? <p className="text-sm text-app-danger" role="alert">{submitError}</p> : null}
        <div className="flex flex-col-reverse gap-3 border-t border-app-border pt-5 sm:flex-row sm:justify-end">
          <Button disabled={isSubmitting} onClick={onClose} type="button" variant="ghost">Cancelar</Button>
          <Button isLoading={isSubmitting} type="submit">Registrar erro</Button>
        </div>
      </form>
    </Modal>
  );
}
