import { renderToStaticMarkup } from 'react-dom/server';
import { BookOpen } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import { Badge, Button, Input, Progress } from '@/design-system/atoms';
import { EmptyState, KPICard, LoadingState, Toast } from '@/design-system/molecules';
import { DataTable } from '@/design-system/organisms';

describe('design system components', () => {
  it('renders accessible form and action atoms', () => {
    const html = renderToStaticMarkup(
      <div>
        <Button>Salvar</Button>
        <Input label="Disciplina" name="discipline" />
        <Progress label="Progresso" value={64} />
        <Badge tone="green">concluído</Badge>
      </div>,
    );

    expect(html).toContain('Salvar');
    expect(html).toContain('Disciplina');
    expect(html).toContain('role="progressbar"');
    expect(html).toContain('concluído');
  });

  it('renders reusable feedback and KPI molecules', () => {
    const html = renderToStaticMarkup(
      <div>
        <KPICard icon={BookOpen} label="Horas" value="15h" />
        <Toast title="Salvo">Alterações registradas.</Toast>
        <EmptyState description="Ainda não há dados." title="Sem registros" />
        <LoadingState />
      </div>,
    );

    expect(html).toContain('Horas');
    expect(html).toContain('Salvo');
    expect(html).toContain('Sem registros');
    expect(html).toContain('Carregando dados');
  });

  it('renders data tables with empty and filled states', () => {
    const columns = [
      { key: 'name', header: 'Nome', render: (row: { name: string }) => row.name },
    ];

    const filled = renderToStaticMarkup(
      <DataTable columns={columns} rows={[{ name: 'Português' }]} />,
    );
    const empty = renderToStaticMarkup(<DataTable columns={columns} rows={[]} />);

    expect(filled).toContain('Português');
    expect(empty).toContain('Nenhum registro encontrado.');
  });
});
