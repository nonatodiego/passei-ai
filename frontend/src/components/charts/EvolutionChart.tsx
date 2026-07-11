import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { EvolutionPoint } from '@/types';

export function EvolutionChart({ data }: { data: EvolutionPoint[] }) {
  return (
    <div className="h-80 rounded-lg border border-app-border bg-app-card p-4 shadow-panel">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-app-text">Evolução</h2>
        <p className="text-sm text-app-muted">Horas, acertos e pontuação por semana</p>
      </div>
      <ResponsiveContainer height="82%" width="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
          <XAxis dataKey="week" stroke="#64748B" />
          <YAxis stroke="#64748B" />
          <Tooltip />
          <Legend />
          <Line
            dataKey="hours"
            name="Horas"
            stroke="#0F766E"
            strokeWidth={2}
            type="monotone"
          />
          <Line
            dataKey="accuracy"
            name="Acertos %"
            stroke="#1D4ED8"
            strokeWidth={2}
            type="monotone"
          />
          <Line
            dataKey="score"
            name="Nota"
            stroke="#F59E0B"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
