import importedSchedule from '@/data/dataprev-schedule.json';
import { db } from './database';
import type { ContestProfile, ScheduleItem } from './types';

const now = () => new Date().toISOString();
const profile: ContestProfile = { id:'dataprev-2026', name:'DATAPREV 2026', role:'Gestao de Servicos de TIC', board:'FGV', examDate:'2026-10-11', targetAccuracy:85, createdAt:now(), updatedAt:now() };
export async function seedDataprevSchedule(): Promise<{ imported: number; seeded: boolean }> {
  const scheduleCount = await db.scheduleItems.count();
  if (scheduleCount > 0) return { imported: scheduleCount, seeded: false };

  await db.transaction('rw', db.contestProfiles, db.disciplines, db.scheduleItems, db.goals, async () => {
    const existingProfile = await db.contestProfiles.get(profile.id);
    if (!existingProfile) await db.contestProfiles.put(profile);

    const activities = importedSchedule as ScheduleItem[];
    const disciplines = [...new Set(activities.map((item) => item.disciplineName))].filter(Boolean);
    await db.disciplines.bulkPut(
      disciplines.map((name) => ({
        id: `dataprev-${name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        name,
        contestProfileId: profile.id,
        createdAt: now(),
        updatedAt: now(),
      })),
    );
    await db.scheduleItems.bulkPut(activities);

    if ((await db.goals.count()) === 0) {
      await db.goals.bulkPut(
        ['15 horas por semana', '300 questoes por semana', '1 simulado por semana', '7 revisoes por semana', '85% de acertos'].map((name, index) => ({
          id: `default-goal-${index}`,
          name,
          createdAt: now(),
          updatedAt: now(),
        })),
      );
    }
  });

  return { imported: (importedSchedule as ScheduleItem[]).length, seeded: true };
}
