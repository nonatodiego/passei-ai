import { db } from './database';
import type { BackupPayload } from './types';
import { isValidLocalDateKey } from '@/shared/utils/date';

export type IntegrityEntity = Exclude<keyof BackupPayload, 'metadata'>;
export type IntegritySeverity = 'error' | 'warning';

export interface DataIntegrityIssue {
  code: string;
  entity: IntegrityEntity;
  id: string;
  message: string;
  severity: IntegritySeverity;
  suggestion: string;
}

export interface DataIntegrityReport {
  checkedAt: string;
  issues: DataIntegrityIssue[];
  summary: {
    errors: number;
    records: number;
    warnings: number;
  };
}

export type IntegritySnapshot = { [Entity in IntegrityEntity]: unknown[] };
type UnknownRecord = Record<string, unknown>;

const entityNames: IntegrityEntity[] = [
  'appSettings',
  'contestProfiles',
  'disciplines',
  'scheduleItems',
  'studySessions',
  'questionBlocks',
  'questions',
  'questionAttempts',
  'errorRecords',
  'reviews',
  'mockExams',
  'goals',
];

function asRecord(value: unknown): UnknownRecord | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as UnknownRecord
    : undefined;
}

function text(record: UnknownRecord, field: string): string {
  return typeof record[field] === 'string' ? record[field].trim() : '';
}

function finiteNonNegative(record: UnknownRecord, field: string): boolean {
  const value = record[field];
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export function auditDataIntegrity(snapshot: IntegritySnapshot): DataIntegrityReport {
  const issues: DataIntegrityIssue[] = [];
  const add = (
    entity: IntegrityEntity,
    id: string,
    code: string,
    message: string,
    suggestion: string,
    severity: IntegritySeverity = 'error',
  ) => issues.push({ code, entity, id, message, severity, suggestion });

  const recordsByEntity = Object.fromEntries(
    entityNames.map((entity) => [entity, snapshot[entity].map(asRecord)]),
  ) as Record<IntegrityEntity, Array<UnknownRecord | undefined>>;

  for (const entity of entityNames) {
    const seen = new Set<string>();
    recordsByEntity[entity].forEach((record, index) => {
      const id = record ? text(record, 'id') : '';
      const issueId = id || `indice-${index}`;
      if (!record) {
        add(entity, issueId, 'invalid-record', 'O registro nao e um objeto valido.', 'Remova o item invalido do arquivo de origem.');
        return;
      }
      if (!id) add(entity, issueId, 'missing-id', 'O registro nao possui ID.', 'Restaure um ID estavel antes da importacao.');
      else if (seen.has(id)) add(entity, id, 'duplicate-id', 'O ID aparece mais de uma vez na mesma entidade.', 'Mantenha apenas um registro por ID.');
      else seen.add(id);
    });
  }

  const requireText = (entity: IntegrityEntity, record: UnknownRecord, field: string) => {
    const id = text(record, 'id') || 'sem-id';
    if (!text(record, field)) add(entity, id, 'missing-required-text', `O campo ${field} esta vazio.`, `Preencha ${field} antes de restaurar o registro.`);
  };
  const requireDate = (entity: IntegrityEntity, record: UnknownRecord, field: string, optional = false) => {
    const id = text(record, 'id') || 'sem-id';
    const value = text(record, field);
    if (optional && !value) return;
    if (!isValidLocalDateKey(value)) add(entity, id, 'invalid-date', `O campo ${field} nao contem uma data local valida.`, 'Use o formato YYYY-MM-DD com um dia existente.');
  };
  const requireNonNegative = (entity: IntegrityEntity, record: UnknownRecord, field: string, optional = false) => {
    const id = text(record, 'id') || 'sem-id';
    if (optional && record[field] === undefined) return;
    if (!finiteNonNegative(record, field)) add(entity, id, 'invalid-number', `O campo ${field} deve ser finito e nao negativo.`, `Corrija o valor numerico de ${field}.`);
  };

  recordsByEntity.contestProfiles.forEach((record) => {
    if (!record) return;
    requireText('contestProfiles', record, 'name');
    requireDate('contestProfiles', record, 'examDate');
  });
  recordsByEntity.disciplines.forEach((record) => {
    if (!record) return;
    requireText('disciplines', record, 'name');
    requireText('disciplines', record, 'contestProfileId');
  });
  recordsByEntity.scheduleItems.forEach((record) => {
    if (!record) return;
    ['disciplineName', 'title', 'activityType', 'status'].forEach((field) => requireText('scheduleItems', record, field));
    requireDate('scheduleItems', record, 'plannedDate');
    requireNonNegative('scheduleItems', record, 'actualMinutes', true);
  });
  recordsByEntity.studySessions.forEach((record) => {
    if (!record) return;
    ['disciplineName', 'subject', 'status'].forEach((field) => requireText('studySessions', record, field));
    requireDate('studySessions', record, 'date');
    ['durationMinutes', 'questionsAnswered', 'correctAnswers', 'wrongAnswers'].forEach((field) => requireNonNegative('studySessions', record, field));
    const total = Number(record.questionsAnswered);
    const answered = Number(record.correctAnswers) + Number(record.wrongAnswers);
    if (Number.isFinite(total) && Number.isFinite(answered) && answered > total) {
      add('studySessions', text(record, 'id') || 'sem-id', 'inconsistent-question-count', 'Acertos e erros superam o total de questoes.', 'Corrija as contagens da sessao.');
    }
  });
  recordsByEntity.questionBlocks.forEach((record) => {
    if (!record) return;
    ['discipline', 'subject'].forEach((field) => requireText('questionBlocks', record, field));
    requireDate('questionBlocks', record, 'date');
    ['durationMinutes', 'totalQuestions', 'correctAnswers', 'wrongAnswers', 'annulledAnswers'].forEach((field) => requireNonNegative('questionBlocks', record, field));
    const total = Number(record.totalQuestions);
    const sum = Number(record.correctAnswers) + Number(record.wrongAnswers) + Number(record.annulledAnswers);
    if (Number.isFinite(total) && Number.isFinite(sum) && total !== sum) {
      add('questionBlocks', text(record, 'id') || 'sem-id', 'inconsistent-question-count', 'Acertos, erros e anuladas nao totalizam o bloco.', 'Corrija as contagens do bloco.');
    }
  });
  recordsByEntity.questions.forEach((record) => {
    if (!record) return;
    ['discipline', 'subject', 'statement', 'status'].forEach((field) => requireText('questions', record, field));
  });
  recordsByEntity.errorRecords.forEach((record) => {
    if (!record) return;
    ['discipline', 'subject', 'status'].forEach((field) => requireText('errorRecords', record, field));
    requireDate('errorRecords', record, 'nextReview', true);
    requireNonNegative('errorRecords', record, 'recurrence');
  });
  recordsByEntity.reviews.forEach((record) => {
    if (!record) return;
    ['disciplineName', 'subject', 'status'].forEach((field) => requireText('reviews', record, field));
    requireDate('reviews', record, 'scheduledAt');
    requireNonNegative('reviews', record, 'estimatedMinutes');
  });
  recordsByEntity.mockExams.forEach((record) => {
    if (!record) return;
    requireDate('mockExams', record, 'date');
  });
  recordsByEntity.goals.forEach((record) => {
    if (!record) return;
    ['name', 'kind'].forEach((field) => requireText('goals', record, field));
    requireNonNegative('goals', record, 'target');
  });

  const ids = (entity: IntegrityEntity) => new Set(recordsByEntity[entity].map((record) => record ? text(record, 'id') : '').filter(Boolean));
  const profileIds = ids('contestProfiles');
  const scheduleIds = ids('scheduleItems');
  const questionIds = ids('questions');
  const errorIds = ids('errorRecords');
  recordsByEntity.disciplines.forEach((record) => {
    if (record && text(record, 'contestProfileId') && !profileIds.has(text(record, 'contestProfileId'))) add('disciplines', text(record, 'id') || 'sem-id', 'broken-reference', 'O perfil de concurso referenciado nao existe.', 'Restaure o perfil antes da disciplina.');
  });
  recordsByEntity.studySessions.forEach((record) => {
    if (record && text(record, 'scheduleItemId') && !scheduleIds.has(text(record, 'scheduleItemId'))) add('studySessions', text(record, 'id') || 'sem-id', 'broken-reference', 'A atividade vinculada nao existe.', 'Remova o vinculo ou restaure a atividade correspondente.');
  });
  recordsByEntity.questionAttempts.forEach((record) => {
    if (record && text(record, 'questionId') && !questionIds.has(text(record, 'questionId'))) add('questionAttempts', text(record, 'id') || 'sem-id', 'broken-reference', 'A questao da tentativa nao existe.', 'Restaure a questao ou remova a tentativa orfa.');
  });
  recordsByEntity.reviews.forEach((record) => {
    if (record && text(record, 'sourceType') === 'error' && (!text(record, 'sourceId') || !errorIds.has(text(record, 'sourceId')))) add('reviews', text(record, 'id') || 'sem-id', 'broken-reference', 'O erro de origem da revisao nao existe.', 'Restaure o erro ou converta a revisao para origem manual.');
  });

  const pendingReviews = new Set<string>();
  recordsByEntity.reviews.forEach((record) => {
    if (!record || text(record, 'status') !== 'pending') return;
    const fingerprint = `${text(record, 'sourceType')}|${text(record, 'sourceId')}|${text(record, 'disciplineName')}|${text(record, 'subject')}|${text(record, 'scheduledAt')}`;
    if (pendingReviews.has(fingerprint)) add('reviews', text(record, 'id') || 'sem-id', 'duplicate-pending-review', 'Existe outra revisao pendente equivalente.', 'Mantenha apenas uma revisao pendente para o mesmo contexto e data.', 'warning');
    pendingReviews.add(fingerprint);
  });

  const reportSemanticDuplicates = (
    entity: 'scheduleItems' | 'studySessions',
    fields: string[],
    code: string,
    message: string,
  ) => {
    const fingerprints = new Set<string>();
    recordsByEntity[entity].forEach((record) => {
      if (!record || text(record, 'deletedAt')) return;
      const fingerprint = fields.map((field) => String(record[field] ?? '').trim().toLowerCase()).join('|');
      if (fingerprints.has(fingerprint)) {
        add(entity, text(record, 'id') || 'sem-id', code, message, 'Revise os registros e mantenha apenas a ocorrencia correta.', 'warning');
      }
      fingerprints.add(fingerprint);
    });
  };
  reportSemanticDuplicates(
    'scheduleItems',
    ['plannedDate', 'disciplineName', 'title', 'activityType'],
    'duplicate-schedule-item',
    'Existe outra atividade equivalente no mesmo dia.',
  );
  reportSemanticDuplicates(
    'studySessions',
    ['date', 'disciplineName', 'subject', 'durationMinutes', 'questionsAnswered', 'correctAnswers', 'wrongAnswers'],
    'duplicate-study-session',
    'Existe outra sessao com os mesmos fatos de estudo.',
  );

  const records = entityNames.reduce((total, entity) => total + snapshot[entity].length, 0);
  return {
    checkedAt: new Date().toISOString(),
    issues,
    summary: {
      errors: issues.filter((issue) => issue.severity === 'error').length,
      records,
      warnings: issues.filter((issue) => issue.severity === 'warning').length,
    },
  };
}

export function auditBackupPayload(payload: BackupPayload): DataIntegrityReport {
  return auditDataIntegrity({
    appSettings: payload.appSettings,
    contestProfiles: payload.contestProfiles,
    disciplines: payload.disciplines,
    scheduleItems: payload.scheduleItems,
    studySessions: payload.studySessions,
    questionBlocks: payload.questionBlocks,
    questions: payload.questions,
    questionAttempts: payload.questionAttempts,
    errorRecords: payload.errorRecords,
    reviews: payload.reviews,
    mockExams: payload.mockExams,
    goals: payload.goals,
  });
}

export async function auditLocalDatabase(): Promise<DataIntegrityReport> {
  const [appSettings, contestProfiles, disciplines, scheduleItems, studySessions, questionBlocks, questions, questionAttempts, errorRecords, reviews, mockExams, goals] = await Promise.all([
    db.appSettings.toArray(), db.contestProfiles.toArray(), db.disciplines.toArray(), db.scheduleItems.toArray(), db.studySessions.toArray(), db.questionBlocks.toArray(), db.questions.toArray(), db.questionAttempts.toArray(), db.errorRecords.toArray(), db.reviews.toArray(), db.mockExams.toArray(), db.goals.toArray(),
  ]);
  return auditDataIntegrity({ appSettings, contestProfiles, disciplines, scheduleItems, studySessions, questionBlocks, questions, questionAttempts, errorRecords, reviews, mockExams, goals });
}
