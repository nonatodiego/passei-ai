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

import { ChartCard } from '@/design-system';
import type { WeeklyEvolutionPoint } from '@/types/dashboard';

export function WeeklyEvolutionChart({ data }: { data: WeeklyEvolutionPoint[] }) {
  return (
    <ChartCard
      description="Horas estudadas, acertos e índice de preparação por semana."
      title="Evolução semanal"
    >
      <ResponsiveContainer height={280} width="100%">
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
            stroke="#2563EB"
            strokeWidth={2}
            type="monotone"
          />
          <Line
            dataKey="preparationIndex"
            name="Índice"
            stroke="#F59E0B"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
