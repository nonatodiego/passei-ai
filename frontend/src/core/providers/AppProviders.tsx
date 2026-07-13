import type { ReactNode } from 'react';

import { StudyEngineProvider } from '@/study-engine';
import { LocalDataProvider } from './LocalDataProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return <LocalDataProvider><StudyEngineProvider>{children}</StudyEngineProvider></LocalDataProvider>;
}
