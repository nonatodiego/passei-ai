import type { Priority, Status } from '@/types';

export type BadgeTone = 'blue' | 'green' | 'amber' | 'red' | 'slate';

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
