import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { seedDataprevSchedule } from '@/core/database/seed';
import { subscribeToLocalDataChanges } from '@/core/database/events';

type LocalDataStatus = 'loading' | 'ready' | 'error';

interface LocalDataContextValue {
  error?: string;
  refresh: () => void;
  revision: number;
  status: LocalDataStatus;
}

const LocalDataContext = createContext<LocalDataContextValue | undefined>(undefined);

export function LocalDataProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<LocalDataStatus>('loading');
  const [error, setError] = useState<string>();
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let active = true;
    void seedDataprevSchedule()
      .then(() => active && setStatus('ready'))
      .catch((reason: unknown) => {
        if (!active) return;
        setError(reason instanceof Error ? reason.message : 'Nao foi possivel iniciar os dados locais.');
        setStatus('error');
      });
    return () => { active = false; };
  }, []);

  useEffect(() => subscribeToLocalDataChanges(() => setRevision((value) => value + 1)), []);

  const value = useMemo(() => ({
    error,
    refresh: () => setRevision((current) => current + 1),
    revision,
    status,
  }), [error, revision, status]);

  return <LocalDataContext.Provider value={value}>{children}</LocalDataContext.Provider>;
}

export function useLocalData() {
  const context = useContext(LocalDataContext);
  if (!context) throw new Error('useLocalData deve ser usado dentro de LocalDataProvider.');
  return context;
}
