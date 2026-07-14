import type { ReactNode } from 'react';

import { LocalDataProvider } from './LocalDataProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return <LocalDataProvider>{children}</LocalDataProvider>;
}
