import { db } from '@/core/database/database';
import type { ErrorRecord } from '@/error-bank/types';

export interface ErrorRecordRepository {
  create(record: ErrorRecord): Promise<ErrorRecord>;
  getAll(): Promise<ErrorRecord[]>;
  update(record: ErrorRecord): Promise<ErrorRecord>;
}

export class IndexedDbErrorRecordRepository implements ErrorRecordRepository {
  async create(record: ErrorRecord) { await db.errorRecords.put(record); return record; }
  async getAll() { return (await db.errorRecords.toArray()) as ErrorRecord[]; }
  async update(record: ErrorRecord) { await db.errorRecords.put(record); return record; }
}
