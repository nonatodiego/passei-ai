export type ReviewStatus = 'pending' | 'inProgress' | 'completed' | 'cancelled';
export type ReviewResult = 'forgot' | 'partial' | 'good' | 'mastered';
export type ReviewPriority = 'high' | 'medium' | 'low';
export interface ReviewRecord { id:string; sourceType:'manual'|'error'; sourceId?:string; disciplineId:string; disciplineName:string; subject:string; scheduledAt:string; estimatedMinutes:number; status:ReviewStatus; priority:ReviewPriority; result?:ReviewResult; notes:string; completedAt?:string; reviewSequence:number; createdAt:string; updatedAt:string; deletedAt?:string; }
export interface ReviewInput { sourceType:'manual'|'error'; sourceId?:string; disciplineId:string; disciplineName:string; subject:string; scheduledAt:string; estimatedMinutes:number; priority:ReviewPriority; notes:string; }
