import { useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { routes, type AppRoute } from '@/constants/routes';
import { PageContainer } from '@/design-system/layout/PageContainer';

const primaryActionRoutes: Partial<Record<AppRoute['path'], string>> = {
  '/': '/estudos?create=1',
  '/cronograma': '/cronograma?create=1',
  '/estudos': '/estudos?create=1',
  '/evolucao': '/estudos?create=1',
};

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = useMemo(
    () =>
      routes.find((route) => route.path === location.pathname) ??
      routes.find((route) => route.path === '/')!,
    [location.pathname],
  );

  const primaryActionRoute = primaryActionRoutes[currentRoute.path];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-app-text lg:flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <Header
          currentRoute={currentRoute}
          onMenuClick={() => setIsSidebarOpen(true)}
          onPrimaryAction={primaryActionRoute ? () => navigate(primaryActionRoute) : undefined}
        />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </div>
  );
}
