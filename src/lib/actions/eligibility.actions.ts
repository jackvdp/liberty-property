/**
 * Eligibility Server Actions
 * Server-side functions for handling eligibility wizard data
 */

'use server';

import { EligibilityRepository } from '@/lib/db/repositories/eligibility.repository';
import { QuestionnaireAnswer, QuestionnaireOutcome } from '@/components/questionnaire/types';

export interface EligibilityResult {
  success: boolean;
  eligibilityId?: string;
  error?: string;
}

export interface EligibilityData {
  answers: QuestionnaireAnswer[];
  outcome: QuestionnaireOutcome;
}

/**
 * Create an eligibility check record immediately when eligibility check succeeds
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

    // Only create records for success outcomes
    if (outcome.type !== 'success') {
      return {
        success: false,
        error: 'Eligibility check can only be saved for successful outcomes'
      };
    }

    // Determine recommended case type from answers and outcome
    const existingRmcRtm = findAnswer('existing_rmc_rtm') as string;
    const nonResidentialProportion = findAnswer('non_residential_proportion') as string;

    let recommendedCaseType: 'rtm' | 'enfranchisement' | 'rmc_takeover';
    if (existingRmcRtm === 'yes') {
      recommendedCaseType = 'rmc_takeover';
    } else if (outcome.action === 'registration') {
      // For registration outcomes, prefer enfranchisement if both available
      recommendedCaseType = (!nonResidentialProportion || nonResidentialProportion === '25_or_less') 
        ? 'enfranchisement' 
        : 'rtm';
    } else {
      // Default fallback
      recommendedCaseType = 'rtm';
    }

    // Create the eligibility check record
    const newCheck = await EligibilityRepository.createEligibilityCheck({
      // Contact information
      userName: findAnswer('user_name') as string,
      userEmail: findAnswer('user_email') as string,
      userPhone: findAnswer('user_phone') as string,
      
      // Basic property info
      propertyType: findAnswer('property_type') as string,
      isLeasehold: findAnswer('flat_leasehold') === 'yes',
      flatCount: findAnswer('flat_count') as number,
      hasRmcRtm: existingRmcRtm === 'yes',
      
      // Building characteristics
      nonResidentialProportion: nonResidentialProportion as string,
      wasConverted: findAnswer('was_converted') === 'yes',
      freeholderLivesInBuilding: findAnswer('freeholder_lives_in') === 'yes',
      
      // Support and eligibility
      leaseholderSupport: findAnswer('leaseholder_support') as string,
      twoThirdsLongLeases: findAnswer('two_thirds_long_leases') === 'yes',
      singleOwnerMultipleFlats: findAnswer('single_owner_multiple_flats') === 'yes',
      
      // Outcome information
      eligibilityStatus: outcome.type as 'success' | 'failure' | 'info',
      recommendedCaseType,
      outcomeAction: outcome.action,
      
      // Raw data storage
      allAnswers: answers,
      outcome: outcome,
    });

    return {
      success: true,
      eligibilityId: newCheck.id
    };

  } catch (error) {
    console.error('Error creating eligibility check:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save eligibility check'
    };
  }
}

interface EligibilityCheck {
  id: string;
  propertyType: string | null;
  flatCount: number | null;
  recommendedCaseType:  "rtm" | "enfranchisement" | "rmc_takeover" | null;
  eligibilityStatus: "success" | "failure" | "info";
  createdAt: Date;
}

/**
 * Get eligibility check data by ID
 */
export async function getEligibilityCase(eligibilityId: string): Promise<EligibilityResult & { 
  eligibilityCheck?: EligibilityCheck;
  answers?: QuestionnaireAnswer[];
  outcome?: QuestionnaireOutcome;
}> {
  try {
    const eligibilityCheck = await EligibilityRepository.getEligibilityCheckById(eligibilityId);
    
    if (!eligibilityCheck) {
      return {
        success: false,
        error: 'Eligibility check not found'
      };
    }

    // Extract answers and outcome from stored data
    const answers = eligibilityCheck.allAnswers as QuestionnaireAnswer[];
    const outcome = eligibilityCheck.outcome as QuestionnaireOutcome;

    return {
      success: true,
      eligibilityId: eligibilityCheck.id,
      eligibilityCheck: <EligibilityCheck>{
        id: eligibilityCheck.id,
        propertyType: eligibilityCheck.propertyType,
        flatCount: eligibilityCheck.flatCount,
        recommendedCaseType: eligibilityCheck.recommendedCaseType,
        eligibilityStatus: eligibilityCheck.eligibilityStatus,
        createdAt: eligibilityCheck.createdAt
      },
      answers,
      outcome
    };

  } catch (error) {
    console.error('Error fetching eligibility check:', error);
    return {
      success: false,
      error: 'Failed to fetch eligibility check'
    };
  }
}

/**
 * Check if an eligibility check exists for the given ID
 */
export async function checkEligibilityCaseExists(eligibilityId: string): Promise<{
  exists: boolean;
  recommendedCaseType?: string;
  eligibilityStatus?: string;
}> {
  try {
    const eligibilityCheck = await EligibilityRepository.getEligibilityCheckById(eligibilityId);
    
    return {
      exists: !!eligibilityCheck,
      recommendedCaseType: eligibilityCheck?.recommendedCaseType ?? undefined,
      eligibilityStatus: eligibilityCheck?.eligibilityStatus
    };
  } catch (error) {
    console.error('Error checking eligibility check existence:', error);
    return { exists: false };
  }
}

/**
 * Get all eligibility checks (admin only)
 */
export async function getAllEligibilityChecks(): Promise<{
  success: boolean;
  checks?: import('@/lib/db/schema').EligibilityCheck[];
  error?: string;
}> {
  try {
    const checks = await EligibilityRepository.getAllEligibilityChecks();
    
    return {
      success: true,
      checks: checks
    };
  } catch (error) {
    console.error('Error fetching all eligibility checks:', error);
    return {
      success: false,
      error: 'Failed to fetch eligibility checks'
    };
  }
}
