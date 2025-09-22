/**
 * Registration Server Actions
 * Server-side functions for registration management
 */

'use server';

import { RegistrationRepository } from '@/lib/db/repositories/registration.repository';
import { type NewRegistration } from '@/lib/db/schema';
import { type RegistrationAnswer } from '@/components/questionnaire/registration-types';

export interface CreateRegistrationResult {
  success: boolean;
  registrationId?: string;
  error?: string;
}

/**
 * Create a registration from the registration wizard data
 */
export async function createRegistrationCase(
  answers: Record<string, RegistrationAnswer[]>,
  eligibilityCheckId?: string
): Promise<CreateRegistrationResult> {
  try {
    // Extract answers by section
    const contactDetails = answers['step1'] || [];
    const buildingBasics = answers['step2'] || [];
    const processChoice = answers['step6a'] || [];
    const legalSubmit = answers['step7'] || [];

    // Helper to find answer value
    const findAnswer = (sectionAnswers: RegistrationAnswer[], questionId: string) => {
      return sectionAnswers.find(a => a.questionId === questionId)?.value;
    };

    // Extract all required data
    const fullName = findAnswer(contactDetails, 'full_name') as string;
    const emailAddress = findAnswer(contactDetails, 'email_address') as string;
    const mobileNumber = findAnswer(contactDetails, 'mobile_number') as string | undefined;
    const consentContact = Boolean(findAnswer(contactDetails, 'consent_contact'));

    const buildingAddress = findAnswer(buildingBasics, 'building_address') as string;
    const postcode = findAnswer(buildingBasics, 'postcode') as string;
    const localAuthority = findAnswer(buildingBasics, 'local_authority') as string | undefined;
    const numberOfFlats = Number(findAnswer(buildingBasics, 'number_of_flats')) || 0;

    const preferredProcess = findAnswer(processChoice, 'preferred_process') as string | undefined;

    const termsConditions = Boolean(findAnswer(legalSubmit, 'terms_conditions'));
    const privacyPolicy = Boolean(findAnswer(legalSubmit, 'privacy_policy'));
    const dataProcessing = Boolean(findAnswer(legalSubmit, 'data_processing'));
    const marketingConsent = Boolean(findAnswer(legalSubmit, 'marketing_consent'));

    // Validate required fields
    if (!fullName || !emailAddress || !buildingAddress || !postcode) {
      return {
        success: false,
        error: 'Missing required contact or building information'
      };
    }

    if (!consentContact || !termsConditions || !privacyPolicy || !dataProcessing) {
      return {
        success: false,
        error: 'All required consents must be provided'
      };
    }

    // Create registration data
    const registrationData: NewRegistration = {
      eligibilityCheckId: eligibilityCheckId || null,
      fullName,
      emailAddress,
      mobileNumber: mobileNumber || null,
      consentContact,
      buildingAddress,
      postcode,
      localAuthority: localAuthority || null,
      numberOfFlats,
      preferredProcess: preferredProcess || null,
      termsConditions,
      privacyPolicy,
      dataProcessing,
      marketingConsent: marketingConsent || null,
      allAnswers: answers,
      status: 'pending'
    };

    // Save to database
    const registration = await RegistrationRepository.createRegistration(registrationData);

    console.log('Registration created successfully:', registration.id);

    return {
      success: true,
      registrationId: registration.id
    };

  } catch (error) {
    console.error('Error creating registration:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create registration'
    };
  }
}

/**
 * Get a registration by ID
 */
export async function getRegistrationById(registrationId: string) {
  try {
    const registration = await RegistrationRepository.getRegistrationById(registrationId);
    
    if (!registration) {
      return {
        success: false,
        error: 'Registration not found'
      };
    }

    return {
      success: true,
      registration
    };

  } catch (error) {
    console.error('Error fetching registration:', error);
    return {
      success: false,
      error: 'Failed to fetch registration'
    };
  }
}

/**
 * Get registration by eligibility check ID
 */
export async function getRegistrationByEligibilityId(eligibilityCheckId: string) {
  try {
    const registration = await RegistrationRepository.getRegistrationByEligibilityId(eligibilityCheckId);
    
    if (!registration) {
      return {
        success: false,
        error: 'No registration found for this eligibility check'
      };
    }

    return {
      success: true,
      registration
    };

  } catch (error) {
    console.error('Error fetching registration by eligibility ID:', error);
    return {
      success: false,
      error: 'Failed to fetch registration'
    };
  }
}

/**
 * Update registration status (for admin use)
 */
export async function updateRegistrationStatus(
  registrationId: string,
  status: 'pending' | 'contacted' | 'active' | 'completed'
) {
  try {
    const updated = await RegistrationRepository.updateRegistrationStatus(registrationId, status);
    
    if (!updated) {
      return {
        success: false,
        error: 'Registration not found'
      };
    }

    return {
      success: true,
      registration: updated
    };

  } catch (error) {
    console.error('Error updating registration status:', error);
    return {
      success: false,
      error: 'Failed to update registration status'
    };
  }
}
