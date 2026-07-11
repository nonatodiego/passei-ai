import { createContext } from 'react';

import type { EngineResult } from '@/study-engine/types';

export interface StudyEngineContextValue {
  result: EngineResult;
}

export const StudyEngineContext = createContext<StudyEngineContextValue | null>(null);
