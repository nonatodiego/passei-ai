import 'fake-indexeddb/auto';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { db } from './database';
import { getScheduleItems, updateContestExamDate, updateScheduleItem } from './scheduleRepository';
import { seedDataprevSchedule } from './seed';

describe('local DATAPREV schedule', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  afterEach(async () => {
    await db.delete();
  });

  it('seeds the 956 real activities without duplication', async () => {
    const first = await seedDataprevSchedule();
    const second = await seedDataprevSchedule();

    expect(first).toEqual({ imported: 956, seeded: true });
    expect(second).toEqual({ imported: 956, seeded: false });
    expect(await db.scheduleItems.count()).toBe(956);
  });

  it('keeps the 596 post-exam activities available in their own window', async () => {
    await seedDataprevSchedule();

    const outsideWindow = await getScheduleItems({ window: 'outsideExam' });
    const beforeExam = await getScheduleItems({ window: 'beforeExam' });

    expect(outsideWindow).toHaveLength(596);
    expect(beforeExam).toHaveLength(360);
  });

  it('recalculates the exam window when the contest date changes', async () => {
    await seedDataprevSchedule();
    await updateContestExamDate('2027-12-31');

    expect(await getScheduleItems({ window: 'outsideExam' })).toHaveLength(0);
    expect(await getScheduleItems({ window: 'beforeExam' })).toHaveLength(956);
  }, 15_000);

  it('recalculates the exam window when an activity date is edited', async () => {
    await seedDataprevSchedule();
    const item = (await db.scheduleItems.toArray())[0]!;

    const updated = await updateScheduleItem(item.id, { plannedDate: '2026-11-01' });

    expect(updated.outsideExamWindow).toBe(true);
    expect((await db.scheduleItems.get(item.id))?.outsideExamWindow).toBe(true);
  });
});
