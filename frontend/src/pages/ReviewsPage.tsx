import { useMemo, useState } from 'react';
import { Check, Play, Plus, X } from 'lucide-react';

import { Badge, Button, Card, Content, DataTable, EmptyState, ErrorState, Input, LoadingState, Section, Select, Toast } from '@/design-system';
import { useReviews, ReviewService, type ReviewInput, type ReviewRecord } from '@/reviews';
import { toLocalDateKey } from '@/shared/utils/date';

const initialReviewInput = (): ReviewInput => ({ sourceType: 'manual', disciplineId: '', disciplineName: '', subject: '', scheduledAt: toLocalDateKey(), estimatedMinutes: 20, priority: 'medium', notes: '' });
const tone = (status: ReviewRecord['status']) => status === 'completed' ? 'green' as const : status === 'cancelled' ? 'slate' as const : status === 'inProgress' ? 'blue' as const : 'amber' as const;

export function ReviewsPage() {
  const { reviews, status, reload } = useReviews();
  const [form, setForm] = useState(initialReviewInput);
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [busyReviewId, setBusyReviewId] = useState<string>();
  const [feedback, setFeedback] = useState<{ message: string; tone: 'danger' | 'success' }>();
  const visible = useMemo(() => reviews.filter((item) => `${item.disciplineName} ${item.subject}`.toLowerCase().includes(query.toLowerCase())), [reviews, query]);

  async function create() {
    if (isSaving) return;
    setSubmitted(true);
    if (!form.disciplineName.trim() || !form.subject.trim()) {
      const id = !form.disciplineName.trim() ? 'review-discipline' : 'review-subject';
      window.requestAnimationFrame(() => document.getElementById(id)?.focus());
      return;
    }
    setIsSaving(true);
    try {
      await ReviewService.create({ ...form, disciplineId: form.disciplineName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') });
      setForm(initialReviewInput());
      setSubmitted(false);
      setFeedback({ message: 'Revisao criada com sucesso.', tone: 'success' });
      reload();
    } catch (reason) {
      setFeedback({ message: reason instanceof Error ? reason.message : 'Nao foi possivel criar a revisao.', tone: 'danger' });
    } finally {
      setIsSaving(false);
    }
  }

  async function action(record: ReviewRecord, kind: 'start' | 'complete' | 'cancel') {
    if (busyReviewId) return;
    setBusyReviewId(record.id);
    try {
      if (kind === 'start') await ReviewService.start(record);
      if (kind === 'cancel') await ReviewService.cancel(record);
      if (kind === 'complete') await ReviewService.complete(record, 'good');
      setFeedback({ message: kind === 'complete' ? 'Revisao concluida.' : kind === 'cancel' ? 'Revisao cancelada.' : 'Revisao iniciada.', tone: 'success' });
      reload();
    } catch {
      setFeedback({ message: 'Nao foi possivel atualizar a revisao.', tone: 'danger' });
    } finally {
      setBusyReviewId(undefined);
    }
  }

  const columns = [
    { key: 'date', header: 'Data', render: (row: ReviewRecord) => row.scheduledAt },
    { key: 'subject', header: 'Assunto', render: (row: ReviewRecord) => `${row.disciplineName}: ${row.subject}` },
    { key: 'source', header: 'Origem', render: (row: ReviewRecord) => row.sourceType === 'error' ? 'Banco de Erros' : 'Manual' },
    { key: 'status', header: 'Status', render: (row: ReviewRecord) => <Badge tone={tone(row.status)}>{row.status}</Badge> },
    { key: 'actions', header: 'Acoes', render: (row: ReviewRecord) => <div className="flex gap-1">{row.status === 'pending' ? <Button disabled={Boolean(busyReviewId)} icon={<Play aria-hidden="true" className="h-4 w-4" />} isLoading={busyReviewId === row.id} onClick={() => void action(row, 'start')} size="sm">Iniciar</Button> : null}{row.status === 'inProgress' ? <Button disabled={Boolean(busyReviewId)} icon={<Check aria-hidden="true" className="h-4 w-4" />} isLoading={busyReviewId === row.id} onClick={() => void action(row, 'complete')} size="sm">Concluir</Button> : null}{row.status === 'pending' || row.status === 'inProgress' ? <Button disabled={Boolean(busyReviewId)} icon={<X aria-hidden="true" className="h-4 w-4" />} onClick={() => void action(row, 'cancel')} size="sm" variant="ghost">Cancelar</Button> : null}</div> },
  ];

  if (status === 'loading') return <Content><LoadingState label="Carregando revisoes locais" /></Content>;
  if (status === 'error') return <Content><ErrorState actionLabel="Tentar novamente" description="Os dados locais nao puderam ser lidos." onAction={reload} title="Nao foi possivel carregar revisoes" /></Content>;
  return <Content className="space-y-6">{feedback ? <Toast title={feedback.message} tone={feedback.tone} /> : null}<Section className="flex flex-col gap-4 rounded-md border border-app-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-2xl font-semibold">Revisoes</h1><p className="mt-1 text-sm text-app-muted">Agende e conclua reforcos com dados locais.</p></div><Badge tone="blue">{reviews.filter((item) => item.status === 'pending').length} pendentes</Badge></Section><Card><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5"><Input error={submitted && !form.disciplineName.trim() ? 'Disciplina obrigatoria.' : undefined} id="review-discipline" label="Disciplina" name="review-discipline" onChange={(event) => setForm({ ...form, disciplineName: event.target.value })} value={form.disciplineName} /><Input error={submitted && !form.subject.trim() ? 'Assunto obrigatorio.' : undefined} id="review-subject" label="Assunto" name="review-subject" onChange={(event) => setForm({ ...form, subject: event.target.value })} value={form.subject} /><Input label="Data" name="review-date" onChange={(event) => setForm({ ...form, scheduledAt: event.target.value })} type="date" value={form.scheduledAt} /><Input label="Duracao" min={1} name="review-duration" onChange={(event) => setForm({ ...form, estimatedMinutes: Number(event.target.value) })} type="number" value={form.estimatedMinutes} /><Select label="Prioridade" name="review-priority" onChange={(event) => setForm({ ...form, priority: event.target.value as ReviewInput['priority'] })} options={[{ value: 'high', label: 'Alta' }, { value: 'medium', label: 'Media' }, { value: 'low', label: 'Baixa' }]} value={form.priority} /><Button className="self-end" icon={<Plus aria-hidden="true" className="h-4 w-4" />} isLoading={isSaving} onClick={() => void create()}>Criar revisao</Button></div></Card><Input label="Pesquisar revisoes" name="review-search" onChange={(event) => setQuery(event.target.value)} value={query} />{visible.length ? <DataTable columns={columns} rows={visible} /> : <EmptyState title="Nenhuma revisao" description={reviews.length ? 'Nenhuma revisao corresponde a pesquisa.' : 'Crie uma revisao manual ou a partir de um erro.'} />}</Content>;
}
