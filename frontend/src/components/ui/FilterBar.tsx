import { Search } from 'lucide-react';

export function FilterBar({ filters }: { filters: string[] }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-app-border bg-app-card p-4 md:flex-row md:items-center">
      <label className="relative flex-1">
        <span className="sr-only">Buscar</span>
        <Search
          aria-hidden="true"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-muted"
        />
        <input
          className="w-full rounded-lg border border-app-border bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-app-primary focus:ring-2 focus:ring-blue-100"
          placeholder="Buscar registros"
          type="search"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            className="rounded-lg border border-app-border px-3 py-2 text-sm font-medium text-app-muted transition hover:border-app-primary hover:text-app-primary"
            key={filter}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
