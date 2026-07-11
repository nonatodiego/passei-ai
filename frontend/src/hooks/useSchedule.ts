import { useMemo } from 'react';

import { useStudyEngine } from '@/study-engine';
import { createScheduleData } from '@/services/ScheduleService';
import type { ScheduleData, ScheduleFiltersState, ScheduleStatus } from '@/types/schedule';

export function useSchedule(filters: ScheduleFiltersState): {
  data: ScheduleData;
  status: ScheduleStatus;
} {
  const { result } = useStudyEngine();

  const data = useMemo(() => createScheduleData(result, filters), [filters, result]);

  return {
    data,
    status: data.activities.length > 0 ? 'success' : 'empty',
  };
}
