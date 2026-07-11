import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

import { routes } from '@/constants/routes';

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/35 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-app-border bg-white transition-transform lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-app-border px-5">
          <div>
            <p className="text-lg font-semibold text-app-text">Passei AI</p>
            <p className="text-xs font-medium text-app-muted">DATAPREV 2026</p>
          </div>
          <button
            aria-label="Fechar menu"
            className="rounded-lg p-2 text-app-muted hover:bg-slate-100 lg:hidden"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-app-primary text-white'
                      : 'text-app-muted hover:bg-slate-100 hover:text-app-text'
                  }`
                }
                end={route.path === '/'}
                key={route.path}
                onClick={onClose}
                to={route.path}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
                {route.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
