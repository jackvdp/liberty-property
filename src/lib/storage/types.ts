import { QuestionnaireAnswer, QuestionnaireOutcome } from '@/components/questionnaire/types';
import { EligibilityData } from '@/components/questionnaire/registration-types';

// Base interface for stored questionnaire data
export interface StoredQuestionnaireData {
  uuid: string;
  timestamp: string;
  answers: QuestionnaireAnswer[];
  outcome?: QuestionnaireOutcome;
  [key: string]: unknown; // Allow additional properties
}

// Specific storage type for eligibility data
export interface StoredEligibilityData extends StoredQuestionnaireData {
  derivedData?: EligibilityData['derivedData'];
}

// Generic storage type for registration data
export interface StoredRegistrationData extends StoredQuestionnaireData {
  sections?: Record<string, QuestionnaireAnswer[]>;
  currentSection?: string;
  metadata?: Record<string, unknown>;
}

// Storage key types for type safety
export enum StorageKeyPrefix {
  ELIGIBILITY = 'liberty-bell-eligibility',
  REGISTRATION = 'liberty-bell-registration',
  DRAFT = 'liberty-bell-draft'
}

// Storage service interface
export interface IStorageService<T extends StoredQuestionnaireData> {
  save(data: Omit<T, 'uuid' | 'timestamp'> & Partial<Pick<T, 'uuid' | 'timestamp'>>): string;
  get(uuid: string): T | null;
  update(uuid: string, data: Partial<T>): boolean;
  delete(uuid: string): boolean;
  list(): string[];
  clear(): void;
}

// Hook return type for questionnaire data management
export interface QuestionnaireDataManager<T extends StoredQuestionnaireData> {
  // Data state
  data: T | null;
  uuid: string | null;
  
  // Operations
  save: (data: Omit<T, 'uuid' | 'timestamp'> & Partial<Pick<T, 'uuid' | 'timestamp'>>) => string;
  load: (uuid: string) => T | null;
  update: (data: Partial<T>) => boolean;
  clear: () => void;
  
  // Utility
  exists: (uuid: string) => boolean;
  listSaved: () => string[];
}

// Prefill data structure
export interface PrefillData {
  answers?: QuestionnaireAnswer[];
  uuid?: string;
  focusQuestion?: string;
}

// Factory function type for creating derived data
export type DerivedDataFactory<T> = (
  answers: QuestionnaireAnswer[],
  outcome?: QuestionnaireOutcome
) => T;
