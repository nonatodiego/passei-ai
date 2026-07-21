import { useEffect, useMemo, useState } from 'react';
import { ErrorBankService, calculateErrorStats, defaultErrorFilters, filterErrorRecords } from '@/error-bank/services';
import type { ErrorAction, ErrorFilters, ErrorRecord, ErrorRecordInput, ErrorViewStatus } from '@/error-bank/types';

export function useErrorBank() {
  const [filters, setFilters] = useState<ErrorFilters>(defaultErrorFilters);
  const [records, setRecords] = useState<ErrorRecord[]>([]);
  const [status, setStatus] = useState<ErrorViewStatus>('success');
  useEffect(() => { let active=true;void ErrorBankService.getRecords().then((items)=>{if(active)setRecords(items);}).catch(()=>active&&setStatus('error'));return()=>{active=false;};},[]);
  const filtered=useMemo(()=>filterErrorRecords(records,filters),[records,filters]);
  async function addRecord(input: ErrorRecordInput) {
    const result = await ErrorBankService.create(input);
    setRecords((current) => result.wasDuplicate
      ? current.map((item) => item.id === result.record.id ? result.record : item)
      : [result.record, ...current]);
    return result;
  }

  async function runAction(id: string, action: ErrorAction, date?: string) {
    const record = records.find((item) => item.id === id);
    if (!record) return undefined;
    const updated = await ErrorBankService.runAction(record, action, date);
    setRecords((current) => current.map((item) => item.id === updated.id ? updated : item));
    return updated;
  }

  return { filters, setFilters, records, filtered, stats:calculateErrorStats(records), status, addRecord, runAction };
}
