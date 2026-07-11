import type { ReactNode } from 'react';

import { StudyEngineProvider } from '@/study-engine';

export function AppProviders({ children }: { children: ReactNode }) {
  return <StudyEngineProvider>{children}</StudyEngineProvider>;
}
