import { mockStudyEngineService } from '@/study-engine/services/StudyEngineService';
import type { EngineResult } from '@/study-engine/types';

export function createEngineResult(): EngineResult {
  return mockStudyEngineService.getEngineResult();
}
