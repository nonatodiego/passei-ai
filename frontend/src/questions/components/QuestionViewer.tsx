import { AlertTriangle, ArrowRight, CheckCircle2, Star } from 'lucide-react';

import { Badge, Button, Card, CardDescription, CardHeader, CardTitle } from '@/design-system';
import { answerQuestion } from '@/questions/services';
import type { Question, QuestionAnswerResult } from '@/questions/types';

import { difficultyLabel, difficultyTone } from './questionLabels';

export function QuestionViewer({
  answerResult,
  onAddToErrorBank,
  onAnswer,
  onNextQuestion,
  question,
}: {
  answerResult?: QuestionAnswerResult;
  onAddToErrorBank: (question: Question) => void;
  onAnswer: (result: QuestionAnswerResult) => void;
  onNextQuestion?: () => void;
  question: Question;
}) {
  return (
    <Card className="h-full p-0">
      <CardHeader className="border-b border-app-border p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Visualizacao da questao</CardTitle>
            <CardDescription>
              {question.bank} • {question.year} • {question.subject}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={difficultyTone[question.difficulty]}>
              {difficultyLabel[question.difficulty]}
            </Badge>
            {question.favorite ? (
              <Badge tone="amber">
                <Star aria-hidden="true" className="mr-1 h-3 w-3" />
                Favorita
              </Badge>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <div className="space-y-5 p-5">
        <div>
          <p className="text-sm font-semibold text-app-muted">Enunciado</p>
          <p className="mt-2 leading-7 text-app-text">{question.statement}</p>
        </div>
        <div className="space-y-3" role="group" aria-label="Alternativas da questao">
          {question.alternatives.map((alternative) => {
            const isSelected = answerResult?.selectedAlternativeId === alternative.id;
            const isCorrect = question.correctAlternativeId === alternative.id;
            const toneClass = answerResult
              ? isCorrect
                ? 'border-app-success bg-green-50 text-green-800'
                : isSelected
                  ? 'border-app-danger bg-red-50 text-red-800'
                  : 'border-app-border bg-white text-app-text'
              : 'border-app-border bg-white text-app-text hover:border-app-primary';

            return (
              <button
                aria-label={`${alternative.id.toUpperCase()}. ${alternative.text}${
                  answerResult
                    ? isCorrect
                      ? '. Alternativa correta.'
                      : isSelected
                        ? '. Sua resposta incorreta.'
                        : ''
                    : ''
                }`}
                className={`flex w-full items-start gap-3 rounded-md border p-3 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-app-focus ${toneClass}`}
                disabled={Boolean(answerResult)}
                key={alternative.id}
                onClick={() => onAnswer(answerQuestion(question, alternative.id))}
                type="button"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold uppercase">
                  {alternative.id}
                </span>
                <span>{alternative.text}</span>
                {answerResult && isCorrect ? (
                  <span className="ml-auto shrink-0 text-xs font-semibold">Correta</span>
                ) : null}
                {answerResult && isSelected && !isCorrect ? (
                  <span className="ml-auto shrink-0 text-xs font-semibold">Sua resposta</span>
                ) : null}
              </button>
            );
          })}
        </div>
        {answerResult ? (
          <div
            className={`rounded-md border p-4 ${
              answerResult.isCorrect
                ? 'border-green-200 bg-green-50'
                : 'border-red-200 bg-red-50'
            }`}
            role="status"
          >
            <div className="flex items-start gap-3">
              {answerResult.isCorrect ? (
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 text-app-success" />
              ) : (
                <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 text-app-danger" />
              )}
              <div>
                <p className="font-semibold text-app-text">
                  {answerResult.isCorrect ? 'Resposta correta' : 'Resposta incorreta'}
                </p>
                <p className="mt-1 text-sm leading-6 text-app-muted">{answerResult.explanation}</p>
              </div>
            </div>
          </div>
        ) : null}
        {answerResult ? (
          <div className="space-y-3 border-t border-app-border pt-5">
            {!answerResult.isCorrect ? (
              <>
                <Button
                  className="w-full"
                  onClick={() => onAddToErrorBank(question)}
                  variant="secondary"
                >
                  Adicionar ao Banco de Erros
                </Button>
                <p className="text-xs text-app-muted">
                  Este registro envia disciplina, assunto, tags e explicacao ao Banco de Erros futuro.
                </p>
              </>
            ) : null}
            {onNextQuestion ? (
              <Button
                className="w-full"
                icon={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
                onClick={onNextQuestion}
              >
                Proxima questao
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
