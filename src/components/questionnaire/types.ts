// Shared value types for questionnaire responses
export type QuestionnaireValue = string | number | boolean | string[] | File | SupporterData[];

export interface SupporterData {
  name: string;
  email: string;
}

export interface QuestionnaireOption {
  value: string;
  label: string;
}

export interface QuestionnaireQuestion {
  id: string;
  question: string;
  description?: string;
  type: 'radio' | 'number' | 'text';
  options?: QuestionnaireOption[];
  validation?: {
    min?: number;
    max?: number;
    required?: boolean;
  };
  nextQuestion: string | Record<string, string> | Record<string, string | undefined>;
}

export interface QuestionnaireOutcome {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  action?: string;
  color: string;
  button?: {
    text: string;
    href?: string;
    action?: string;
  };
}

export interface QuestionnaireAnswer {
  questionId: string;
  value: QuestionnaireValue;
}

export interface QuestionnaireData {
  title: string;
  description: string;
  questions: Record<string, QuestionnaireQuestion>;
  outcomes: Record<string, QuestionnaireOutcome>;
}

export interface QuestionnaireProps {
  data: QuestionnaireData;
  onComplete?: (outcome: QuestionnaireOutcome, answers: QuestionnaireAnswer[]) => void;
  onRestart?: () => void;
  className?: string;
  showSeparator?: boolean;
  completionActions?: {
    success?: { text: string; href?: string; onClick?: () => void };
    info?: { text: string; href?: string; onClick?: () => void };
    error?: { text: string; href?: string; onClick?: () => void };
  };
  prefillData?: {
    answers?: Array<{ questionId: string; value: QuestionnaireValue }>;
    uuid?: string;
    focusQuestion?: string;
  };
  // New props for making questionnaire reusable
  onOutcomeButtonClick?: (outcome: QuestionnaireOutcome, answers: QuestionnaireAnswer[]) => string | void;
}
