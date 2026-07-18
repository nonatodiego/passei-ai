import { differenceInLocalDays, formatLocalDatePtBr, toLocalDateKey } from '@/shared/utils/date';

export function formatDate(value: string): string {
  return formatLocalDatePtBr(value);
}

export function formatToday(): string {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date());
}

export function formatHours(hours: number): string {
  return `${hours.toLocaleString('pt-BR')}h`;
}

export function getDaysUntil(date: string): number {
  return Math.max(0, differenceInLocalDays(toLocalDateKey(), date));
}

export function percentage(value: number): string {
  return `${value.toLocaleString('pt-BR')}%`;
}
