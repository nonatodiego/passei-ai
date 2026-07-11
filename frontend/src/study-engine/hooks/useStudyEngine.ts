import { useContext } from 'react';

import { StudyEngineContext } from '@/study-engine/StudyEngineContext';

export function useStudyEngine() {
  const context = useContext(StudyEngineContext);

  if (!context) {
    throw new Error('useStudyEngine must be used inside StudyEngineProvider.');
  }

  return context;
}
