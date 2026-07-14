import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { db } from './database';
import { exportBackup, getLastBackupAt, importBackup, markBackupExported, resetDatabase, validateBackup } from './backup';

describe('local backup', () => {
  beforeEach(async () => { await db.delete(); await db.open(); });
  it('exports, validates and restores persisted entities', async () => { await db.scheduleItems.put({ id: 'schedule', plannedDate: '2026-07-13', disciplineName: 'TI', title: 'APO06', activityType: 'PDF', status: 'planned', outsideExamWindow: false, createdAt: '', updatedAt: '' }); const payload = await exportBackup(); expect(validateBackup(payload)).toBe(true); await resetDatabase(); expect(await db.scheduleItems.count()).toBe(0); await importBackup(payload); expect(await db.scheduleItems.count()).toBe(1); });
  it('rejects invalid backups and stores the export marker', async () => { expect(validateBackup({})).toBe(false); await markBackupExported('2026-07-13T12:00:00.000Z'); expect(await getLastBackupAt()).toBe('2026-07-13T12:00:00.000Z'); });
});
