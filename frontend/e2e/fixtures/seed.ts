import type { Page } from '@playwright/test';

export const FIXED_NOW = '2026-07-18T15:00:00.000Z';
export const FIXED_TODAY = '2026-07-18';

export type TestRecord = { id: string; [key: string]: unknown };

export interface DatabaseSeed {
  appSettings: TestRecord[];
  contestProfiles: TestRecord[];
  disciplines: TestRecord[];
  errorRecords: TestRecord[];
  goals: TestRecord[];
  mockExams: TestRecord[];
  questionAttempts: TestRecord[];
  questionBlocks: TestRecord[];
  questions: TestRecord[];
  reviews: TestRecord[];
  scheduleItems: TestRecord[];
  studySessions: TestRecord[];
}

const timestamp = FIXED_NOW;

export const EMPTY_USER_SEED: DatabaseSeed = {
  appSettings: [],
  contestProfiles: [{
    board: 'FGV',
    createdAt: timestamp,
    examDate: '2026-10-11',
    id: 'dataprev-2026',
    name: 'E2E - DATAPREV 2026',
    role: 'E2E - Gestao de Servicos de TIC',
    targetAccuracy: 85,
    updatedAt: timestamp,
  }],
  disciplines: [{
    contestProfileId: 'dataprev-2026',
    createdAt: timestamp,
    id: 'e2e-discipline',
    name: 'E2E - Governanca de TI',
    updatedAt: timestamp,
  }],
  errorRecords: [],
  goals: [
    ['hours', 'Horas de estudo por semana', 15],
    ['questions', 'Questoes por semana', 300],
    ['reviews', 'Revisoes por semana', 7],
    ['mockExams', 'Simulados por semana', 1],
    ['accuracy', 'Taxa de acertos desejada', 85],
  ].map(([kind, name, target], index) => ({
    createdAt: timestamp,
    id: `e2e-goal-${index}`,
    kind,
    name,
    target,
    updatedAt: timestamp,
  })),
  mockExams: [],
  questionAttempts: [],
  questionBlocks: [],
  questions: [],
  reviews: [],
  scheduleItems: [{
    actualMinutes: 45,
    activityType: 'PDF',
    createdAt: timestamp,
    disciplineName: 'E2E - Governanca de TI',
    id: 'e2e-schedule-today',
    notes: 'E2E - atividade controlada',
    outsideExamWindow: false,
    plannedDate: FIXED_TODAY,
    priority: 'Alta',
    status: 'Nao iniciado',
    title: 'E2E - Fundamentos de governanca',
    updatedAt: timestamp,
  }],
  studySessions: [],
};

export const BASELINE_SEED: DatabaseSeed = {
  ...EMPTY_USER_SEED,
  errorRecords: [{
    category: 'Conceito',
    correctAnswer: 'E2E - conceito correto',
    correctiveAction: 'E2E - revisar e resolver questoes',
    createdAt: timestamp,
    discipline: 'E2E - Governanca de TI',
    explanation: 'E2E - explicacao controlada',
    history: ['E2E - registro criado'],
    id: 'e2e-error-1',
    nextReview: '2026-07-19',
    notes: 'E2E - notas',
    occurrences: [timestamp],
    priority: 'high',
    question: 'E2E - qual e o conceito?',
    reason: 'E2E - confusao de conceitos',
    recurrence: 1,
    selectedAnswer: 'E2E - resposta incorreta',
    source: 'E2E - manual',
    status: 'active',
    subject: 'E2E - COBIT',
    tags: ['E2E', 'governanca'],
    updatedAt: timestamp,
  }],
  questionBlocks: [{
    accuracyRate: 70,
    annulledAnswers: 0,
    bank: 'E2E - FGV',
    correctAnswers: 14,
    createdAt: timestamp,
    date: FIXED_TODAY,
    difficulty: 'medium',
    discipline: 'E2E - Governanca de TI',
    durationMinutes: 30,
    id: 'e2e-block-1',
    notes: 'E2E - bloco controlado',
    platform: 'E2E - plataforma',
    subject: 'E2E - COBIT',
    totalQuestions: 20,
    updatedAt: timestamp,
    wrongAnswers: 6,
  }],
  questions: [{
    alternatives: [
      { id: 'a', text: 'E2E - alternativa incorreta' },
      { id: 'b', text: 'E2E - alternativa correta' },
    ],
    bank: 'E2E - FGV',
    correctAlternativeId: 'b',
    createdAt: timestamp,
    difficulty: 'medium',
    discipline: 'E2E - Governanca de TI',
    explanation: 'E2E - a alternativa B aplica o conceito correto.',
    favorite: false,
    id: 'e2e-question-1',
    statement: 'E2E - qual alternativa representa o conceito correto?',
    status: 'unanswered',
    subject: 'E2E - COBIT',
    tags: ['E2E', 'COBIT'],
    updatedAt: timestamp,
    year: 2026,
  }],
  reviews: [{
    createdAt: timestamp,
    disciplineId: 'e2e-discipline',
    disciplineName: 'E2E - Governanca de TI',
    estimatedMinutes: 20,
    id: 'e2e-review-1',
    notes: 'E2E - revisar conceitos',
    priority: 'high',
    reviewSequence: 0,
    scheduledAt: FIXED_TODAY,
    sourceId: 'e2e-error-1',
    sourceType: 'error',
    status: 'pending',
    subject: 'E2E - COBIT',
    updatedAt: timestamp,
  }],
  scheduleItems: [
    ...EMPTY_USER_SEED.scheduleItems,
    {
      actualMinutes: 30,
      activityType: 'Videoaula',
      createdAt: timestamp,
      disciplineName: 'E2E - Banco de Dados',
      id: 'e2e-schedule-overdue',
      notes: 'E2E - atividade atrasada',
      outsideExamWindow: false,
      plannedDate: '2026-07-17',
      priority: 'Critica',
      status: 'Nao iniciado',
      title: 'E2E - SQL avancado',
      updatedAt: timestamp,
    },
  ],
  studySessions: [{
    correctAnswers: 7,
    createdAt: timestamp,
    date: FIXED_TODAY,
    difficulty: 'moderate',
    disciplineId: 'e2e-discipline',
    disciplineName: 'E2E - Governanca de TI',
    durationMinutes: 60,
    id: 'e2e-session-1',
    materialType: 'pdf',
    notes: 'E2E - sessao controlada',
    questionsAnswered: 10,
    source: 'E2E - manual',
    status: 'completed',
    subject: 'E2E - COBIT',
    updatedAt: timestamp,
    wrongAnswers: 3,
  }],
};

export function createScheduleItems(count: number): TestRecord[] {
  return Array.from({ length: count }, (_, index) => ({
    actualMinutes: 30,
    activityType: index % 2 === 0 ? 'PDF' : 'Videoaula',
    createdAt: timestamp,
    disciplineName: index % 2 === 0 ? 'E2E - Governanca de TI' : 'E2E - Banco de Dados',
    id: `e2e-schedule-${String(index + 1).padStart(2, '0')}`,
    notes: 'E2E - paginacao',
    outsideExamWindow: false,
    plannedDate: `2026-07-${String(18 + (index % 10)).padStart(2, '0')}`,
    priority: 'Normal',
    status: 'Nao iniciado',
    title: `E2E - Atividade ${String(index + 1).padStart(2, '0')}`,
    updatedAt: timestamp,
  }));
}

export async function seedDatabase(page: Page, seed: DatabaseSeed): Promise<void> {
  await page.route('**/__e2e_seed__', async (route) => {
    await route.fulfill({ body: '<!doctype html><title>E2E seed</title>', contentType: 'text/html' });
  });
  await page.goto('/__e2e_seed__');
  await page.evaluate(async (databaseSeed) => {
    const databaseModuleUrl = '/src/core/database/database.ts';
    const { db } = await import(databaseModuleUrl);
    await db.open();
    await db.transaction('rw', db.tables, async () => {
      for (const table of db.tables) await table.clear();
      for (const [storeName, records] of Object.entries(databaseSeed)) {
        if (records.length > 0) await db.table(storeName).bulkPut(records);
      }
    });
    db.close();
  }, seed);
  await page.unroute('**/__e2e_seed__');
}

export async function readStore(page: Page, storeName: keyof DatabaseSeed): Promise<TestRecord[]> {
  return page.evaluate(async (name) => {
    const databaseModuleUrl = '/src/core/database/database.ts';
    const { db } = await import(databaseModuleUrl);
    return db.table(name).toArray();
  }, storeName);
}
