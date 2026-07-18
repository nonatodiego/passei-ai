import { Menu, Plus } from 'lucide-react';

import { Button } from '@/design-system';
import type { AppRoute } from '@/constants/routes';
import { formatToday } from '@/utils/format';

export function Header({
  currentRoute,
  onMenuClick,
  onPrimaryAction,
}: {
  currentRoute: AppRoute;
  onMenuClick: () => void;
  onPrimaryAction?: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 bg-app-background/95 px-4 py-6 backdrop-blur md:px-10">
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
            <h1 className="text-2xl font-bold text-app-text md:text-3xl">
              {currentRoute.title}
            </h1>
            <p className="text-sm capitalize text-app-muted">{formatToday()}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {onPrimaryAction ? (
            <Button icon={<Plus aria-hidden="true" className="h-4 w-4" />} onClick={onPrimaryAction}>
              {currentRoute.actionLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
