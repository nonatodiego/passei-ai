import { createContext } from 'react';

export type LocalDataStatus = 'loading' | 'ready' | 'error';

export interface LocalDataContextValue {
  error?: string;
  refresh: () => void;
  revision: number;
  status: LocalDataStatus;
}

export const LocalDataContext = createContext<LocalDataContextValue | undefined>(undefined);
