import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="rounded-lg border border-app-border bg-white p-8 text-center shadow-panel">
      <h2 className="text-xl font-semibold text-app-text">Página não encontrada</h2>
      <p className="mt-2 text-app-muted">A rota solicitada não existe nesta versão.</p>
      <Link
        className="mt-5 inline-flex rounded-lg bg-app-primary px-4 py-2 text-sm font-semibold text-white"
        to="/"
      >
        Voltar ao Dashboard
      </Link>
    </div>
  );
}
