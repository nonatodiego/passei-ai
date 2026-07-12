import { Button, Input, Select } from '@/design-system';
import type { Question, QuestionFilters as QuestionFiltersState } from '@/questions/types';

const allOption = { label: 'Todos', value: 'all' };

function uniqueOptions(values: string[]) {
  return [
    allOption,
    ...[...new Set(values)].sort().map((value) => ({ label: value, value })),
  ];
}

export function QuestionFilters({
  filters,
  onChange,
  questions,
}: {
  filters: QuestionFiltersState;
  onChange: (filters: QuestionFiltersState) => void;
  questions: Question[];
}) {
  const hasActiveFilters = Object.values(filters).some((value) => value !== 'all' && value !== '');

  return (
    <div className="rounded-md border border-app-border bg-slate-50 p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <Input
        label="Pesquisar"
        name="question-search"
        onChange={(event) => onChange({ ...filters, query: event.target.value })}
        placeholder="Enunciado ou tag"
        type="search"
        value={filters.query}
        />
        <Select
        label="Disciplina"
        name="question-discipline"
        onChange={(event) => onChange({ ...filters, discipline: event.target.value })}
        options={uniqueOptions(questions.map((question) => question.discipline))}
        value={filters.discipline}
        />
        <Select
        label="Assunto"
        name="question-subject"
        onChange={(event) => onChange({ ...filters, subject: event.target.value })}
        options={uniqueOptions(questions.map((question) => question.subject))}
        value={filters.subject}
        />
        <Select
        label="Dificuldade"
        name="question-difficulty"
        onChange={(event) =>
          onChange({
            ...filters,
            difficulty: event.target.value as QuestionFiltersState['difficulty'],
          })
        }
        options={[
          allOption,
          { label: 'Facil', value: 'easy' },
          { label: 'Moderada', value: 'medium' },
          { label: 'Dificil', value: 'hard' },
        ]}
        value={filters.difficulty}
        />
        <Select
        label="Status"
        name="question-status"
        onChange={(event) =>
          onChange({
            ...filters,
            status: event.target.value as QuestionFiltersState['status'],
          })
        }
        options={[
          allOption,
          { label: 'Nao respondida', value: 'unanswered' },
          { label: 'Correta', value: 'correct' },
          { label: 'Incorreta', value: 'incorrect' },
        ]}
        value={filters.status}
        />
      </div>
      {hasActiveFilters ? (
        <div className="mt-3 flex justify-end">
          <Button
            aria-label="Limpar filtros de questoes"
            onClick={() =>
              onChange({
                difficulty: 'all',
                discipline: 'all',
                query: '',
                status: 'all',
                subject: 'all',
              })
            }
            size="sm"
            variant="ghost"
          >
            Limpar filtros
          </Button>
        </div>
      ) : null}
    </div>
  );
}
