import { useEffect, useMemo, useState } from 'react';
import { ErrorBankService, calculateErrorStats, defaultErrorFilters, filterErrorRecords } from '@/error-bank/services';
import type { ErrorAction, ErrorFilters, ErrorRecord, ErrorRecordInput, ErrorViewStatus } from '@/error-bank/types';

export function useErrorBank() {
  const [filters, setFilters] = useState<ErrorFilters>(defaultErrorFilters);
  const [records, setRecords] = useState<ErrorRecord[]>([]);
  const [status, setStatus] = useState<ErrorViewStatus>('success');
  useEffect(() => { let active=true;void ErrorBankService.getRecords().then((items)=>{if(active)setRecords(items);}).catch(()=>active&&setStatus('error'));return()=>{active=false;};},[]);
  const filtered=useMemo(()=>filterErrorRecords(records,filters),[records,filters]);
  return { filters, setFilters, records, filtered, stats:calculateErrorStats(records), status, addRecord:(input:ErrorRecordInput)=>ErrorBankService.create(input), runAction:async(id:string,action:ErrorAction,date?:string)=>{const record=records.find((item)=>item.id===id);return record?ErrorBankService.runAction(record,action,date):undefined;} };
}
