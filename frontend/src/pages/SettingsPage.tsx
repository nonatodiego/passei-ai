import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Download, ShieldCheck, Trash2, Upload } from 'lucide-react';

import { Button, Card, Content, Modal, Toast } from '@/design-system';
import {
  exportBackup,
  getBackupSummary,
  getLastBackupAt,
  importBackup,
  markBackupExported,
  resetDatabase,
  validateBackup,
} from '@/core/database/backup';
import { getStorageInfo, requestPersistentStorage, type StorageInfo } from '@/core/database/storage';
import type { BackupPayload } from '@/core/database/types';

type Summary = Awaited<ReturnType<typeof getBackupSummary>>;
type BusyAction = 'export' | 'import' | 'reset' | 'storage';
type Feedback = { message: string; tone: 'danger' | 'info' | 'success' };

const backupName = () => `passei-ai-backup-${new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16)}.json`;
const entries = (summary: Summary) => [
  ['Cronograma', summary.scheduleItems],
  ['Sessoes', summary.studySessions],
  ['Blocos de questoes', summary.questionBlocks],
  ['Questoes', summary.questions],
  ['Tentativas', summary.questionAttempts],
  ['Erros', summary.errorRecords],
  ['Revisoes', summary.reviews],
  ['Metas', summary.goals],
  ['Configuracoes', summary.appSettings],
] as const;

export function SettingsPage() {
  const [storage, setStorage] = useState<StorageInfo>();
  const [summary, setSummary] = useState<Summary>();
  const [lastBackupAt, setLastBackupAt] = useState<string>();
  const [feedback, setFeedback] = useState<Feedback>();
  const [pendingImport, setPendingImport] = useState<BackupPayload>();
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetText, setResetText] = useState('');
  const [busy, setBusy] = useState<BusyAction>();
  const inputRef = useRef<HTMLInputElement>(null);

  const refresh = async () => {
    const [nextStorage, nextSummary, nextBackup] = await Promise.all([
      getStorageInfo(),
      getBackupSummary(),
      getLastBackupAt(),
    ]);
    setStorage(nextStorage);
    setSummary(nextSummary);
    setLastBackupAt(nextBackup);
  };

  useEffect(() => {
    let active = true;
    void Promise.all([getStorageInfo(), getBackupSummary(), getLastBackupAt()])
      .then(([nextStorage, nextSummary, nextBackup]) => {
        if (!active) return;
        setStorage(nextStorage);
        setSummary(nextSummary);
        setLastBackupAt(nextBackup);
      })
      .catch(() => active && setFeedback({ message: 'Nao foi possivel carregar as configuracoes locais.', tone: 'danger' }));
    return () => { active = false; };
  }, []);

  async function protectStorage() {
    if (busy) return;
    setBusy('storage');
    try {
      const result = await requestPersistentStorage();
      setFeedback({
        message: result === true ? 'Protecao de armazenamento concedida.' : result === false ? 'O navegador nao concedeu protecao adicional.' : 'Este navegador nao oferece esta solicitacao.',
        tone: result === true ? 'success' : 'info',
      });
      await refresh();
    } catch {
      setFeedback({ message: 'Nao foi possivel solicitar a protecao de armazenamento.', tone: 'danger' });
    } finally {
      setBusy(undefined);
    }
  }

  async function downloadBackup() {
    if (busy) return;
    setBusy('export');
    try {
      const payload = await exportBackup();
      const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = backupName();
      anchor.click();
      URL.revokeObjectURL(url);
      await markBackupExported(payload.metadata.exportedAt);
      setFeedback({ message: 'Backup exportado. Guarde o arquivo fora do navegador.', tone: 'success' });
      await refresh();
    } catch {
      setFeedback({ message: 'Nao foi possivel exportar o backup. Seus dados permaneceram inalterados.', tone: 'danger' });
    } finally {
      setBusy(undefined);
    }
  }

  function selectBackup(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload: unknown = JSON.parse(String(reader.result));
        if (!validateBackup(payload)) throw new Error('Estrutura incompativel.');
        setPendingImport(payload);
        setFeedback(undefined);
      } catch {
        setFeedback({ message: 'Arquivo invalido ou incompativel. Nenhum dado foi alterado.', tone: 'danger' });
      } finally {
        if (inputRef.current) inputRef.current.value = '';
      }
    };
    reader.onerror = () => setFeedback({ message: 'Nao foi possivel ler o arquivo selecionado.', tone: 'danger' });
    reader.readAsText(file);
  }

  async function confirmImport() {
    if (!pendingImport || busy) return;
    setBusy('import');
    try {
      await importBackup(pendingImport);
      setPendingImport(undefined);
      setFeedback({ message: 'Backup restaurado com sucesso.', tone: 'success' });
      await refresh();
    } catch (reason) {
      setFeedback({ message: reason instanceof Error ? reason.message : 'Nao foi possivel restaurar o backup.', tone: 'danger' });
    } finally {
      setBusy(undefined);
    }
  }

  async function clearData() {
    if (resetText !== 'APAGAR MEUS DADOS' || busy) return;
    setBusy('reset');
    try {
      await resetDatabase();
      setConfirmReset(false);
      setResetText('');
      setFeedback({ message: 'Dados locais removidos. Voce pode importar um backup ou reiniciar o cronograma.', tone: 'success' });
      await refresh();
    } catch {
      setFeedback({ message: 'Nao foi possivel remover os dados locais.', tone: 'danger' });
    } finally {
      setBusy(undefined);
    }
  }

  return (
    <Content className="space-y-6">
      <section><h1 className="text-3xl font-bold text-app-text">Configuracoes</h1><p className="mt-2 text-app-muted">Gerencie os dados salvos neste navegador.</p></section>
      <Card>
        <h2 className="text-lg font-bold text-app-text">Dados locais</h2>
        <p className="mt-2 text-sm leading-6 text-app-muted">Os dados ficam neste navegador e nesta origem. Exporte backups regularmente para evitar perdas.</p>
        {storage ? <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3"><Info label="Ambiente" value={storage.environment} /><Info label="Origem" value={storage.origin} /><Info label="Banco" value="passei-ai-local (schema 1)" /><Info label="Armazenamento persistente" value={storage.persisted === null ? 'Nao suportado' : storage.persisted ? 'Concedido' : 'Nao concedido'} /><Info label="Uso aproximado" value={storage.usage ? `${Math.round(storage.usage / 1024)} KB` : 'Indisponivel'} /><Info label="Quota aproximada" value={storage.quota ? `${Math.round(storage.quota / 1024 / 1024)} MB` : 'Indisponivel'} /></dl> : null}
        <div className="mt-5"><Button disabled={Boolean(busy)} icon={<ShieldCheck aria-hidden="true" className="h-4 w-4" />} isLoading={busy === 'storage'} onClick={() => void protectStorage()} variant="secondary">Proteger armazenamento local</Button></div>
      </Card>
      <Card>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div><h2 className="text-lg font-bold text-app-text">Backup e restauracao</h2><p className="mt-2 text-sm text-app-muted">Ultimo backup: {lastBackupAt ? new Date(lastBackupAt).toLocaleString('pt-BR') : 'nenhum backup registrado'}.</p></div>
          <div className="flex flex-wrap gap-3"><Button disabled={Boolean(busy)} icon={<Download aria-hidden="true" className="h-4 w-4" />} isLoading={busy === 'export'} onClick={() => void downloadBackup()}>Exportar backup</Button><Button disabled={Boolean(busy)} icon={<Upload aria-hidden="true" className="h-4 w-4" />} onClick={() => inputRef.current?.click()} variant="secondary">Importar backup</Button><input accept="application/json,.json" aria-label="Selecionar arquivo de backup" className="sr-only" onChange={(event) => selectBackup(event.target.files?.[0])} ref={inputRef} type="file" /></div>
        </div>
        {summary ? <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{entries(summary).map(([label, value]) => <div className="rounded-md border border-app-border p-3" key={label}><p className="text-xs text-app-muted">{label}</p><p className="mt-1 text-xl font-bold text-app-text">{value}</p></div>)}</div> : null}
      </Card>
      <Card className="border-red-200"><div className="flex gap-3"><AlertTriangle aria-hidden="true" className="h-5 w-5 shrink-0 text-app-danger" /><div><h2 className="font-bold text-app-text">Area de perigo</h2><p className="mt-1 text-sm text-app-muted">Apagar remove cronograma, sessoes, questoes, erros, revisoes, metas e configuracoes deste navegador. Exporte um backup antes.</p><Button className="mt-4" disabled={Boolean(busy)} icon={<Trash2 aria-hidden="true" className="h-4 w-4" />} onClick={() => setConfirmReset(true)} variant="danger">Apagar dados locais</Button></div></div></Card>
      {feedback ? <Toast title={feedback.message} tone={feedback.tone} /> : null}
      <Modal description="Os dados atuais serao substituidos. Recomendamos exportar um backup antes de continuar." isOpen={Boolean(pendingImport)} onClose={() => { if (!busy) setPendingImport(undefined); }} title="Restaurar backup"><p className="text-sm text-app-muted">Exportado em: {pendingImport?.metadata.exportedAt ? new Date(pendingImport.metadata.exportedAt).toLocaleString('pt-BR') : ''}</p><p className="mt-3 text-sm text-app-muted">Cronograma: {pendingImport?.scheduleItems.length ?? 0}; sessoes: {pendingImport?.studySessions.length ?? 0}; blocos: {pendingImport?.questionBlocks.length ?? 0}; erros: {pendingImport?.errorRecords.length ?? 0}; revisoes: {pendingImport?.reviews.length ?? 0}.</p><div className="mt-5 flex justify-end gap-3"><Button disabled={Boolean(busy)} onClick={() => setPendingImport(undefined)} variant="secondary">Cancelar</Button><Button isLoading={busy === 'import'} onClick={() => void confirmImport()}>Substituir dados atuais</Button></div></Modal>
      <Modal description="Esta acao nao pode ser desfeita sem um backup exportado." isOpen={confirmReset} onClose={() => { if (!busy) setConfirmReset(false); }} title="Apagar dados locais"><label className="block text-sm font-medium text-app-text" htmlFor="reset-confirmation">Digite APAGAR MEUS DADOS para confirmar</label><input className="mt-2 w-full rounded-md border border-app-border px-3 py-2" id="reset-confirmation" onChange={(event) => setResetText(event.target.value)} value={resetText} /><div className="mt-5 flex justify-end gap-3"><Button disabled={Boolean(busy)} onClick={() => setConfirmReset(false)} variant="secondary">Cancelar</Button><Button disabled={resetText !== 'APAGAR MEUS DADOS'} isLoading={busy === 'reset'} onClick={() => void clearData()} variant="danger">Apagar definitivamente</Button></div></Modal>
    </Content>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-app-muted">{label}</dt><dd className="mt-1 font-semibold text-app-text">{value}</dd></div>;
}
