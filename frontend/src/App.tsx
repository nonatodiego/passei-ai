import { AppRoutes } from '@/routes/AppRoutes';
import { AppProviders } from '@/core';

export function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}
