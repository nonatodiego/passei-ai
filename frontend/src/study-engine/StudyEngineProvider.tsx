import { useMemo, type ReactNode } from 'react';

import { StudyEngineContext, type StudyEngineContextValue } from '@/study-engine/StudyEngineContext';
import { localStudyEngineService } from '@/study-engine/services/StudyEngineService';

export function StudyEngineProvider({ children }: { children: ReactNode }) {
  const value = useMemo<StudyEngineContextValue>(
    () => ({
      result: localStudyEngineService.getEngineResult(),
    }),
    [],
  );

  return <StudyEngineContext.Provider value={value}>{children}</StudyEngineContext.Provider>;
}
