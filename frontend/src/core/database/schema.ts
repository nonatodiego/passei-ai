export const DATABASE_NAME = 'passei-ai-local';
export const DATABASE_SCHEMA_VERSION = 1;
export const databaseStores = {
  appSettings: 'id, key, updatedAt', contestProfiles: 'id, name, examDate', disciplines: 'id, name, contestProfileId', scheduleItems: 'id, plannedDate, disciplineName, status, priority, outsideExamWindow', studySessions: 'id, date, disciplineName, scheduleItemId', questionBlocks: 'id, date, disciplineName', questions: 'id, disciplineName, status', questionAttempts: 'id, questionId, createdAt', errorRecords: 'id, discipline, subject, status', reviews: 'id, scheduledAt, status', mockExams: 'id, date', goals: 'id, type, status',
} as const;
