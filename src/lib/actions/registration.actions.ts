/**
 * Registration Server Actions
 * Server-side functions for registration management
 */

'use server';

import { RegistrationRepository } from '@/lib/db/repositories/registration.repository';
import { type NewRegistration } from '@/lib/db/schema';
import { type RegistrationAnswer } from '@/components/questionnaire/registration-types';
import { createUserAccount, type UserMetadata } from '@/lib/actions/auth.actions';
import { normalizeForMatching } from '@/lib/utils/building-identifier';

export interface CreateRegistrationResult {
  success: boolean;
  registrationId?: string;
  userId?: string;
  alreadyRegistered?: boolean;
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
    const mainBuildingAddress = findAnswer(buildingBasics, 'main_building_address') as string;
    const postcode = findAnswer(buildingBasics, 'postcode') as string;
    const localAuthority = findAnswer(buildingBasics, 'local_authority') as string | undefined;
    const numberOfFlats = Number(findAnswer(buildingBasics, 'number_of_flats')) || 0;

    const preferredProcess = findAnswer(processChoice, 'preferred_process') as string | undefined;

    const termsConditions = Boolean(findAnswer(legalSubmit, 'terms_conditions'));
    const privacyPolicy = Boolean(findAnswer(legalSubmit, 'privacy_policy'));
    const dataProcessing = Boolean(findAnswer(legalSubmit, 'data_processing'));
    const marketingConsent = Boolean(findAnswer(legalSubmit, 'marketing_consent'));

    // Validate required fields
    if (!fullName || !emailAddress || !buildingAddress || !mainBuildingAddress || !postcode) {
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

    let userId: string;

    // Handle different user creation scenarios
    if (userResult.userAlreadyExists) {
      // User exists - check if they already have a registration
      const existingRegistration = await RegistrationRepository.getRegistrationsByEmail(emailAddress);
      
      if (existingRegistration.length > 0) {
        // They already completed registration
        return {
          success: false,
          error: 'You have already registered. Please log in to access your account.',
          alreadyRegistered: true
        };
      }
      
      // User exists but no registration yet - this is rare but we'll handle it quietly
      // Since we can't easily get the user ID, we'll have to fail here
      // In practice this should almost never happen
      if (!userResult.userId) {
        console.log('Edge case: User exists but no registration and cannot get user ID');
        return {
          success: false,
          error: 'Please try again or contact support if the problem persists.'
        };
      }
      
      userId = userResult.userId;
    } else if (userResult.success && userResult.userId) {
      // New user created successfully
      userId = userResult.userId;
    } else {
      // Failed to create user
      return {
        success: false,
        error: 'We were unable to create your account. Please try again.'
      };
    }

    // STEP 2: Create registration with user ID
    try {
      // Compute building identifier from normalized address + postcode
      const buildingIdentifier = normalizeForMatching(mainBuildingAddress, postcode);

      const registrationData: NewRegistration = {
        eligibilityCheckId: eligibilityCheckId || null,
        userId: userId,
        fullName,
        emailAddress,
        mobileNumber: mobileNumber || null,
        consentContact,
        buildingAddress,
        mainBuildingAddress,
        buildingIdentifier,
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
      console.log('Associated with user ID:', userId);

      return {
        success: true,
        registrationId: registration.id,
        userId: userId
      };
    } catch (dbError) {
      // Check if it's a unique constraint violation
      if (dbError instanceof Error && dbError.message.includes('unique constraint')) {
        console.error('User already has a registration:', userId);
        return {
          success: false,
          error: 'You have already completed registration. Please log in to access your account.',
          alreadyRegistered: true
        };
      }
      
      // Some other database error
      throw dbError;
    }

  } catch (error) {
    console.error('Error creating registration:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create registration'
    };
  }
}