import { useEffect, useState } from 'react';

import { getScheduleItems, type ScheduleItemFilters } from '@/core/database/scheduleRepository';
import { useLocalData } from '@/core/providers/LocalDataProvider';
import type { ScheduleItem } from '@/core/database/types';

export function useScheduleItems(filters: ScheduleItemFilters) {
  const { revision, status: databaseStatus } = useLocalData();
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (databaseStatus !== 'ready') return;
    let active = true;
    setIsLoading(true);
    void getScheduleItems(filters)
      .then((records) => {
        if (active) {
          setItems(records);
          setError(undefined);
        }
      })
      .catch((reason: unknown) => active && setError(reason instanceof Error ? reason.message : 'Nao foi possivel carregar o cronograma.'))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [databaseStatus, filters, revision]);

  return { error, isLoading: databaseStatus === 'loading' || isLoading, items };
}
