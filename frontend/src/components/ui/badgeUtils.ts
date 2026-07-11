import type { BadgeTone } from '@/design-system/atoms/Badge';
import type { Priority, Status } from '@/types';

export type { BadgeTone };

export function statusTone(status: Status): BadgeTone {
  const tones: Record<Status, BadgeTone> = {
    pendente: 'amber',
    'em andamento': 'blue',
    concluído: 'green',
    atrasado: 'red',
  };
  return tones[status];
}

export function priorityTone(priority: Priority): BadgeTone {
  const tones: Record<Priority, BadgeTone> = {
    baixa: 'slate',
    média: 'amber',
    alta: 'red',
  };
  return tones[priority];
}
