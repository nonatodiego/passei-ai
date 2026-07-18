import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';
import { Content, LoadingState } from '@/design-system';

const TodayPage = lazy(() => import('@/today/pages/TodayPage').then((module) => ({ default: module.TodayPage })));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage').then((module) => ({ default: module.DashboardPage })));
const SchedulePage = lazy(() => import('@/pages/SchedulePage').then((module) => ({ default: module.SchedulePage })));
const StudySessionsPage = lazy(() => import('@/study/pages').then((module) => ({ default: module.StudySessionsPage })));
const QuestionsPage = lazy(() => import('@/pages/QuestionsPage').then((module) => ({ default: module.QuestionsPage })));
const ErrorBankPage = lazy(() => import('@/pages/ErrorBankPage').then((module) => ({ default: module.ErrorBankPage })));
const ReviewsPage = lazy(() => import('@/pages/ReviewsPage').then((module) => ({ default: module.ReviewsPage })));
const MockExamsPage = lazy(() => import('@/pages/MockExamsPage').then((module) => ({ default: module.MockExamsPage })));
const GoalsPage = lazy(() => import('@/pages/GoalsPage').then((module) => ({ default: module.GoalsPage })));
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then((module) => ({ default: module.SettingsPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

function RouteBoundary({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Content><LoadingState label="Carregando pagina" /></Content>}>
      {children}
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <RouteBoundary><TodayPage /></RouteBoundary> },
      { path: 'evolucao', element: <RouteBoundary><DashboardPage /></RouteBoundary> },
      { path: 'cronograma', element: <RouteBoundary><SchedulePage /></RouteBoundary> },
      { path: 'estudos', element: <RouteBoundary><StudySessionsPage /></RouteBoundary> },
      { path: 'questoes', element: <RouteBoundary><QuestionsPage /></RouteBoundary> },
      { path: 'banco-de-erros', element: <RouteBoundary><ErrorBankPage /></RouteBoundary> },
      { path: 'revisoes', element: <RouteBoundary><ReviewsPage /></RouteBoundary> },
      { path: 'simulados', element: <RouteBoundary><MockExamsPage /></RouteBoundary> },
      { path: 'metas', element: <RouteBoundary><GoalsPage /></RouteBoundary> },
      { path: 'configuracoes', element: <RouteBoundary><SettingsPage /></RouteBoundary> },
      { path: '*', element: <RouteBoundary><NotFoundPage /></RouteBoundary> },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
