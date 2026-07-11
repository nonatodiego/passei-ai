import type { ReactNode } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/design-system/atoms/Button';

export function Modal({
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
  if (!isOpen) {
    return null;
  }

  return (
    <div aria-modal="true" className="fixed inset-0 z-modal flex items-center justify-center bg-slate-950/40 p-4" role="dialog">
      <section className="w-full max-w-lg rounded-lg border border-app-border bg-white p-5 shadow-floating">
        <header className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-app-text">{title}</h2>
          <Button aria-label="Fechar modal" onClick={onClose} variant="ghost">
            <X aria-hidden="true" className="h-5 w-5" />
          </Button>
        </header>
        <div className="mt-4">{children}</div>
      </section>
    </div>
  );
}
