import { Input, Select } from '@/design-system';
import type { StudySession, StudySessionFilters as StudySessionFiltersState } from '@/study/types';

import { materialTypeLabel, studyStatusLabel } from './studySessionLabels';

function uniqueDisciplines(sessions: StudySession[]) {
  const byId = new Map(sessions.map((session) => [session.disciplineId, session.disciplineName]));
  return Array.from(byId.entries()).map(([value, label]) => ({ label, value }));
}

export function StudySessionFilters({
  filters,
  onChange,
  sessions,
}: {
  filters: StudySessionFiltersState;
  onChange: (filters: StudySessionFiltersState) => void;
  sessions: StudySession[];
}) {
  return (
    <div className="grid gap-3 rounded-md border border-app-border bg-slate-50 p-4 md:grid-cols-5">
      <Input
        label="Pesquisa"
        name="study-query"
        onChange={(event) => onChange({ ...filters, query: event.target.value })}
        placeholder="Assunto"
        value={filters.query}
      />
      <Select
        label="Periodo"
        name="study-period"
        onChange={(event) => onChange({ ...filters, period: event.target.value })}
        options={[
          { label: 'Todos', value: 'all' },
          { label: 'Semana', value: 'week' },
          { label: 'Mes', value: 'month' },
        ]}
        value={filters.period}
      />
      <Select
        label="Disciplina"
        name="study-discipline"
        onChange={(event) => onChange({ ...filters, disciplineId: event.target.value })}
        options={[{ label: 'Todas', value: 'all' }, ...uniqueDisciplines(sessions)]}
        value={filters.disciplineId}
      />
      <Select
        label="Tipo"
        name="study-material"
        onChange={(event) => onChange({ ...filters, materialType: event.target.value })}
        options={[
          { label: 'Todos', value: 'all' },
          ...Object.entries(materialTypeLabel).map(([value, label]) => ({ label, value })),
        ]}
        value={filters.materialType}
      />
      <Select
        label="Status"
        name="study-status"
        onChange={(event) => onChange({ ...filters, status: event.target.value })}
        options={[
          { label: 'Todos', value: 'all' },
          ...Object.entries(studyStatusLabel).map(([value, label]) => ({ label, value })),
        ]}
        value={filters.status}
      />
    </div>
  );
}
