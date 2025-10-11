/**
 * Registration Server Actions
 * Server-side functions for registration management
 */

'use server';

import { RegistrationRepository } from '@/lib/db/repositories/registration.repository';
import { type NewRegistration } from '@/lib/db/schema';
import { type RegistrationAnswer } from '@/components/questionnaire/registration-types';
import { createUserAccount, type UserMetadata } from '@/lib/actions/auth.actions';

export interface CreateRegistrationResult {
  success: boolean;
  registrationId?: string;
  userId?: string;
  userAlreadyExists?: boolean;
  error?: string;
}

/**
 * Create a registration from the registration wizard data
 * Creates a user account first, then saves the registration with the user ID
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

    // STEP 1: Create user account first
    const userMetadata: UserMetadata = {
      eligibility_id: eligibilityCheckId,
      building_address: buildingAddress,
      postcode: postcode,
      preferred_process: preferredProcess
    };

    const userResult = await createUserAccount(
      emailAddress,
      fullName,
      mobileNumber,
      userMetadata
    );

    if (!userResult.success) {
      return {
        success: false,
        error: `Failed to create user account: ${userResult.error}`
      };
    }

    // If user already exists but we don't have the ID, we need to handle this
    if (userResult.userAlreadyExists && !userResult.userId) {
      // For existing users without ID, we'll need to get it differently
      // For now, we'll return an error asking them to log in
      return {
        success: false,
        error: 'An account already exists with this email. Please log in to continue.',
        userAlreadyExists: true
      };
    }

    if (!userResult.userId) {
      return {
        success: false,
        error: 'Failed to get user ID after account creation'
      };
    }

    // STEP 2: Create registration with user ID
    const registrationData: NewRegistration = {
      eligibilityCheckId: eligibilityCheckId || null,
      userId: userResult.userId, // Now we have the user ID!
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
    console.log('Associated with user ID:', userResult.userId);

    return {
      success: true,
      registrationId: registration.id,
      userId: userResult.userId,
      userAlreadyExists: userResult.userAlreadyExists
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
