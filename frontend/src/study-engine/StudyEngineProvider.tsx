import { useMemo, type ReactNode } from 'react';

import { StudyEngineContext, type StudyEngineContextValue } from '@/study-engine/StudyEngineContext';
import { mockStudyEngineService } from '@/study-engine/services/StudyEngineService';

export function StudyEngineProvider({ children }: { children: ReactNode }) {
  const value = useMemo<StudyEngineContextValue>(
    () => ({
      result: mockStudyEngineService.getEngineResult(),
    }),
    [],
  );

  return <StudyEngineContext.Provider value={value}>{children}</StudyEngineContext.Provider>;
}
