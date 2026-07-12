import { useMemo, useState } from 'react';

import { defaultQuestionFilters, getQuestionBankData } from '@/questions/services';
import type { QuestionFilters, QuestionViewStatus } from '@/questions/types';

export function useQuestionBank(initialFilters = defaultQuestionFilters) {
  const [filters, setFilters] = useState<QuestionFilters>(initialFilters);
  const [status, setStatus] = useState<QuestionViewStatus>('success');
  const data = useMemo(() => getQuestionBankData(filters), [filters]);

  return {
    ...data,
    filters,
    setFilters,
    setStatus,
    status:
      status === 'success' && data.filteredQuestions.length === 0 ? 'empty' : status,
  };
}

export { defaultQuestionFilters };
