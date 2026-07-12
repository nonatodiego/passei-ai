import { useState, type FormEvent } from 'react';

import { Button, Input, Modal, Select } from '@/design-system';
import { emptyErrorRecordInput, validateErrorRecord } from '@/error-bank/services';
import type {
  ErrorRecordInput,
  ErrorRecordValidationErrors,
} from '@/error-bank/types';

const priorityOptions = [
  { label: 'Selecione', value: '' },
  { label: 'Alta', value: 'high' },
  { label: 'Media', value: 'medium' },
  { label: 'Baixa', value: 'low' },
];

export function ErrorRecordFormModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: ErrorRecordInput) => void;
}) {
  const [input, setInput] = useState<ErrorRecordInput>(emptyErrorRecordInput);
  const [errors, setErrors] = useState<ErrorRecordValidationErrors>({});

  function update(field: keyof ErrorRecordInput, value: string) {
    setInput((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateErrorRecord(input);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0] as keyof ErrorRecordInput | undefined;
    if (firstInvalid) {
      window.requestAnimationFrame(() =>
        document.getElementById(`error-${firstInvalid}`)?.focus(),
      );
      return;
    }
    onSubmit(input);
    setInput(emptyErrorRecordInput);
    setErrors({});
    onClose();
  }

  return (
    <Modal
      description="Organize o que aconteceu e defina uma acao simples para evitar a recorrencia."
      initialFocusId="error-discipline"
      isOpen={isOpen}
      onClose={onClose}
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
          <Input error={errors.nextReview} id="error-nextReview" label="Proxima revisao (opcional)" min={new Date().toISOString().slice(0, 10)} onChange={(event) => update('nextReview', event.target.value)} type="date" value={input.nextReview} />
          <Input id="error-source" label="Origem (opcional)" onChange={(event) => update('source', event.target.value)} value={input.source} />
          <Input id="error-notes" label="Notas (opcional)" onChange={(event) => update('notes', event.target.value)} value={input.notes} />
          <Input className="md:col-span-2" id="error-complementaryNotes" label="Observacoes complementares" onChange={(event) => update('complementaryNotes', event.target.value)} value={input.complementaryNotes} />
        </fieldset>

        <div className="flex flex-col-reverse gap-3 border-t border-app-border pt-5 sm:flex-row sm:justify-end">
          <Button onClick={onClose} type="button" variant="ghost">Cancelar</Button>
          <Button type="submit">Registrar erro</Button>
        </div>
      </form>
    </Modal>
  );
}
