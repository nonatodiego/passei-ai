import { contest, disciplines } from '@/mocks/data';
import { formatDate } from '@/utils/format';

export function SettingsPage() {
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
    </div>
  );
}
