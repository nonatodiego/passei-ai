import { useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { routes } from '@/constants/routes';

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const currentRoute = useMemo(
    () =>
      routes.find((route) => route.path === location.pathname) ??
      routes.find((route) => route.path === '/')!,
    [location.pathname],
  );

  return (
    <div className="min-h-screen bg-app-background text-app-text lg:flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <Header
          currentRoute={currentRoute}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
