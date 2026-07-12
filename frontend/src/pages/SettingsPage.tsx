import { useEffect, useState } from 'react';
import { Button, Card, Toast } from '@/design-system';
import { getStorageInfo, requestPersistentStorage, type StorageInfo } from '@/core';
import { contest, disciplines } from '@/mocks/data';
import { formatDate } from '@/utils/format';

export function SettingsPage() {
  const [storage, setStorage] = useState<StorageInfo>();
  const [message, setMessage] = useState<string>();
  useEffect(() => { void getStorageInfo().then(setStorage); }, []);
  async function protectStorage() { const result = await requestPersistentStorage(); setMessage(result === true ? 'Protecao de armazenamento concedida.' : result === false ? 'O navegador nao concedeu protecao adicional.' : 'Este navegador nao oferece esta solicitacao.'); setStorage(await getStorageInfo()); }
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <form className="rounded-lg border border-app-border bg-white p-5 shadow-panel">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['Nome do concurso', contest.name],
            ['Cargo', contest.role],
            ['Banca', contest.board],
            ['Data da prova', formatDate(contest.examDate)],
            ['Meta de aprovação', `${contest.approvalTarget}%`],
          ].map(([label, value]) => (
            <label className="space-y-2" key={label}>
              <span className="text-sm font-medium text-app-muted">{label}</span>
              <input
                className="w-full rounded-lg border border-app-border px-3 py-2 text-sm outline-none focus:border-app-primary focus:ring-2 focus:ring-blue-100"
                defaultValue={value}
              />
            </label>
          ))}
        </div>
      </form>
      <aside className="rounded-lg border border-app-border bg-white p-5 shadow-panel">
        <h2 className="font-semibold text-app-text">Disciplinas e pesos</h2>
        <div className="mt-4 space-y-3">
          {disciplines.map((discipline) => (
            <div
              className="flex items-center justify-between gap-3 rounded-lg border border-app-border p-3"
              key={discipline.id}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-app-text">{discipline.name}</p>
                <p className="text-xs text-app-muted">{discipline.questions} questões</p>
              </div>
              <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-app-text">
                peso {discipline.weight}
              </span>
            </div>
          ))}
        </div>
      </aside>
      <Card className="xl:col-span-2">
        <h2 className="font-semibold text-app-text">Dados locais</h2>
        <p className="mt-2 text-sm leading-6 text-app-muted">Seus dados estao armazenados neste navegador e neste endereco da aplicacao. Eles nao sao compartilhados automaticamente com outros dispositivos ou dominios.</p>
        {storage ? <div className="mt-4 grid gap-2 text-sm text-app-muted md:grid-cols-2"><span>Ambiente: <strong className="text-app-text">{storage.environment}</strong></span><span>Armazenamento persistente: <strong className="text-app-text">{storage.persisted === null ? 'Nao suportado' : storage.persisted ? 'Concedido' : 'Nao concedido'}</strong></span><span>Uso aproximado: {storage.usage ? `${Math.round(storage.usage / 1024)} KB` : 'Indisponivel'}</span><span>Quota aproximada: {storage.quota ? `${Math.round(storage.quota / 1024 / 1024)} MB` : 'Indisponivel'}</span></div> : null}
        {storage?.environment === 'preview' ? <p className="mt-3 text-sm text-app-warning">Ambiente de teste: os dados deste endereco sao separados dos dados da versao de producao.</p> : null}
        <div className="mt-4"><Button onClick={() => void protectStorage()} variant="secondary">Proteger armazenamento local</Button></div>
        {message ? <div className="mt-4"><Toast title={message} tone="info" /></div> : null}
      </Card>
    </div>
  );
}
