import type { ReactNode } from 'react';

export function Tooltip({
  children,
  content,
}: {
  children: ReactNode;
  content: string;
}) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-dropdown mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-floating group-focus-within:block group-hover:block"
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
}
