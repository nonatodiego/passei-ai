import type { ReactNode } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/design-system/atoms/Button';

export function Drawer({
  children,
  isOpen,
  onClose,
  title,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-drawer bg-slate-950/35 transition-opacity ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-drawer flex w-full max-w-md flex-col border-l border-app-border bg-white shadow-floating transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex h-16 items-center justify-between border-b border-app-border px-5">
          <h2 className="text-lg font-semibold text-app-text">{title}</h2>
          <Button aria-label="Fechar painel" onClick={onClose} variant="ghost">
            <X aria-hidden="true" className="h-5 w-5" />
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </>
  );
}
