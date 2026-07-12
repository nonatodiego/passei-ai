import { useMemo, useState } from 'react';

import {
  ErrorBankService,
  calculateErrorStats,
  createErrorRecord,
  defaultErrorFilters,
  filterErrorRecords,
} from '@/error-bank/services';
import type {
  ErrorAction,
  ErrorFilters,
  ErrorRecord,
  ErrorRecordInput,
  ErrorViewStatus,
} from '@/error-bank/types';

export function useErrorBank() {
  const [filters, setFilters] = useState<ErrorFilters>(defaultErrorFilters);
  const [records, setRecords] = useState<ErrorRecord[]>(() => ErrorBankService.getRecords());
  const [status] = useState<ErrorViewStatus>('success');
  const filtered = useMemo(
    () => filterErrorRecords(records, filters),
    [filters, records],
  );

  function addRecord(input: ErrorRecordInput) {
    const record = createErrorRecord(input);
    setRecords((current) => [record, ...current]);
    return record;
  }

  function runAction(id: string, action: ErrorAction, date?: string) {
    const record = records.find((item) => item.id === id);
    if (!record) return undefined;
    const updated = ErrorBankService.runAction(record, action, date);
    setRecords((current) => current.map((item) => (item.id === id ? updated : item)));
    return updated;
  }

  return {
    addRecord,
    filtered,
    filters,
    records,
    runAction,
    setFilters,
    stats: calculateErrorStats(records),
    status,
  };
}
