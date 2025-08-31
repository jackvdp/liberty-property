import { QuestionnaireAnswer, QuestionnaireOutcome } from '@/components/questionnaire/types';
import { StoredEligibilityData, DerivedDataFactory } from './types';
import { EligibilityData } from '@/components/questionnaire/registration-types';

/**
 * Factory function to create derived data from eligibility answers
 */
export const createEligibilityDerivedData: DerivedDataFactory<EligibilityData['derivedData']> = (
  answers: QuestionnaireAnswer[],
  outcome?: QuestionnaireOutcome
) => {
  const findAnswer = (questionId: string) => 
    answers.find(a => a.questionId === questionId)?.value;

  return {
    flatCount: findAnswer('flat_count') as number | undefined,
    propertyType: findAnswer('property_type') as string | undefined,
    isLeasehold: findAnswer('flat_leasehold') as string | undefined,
    existingRmcRtm: findAnswer('existing_rmc_rtm') as string | undefined,
    nonResidentialProportion: findAnswer('non_residential_proportion') as string | undefined,
    leaseholderSupport: findAnswer('leaseholder_support') as string | undefined,
    
    // Determine if both RTM and CE are available
    allowsBothRtmAndCe: (() => {
      const nonResAnswer = findAnswer('non_residential_proportion');
      return !nonResAnswer || nonResAnswer === '25_or_less';
    })(),
    
    // Set RMC status
    rmcStatus: (() => {
      const rmcAnswer = findAnswer('existing_rmc_rtm');
      if (rmcAnswer === 'no') return 'No RMC/RTM recorded';
      if (rmcAnswer === 'yes') return 'RMC/RTM exists';
      return 'RMC/RTM status unknown';
    })(),
    
    // Set provisional path based on outcome
    provisionalPath: (() => {
      if (!outcome) return 'Path to be determined';
      
      if (outcome.action === 'registration') {
        const nonResAnswer = findAnswer('non_residential_proportion');
        const allowsBoth = !nonResAnswer || nonResAnswer === '25_or_less';
        return allowsBoth ? 'RTM or CE available' : 'RTM available';
      }
      if (outcome.action === 'leaseholder_engagement_module') {
        return 'Leaseholder engagement required';
      }
      if (outcome.action === 'rmc_process') {
        return 'RMC takeover/improvement';
      }
      return 'Path to be determined';
    })()
  };
};

/**
 * Helper class for eligibility-specific storage operations
 */
export class EligibilityStorageHelper {
  /**
   * Create a complete eligibility data object for storage
   */
  static createStorageData(
    answers: QuestionnaireAnswer[],
    outcome: QuestionnaireOutcome,
    uuid?: string
  ): StoredEligibilityData {
    return {
      uuid: uuid || '',
      timestamp: new Date().toISOString(),
      answers,
      outcome,
      derivedData: createEligibilityDerivedData(answers, outcome)
    };
  }

  /**
   * Convert stored data to the format expected by components
   */
  static toEligibilityData(stored: StoredEligibilityData): EligibilityData {
    return {
      uuid: stored.uuid,
      answers: stored.answers.map(a => ({
        questionId: a.questionId,
        value: a.value
      })),
      outcome: stored.outcome,
      timestamp: stored.timestamp,
      derivedData: stored.derivedData
    };
  }

  /**
   * Validate eligibility data completeness
   */
  static isComplete(data: StoredEligibilityData): boolean {
    const requiredQuestions = [
      'property_type',
      'flat_count'
    ];

    return requiredQuestions.every(questionId =>
      data.answers.some(a => a.questionId === questionId && a.value !== undefined)
    );
  }

  /**
   * Get a human-readable summary of the eligibility status
   */
  static getSummary(data: StoredEligibilityData): string {
    if (!data.derivedData) {
      return 'Eligibility check incomplete';
    }

    const { provisionalPath, rmcStatus, flatCount } = data.derivedData;
    
    let summary = `Building with ${flatCount || 'unknown number of'} flats. `;
    summary += `${rmcStatus || 'Management status unknown'}. `;
    summary += `Recommended path: ${provisionalPath || 'To be determined'}.`;
    
    return summary;
  }

  /**
   * Generate a shareable URL for returning to registration
   */
  static getRegistrationUrl(uuid: string, baseUrl?: string): string {
    const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
    return `${base}/register?eligibilityId=${uuid}`;
  }

  /**
   * Generate a URL for updating eligibility data
   */
  static getUpdateUrl(uuid: string, focusQuestion?: string, baseUrl?: string): string {
    const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
    let url = `${base}/eligibility-check?prefillId=${uuid}`;
    if (focusQuestion) {
      url += `&focusQuestion=${focusQuestion}`;
    }
    return url;
  }
}
