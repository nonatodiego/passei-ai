import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { todayMock } from '@/today/mocks';
import { TodayView } from './TodayPage';
describe('TodayPage', () => {
  it('renders the daily plan and alerts', () => { const html = renderToStaticMarkup(<TodayView data={todayMock} status="success" />); expect(html).toContain('Plano do dia'); expect(html).toContain('2 revisoes atrasadas'); });
  it('renders loading, empty and error states', () => { expect(renderToStaticMarkup(<TodayView data={todayMock} status="loading" />)).toContain('Carregando plano de hoje'); expect(renderToStaticMarkup(<TodayView data={todayMock} status="empty" />)).toContain('Seu dia esta livre'); expect(renderToStaticMarkup(<TodayView data={todayMock} status="error" />)).toContain('Nao foi possivel carregar seu dia'); });
});
