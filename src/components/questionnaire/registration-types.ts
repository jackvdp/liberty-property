import { QuestionnaireValue, QuestionnaireOutcome } from './types';

export interface RegistrationOption {
  value: string;
  label: string;
  description?: string;
  link?: string;
}

export interface RegistrationQuestion {
  id: string;
  question: string;
  description?: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'radio' | 'checkbox' | 'file' | 'repeater';
  required?: boolean;
  options?: RegistrationOption[];
  validation?: {
    min?: number;
    max?: number;
    required?: boolean;
    email?: boolean;
    pattern?: string;
    acceptedTypes?: string[];
    maxSize?: string;
  };
  prefillFromEligibility?: boolean;
  fields?: Array<{
    id: string;
    label: string;
    type: string;
    required?: boolean;
  }>;
}

export interface DisplayChip {
  label: string;
  value: string;
  source: string;
  description?: string;
  correctionAction?: string;
}

export interface RegistrationSection {
  id: string;
  title: string;
  description: string;
  color: string;
  showIf?: string;
  questions: RegistrationQuestion[];
  conditionalQuestions?: Record<string, Record<string, RegistrationQuestion[]>>;
  displayChips?: DisplayChip[];
  nextSection: string;
}

export interface RegistrationOutcome {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  color?: string;
  actions?: Array<{
    text: string;
    href: string;
    primary?: boolean;
    secondary?: boolean;
  }>;
}

export interface RegistrationAnswer {
  questionId: string;
  value: QuestionnaireValue;
  sectionId: string;
}

export interface RegistrationData {
  title: string;
  description: string;
  sections: Record<string, RegistrationSection>;
  outcomes: Record<string, RegistrationOutcome>;
}

export interface EligibilityData {
  // UUID identifier for this eligibility session
  uuid?: string;
  
  // Complete form data
  answers?: Array<{ questionId: string; value: QuestionnaireValue }>;
  outcome?: QuestionnaireOutcome;
  timestamp?: string;
  
  // Derived/computed data for easy access
  derivedData?: {
    // Contact information
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    
    // Property information
    flatCount?: number;
    propertyType?: string;
    isLeasehold?: string;
    existingRmcRtm?: string;
    nonResidentialProportion?: string;
    leaseholderSupport?: string;
    allowsBothRtmAndCe?: boolean;
    rmcStatus?: string;
    provisionalPath?: string;
  };
}

export interface RegistrationQuestionnaireProps {
  data: RegistrationData;
  onComplete?: (outcome: RegistrationOutcome, answers: Record<string, RegistrationAnswer[]>) => void;
  onSectionComplete?: (section: RegistrationSection, answers: RegistrationAnswer[]) => void;
  className?: string;
  eligibilityData?: EligibilityData;
}
