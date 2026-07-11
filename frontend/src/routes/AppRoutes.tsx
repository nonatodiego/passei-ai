import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { ErrorBankPage } from '@/pages/ErrorBankPage';
import { GoalsPage } from '@/pages/GoalsPage';
import { MockExamsPage } from '@/pages/MockExamsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { QuestionsPage } from '@/pages/QuestionsPage';
import { ReviewsPage } from '@/pages/ReviewsPage';
import { SchedulePage } from '@/pages/SchedulePage';
import { SettingsPage } from '@/pages/SettingsPage';
import { StudiesPage } from '@/pages/StudiesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'cronograma', element: <SchedulePage /> },
      { path: 'estudos', element: <StudiesPage /> },
      { path: 'questoes', element: <QuestionsPage /> },
      { path: 'banco-de-erros', element: <ErrorBankPage /> },
      { path: 'revisoes', element: <ReviewsPage /> },
      { path: 'simulados', element: <MockExamsPage /> },
      { path: 'metas', element: <GoalsPage /> },
      { path: 'configuracoes', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
