import { Menu, Plus } from 'lucide-react';

import type { AppRoute } from '@/constants/routes';
import { formatToday } from '@/utils/format';

export function Header({
  currentRoute,
  onMenuClick,
}: {
  currentRoute: AppRoute;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-app-border bg-app-background/95 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            aria-label="Abrir menu"
            className="rounded-lg border border-app-border bg-white p-2 text-app-muted lg:hidden"
            onClick={onMenuClick}
            type="button"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-app-text md:text-2xl">
              {currentRoute.title}
            </h1>
            <p className="text-sm capitalize text-app-muted">{formatToday()}</p>
          </div>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-app-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          type="button"
        >
          <Plus className="h-4 w-4" />
          {currentRoute.actionLabel}
        </button>
      </div>
    </header>
  );
}
