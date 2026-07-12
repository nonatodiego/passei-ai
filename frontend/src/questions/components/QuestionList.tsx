import { Badge, Button, Card } from '@/design-system';
import type { Question } from '@/questions/types';

import { difficultyLabel, difficultyTone, statusLabel, statusTone } from './questionLabels';

export function QuestionList({
  onSelect,
  questions,
  selectedQuestionId,
}: {
  onSelect: (question: Question) => void;
  questions: Question[];
  selectedQuestionId?: string;
}) {
  return (
    <div className="space-y-3">
      {questions.map((question) => (
        <Card
          className={`p-4 transition ${
            selectedQuestionId === question.id ? 'border-app-primary ring-2 ring-blue-100' : ''
          }`}
          key={question.id}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="blue">{question.discipline}</Badge>
                <Badge tone={difficultyTone[question.difficulty]}>
                  {difficultyLabel[question.difficulty]}
                </Badge>
                <Badge tone={statusTone[question.status]}>{statusLabel[question.status]}</Badge>
              </div>
              <div>
                <h3 className="font-semibold leading-6 text-app-text">{question.subject}</h3>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-app-muted">
                  {question.statement}
                </p>
              </div>
              <p className="text-xs font-medium text-app-muted">
                {question.bank} • {question.year} • {question.tags.join(', ')}
              </p>
            </div>
            <Button onClick={() => onSelect(question)} variant="secondary">
              Ver questao
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
