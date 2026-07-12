import { useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { routes } from '@/constants/routes';
import { PageContainer } from '@/design-system/layout/PageContainer';

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
    <div className="min-h-screen bg-[#F8FAFC] text-app-text lg:flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <Header
          currentRoute={currentRoute}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </div>
  );
}
