import { localStudyEngineService } from '@/study-engine/services/StudyEngineService';
import type { EngineResult } from '@/study-engine/types';

export function createEngineResult(): EngineResult {
  return localStudyEngineService.getEngineResult();
}
