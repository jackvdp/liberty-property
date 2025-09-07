/**
 * Case Server Actions
 * Server-side functions for case management
 */

'use server';

import { CaseRepository } from '@/lib/db/repositories/case.repository';
import { StoredEligibilityData } from '@/lib/storage/types';
import { QuestionnaireAnswer } from '@/components/questionnaire/types';

export interface CreateCaseResult {
  success: boolean;
  caseId?: string;
  caseNumber?: string;
  error?: string;
}

/**
 * Create a case from eligibility data
 * This is a server action that can be called from client components
 */
export async function createCaseFromEligibility(
  eligibilityData: StoredEligibilityData,
  userEmail?: string,
  userName?: string
): Promise<CreateCaseResult> {
  try {
    // Extract answers
    const findAnswer = (questionId: string) => 
      eligibilityData.answers.find(a => a.questionId === questionId)?.value;

    // Check if case already exists for this eligibility ID
    const existingCase = await CaseRepository.getCaseByEligibilityId(eligibilityData.uuid);
    if (existingCase) {
      return {
        success: true,
        caseId: existingCase.id,
        caseNumber: existingCase.caseNumber
      };
    }

    // Determine case type from answers
    const propertyType = findAnswer('property_type') as string;
    const existingRmcRtm = findAnswer('existing_rmc_rtm') as string;
    const nonResidentialProportion = findAnswer('non_residential_proportion') as string;

    // Basic eligibility check
    if (propertyType !== 'flat') {
      return {
        success: false,
        error: 'Only flats are eligible for RTM or Collective Enfranchisement'
      };
    }

    // Determine case type
    let caseType: 'rtm' | 'enfranchisement' | 'rmc_takeover';
    if (existingRmcRtm === 'yes') {
      caseType = 'rmc_takeover';
    } else if (!nonResidentialProportion || nonResidentialProportion === '25_or_less') {
      caseType = 'enfranchisement'; // Default to CE if both available
    } else {
      caseType = 'rtm';
    }

    // Create building
    const building = await CaseRepository.createOrGetBuilding({
      name: `Building-${eligibilityData.uuid.slice(0, 8)}`,
      addressLine1: 'To be provided',
      city: 'To be provided',
      postcode: 'To be provided',
      numberOfFlats: (findAnswer('flat_count') as number) || 2,
      hasRmcRtm: existingRmcRtm === 'yes',
      isConverted: findAnswer('was_converted') === 'yes',
      freeholderLivesInBuilding: findAnswer('freeholder_lives_in') === 'yes',
      metadata: {
        eligibilityId: eligibilityData.uuid,
        answers: eligibilityData.answers
      }
    });

    // Create or get user (if email provided)
    let userId: string | undefined;
    if (userEmail && userName) {
      const user = await CaseRepository.createOrGetUser({
        email: userEmail,
        fullName: userName,
        role: 'leaseholder'
      });
      userId = user.id;
    }

    // Generate case number
    const caseNumber = await CaseRepository.generateCaseNumber(caseType);

    // Calculate target completion date
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + (caseType === 'rtm' ? 6 : 12));

    // Create the case
    const newCase = await CaseRepository.createCase({
      caseNumber,
      buildingId: building.id,
      leadUserId: userId || building.id, // Use building ID as fallback if no user
      caseType,
      status: 'draft',
      hasAuthority: false,
      startedAt: new Date(),
      targetCompletionDate: targetDate.toISOString().split('T')[0],
      metadata: {
        eligibilityId: eligibilityData.uuid,
        outcome: eligibilityData.outcome,
        createdFrom: 'eligibility_wizard'
      }
    });

    return {
      success: true,
      caseId: newCase.id,
      caseNumber: newCase.caseNumber
    };

  } catch (error) {
    console.error('Error creating case:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create case'
    };
  }
}

/**
 * Get a case by eligibility ID
 */
export async function getCaseByEligibilityId(eligibilityId: string) {
  try {
    const caseData = await CaseRepository.getCaseByEligibilityId(eligibilityId);
    
    if (!caseData) {
      return {
        success: false,
        error: 'Case not found'
      };
    }

    return {
      success: true,
      case: {
        id: caseData.id,
        caseNumber: caseData.caseNumber,
        caseType: caseData.caseType,
        status: caseData.status,
        createdAt: caseData.createdAt
      }
    };

  } catch (error) {
    console.error('Error fetching case:', error);
    return {
      success: false,
      error: 'Failed to fetch case'
    };
  }
}

/**
 * Get a case by ID
 */
export async function getCaseById(caseId: string) {
  try {
    const caseData = await CaseRepository.getCaseById(caseId);
    
    if (!caseData) {
      return {
        success: false,
        error: 'Case not found'
      };
    }

    return {
      success: true,
      case: caseData
    };

  } catch (error) {
    console.error('Error fetching case:', error);
    return {
      success: false,
      error: 'Failed to fetch case'
    };
  }
}
