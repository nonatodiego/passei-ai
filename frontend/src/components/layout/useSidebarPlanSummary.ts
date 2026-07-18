import { useEffect, useState } from 'react';

import { db } from '@/core/database/database';
import { subscribeToLocalDataChanges } from '@/core/database/events';
import { getDaysUntil } from '@/utils/format';

export interface SidebarPlanSummary {
  completedActivities: number;
  daysUntilExam: number;
  name: string;
  progress: number;
  totalActivities: number;
}

export function useSidebarPlanSummary(): SidebarPlanSummary | undefined {
  const [summary, setSummary] = useState<SidebarPlanSummary>();

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [profile, schedule] = await Promise.all([
          db.contestProfiles.get('dataprev-2026'),
          db.scheduleItems.toArray(),
        ]);
        if (!active || !profile) return;
        const completedActivities = schedule.filter((item) =>
          item.status.toLowerCase().includes('conclu'),
        ).length;
        setSummary({
          completedActivities,
          daysUntilExam: getDaysUntil(profile.examDate),
          name: profile.name,
          progress: schedule.length ? Math.round((completedActivities / schedule.length) * 100) : 0,
          totalActivities: schedule.length,
        });
      } catch {
        if (active) setSummary(undefined);
      }
    };

    void load();
    const unsubscribe = subscribeToLocalDataChanges(() => void load());
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return summary;
}
