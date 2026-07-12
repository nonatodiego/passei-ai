import { AlertTriangle, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  Badge,
  Button,
  Card,
  Content,
  EmptyState,
  ErrorState,
  KPICard,
  LoadingState,
  Section,
  Toast,
} from '@/design-system';
import { ErrorDetailsDrawer } from '@/error-bank/components/ErrorDetailsDrawer';
import { ErrorRecordFormModal } from '@/error-bank/components/ErrorRecordFormModal';
import { useErrorBank } from '@/error-bank/hooks';
import { defaultErrorFilters } from '@/error-bank/services';
import type { ErrorAction, ErrorRecord, ErrorRecordInput } from '@/error-bank/types';

const feedbackByAction: Record<ErrorAction, string> = {
  archive: 'Erro arquivado.',
  master: 'Assunto marcado como dominado.',
  recur: 'Nova ocorrencia registrada.',
  reschedule: 'Revisao reagendada.',
  review: 'Erro marcado como revisado.',
};

export function ErrorBankPage() {
  const { addRecord, filtered, filters, records, runAction, setFilters, stats, status } =
    useErrorBank();
  const [selected, setSelected] = useState<ErrorRecord>();
  const [isFormOpen, setFormOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; tone: 'success' | 'danger' }>();

  useEffect(() => {
    if (!feedback) return;
    const timeout = window.setTimeout(() => setFeedback(undefined), 4500);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  function handleCreate(input: ErrorRecordInput) {
    addRecord(input);
    setFeedback({ message: 'Erro registrado com sucesso.', tone: 'success' });
  }

  function handleAction(action: ErrorAction) {
    if (!selected) return;
    try {
      const updated = runAction(
        selected.id,
        action,
        action === 'reschedule' ? '2026-07-20' : undefined,
      );
      if (!updated) throw new Error('Registro nao encontrado');
      setSelected(updated);
      setFeedback({ message: feedbackByAction[action], tone: 'success' });
    } catch {
      setFeedback({ message: 'Nao foi possivel concluir a acao.', tone: 'danger' });
    }
  }

  if (status === 'loading') return <LoadingState label="Carregando Banco de Erros" />;
  if (status === 'error') return <ErrorState title="Nao foi possivel carregar erros" description="Tente novamente." />;

  const activeFilters = Object.values(filters).filter(
    (value) => value !== '' && value !== 'all' && value !== false,
  ).length;

  return (
    <Content className="space-y-6">
      {feedback ? <Toast title={feedback.message} tone={feedback.tone} /> : null}
      <Section className="rounded-md border border-app-border bg-white p-6 shadow-panel">
        <div className="flex flex-wrap justify-between gap-4">
          <div><Badge tone="red">Banco de Erros</Badge><h1 className="mt-3 text-3xl font-bold">Transforme erros em aprendizado</h1><p className="mt-2 text-app-muted">Registre o motivo, a acao corretiva e o proximo reforco.</p></div>
          <Button icon={<Plus aria-hidden="true" className="h-4 w-4" />} onClick={() => setFormOpen(true)}>Novo erro</Button>
        </div>
      </Section>
      <section aria-label="Resumo do Banco de Erros" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <KPICard icon={AlertTriangle} label="Erros ativos" tone="red" value={`${stats.active}`} />
        <KPICard icon={AlertTriangle} label="Recorrentes" tone="amber" value={`${stats.recurring}`} />
        <KPICard icon={AlertTriangle} label="Dominados" tone="green" value={`${stats.mastered}`} />
        <KPICard icon={AlertTriangle} label="Pendentes de revisao" tone="blue" value={`${stats.pendingReview}`} />
        <KPICard icon={AlertTriangle} label="Categoria predominante" tone="amber" value={stats.predominantCategory} />
        <KPICard icon={AlertTriangle} label="Disciplina critica" tone="red" value={stats.criticalDiscipline} />
      </section>
      <Card className="p-5">
        <div className="grid gap-3 md:grid-cols-3">
          <input aria-label="Pesquisar erros" className="h-10 rounded-md border border-app-border px-3" placeholder="Pesquisar" value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} />
          <select aria-label="Status" className="h-10 rounded-md border border-app-border px-3" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value as typeof filters.status })}><option value="all">Todos os status</option><option value="active">Ativos</option><option value="reviewed">Revisados</option><option value="mastered">Dominados</option></select>
          <label className="flex items-center gap-2 text-sm"><input checked={filters.recurringOnly} onChange={(event) => setFilters({ ...filters, recurringOnly: event.target.checked })} type="checkbox" />Somente recorrentes</label>
        </div>
        <div className="mt-3 flex justify-between"><span className="text-sm text-app-muted">{activeFilters} filtros ativos</span><Button size="sm" variant="ghost" onClick={() => setFilters(defaultErrorFilters)}>Limpar filtros</Button></div>
      </Card>
      {filtered.length === 0 ? (
        <EmptyState title={records.every((record) => record.status === 'mastered') ? 'Todos os erros dominados' : 'Sem resultados'} description="Ajuste os filtros ou registre um novo erro." icon={AlertTriangle} />
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {filtered.map((record) => <Card key={record.id} className="p-5"><div className="flex flex-col justify-between gap-4 sm:flex-row"><div><div className="flex flex-wrap gap-2"><Badge tone={record.priority === 'high' ? 'red' : record.priority === 'medium' ? 'amber' : 'blue'}>{record.priority}</Badge><Badge tone={record.status === 'mastered' ? 'green' : 'blue'}>{record.status}</Badge></div><h2 className="mt-3 font-bold">{record.discipline}: {record.subject}</h2><p className="mt-1 text-sm text-app-muted">{record.category} · recorrencia {record.recurrence} · revisao {record.nextReview || 'a definir'}</p><p className="mt-3 text-sm">{record.correctiveAction}</p></div><Button variant="secondary" onClick={() => setSelected(record)}>Detalhes</Button></div></Card>)}
        </section>
      )}
      <ErrorRecordFormModal isOpen={isFormOpen} onClose={() => setFormOpen(false)} onSubmit={handleCreate} />
      <ErrorDetailsDrawer errorRecord={selected} onAction={handleAction} onClose={() => setSelected(undefined)} />
    </Content>
  );
}
