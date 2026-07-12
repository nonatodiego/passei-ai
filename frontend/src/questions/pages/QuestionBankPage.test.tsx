import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { questionMocks } from '@/questions/mocks';
import { QuestionBankView } from '@/questions/pages';
import {
  answerQuestion,
  calculateQuestionStats,
  createAnalyticsQuestionEvent,
  createErrorBankCandidate,
  defaultQuestionFilters,
  filterQuestions,
} from '@/questions/services';

const stats = calculateQuestionStats(questionMocks);

describe('QuestionBankPage', () => {
  it('renders the question bank page', () => {
    const html = renderToStaticMarkup(
      <QuestionBankView
        allQuestions={questionMocks}
        filters={defaultQuestionFilters}
        onAddToErrorBank={vi.fn()}
        onAnswer={vi.fn()}
        onFiltersChange={vi.fn()}
        onNextQuestion={vi.fn()}
        onSelectQuestion={vi.fn()}
        questions={questionMocks}
        selectedQuestion={questionMocks[0]}
        stats={stats}
        status="success"
      />,
    );

    expect(html).toContain('Banco de Questoes');
    expect(html).toContain('Lista de questoes');
    expect(html).toContain('Visualizacao da questao');
    expect(html).toContain('Respondidas');
  });

  it('filters questions by discipline, subject, difficulty, status and query', () => {
    const filtered = filterQuestions(questionMocks, {
      difficulty: 'medium',
      discipline: 'Banco de Dados',
      query: 'dml',
      status: 'unanswered',
      subject: 'SQL',
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.id).toBe('question-001');
  });

  it('answers a question correctly', () => {
    const question = questionMocks[0]!;
    const result = answerQuestion(question, question.correctAlternativeId);

    expect(result.isCorrect).toBe(true);
    expect(createAnalyticsQuestionEvent(question, result).isCorrect).toBe(true);
  });

  it('answers a question incorrectly and prepares error bank data', () => {
    const question = questionMocks[0]!;
    const wrongAlternative = question.alternatives.find(
      (alternative) => alternative.id !== question.correctAlternativeId,
    )!;
    const result = answerQuestion(question, wrongAlternative.id);
    const candidate = createErrorBankCandidate(question);

    expect(result.isCorrect).toBe(false);
    expect(candidate.questionId).toBe(question.id);
    expect(candidate.tags).toContain('sql');
  });

  it('renders the empty state', () => {
    const html = renderToStaticMarkup(
      <QuestionBankView
        allQuestions={questionMocks}
        filters={defaultQuestionFilters}
        onAddToErrorBank={vi.fn()}
        onAnswer={vi.fn()}
        onFiltersChange={vi.fn()}
        onNextQuestion={vi.fn()}
        onSelectQuestion={vi.fn()}
        questions={[]}
        stats={stats}
        status="empty"
      />,
    );

    expect(html).toContain('Nenhuma questao encontrada');
  });

  it('renders the error state', () => {
    const html = renderToStaticMarkup(
      <QuestionBankView
        allQuestions={[]}
        filters={defaultQuestionFilters}
        onAddToErrorBank={vi.fn()}
        onAnswer={vi.fn()}
        onFiltersChange={vi.fn()}
        onNextQuestion={vi.fn()}
        onSelectQuestion={vi.fn()}
        questions={[]}
        stats={calculateQuestionStats([])}
        status="error"
      />,
    );

    expect(html).toContain('Nao foi possivel carregar questoes');
  });
});
