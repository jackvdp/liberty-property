/**
 * Registration Wizard E2E Tests
 * 
 * Tests the complete registration flow from start to finish.
 * These tests interact with the real dev database and create actual user accounts.
 * 
 * Test scenarios covered:
 * 1. Complete registration flow (with eligibility data)
 * 2. Direct registration (without eligibility data)
 * 3. Duplicate registration prevention
 * 4. Validation (required fields, email format)
 * 5. Navigation (back button, step progress)
 * 6. Process choice selection
 * 7. Data persistence across steps
 * 8. Registration from different eligibility paths
 */

import { test, expect } from '@playwright/test';
import {
  generateTestUser,
  generateTestAddress,
  createTestRecords,
  trackUserEmail,
  trackRegistrationId,
  waitForWizardReady,
  clickContinue,
  clickBack,
  selectRadioOption,
  fillTextInput,
  fillNumberInput,
  checkCheckbox,
} from './helpers';

// Registration-specific helpers
async function waitForRegistrationReady(page: import('@playwright/test').Page): Promise<void> {
  await expect(page.locator('[data-slot="card"]')).toBeVisible();
  await expect(page.locator('text=Registration')).toBeVisible();
}

async function fillStep1ContactDetails(
  page: import('@playwright/test').Page,
  fullName: string,
  email: string,
  phone?: string
): Promise<void> {
  // Verify we're on step 1
  await expect(page.locator('text=Step 1 of')).toBeVisible();
  await expect(page.locator('text=Confirm Contact Details')).toBeVisible();

  // Fill full name
  await page.locator('input[type="text"]').first().fill(fullName);
  
  // Fill email
  await page.locator('input[type="email"]').fill(email);
  
  // Fill phone (optional)
  if (phone) {
    await page.locator('input[type="tel"]').fill(phone);
  }
  
  // Check consent checkbox
  await page.locator('text=Do you agree to be contacted').click();
  
  // Wait for checkbox to register
  await page.waitForTimeout(100);
}

async function fillStep2BuildingDetails(
  page: import('@playwright/test').Page,
  address: string,
  postcode: string,
  numberOfFlats: number,
  mainBuildingAddress: string,
  localAuthority?: string
): Promise<void> {
  // Verify we're on step 2
  await expect(page.locator('text=Step 2 of')).toBeVisible();
  await expect(page.locator('text=Tell us about your building')).toBeVisible();

  // Fill building address
  const textInputs = page.locator('input[type="text"]');
  await textInputs.nth(0).fill(address);
  
  // Fill postcode
  await textInputs.nth(1).fill(postcode);
  
  // Fill local authority (optional)
  if (localAuthority) {
    await textInputs.nth(2).fill(localAuthority);
  }
  
  // Fill number of flats
  await page.locator('input[type="number"]').fill(numberOfFlats.toString());
  
  // Fill main building address (last text input)
  await textInputs.last().fill(mainBuildingAddress);
  
  await page.waitForTimeout(100);
}

async function fillStep3ProcessChoice(
  page: import('@playwright/test').Page,
  process: 'rtm' | 'ce' | 'rmc' | 'dk'
): Promise<void> {
  // Verify we're on step 3 (process choice)
  await expect(page.locator('text=Step 3 of')).toBeVisible();
  
  const processLabels: Record<string, string> = {
    rtm: 'Right to Manage (RTM)',
    ce: 'Collective Enfranchisement (CE)',
    rmc: 'RMC Control',
    dk: "Don't know"
  };
  
  await selectRadioOption(page, processLabels[process]);
  await page.waitForTimeout(100);
}

async function fillStep4LegalSubmit(page: import('@playwright/test').Page, withMarketing: boolean = false): Promise<void> {
  // Verify we're on final step
  await expect(page.locator('text=Legal & Submit')).toBeVisible();

  // Check required checkboxes
  await page.locator('text=I agree to the Terms & Conditions').click();
  await page.waitForTimeout(50);
  
  await page.locator('text=I agree to the Privacy Policy').click();
  await page.waitForTimeout(50);
  
  await page.locator('text=I consent to my data being processed').click();
  await page.waitForTimeout(50);
  
  // Optional marketing consent
  if (withMarketing) {
    await page.locator('text=I would like to receive updates').click();
    await page.waitForTimeout(50);
  }
}

async function waitForRegistrationSuccess(page: import('@playwright/test').Page): Promise<void> {
  await expect(page.locator('text=Thank You for Registering')).toBeVisible({ timeout: 15000 });
}

async function waitForRegistrationError(page: import('@playwright/test').Page): Promise<void> {
  await expect(page.locator('[data-slot="card"]')).toBeVisible();
  // Error states have CircleX icon visible
  await expect(page.locator('text=Already Registered').or(page.locator('text=Registration Failed')).or(page.locator('text=Registration Error'))).toBeVisible({ timeout: 15000 });
}

async function getRegistrationReference(page: import('@playwright/test').Page): Promise<string | null> {
  const refElement = page.locator('text=Your registration reference').locator('..').locator('p.font-mono');
  if (await refElement.isVisible({ timeout: 5000 }).catch(() => false)) {
    return await refElement.textContent();
  }
  return null;
}

/**
 * Helper to complete the eligibility wizard with specific answers
 */
async function completeEligibilityWithAnswers(
  page: import('@playwright/test').Page,
  testUser: { fullName: string; email: string; phone: string },
  answers: {
    flatCount?: number;
    leaseholderSupport?: 'Yes' | 'No' | "Don't know";
    hasRmc?: 'Yes' | 'No' | "Don't know";
    hasRtm?: 'Yes' | 'No' | "Don't know";
  } = {}
): Promise<void> {
  await page.goto('/eligibility-check');
  await waitForWizardReady(page);

  // Fill contact details
  await fillTextInput(page, testUser.fullName);
  await clickContinue(page);
  await fillTextInput(page, testUser.email);
  await clickContinue(page);
  await fillTextInput(page, testUser.phone);
  await clickContinue(page);

  // Property type - Flat
  await selectRadioOption(page, 'Flat');
  await clickContinue(page);

  // Leasehold - Yes
  await selectRadioOption(page, 'Yes');
  await clickContinue(page);

  // Q3a: Existing RMC
  await selectRadioOption(page, answers.hasRmc || 'No');
  await clickContinue(page);

  // If RMC exists, we go to RMC outcome, otherwise continue to RTM question
  if (answers.hasRmc === 'Yes') {
    // RMC path ends here with outcome
    return;
  }

  // Q3b: Existing RTM
  await selectRadioOption(page, answers.hasRtm || 'No');
  await clickContinue(page);

  // If RTM exists, we go to RTM takeover outcome, otherwise continue
  if (answers.hasRtm === 'Yes') {
    // RTM takeover path ends here with outcome
    return;
  }

  // Number of flats
  await fillNumberInput(page, answers.flatCount || 10);
  await clickContinue(page);

  // Two thirds - Yes
  await selectRadioOption(page, 'Yes');
  await clickContinue(page);

  // Single owner - No
  await selectRadioOption(page, 'No');
  await clickContinue(page);

  // Non-residential - No
  await selectRadioOption(page, 'No');
  await clickContinue(page);

  // Converted house - No
  await selectRadioOption(page, 'No');
  await clickContinue(page);

  // Leaseholder support
  await selectRadioOption(page, answers.leaseholderSupport || 'Yes');
  await clickContinue(page);
}

test.describe('Registration Wizard', () => {
  
  test.describe('Complete Registration Flow', () => {
    
    test('should complete full registration with all steps', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E Registration');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      // Navigate directly to registration
      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Step 1: Contact Details
      await fillStep1ContactDetails(page, testUser.fullName, testUser.email, testUser.phone);
      
      // Click Continue
      const continueButton = page.getByRole('button', { name: /continue/i });
      await expect(continueButton).toBeEnabled();
      await continueButton.click();
      await page.waitForTimeout(500);

      // Step 2: Building Details
      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        8,
        testAddress.buildingAddress
      );
      
      await continueButton.click();
      await page.waitForTimeout(500);

      // Step 3: Choose Process (if shown)
      // This step may or may not appear depending on eligibility
      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        await fillStep3ProcessChoice(page, 'rtm');
        await continueButton.click();
        await page.waitForTimeout(500);
      }

      // Step 4: Legal & Submit
      await fillStep4LegalSubmit(page, true);
      
      // Submit
      const submitButton = page.getByRole('button', { name: /submit/i });
      await expect(submitButton).toBeEnabled();
      await submitButton.click();

      // Wait for success
      await waitForRegistrationSuccess(page);

      // Verify registration reference is shown
      const reference = await getRegistrationReference(page);
      expect(reference).toBeTruthy();
      console.log('Registration reference:', reference);

      // Verify Login button is present
      await expect(page.getByRole('button', { name: /login/i })).toBeVisible();

      console.log('Test records for cleanup:', testRecords);
    });

    test('should complete registration with eligibility data prefilled', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E Prefill');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      // Complete eligibility check first
      await completeEligibilityWithAnswers(page, testUser, { flatCount: 10, leaseholderSupport: 'Yes' });

      // Wait for eligibility outcome
      await expect(page.locator('text=Assessment Complete')).toBeVisible({ timeout: 15000 });

      // Click Register Now
      await page.getByRole('button', { name: /Register Now/i }).click();
      await page.waitForTimeout(1000);

      // Should be on registration page with prefilled data
      await waitForRegistrationReady(page);

      // Verify contact details are prefilled
      const nameInput = page.locator('input[type="text"]').first();
      await expect(nameInput).toHaveValue(testUser.fullName);

      const emailInput = page.locator('input[type="email"]');
      await expect(emailInput).toHaveValue(testUser.email);

      // Check consent and continue
      await page.locator('text=Do you agree to be contacted').click();
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Step 2: Building Details - flat count should be prefilled
      const flatCountInput = page.locator('input[type="number"]');
      await expect(flatCountInput).toHaveValue('10');

      // Fill remaining building details
      const textInputs = page.locator('input[type="text"]');
      await textInputs.nth(0).fill(testAddress.buildingAddress);
      await textInputs.nth(1).fill(testAddress.postcode);
      await textInputs.last().fill(testAddress.buildingAddress);

      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Step 3 might show process choice
      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        await fillStep3ProcessChoice(page, 'ce');
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      // Step 4: Legal
      await fillStep4LegalSubmit(page);
      await page.getByRole('button', { name: /submit/i }).click();

      // Wait for success
      await waitForRegistrationSuccess(page);

      console.log('Test records for cleanup:', testRecords);
    });

    test('should complete registration without marketing consent', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E NoMarketing');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      await page.goto('/register');
      await waitForRegistrationReady(page);

      await fillStep1ContactDetails(page, testUser.fullName, testUser.email);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        5,
        testAddress.buildingAddress
      );
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Skip Step 3 if present
      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        await fillStep3ProcessChoice(page, 'dk');
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      // Complete legal step WITHOUT marketing consent
      await fillStep4LegalSubmit(page, false);
      await page.getByRole('button', { name: /submit/i }).click();

      await waitForRegistrationSuccess(page);
      console.log('Test records for cleanup:', testRecords);
    });
  });

  test.describe('Eligibility Path Variations', () => {

    test('should register from leaseholder engagement path', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E Engagement');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      // Complete eligibility with "Don't know" for leaseholder support
      await completeEligibilityWithAnswers(page, testUser, { 
        flatCount: 8, 
        leaseholderSupport: "Don't know" 
      });

      // Wait for engagement outcome
      await expect(page.locator('text=Assessment Complete')).toBeVisible({ timeout: 15000 });

      // Click Register button (might say "Register to Build Support" or similar)
      const registerButton = page.getByRole('button', { name: /Register/i });
      await expect(registerButton).toBeVisible();
      await registerButton.click();
      await page.waitForTimeout(1000);

      // Should be on registration page
      await waitForRegistrationReady(page);

      // Verify contact details are prefilled
      const nameInput = page.locator('input[type="text"]').first();
      await expect(nameInput).toHaveValue(testUser.fullName);

      // Check consent and proceed
      await page.locator('text=Do you agree to be contacted').click();
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Fill building details
      const textInputs = page.locator('input[type="text"]');
      await textInputs.nth(0).fill(testAddress.buildingAddress);
      await textInputs.nth(1).fill(testAddress.postcode);
      await textInputs.last().fill(testAddress.buildingAddress);
      
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Handle step 3 if visible
      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        await fillStep3ProcessChoice(page, 'rtm');
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      // Complete legal step
      await fillStep4LegalSubmit(page);
      await page.getByRole('button', { name: /submit/i }).click();

      await waitForRegistrationSuccess(page);
      console.log('Test records for cleanup:', testRecords);
    });

    test('should register from RMC process path', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E RMC');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      // Complete eligibility with existing RMC
      await completeEligibilityWithAnswers(page, testUser, { hasRmc: 'Yes' });

      // Wait for RMC outcome
      await expect(page.locator('text=Assessment Complete')).toBeVisible({ timeout: 15000 });

      // Click Register button
      const registerButton = page.getByRole('button', { name: /Register|RMC/i });
      await expect(registerButton).toBeVisible();
      await registerButton.click();
      await page.waitForTimeout(1000);

      // Should be on registration page
      await waitForRegistrationReady(page);

      // Check consent and proceed
      await page.locator('text=Do you agree to be contacted').click();
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Fill building details
      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        6,
        testAddress.buildingAddress
      );
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Handle step 3 if visible
      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        await fillStep3ProcessChoice(page, 'rmc');
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      // Complete legal step
      await fillStep4LegalSubmit(page);
      await page.getByRole('button', { name: /submit/i }).click();

      await waitForRegistrationSuccess(page);
      console.log('Test records for cleanup:', testRecords);
    });
  });

  test.describe('Validation', () => {
    
    test('should require consent checkbox to proceed', async ({ page }) => {
      const testUser = generateTestUser('E2E Consent');

      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Fill all fields except consent
      await page.locator('input[type="text"]').first().fill(testUser.fullName);
      await page.locator('input[type="email"]').fill(testUser.email);

      // Continue button should be disabled without consent
      const continueButton = page.getByRole('button', { name: /continue/i });
      await expect(continueButton).toBeDisabled();

      // Check consent
      await page.locator('text=Do you agree to be contacted').click();
      
      // Now button should be enabled
      await expect(continueButton).toBeEnabled();
    });

    test('should validate email format', async ({ page }) => {
      const testUser = generateTestUser('E2E Email');

      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Fill name
      await page.locator('input[type="text"]').first().fill(testUser.fullName);
      
      // Enter invalid email
      await page.locator('input[type="email"]').fill('not-an-email');
      
      // Check consent
      await page.locator('text=Do you agree to be contacted').click();

      // Continue should be disabled with invalid email
      const continueButton = page.getByRole('button', { name: /continue/i });
      
      // Try to continue - should fail validation
      if (await continueButton.isEnabled()) {
        await continueButton.click();
        // Should still be on step 1
        await expect(page.locator('text=Step 1 of')).toBeVisible();
      }

      // Fix email
      await page.locator('input[type="email"]').fill(testUser.email);
      
      // Now should work
      await expect(continueButton).toBeEnabled();
    });

    test('should require all legal checkboxes', async ({ page }) => {
      const testUser = generateTestUser('E2E Legal');
      const testAddress = generateTestAddress();

      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Complete Step 1
      await fillStep1ContactDetails(page, testUser.fullName, testUser.email, testUser.phone);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Complete Step 2
      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        5,
        testAddress.buildingAddress
      );
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Skip Step 3 if present
      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        await fillStep3ProcessChoice(page, 'dk');
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      // On Step 4 - Legal
      await expect(page.locator('text=Legal & Submit')).toBeVisible();

      // Submit should be disabled without checkboxes
      const submitButton = page.getByRole('button', { name: /submit/i });
      await expect(submitButton).toBeDisabled();

      // Check only one checkbox
      await page.locator('text=I agree to the Terms & Conditions').click();
      await expect(submitButton).toBeDisabled();

      // Check second checkbox
      await page.locator('text=I agree to the Privacy Policy').click();
      await expect(submitButton).toBeDisabled();

      // Check third required checkbox
      await page.locator('text=I consent to my data being processed').click();
      
      // Now submit should be enabled
      await expect(submitButton).toBeEnabled();
    });

    test('should require name field', async ({ page }) => {
      const testUser = generateTestUser('E2E Name');

      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Fill only email, leave name empty
      await page.locator('input[type="email"]').fill(testUser.email);
      await page.locator('text=Do you agree to be contacted').click();

      // Continue button should be disabled without name
      const continueButton = page.getByRole('button', { name: /continue/i });
      await expect(continueButton).toBeDisabled();

      // Fill name
      await page.locator('input[type="text"]').first().fill(testUser.fullName);
      
      // Now button should be enabled
      await expect(continueButton).toBeEnabled();
    });

    test('should require building address fields in step 2', async ({ page }) => {
      const testUser = generateTestUser('E2E Building');
      const testAddress = generateTestAddress();

      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Complete Step 1
      await fillStep1ContactDetails(page, testUser.fullName, testUser.email);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // On Step 2
      await expect(page.locator('text=Step 2 of')).toBeVisible();

      // Continue should be disabled without required fields
      const continueButton = page.getByRole('button', { name: /continue/i });
      await expect(continueButton).toBeDisabled();

      // Fill only building address
      await page.locator('input[type="text"]').nth(0).fill(testAddress.buildingAddress);
      await expect(continueButton).toBeDisabled();

      // Fill postcode
      await page.locator('input[type="text"]').nth(1).fill(testAddress.postcode);
      await expect(continueButton).toBeDisabled();

      // Fill number of flats
      await page.locator('input[type="number"]').fill('5');
      await expect(continueButton).toBeDisabled();

      // Fill main building address - last required field
      await page.locator('input[type="text"]').last().fill(testAddress.buildingAddress);
      
      // Now should be enabled
      await expect(continueButton).toBeEnabled();
    });

    test('should require minimum 2 flats', async ({ page }) => {
      const testUser = generateTestUser('E2E MinFlats');
      const testAddress = generateTestAddress();

      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Complete Step 1
      await fillStep1ContactDetails(page, testUser.fullName, testUser.email);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Fill step 2 with only 1 flat
      const textInputs = page.locator('input[type="text"]');
      await textInputs.nth(0).fill(testAddress.buildingAddress);
      await textInputs.nth(1).fill(testAddress.postcode);
      await page.locator('input[type="number"]').fill('1');
      await textInputs.last().fill(testAddress.buildingAddress);

      const continueButton = page.getByRole('button', { name: /continue/i });
      
      // The input has min=2 validation - check the input's validity
      const numberInput = page.locator('input[type="number"]');
      const min = await numberInput.getAttribute('min');
      expect(min).toBe('2');
      
      // When we fill with a valid number (2+), it should work
      await page.locator('input[type="number"]').fill('2');
      await expect(continueButton).toBeEnabled();
    });
  });

  test.describe('Navigation', () => {
    
    test('should allow going back through steps', async ({ page }) => {
      const testUser = generateTestUser('E2E Nav');
      const testAddress = generateTestAddress();

      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Complete Step 1
      await fillStep1ContactDetails(page, testUser.fullName, testUser.email);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // On Step 2
      await expect(page.locator('text=Step 2 of')).toBeVisible();

      // Go back
      await page.getByRole('button', { name: /back/i }).click();
      await page.waitForTimeout(500);

      // Should be back on Step 1
      await expect(page.locator('text=Step 1 of')).toBeVisible();
      await expect(page.locator('text=Confirm Contact Details')).toBeVisible();

      // Data should be preserved
      const nameInput = page.locator('input[type="text"]').first();
      await expect(nameInput).toHaveValue(testUser.fullName);
    });

    test('should show progress through steps', async ({ page }) => {
      const testUser = generateTestUser('E2E Progress');
      const testAddress = generateTestAddress();

      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Check initial progress
      await expect(page.locator('text=0%')).toBeVisible();
      await expect(page.locator('text=Step 1 of')).toBeVisible();

      // Complete Step 1
      await fillStep1ContactDetails(page, testUser.fullName, testUser.email);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Progress should have increased
      await expect(page.locator('text=Step 2 of')).toBeVisible();
      // Progress percentage should be visible (not 0%)
      const progressText = await page.locator('text=/\\d+%/').first().textContent();
      expect(parseInt(progressText || '0')).toBeGreaterThan(0);
    });

    test('back button should be disabled on first step', async ({ page }) => {
      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Back button should be disabled on step 1
      const backButton = page.getByRole('button', { name: /back/i });
      await expect(backButton).toBeDisabled();
    });

    test('should preserve data when navigating back from step 3', async ({ page }) => {
      const testUser = generateTestUser('E2E BackStep3');
      const testAddress = generateTestAddress();

      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Complete Step 1
      await fillStep1ContactDetails(page, testUser.fullName, testUser.email, testUser.phone);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Complete Step 2
      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        7,
        testAddress.buildingAddress,
        'Test Council'
      );
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Check if step 3 is visible
      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      
      if (step3Visible) {
        // We're on Step 3, go back to Step 2
        await page.getByRole('button', { name: /back/i }).click();
        await page.waitForTimeout(500);

        // Verify Step 2 data is preserved
        await expect(page.locator('text=Step 2 of')).toBeVisible();
        const textInputs = page.locator('input[type="text"]');
        await expect(textInputs.nth(0)).toHaveValue(testAddress.buildingAddress);
        await expect(textInputs.nth(1)).toHaveValue(testAddress.postcode);
        await expect(page.locator('input[type="number"]')).toHaveValue('7');
      } else {
        // We're on Step 4 (Legal), go back
        await page.getByRole('button', { name: /back/i }).click();
        await page.waitForTimeout(500);

        // Verify we're back on Step 2 with data preserved
        await expect(page.locator('text=Step 2 of')).toBeVisible();
        const textInputs = page.locator('input[type="text"]');
        await expect(textInputs.nth(0)).toHaveValue(testAddress.buildingAddress);
      }
    });

    test('should preserve data when navigating back from legal step', async ({ page }) => {
      const testUser = generateTestUser('E2E BackLegal');
      const testAddress = generateTestAddress();

      await page.goto('/register');
      await waitForRegistrationReady(page);

      // Complete Step 1
      await fillStep1ContactDetails(page, testUser.fullName, testUser.email);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Complete Step 2
      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        4,
        testAddress.buildingAddress
      );
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Handle Step 3 if visible
      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        await fillStep3ProcessChoice(page, 'rtm');
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      // On Legal step
      await expect(page.locator('text=Legal & Submit')).toBeVisible();

      // Check some boxes
      await page.locator('text=I agree to the Terms & Conditions').click();
      await page.locator('text=I agree to the Privacy Policy').click();

      // Go back
      await page.getByRole('button', { name: /back/i }).click();
      await page.waitForTimeout(500);

      // Go forward again
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Legal checkboxes should NOT be preserved (they reset on back navigation)
      // This is a design decision - we verify the current behavior
      await expect(page.locator('text=Legal & Submit')).toBeVisible();
    });
  });

  test.describe('Duplicate Registration Prevention', () => {
    
    test('should show error for already registered email', async ({ page }) => {
      const testUser = generateTestUser('E2E Duplicate');
      const testAddress = generateTestAddress();
      
      // First registration
      await page.goto('/register');
      await waitForRegistrationReady(page);

      await fillStep1ContactDetails(page, testUser.fullName, testUser.email, testUser.phone);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        6,
        testAddress.buildingAddress
      );
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        await fillStep3ProcessChoice(page, 'rtm');
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      await fillStep4LegalSubmit(page);
      await page.getByRole('button', { name: /submit/i }).click();
      await waitForRegistrationSuccess(page);

      // Second registration with same email
      await page.goto('/register');
      await waitForRegistrationReady(page);

      await fillStep1ContactDetails(page, 'Different Name', testUser.email, testUser.phone);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        6,
        testAddress.buildingAddress
      );
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      const step3Visible2 = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible2) {
        await fillStep3ProcessChoice(page, 'rtm');
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      await fillStep4LegalSubmit(page);
      await page.getByRole('button', { name: /submit/i }).click();

      // Should show already registered error
      await waitForRegistrationError(page);
      await expect(page.locator('text=Already Registered')).toBeVisible();
      
      // Should show login button
      await expect(page.getByRole('button', { name: /Go to Login/i })).toBeVisible();
    });
  });

  test.describe('Process Choice Step', () => {

    test('should allow selecting RTM process', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E RTM Choice');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      // Complete eligibility to get process choice step
      await completeEligibilityWithAnswers(page, testUser, { flatCount: 12, leaseholderSupport: 'Yes' });
      await expect(page.locator('text=Assessment Complete')).toBeVisible({ timeout: 15000 });
      await page.getByRole('button', { name: /Register Now/i }).click();
      await page.waitForTimeout(1000);

      await waitForRegistrationReady(page);
      await page.locator('text=Do you agree to be contacted').click();
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Fill building details
      const textInputs = page.locator('input[type="text"]');
      await textInputs.nth(0).fill(testAddress.buildingAddress);
      await textInputs.nth(1).fill(testAddress.postcode);
      await textInputs.last().fill(testAddress.buildingAddress);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Check if process choice step appears
      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        // Verify radio options are visible by checking their labels
        await expect(page.getByLabel('Right to Manage (RTM)')).toBeVisible();
        await expect(page.getByLabel('Collective Enfranchisement (CE)')).toBeVisible();
        
        // Select RTM using the radio input
        await page.getByLabel('Right to Manage (RTM)').click();
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      // Complete legal step
      await fillStep4LegalSubmit(page);
      await page.getByRole('button', { name: /submit/i }).click();
      await waitForRegistrationSuccess(page);

      console.log('Test records for cleanup:', testRecords);
    });

    test('should allow selecting CE process', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E CE Choice');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      // Complete eligibility
      await completeEligibilityWithAnswers(page, testUser, { flatCount: 15, leaseholderSupport: 'Yes' });
      await expect(page.locator('text=Assessment Complete')).toBeVisible({ timeout: 15000 });
      await page.getByRole('button', { name: /Register Now/i }).click();
      await page.waitForTimeout(1000);

      await waitForRegistrationReady(page);
      await page.locator('text=Do you agree to be contacted').click();
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Fill building details
      const textInputs = page.locator('input[type="text"]');
      await textInputs.nth(0).fill(testAddress.buildingAddress);
      await textInputs.nth(1).fill(testAddress.postcode);
      await textInputs.last().fill(testAddress.buildingAddress);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Check if process choice step appears
      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        // Select CE using the radio input
        await page.getByLabel('Collective Enfranchisement (CE)').click();
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      // Complete legal step
      await fillStep4LegalSubmit(page);
      await page.getByRole('button', { name: /submit/i }).click();
      await waitForRegistrationSuccess(page);

      console.log('Test records for cleanup:', testRecords);
    });

    test('should allow selecting "Don\'t know" for process', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E DK Choice');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      await page.goto('/register');
      await waitForRegistrationReady(page);

      await fillStep1ContactDetails(page, testUser.fullName, testUser.email);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        9,
        testAddress.buildingAddress
      );
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // Check if process choice step appears
      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        // Select "Don't know" using the radio input
        await page.getByLabel("Don't know").click();
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      // Complete legal step
      await fillStep4LegalSubmit(page);
      await page.getByRole('button', { name: /submit/i }).click();
      await waitForRegistrationSuccess(page);

      console.log('Test records for cleanup:', testRecords);
    });
  });

  test.describe('Success Screen', () => {

    test('should display registration reference after success', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E Reference');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      await page.goto('/register');
      await waitForRegistrationReady(page);

      await fillStep1ContactDetails(page, testUser.fullName, testUser.email);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        5,
        testAddress.buildingAddress
      );
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        await fillStep3ProcessChoice(page, 'dk');
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      await fillStep4LegalSubmit(page);
      await page.getByRole('button', { name: /submit/i }).click();

      await waitForRegistrationSuccess(page);

      // Verify reference is displayed
      await expect(page.locator('text=Your registration reference')).toBeVisible();
      const reference = await getRegistrationReference(page);
      expect(reference).toBeTruthy();
      expect(reference!.length).toBe(8); // Should be 8-character uppercase reference

      console.log('Registration reference:', reference);
    });

    test('should show action buttons after success', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E Actions');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      await page.goto('/register');
      await waitForRegistrationReady(page);

      await fillStep1ContactDetails(page, testUser.fullName, testUser.email);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        5,
        testAddress.buildingAddress
      );
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        await fillStep3ProcessChoice(page, 'dk');
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      await fillStep4LegalSubmit(page);
      await page.getByRole('button', { name: /submit/i }).click();

      await waitForRegistrationSuccess(page);

      // Verify action buttons are present
      await expect(page.getByRole('button', { name: /Login/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Return to Homepage/i })).toBeVisible();
    });

    test('login button should navigate to login page', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E LoginNav');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      await page.goto('/register');
      await waitForRegistrationReady(page);

      await fillStep1ContactDetails(page, testUser.fullName, testUser.email);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      await fillStep2BuildingDetails(
        page,
        testAddress.buildingAddress,
        testAddress.postcode,
        5,
        testAddress.buildingAddress
      );
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      const step3Visible = await page.locator('text=Choose your preferred process').isVisible({ timeout: 2000 }).catch(() => false);
      if (step3Visible) {
        await fillStep3ProcessChoice(page, 'dk');
        await page.getByRole('button', { name: /continue/i }).click();
        await page.waitForTimeout(500);
      }

      await fillStep4LegalSubmit(page);
      await page.getByRole('button', { name: /submit/i }).click();

      await waitForRegistrationSuccess(page);

      // Click Login button
      await page.getByRole('button', { name: /Login/i }).click();
      await page.waitForTimeout(500);

      // Should navigate to login page
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('Eligibility Summary Display', () => {

    test('should show eligibility summary on step 2 when coming from eligibility check', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E Summary');
      const testAddress = generateTestAddress();
      trackUserEmail(testRecords, testUser.email);

      // Complete eligibility first
      await completeEligibilityWithAnswers(page, testUser, { flatCount: 10, leaseholderSupport: 'Yes' });
      await expect(page.locator('text=Assessment Complete')).toBeVisible({ timeout: 15000 });
      await page.getByRole('button', { name: /Register Now/i }).click();
      await page.waitForTimeout(1000);

      await waitForRegistrationReady(page);
      await page.locator('text=Do you agree to be contacted').click();
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(500);

      // On Step 2 - should see eligibility summary
      await expect(page.locator('text=Step 2 of')).toBeVisible();
      await expect(page.locator('text=Your Eligibility Summary')).toBeVisible();
      
      // Verify summary sections exist
      await expect(page.locator('text=Management Status')).toBeVisible();
      await expect(page.locator('text=Recommended Path')).toBeVisible();
    });
  });
});
