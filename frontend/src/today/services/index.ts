import { todayMock } from '@/today/mocks';
import type { TodayData } from '@/today/types';
export interface TodayServicePort { getToday: () => TodayData; }
export const TodayService: TodayServicePort = { getToday: () => todayMock };
