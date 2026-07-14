import { useEffect, useState } from 'react';
import { Content, EmptyState, ErrorState, LoadingState } from '@/design-system';
import { db } from '@/core/database/database';
import { useLocalData } from '@/core/providers/useLocalData';

export function MockExamsPage() {
  const [count, setCount] = useState<number>(); const [error, setError] = useState(false); const { revision } = useLocalData();
  useEffect(() => { let active = true; void db.mockExams.count().then((value) => active && setCount(value)).catch(() => active && setError(true)); return () => { active = false; }; }, [revision]);
  if (error) return <Content><ErrorState title="Nao foi possivel carregar simulados" description="Tente novamente." /></Content>;
  if (count === undefined) return <Content><LoadingState label="Carregando simulados" /></Content>;
  return <Content><EmptyState title={count ? 'Simulados registrados' : 'Nenhum simulado registrado'} description={count ? `${count} simulados estao salvos neste navegador.` : 'Registre um simulado para acompanhar seus resultados reais.'} /></Content>;
}
