import { db } from './database';
import { publishLocalDataChange } from './events';
import type { ContestProfile, ScheduleItem } from './types';
import { toLocalDateKey } from '@/shared/utils/date';

export type ScheduleWindow = 'all' | 'today' | 'overdue' | 'upcoming' | 'completed' | 'beforeExam' | 'outsideExam';

export interface ScheduleItemFilters {
  discipline?: string;
  endDate?: string;
  priority?: string;
  query?: string;
  status?: string;
  type?: string;
  window?: ScheduleWindow;
  startDate?: string;
}

export interface ScheduleItemUpdate {
  actualMinutes?: number;
  activityType?: string;
  disciplineName?: string;
  notes?: string;
  plannedDate?: string;
  priority?: string;
  status?: string;
  title?: string;
}

export interface ScheduleItemInput {
  actualMinutes?: number;
  activityType: string;
  disciplineName: string;
  notes?: string;
  plannedDate: string;
  priority?: string;
  status: string;
  title: string;
}

export interface ScheduleItemValidationResult {
  errors: Partial<Record<keyof ScheduleItemInput, string>>;
  isValid: boolean;
}

const normalized = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const createId = () => globalThis.crypto?.randomUUID?.() ?? `schedule-item-${Date.now()}`;

export function validateScheduleItemInput(input: ScheduleItemInput): ScheduleItemValidationResult {
  const errors: ScheduleItemValidationResult['errors'] = {};

  if (!input.plannedDate) errors.plannedDate = 'A data planejada e obrigatoria.';
  if (!input.disciplineName.trim()) errors.disciplineName = 'A disciplina e obrigatoria.';
  if (!input.title.trim()) errors.title = 'O conteudo e obrigatorio.';
  if (!input.activityType.trim()) errors.activityType = 'O tipo de atividade e obrigatorio.';
  if ((input.actualMinutes ?? 0) < 0) errors.actualMinutes = 'A duracao nao pode ser negativa.';

  return { errors, isValid: Object.keys(errors).length === 0 };
}

export async function getActiveContestProfile(): Promise<ContestProfile | undefined> {
  return db.contestProfiles.get('dataprev-2026');
}

export async function getScheduleItems(filters: ScheduleItemFilters = {}): Promise<ScheduleItem[]> {
  const examDate = (await getActiveContestProfile())?.examDate ?? '2026-10-11';
  const today = toLocalDateKey();
  const query = normalized(filters.query ?? '');
  const items = await db.scheduleItems.orderBy('plannedDate').toArray();

  return items
    .map((item) => ({ ...item, outsideExamWindow: item.plannedDate > examDate }))
    .filter((item) => {
      const completed = normalized(item.status).includes('conclu');
      const isOverdue = !completed && item.plannedDate < today;
      const matchesWindow =
        !filters.window ||
        filters.window === 'all' ||
        (filters.window === 'today' && item.plannedDate === today) ||
        (filters.window === 'overdue' && isOverdue) ||
        (filters.window === 'upcoming' && item.plannedDate > today && !item.outsideExamWindow) ||
        (filters.window === 'completed' && completed) ||
        (filters.window === 'beforeExam' && !item.outsideExamWindow) ||
        (filters.window === 'outsideExam' && item.outsideExamWindow);
      return (
        matchesWindow &&
        (!filters.discipline || filters.discipline === 'all' || item.disciplineName === filters.discipline) &&
        (!filters.type || filters.type === 'all' || item.activityType === filters.type) &&
        (!filters.status || filters.status === 'all' || item.status === filters.status) &&
        (!filters.priority || filters.priority === 'all' || item.priority === filters.priority) &&
        (!filters.startDate || item.plannedDate >= filters.startDate) &&
        (!filters.endDate || item.plannedDate <= filters.endDate) &&
        (!query || normalized(`${item.disciplineName} ${item.title}`).includes(query))
      );
    });
}

export async function updateScheduleItem(id: string, update: ScheduleItemUpdate): Promise<ScheduleItem> {
  const item = await db.scheduleItems.get(id);
  if (!item) throw new Error('Atividade do cronograma nao encontrada.');
  const examDate = (await getActiveContestProfile())?.examDate ?? '2026-10-11';
  const plannedDate = update.plannedDate ?? item.plannedDate;
  const next = {
    ...item,
    ...update,
    outsideExamWindow: plannedDate > examDate,
    updatedAt: new Date().toISOString(),
  };
  await db.scheduleItems.put(next);
  publishLocalDataChange();
  return next;
}

export async function createScheduleItem(input: ScheduleItemInput): Promise<ScheduleItem> {
  const validation = validateScheduleItemInput(input);
  if (!validation.isValid) throw new Error('Dados da atividade invalidos.');

  const profile = await getActiveContestProfile();
  const timestamp = new Date().toISOString();
  const item: ScheduleItem = {
    actualMinutes: input.actualMinutes ?? 0,
    activityType: input.activityType.trim(),
    createdAt: timestamp,
    disciplineName: input.disciplineName.trim(),
    id: createId(),
    notes: input.notes?.trim() ?? '',
    outsideExamWindow: input.plannedDate > (profile?.examDate ?? '2026-10-11'),
    plannedDate: input.plannedDate,
    priority: input.priority?.trim() || 'Normal',
    status: input.status.trim() || 'Não iniciado',
    title: input.title.trim(),
    updatedAt: timestamp,
  };

  await db.scheduleItems.put(item);
  publishLocalDataChange();
  return item;
}

export async function completeScheduleItem(id: string): Promise<ScheduleItem> {
  return updateScheduleItem(id, { status: 'Concluída' });
}

export async function updateContestExamDate(examDate: string): Promise<ContestProfile> {
  const profile = await getActiveContestProfile();
  if (!profile) throw new Error('Perfil do concurso nao encontrado.');
  const updated = { ...profile, examDate, updatedAt: new Date().toISOString() };
  const items = await db.scheduleItems.toArray();
  await db.transaction('rw', db.contestProfiles, db.scheduleItems, async () => {
    await db.contestProfiles.put(updated);
    await db.scheduleItems.bulkPut(
      items.map((item) => ({ ...item, outsideExamWindow: item.plannedDate > examDate, updatedAt: new Date().toISOString() })),
    );
  });
  publishLocalDataChange();
  return updated;
}
