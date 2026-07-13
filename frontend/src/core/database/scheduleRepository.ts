import { db } from './database';
import { publishLocalDataChange } from './events';
import type { ContestProfile, ScheduleItem } from './types';

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
  notes?: string;
  plannedDate?: string;
  status?: string;
}

const isoToday = () => new Date().toISOString().slice(0, 10);
const normalized = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export async function getActiveContestProfile(): Promise<ContestProfile | undefined> {
  return db.contestProfiles.get('dataprev-2026');
}

export async function getScheduleItems(filters: ScheduleItemFilters = {}): Promise<ScheduleItem[]> {
  const examDate = (await getActiveContestProfile())?.examDate ?? '2026-10-11';
  const today = isoToday();
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
  const next = { ...item, ...update, updatedAt: new Date().toISOString() };
  await db.scheduleItems.put(next);
  publishLocalDataChange();
  return next;
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
