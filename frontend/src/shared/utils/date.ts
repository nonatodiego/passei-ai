const DATE_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const DAY_IN_MILLISECONDS = 86_400_000;

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function toLocalDateKey(value = new Date()): string {
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
}

export function toLocalDateKeyFromValue(value: string): string {
  if (isValidLocalDateKey(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error('Data local invalida.');
  return toLocalDateKey(date);
}

export function parseLocalDateKey(value: string): Date | undefined {
  const match = DATE_KEY_PATTERN.exec(value);
  if (!match) return undefined;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  return date;
}

export function isValidLocalDateKey(value: string): boolean {
  return Boolean(parseLocalDateKey(value));
}

export function addLocalDays(value: string, amount: number): string {
  const date = parseLocalDateKey(value);
  if (!date) throw new Error('Data local invalida.');
  date.setDate(date.getDate() + amount);
  return toLocalDateKey(date);
}

export function startOfLocalDay(value = new Date()): Date {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

export function endOfLocalDay(value = new Date()): Date {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 23, 59, 59, 999);
}

export function compareLocalDateKeys(left: string, right: string): number {
  if (!isValidLocalDateKey(left) || !isValidLocalDateKey(right)) {
    throw new Error('Data local invalida.');
  }
  return left.localeCompare(right);
}

export function differenceInLocalDays(from: string, to: string): number {
  const fromDate = parseLocalDateKey(from);
  const toDate = parseLocalDateKey(to);
  if (!fromDate || !toDate) throw new Error('Data local invalida.');

  const fromUtc = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
  const toUtc = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
  return Math.round((toUtc - fromUtc) / DAY_IN_MILLISECONDS);
}

export function getLocalWeekRange(value = new Date()): { end: string; start: string } {
  const current = startOfLocalDay(value);
  const weekday = current.getDay() || 7;
  current.setDate(current.getDate() - weekday + 1);
  const start = toLocalDateKey(current);
  return { end: addLocalDays(start, 6), start };
}

export function formatLocalDatePtBr(value: string): string {
  const date = parseLocalDateKey(value);
  if (!date) throw new Error('Data local invalida.');
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
