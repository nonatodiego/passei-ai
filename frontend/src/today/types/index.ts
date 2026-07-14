export type TodayStatus = 'loading' | 'empty' | 'error' | 'success' | 'completed';
export type TodayActivityType = 'study' | 'questions' | 'review' | 'mockExam' | 'reading';
export type TodayPriority = 'high' | 'medium' | 'low';
export type TodayActivityStatus = 'pending' | 'inProgress' | 'completed';
export interface TodayActivity { id: string; type: TodayActivityType; discipline: string; subject: string; estimatedMinutes: number; priority: TodayPriority; status: TodayActivityStatus; recommendationReason: string; actionRoute?: string; actionLabel?: string; }
export interface TodayData { greeting: string; motivation: string; availableMinutes: number; plannedMinutes: number; remainingMinutes: number; preparationIndex: number; preparationMessage: string; preparationTrend: string; weeklyStudiedHours: number; weeklyGoalHours: number; activities: TodayActivity[]; nextReview: { discipline: string; subject: string; time: string; estimatedMinutes: number }; recommendedQuestions: { quantity: number; discipline: string; reason: string }; alerts: string[]; quickSummary: { answeredQuestions: number; studiedHours: number; remainingMinutes: number; accuracyRate: number }; }
