import { Input, Select } from '@/design-system';
import type { ScheduleActivity, ScheduleFiltersState } from '@/types/schedule';

import { activityTypeLabel, priorityLabel, statusLabel } from './scheduleLabels';

function unique(values: string[]) {
  return Array.from(new Set(values)).sort();
}

export function ScheduleFilters({
  activities,
  filters,
  onChange,
}: {
  activities: ScheduleActivity[];
  filters: ScheduleFiltersState;
  onChange: (filters: ScheduleFiltersState) => void;
}) {
  const disciplineOptions = [
    { label: 'Todas', value: 'all' },
    ...unique(activities.map((activity) => activity.discipline)).map((discipline) => ({
      label: discipline,
      value: discipline,
    })),
  ];

  return (
    <div className="grid gap-3 rounded-md border border-app-border bg-white p-4 md:grid-cols-5">
      <Input
        label="Pesquisa"
        name="schedule-search"
        onChange={(event) => onChange({ ...filters, query: event.target.value })}
        placeholder="Disciplina ou assunto"
        value={filters.query}
      />
      <Select
        label="Disciplina"
        name="schedule-discipline"
        onChange={(event) => onChange({ ...filters, discipline: event.target.value })}
        options={disciplineOptions}
        value={filters.discipline}
      />
      <Select
        label="Status"
        name="schedule-status"
        onChange={(event) => onChange({ ...filters, status: event.target.value })}
        options={[
          { label: 'Todos', value: 'all' },
          ...Object.entries(statusLabel).map(([value, label]) => ({ label, value })),
        ]}
        value={filters.status}
      />
      <Select
        label="Prioridade"
        name="schedule-priority"
        onChange={(event) => onChange({ ...filters, priority: event.target.value })}
        options={[
          { label: 'Todas', value: 'all' },
          ...Object.entries(priorityLabel).map(([value, label]) => ({ label, value })),
        ]}
        value={filters.priority}
      />
      <Select
        label="Tipo"
        name="schedule-type"
        onChange={(event) => onChange({ ...filters, type: event.target.value })}
        options={[
          { label: 'Todos', value: 'all' },
          ...Object.entries(activityTypeLabel).map(([value, label]) => ({ label, value })),
        ]}
        value={filters.type}
      />
    </div>
  );
}
