// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { questionMocks } from '@/questions/mocks';
import { QuestionViewer } from '@/questions/components/QuestionViewer';
import { answerQuestion } from '@/questions/services';

describe('QuestionViewer', () => {
  it('forwards the incorrect answer context to the Banco de Erros action', async () => {
    const question = questionMocks[0]!;
    const wrongAlternative = question.alternatives.find(
      (alternative) => alternative.id !== question.correctAlternativeId,
    )!;
    const answerResult = answerQuestion(question, wrongAlternative.id);
    const onAddToErrorBank = vi.fn();
    const user = userEvent.setup();

    render(
      <QuestionViewer
        answerResult={answerResult}
        onAddToErrorBank={onAddToErrorBank}
        onAnswer={vi.fn()}
        question={question}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Adicionar ao Banco de Erros' }));

    expect(onAddToErrorBank).toHaveBeenCalledWith(question, answerResult);
  });
});
