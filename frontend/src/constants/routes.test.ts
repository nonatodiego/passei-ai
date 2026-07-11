import { describe, expect, it } from 'vitest';

import { routes } from '@/constants/routes';

describe('application routes', () => {
  it('defines all initial navigation entries', () => {
    expect(routes.map((route) => route.path)).toEqual([
      '/',
      '/cronograma',
      '/estudos',
      '/questoes',
      '/banco-de-erros',
      '/revisoes',
      '/simulados',
      '/metas',
      '/configuracoes',
    ]);
  });
});
