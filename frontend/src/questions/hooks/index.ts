import { useEffect, useMemo, useState } from 'react';
import { useLocalData } from '@/core/providers/useLocalData';

import { defaultQuestionFilters, getQuestionBankData, getStoredQuestions } from '@/questions/services';
import type { Question, QuestionFilters, QuestionViewStatus } from '@/questions/types';

export function useQuestionBank(initialFilters = defaultQuestionFilters) {
  const [filters, setFilters] = useState<QuestionFilters>(initialFilters);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [status, setStatus] = useState<QuestionViewStatus>('loading');
  const { revision } = useLocalData();
  useEffect(() => { let active = true; void getStoredQuestions().then((items) => { if (active) { setQuestions(items); setStatus('success'); } }).catch(() => active && setStatus('error')); return () => { active = false; }; }, [revision]);
  const data = useMemo(() => getQuestionBankData(questions, filters), [filters, questions]);

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
