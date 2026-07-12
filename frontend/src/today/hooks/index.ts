import { useMemo, useState } from 'react';
import { TodayService } from '@/today/services';
import type { TodayStatus } from '@/today/types';
export function useToday() { const [status] = useState<TodayStatus>('success'); const data = useMemo(() => TodayService.getToday(), []); return { data, status }; }
