import { useEffect, useRef } from 'react';
import { Database, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import logoHorizontal from '@/assets/brand/passei-ai-horizontal.jpg';
import { routes } from '@/constants/routes';
import { useSidebarPlanSummary } from './useSidebarPlanSummary';

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const plan = useSidebarPlanSummary();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement;
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', handleEscape);
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/35 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-app-border bg-white transition-transform lg:static lg:z-auto lg:translate-x-0 lg:visible ${
          isOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'
        }`}
      >
        <div className="flex h-28 items-center justify-between px-5">
          <img
            alt="Passei AI"
            className="h-14 w-auto object-contain"
            src={logoHorizontal}
          />
          <button
            aria-label="Fechar menu"
            className="rounded-md p-2 text-app-muted hover:bg-slate-100 lg:hidden"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-2 px-5 py-2">
          {routes
            .filter((route) => route.path !== '/simulados')
            .map((route) => {
              const Icon = route.icon;

              return (
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-blue-50 text-app-primary'
                        : 'text-app-text hover:bg-slate-50 hover:text-app-primary'
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
        <div className="space-y-6 px-5 pb-6">
          <div className="rounded-md border border-app-border bg-white p-4 shadow-panel">
            <p className="text-sm text-app-muted">Plano atual</p>
            <p className="mt-2 text-sm font-bold text-app-text">{plan?.name ?? 'Carregando plano'}</p>
            <p className="mt-5 text-sm text-app-muted">Prova em</p>
            <p className="mt-1 text-2xl font-bold text-app-primary">{plan ? `${plan.daysUntilExam} dias` : '-'}</p>
            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-app-primary" style={{ width: `${plan?.progress ?? 0}%` }} />
            </div>
            <p className="mt-4 text-sm text-app-muted">Progresso do cronograma</p>
            <p className="mt-1 text-sm font-semibold text-app-text">{plan ? `${plan.completedActivities} de ${plan.totalActivities} concluidas` : 'Carregando dados reais'}</p>
          </div>
          <div className="border-t border-app-border pt-5">
            <div className="flex w-full items-center gap-3 rounded-md p-1 text-left">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-app-muted">
                <Database aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-app-text">
                  Dados locais
                </span>
                <span className="block text-xs text-app-muted">Neste navegador</span>
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
