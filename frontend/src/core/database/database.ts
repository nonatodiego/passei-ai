import Dexie, { type Table } from 'dexie';
import { DATABASE_NAME, DATABASE_SCHEMA_VERSION, databaseStores } from './schema';
import type { AppSetting, ContestProfile, Discipline, ScheduleItem, StoredEntity } from './types';

export class PasseiDatabase extends Dexie {
  appSettings!: Table<AppSetting, string>; contestProfiles!: Table<ContestProfile, string>; disciplines!: Table<Discipline, string>; scheduleItems!: Table<ScheduleItem, string>;
  studySessions!: Table<StoredEntity, string>; questionBlocks!: Table<StoredEntity, string>; questions!: Table<StoredEntity, string>; questionAttempts!: Table<StoredEntity, string>; errorRecords!: Table<StoredEntity, string>; reviews!: Table<StoredEntity, string>; mockExams!: Table<StoredEntity, string>; goals!: Table<StoredEntity, string>;
  constructor() { super(DATABASE_NAME); this.version(DATABASE_SCHEMA_VERSION).stores(databaseStores); }
}
export const db = new PasseiDatabase();
