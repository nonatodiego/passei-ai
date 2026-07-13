import { useContext } from 'react';

import { LocalDataContext } from './localDataContext';

export function useLocalData() {
  const context = useContext(LocalDataContext);
  if (!context) throw new Error('useLocalData deve ser usado dentro de LocalDataProvider.');
  return context;
}
