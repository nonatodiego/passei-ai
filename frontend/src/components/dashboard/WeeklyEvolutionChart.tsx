import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card } from '@/design-system';
import type { WeeklyEvolutionPoint } from '@/types/dashboard';

export function WeeklyEvolutionChart({ data }: { data: WeeklyEvolutionPoint[] }) {
  return (
    <Card className="h-full p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-app-text">Evolução semanal</h2>
        <select
          aria-label="Período do gráfico"
          className="rounded-md border border-app-border bg-white px-3 py-2 text-sm font-medium text-app-text focus:outline-none focus-visible:ring-2 focus-visible:ring-app-focus"
          defaultValue="6"
        >
          <option value="6">Últimas 6 semanas</option>
        </select>
      </div>
      <ResponsiveContainer height={260} width="100%">
        <AreaChart data={data} margin={{ bottom: 0, left: -12, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="dashboardEvolution" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E2E8F0" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="week"
            tickLine={false}
            tick={{ fill: '#475569', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            tickLine={false}
            tick={{ fill: '#475569', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              border: '1px solid #E2E8F0',
              borderRadius: 10,
              boxShadow: '0 16px 40px -30px rgba(15, 23, 42, 0.38)',
            }}
            formatter={(value) => [`${value}%`, 'Índice']}
            labelFormatter={(label) => `Semana ${label}`}
          />
          <Area
            activeDot={{ r: 5 }}
            dataKey="preparationIndex"
            dot={{ fill: '#2563EB', r: 4, strokeWidth: 0 }}
            fill="url(#dashboardEvolution)"
            stroke="#2563EB"
            strokeWidth={3}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-6 rounded-md bg-blue-50 p-4">
        <p className="text-sm font-semibold text-app-text">
          <span className="mr-3 text-2xl font-bold text-app-success">+12%</span>
          Seu desempenho está acima da média!
        </p>
        <p className="mt-1 text-sm text-app-muted">Continue assim!</p>
      </div>
    </Card>
  );
}
