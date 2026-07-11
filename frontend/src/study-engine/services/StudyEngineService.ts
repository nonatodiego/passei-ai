import { studyEngineMock } from '@/study-engine/mocks/studyEngineMock';
import type { EngineResult } from '@/study-engine/types';

export interface StudyEngineProviderPort {
  getEngineResult: () => EngineResult;
}

export const mockStudyEngineService: StudyEngineProviderPort = {
  getEngineResult: () => studyEngineMock,
};
