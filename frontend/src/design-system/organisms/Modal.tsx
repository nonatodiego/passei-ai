import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/design-system/atoms/Button';

export function Modal({
  children,
  description,
  initialFocusId,
  isOpen,
  onClose,
  title,
}: {
  children: ReactNode;
  description?: string;
  initialFocusId?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement;
    const frame = window.requestAnimationFrame(() => {
      const firstFocusable = (initialFocusId ? document.getElementById(initialFocusId) : null) ?? dialogRef.current?.querySelector<HTMLElement>(
        'input, select, textarea, button, [tabindex]:not([tabindex="-1"])',
      );
      firstFocusable?.focus();
    });
    return () => {
      window.cancelAnimationFrame(frame);
      triggerRef.current?.focus();
    };
  }, [initialFocusId, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, onClose]);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} aria-modal="true" className="fixed inset-0 z-modal flex items-center justify-center bg-slate-950/40 p-4" role="dialog">
      <section className="flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col rounded-lg border border-app-border bg-white shadow-floating" onKeyDown={handleKeyDown} ref={dialogRef}>
        <header className="flex items-center justify-between gap-3 border-b border-app-border p-5">
          <div>
            <h2 className="text-lg font-semibold text-app-text" id={titleId}>{title}</h2>
            {description ? <p className="mt-1 text-sm text-app-muted" id={descriptionId}>{description}</p> : null}
          </div>
          <Button aria-label="Fechar modal" onClick={onClose} variant="ghost">
            <X aria-hidden="true" className="h-5 w-5" />
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </section>
    </div>
  );
}
