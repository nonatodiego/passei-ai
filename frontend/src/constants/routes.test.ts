import { describe, expect, it } from 'vitest';

import { routes } from '@/constants/routes';

describe('application routes', () => {
  it('defines Hoje as the initial route and Evolucao as the dashboard route', () => {
    expect(routes.map((route) => route.path)).toEqual([
      '/',
      '/evolucao',
      '/cronograma',
      '/estudos',
      '/questoes',
      '/banco-de-erros',
      '/revisoes',
      '/simulados',
      '/metas',
      '/configuracoes',
    ]);

    expect(routes[0]).toMatchObject({
      actionLabel: 'Comecar agora',
      label: 'Hoje',
      path: '/',
      title: 'Hoje',
    });
    expect(routes.find((route) => route.path === '/evolucao')).toMatchObject({
      label: 'Evolucao',
      title: 'Evolucao',
    });
  });
});
