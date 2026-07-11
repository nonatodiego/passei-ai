import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface TabItem {
  content: ReactNode;
  id: string;
  label: string;
}

export function Tabs({
  activeId,
  items,
  onChange,
}: {
  activeId: string;
  items: TabItem[];
  onChange: (id: string) => void;
}) {
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div>
      <div className="flex gap-1 rounded-md bg-slate-100 p-1" role="tablist">
        {items.map((item) => (
          <button
            aria-selected={item.id === activeItem.id}
            className={cn(
              'min-h-9 rounded-sm px-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-app-focus',
              item.id === activeItem.id
                ? 'bg-white text-app-primary shadow-sm'
                : 'text-app-muted hover:text-app-text',
            )}
            key={item.id}
            onClick={() => onChange(item.id)}
            role="tab"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4" role="tabpanel">
        {activeItem.content}
      </div>
    </div>
  );
}
