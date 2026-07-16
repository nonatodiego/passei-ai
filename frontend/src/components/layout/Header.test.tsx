// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { routes } from '@/constants/routes';

afterEach(cleanup);

describe('Header', () => {
  it('forwards the configured primary action to the creation button', async () => {
    const onPrimaryAction = vi.fn();
    const currentRoute = routes.find((route) => route.path === '/cronograma')!;
    const user = userEvent.setup();
    render(<Header currentRoute={currentRoute} onMenuClick={vi.fn()} onPrimaryAction={onPrimaryAction} />);

    await user.click(screen.getByRole('button', { name: 'Nova atividade' }));
    expect(onPrimaryAction).toHaveBeenCalledTimes(1);
  });

  it('does not expose a primary action without a valid destination', () => {
    const currentRoute = routes.find((route) => route.path === '/simulados')!;
    render(<Header currentRoute={currentRoute} onMenuClick={vi.fn()} />);

    expect(screen.queryByRole('button', { name: 'Novo simulado' })).not.toBeInTheDocument();
  });

  it('maps schedule and study primary actions to their creation routes', async () => {
    const user = userEvent.setup();
    const renderLayout = (path: '/cronograma' | '/estudos') => render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<AppLayout />} path="/">
            <Route element={<LocationProbe />} path="cronograma" />
            <Route element={<LocationProbe />} path="estudos" />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const first = renderLayout('/cronograma');
    await user.click(screen.getByRole('button', { name: 'Nova atividade' }));
    expect(screen.getByTestId('location')).toHaveTextContent('/cronograma?create=1');
    first.unmount();

    renderLayout('/estudos');
    await user.click(screen.getByRole('button', { name: 'Nova sessão' }));
    expect(screen.getByTestId('location')).toHaveTextContent('/estudos?create=1');
  });
});

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{`${location.pathname}${location.search}`}</output>;
}
