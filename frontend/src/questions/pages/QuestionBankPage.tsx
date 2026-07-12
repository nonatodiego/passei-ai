import { HelpCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  QuestionFilters,
  QuestionList,
  QuestionStatsCards,
  QuestionViewer,
} from '@/questions/components';
import { useQuestionBank } from '@/questions/hooks';
import type {
  Question,
  QuestionAnswerResult,
  QuestionFilters as QuestionFiltersState,
  QuestionStats,
  QuestionViewStatus,
} from '@/questions/types';
import {
  Badge,
  Card,
  Content,
  EmptyState,
  ErrorState,
  LoadingState,
  Section,
  Toast,
} from '@/design-system';

export function QuestionBankView({
  allQuestions,
  answerResult,
  filters,
  onAddToErrorBank,
  onAnswer,
  onFiltersChange,
  onNextQuestion,
  onSelectQuestion,
  questions,
  selectedQuestion,
  stats,
  status,
}: {
  allQuestions: Question[];
  answerResult?: QuestionAnswerResult;
  filters: QuestionFiltersState;
  onAddToErrorBank: (question: Question) => void;
  onAnswer: (result: QuestionAnswerResult) => void;
  onFiltersChange: (filters: QuestionFiltersState) => void;
  onNextQuestion: () => void;
  onSelectQuestion: (question: Question) => void;
  questions: Question[];
  selectedQuestion?: Question;
  stats: QuestionStats;
  status: QuestionViewStatus;
}) {
  if (status === 'loading') {
    return (
      <Content>
        <LoadingState label="Carregando banco de questoes" />
        <div className="grid gap-4 md:grid-cols-2">
          <LoadingState />
          <LoadingState />
        </div>
      </Content>
    );
  }

  if (status === 'error') {
    return (
      <ErrorState
        description="As questoes mockadas nao puderam ser carregadas nesta visualizacao."
        title="Nao foi possivel carregar questoes"
      />
    );
  }

  if (status === 'empty') {
    return (
      <Content>
        <QuestionFilters
          filters={filters}
          onChange={onFiltersChange}
          questions={allQuestions}
        />
        <EmptyState
          description="Ajuste os filtros ou a pesquisa para encontrar questoes."
          icon={HelpCircle}
          title="Nenhuma questao encontrada"
        />
      </Content>
    );
  }

  return (
    <Content className="space-y-8">
      <Toast title="Banco de Questoes pronto" tone="success">
        Dados estruturados para Study Engine, Banco de Erros e Analytics futuros.
      </Toast>
      <Section className="rounded-md border border-app-border bg-white p-6 shadow-panel">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="blue">Questoes</Badge>
              <span className="text-xs font-medium text-app-muted">
                Release 0.3 • Feature 002
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-app-text md:text-3xl">
                Banco de Questoes
              </h1>
              <p className="mt-2 text-sm leading-6 text-app-muted">
                Resolva questoes mockadas, receba feedback imediato e gere sinais
                para alimentar Study Engine, Banco de Erros e Analytics nas proximas
                entregas.
              </p>
            </div>
          </div>
          <Card className="bg-slate-50 px-4 py-3 text-sm text-app-muted">
            <span className="block font-semibold text-app-text">
              {stats.total} questoes disponiveis
            </span>
            <span>{stats.accuracyRate}% de acertos nas respondidas</span>
          </Card>
        </div>
      </Section>
      <QuestionStatsCards stats={stats} />
      <Section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]">
        <Card className="p-0">
          <div className="border-b border-app-border p-5">
            <h2 className="text-lg font-semibold text-app-text">Lista de questoes</h2>
            <p className="mt-1 text-sm text-app-muted">
              Filtre por disciplina, assunto, dificuldade, status ou texto.
            </p>
          </div>
          <div className="space-y-4 p-5">
            <QuestionFilters
              filters={filters}
              onChange={onFiltersChange}
              questions={allQuestions}
            />
            <QuestionList
              onSelect={onSelectQuestion}
              questions={questions}
              selectedQuestionId={selectedQuestion?.id}
            />
          </div>
        </Card>
        {selectedQuestion ? (
          <QuestionViewer
            answerResult={answerResult}
            onAddToErrorBank={onAddToErrorBank}
            onAnswer={onAnswer}
            onNextQuestion={onNextQuestion}
            question={selectedQuestion}
          />
        ) : null}
      </Section>
    </Content>
  );
}

export function QuestionBankPage() {
  const { allQuestions, filteredQuestions, filters, setFilters, stats, status } =
    useQuestionBank();
  const [selectedQuestionId, setSelectedQuestionId] = useState(
    filteredQuestions[0]?.id,
  );
  const [answerResult, setAnswerResult] = useState<QuestionAnswerResult>();

  const selectedQuestion = useMemo(
    () =>
      filteredQuestions.find((question) => question.id === selectedQuestionId) ??
      filteredQuestions[0],
    [filteredQuestions, selectedQuestionId],
  );

  function handleSelectQuestion(question: Question) {
    setSelectedQuestionId(question.id);
    setAnswerResult(undefined);
  }

  function handleNextQuestion() {
    const currentIndex = filteredQuestions.findIndex(
      (question) => question.id === selectedQuestion?.id,
    );
    const nextQuestion = filteredQuestions[(currentIndex + 1) % filteredQuestions.length];

    if (nextQuestion) {
      handleSelectQuestion(nextQuestion);
    }
  }

  return (
    <QuestionBankView
      allQuestions={allQuestions}
      answerResult={answerResult}
      filters={filters}
      onAddToErrorBank={() => undefined}
      onAnswer={setAnswerResult}
      onFiltersChange={(nextFilters) => {
        setFilters(nextFilters);
        setAnswerResult(undefined);
      }}
      onNextQuestion={handleNextQuestion}
      onSelectQuestion={handleSelectQuestion}
      questions={filteredQuestions}
      selectedQuestion={selectedQuestion}
      stats={stats}
      status={status}
    />
  );
}
