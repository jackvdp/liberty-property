import { QuestionnaireAnswer, QuestionnaireOutcome } from '@/components/questionnaire/types';
import { EligibilityData } from '@/components/questionnaire/registration-types';

/**
 * Creates derived data from eligibility answers and outcome
 * This is used to transform raw questionnaire data into meaningful properties
 * for the registration process
 */
export const createEligibilityDerivedData = (
  answers: QuestionnaireAnswer[],
  outcome?: QuestionnaireOutcome
): EligibilityData['derivedData'] => {
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
