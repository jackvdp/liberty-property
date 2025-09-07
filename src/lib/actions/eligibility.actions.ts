/**
 * Eligibility Server Actions
 * Server-side functions for handling eligibility wizard data
 */

'use server';

import { CaseRepository } from '@/lib/db/repositories/case.repository';
import { QuestionnaireAnswer, QuestionnaireOutcome } from '@/components/questionnaire/types';

export interface EligibilityResult {
  success: boolean;
  caseId?: string;
  caseNumber?: string;
  eligibilityId?: string;
  error?: string;
}

export interface EligibilityData {
  answers: QuestionnaireAnswer[];
  outcome: QuestionnaireOutcome;
}

/**
 * Create a case immediately when eligibility check succeeds
 * This replaces the localStorage approach
 */
export async function createEligibilityCase(
  eligibilityData: EligibilityData
): Promise<EligibilityResult> {
  try {
    const { answers, outcome } = eligibilityData;

    // Extract answers helper
    const findAnswer = (questionId: string) => 
      answers.find(a => a.questionId === questionId)?.value;

    // Basic validation
    const propertyType = findAnswer('property_type') as string;
    if (propertyType !== 'flat') {
      return {
        success: false,
        error: 'Only flats are eligible for RTM or Collective Enfranchisement'
      };
    }

    // Only create cases for success outcomes
    if (outcome.type !== 'success') {
      return {
        success: false,
        error: 'Case can only be created for successful eligibility outcomes'
      };
    }

    // Determine case type from answers and outcome
    const existingRmcRtm = findAnswer('existing_rmc_rtm') as string;
    const nonResidentialProportion = findAnswer('non_residential_proportion') as string;

    let caseType: 'rtm' | 'enfranchisement' | 'rmc_takeover';
    if (existingRmcRtm === 'yes') {
      caseType = 'rmc_takeover';
    } else if (outcome.action === 'registration') {
      // For registration outcomes, prefer enfranchisement if both available
      caseType = (!nonResidentialProportion || nonResidentialProportion === '25_or_less') 
        ? 'enfranchisement' 
        : 'rtm';
    } else {
      // Default fallback
      caseType = 'rtm';
    }

    // Create placeholder building
    const building = await CaseRepository.createOrGetBuilding({
      name: 'Building (details to be provided)',
      addressLine1: 'To be provided during registration',
      city: 'To be provided',
      postcode: 'TBD',
      numberOfFlats: (findAnswer('flat_count') as number) || 2,
      hasRmcRtm: existingRmcRtm === 'yes',
      isConverted: findAnswer('was_converted') === 'yes',
      freeholderLivesInBuilding: findAnswer('freeholder_lives_in') === 'yes',
      metadata: {
        sourceType: 'eligibility_wizard',
        answers: answers
      }
    });

    // Generate case number
    const caseNumber = await CaseRepository.generateCaseNumber(caseType);

    // Calculate target completion date
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + (caseType === 'rtm' ? 6 : 12));

    // Create the case without a user
    const newCase = await CaseRepository.createCase({
      caseNumber,
      buildingId: building.id,
      leadUserId: null, // No user initially
      caseType,
      status: 'draft',
      hasAuthority: false,
      startedAt: new Date(),
      targetCompletionDate: targetDate.toISOString().split('T')[0],
      metadata: {
        eligibilityOutcome: outcome,
        eligibilityAnswers: answers,
        createdFrom: 'eligibility_wizard',
        needsUserAssignment: true,
        needsBuildingDetails: true
      }
    });

    return {
      success: true,
      caseId: newCase.id,
      caseNumber: newCase.caseNumber,
      eligibilityId: newCase.id // Use case ID as eligibility ID
    };

  } catch (error) {
    console.error('Error creating eligibility case:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create case'
    };
  }
}

/**
 * Get case data by eligibility ID (which is the case ID)
 */
export async function getEligibilityCase(eligibilityId: string): Promise<EligibilityResult & { 
  case?: any;
  answers?: QuestionnaireAnswer[];
  outcome?: QuestionnaireOutcome;
}> {
  try {
    const caseData = await CaseRepository.getCaseById(eligibilityId);
    
    if (!caseData) {
      return {
        success: false,
        error: 'Case not found'
      };
    }

    // Extract eligibility data from metadata
    const metadata = caseData.metadata as any;
    const answers = metadata?.eligibilityAnswers || [];
    const outcome = metadata?.eligibilityOutcome;

    return {
      success: true,
      caseId: caseData.id,
      caseNumber: caseData.caseNumber,
      eligibilityId: caseData.id,
      case: {
        id: caseData.id,
        caseNumber: caseData.caseNumber,
        caseType: caseData.caseType,
        status: caseData.status,
        createdAt: caseData.createdAt,
        metadata: caseData.metadata
      },
      answers,
      outcome
    };

  } catch (error) {
    console.error('Error fetching eligibility case:', error);
    return {
      success: false,
      error: 'Failed to fetch case'
    };
  }
}

/**
 * Check if a case exists for the given eligibility ID
 */
export async function checkEligibilityCaseExists(eligibilityId: string): Promise<{
  exists: boolean;
  caseNumber?: string;
  caseType?: string;
}> {
  try {
    const caseData = await CaseRepository.getCaseById(eligibilityId);
    
    return {
      exists: !!caseData,
      caseNumber: caseData?.caseNumber,
      caseType: caseData?.caseType
    };
  } catch (error) {
    console.error('Error checking case existence:', error);
    return { exists: false };
  }
}
