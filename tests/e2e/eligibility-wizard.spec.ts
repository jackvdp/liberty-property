/**
 * Eligibility Wizard E2E Tests
 * 
 * Tests the complete eligibility check flow from start to finish.
 * These tests interact with the real dev database.
 * 
 * Test scenarios covered:
 * 1. Qualifying flat - full success path
 * 2. Flat needing leaseholder engagement
 * 3. Flat with existing RMC
 * 4. Ineligible scenarios (house, not leasehold, single flat, too commercial)
 * 5. Navigation (back button, restart)
 */

import { test, expect } from '@playwright/test';
import {
  generateTestUser,
  generateTestPhone,
  createTestRecords,
  trackEligibilityId,
  trackUserEmail,
  waitForWizardReady,
  clickContinue,
  clickBack,
  selectRadioOption,
  fillTextInput,
  fillNumberInput,
  expectQuestionContains,
  waitForOutcome,
  getOutcomeTitle,
  getCaseId,
  fillContactDetails,
  answerAndContinue,
  isSuccessOutcome,
  isErrorOutcome,
} from './helpers';

test.describe('Eligibility Wizard', () => {
  test.describe('Qualifying Flat - Full Success Path', () => {
    test('should complete eligibility check for a qualifying flat and create a case', async ({ page }) => {
      const testRecords = createTestRecords();
      const testUser = generateTestUser('E2E Qualifying');
      trackUserEmail(testRecords, testUser.email);

      // Navigate to eligibility check
      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      // Verify we're on the first question
      await expectQuestionContains(page, 'full name');

      // Fill contact details
      await fillContactDetails(page, testUser.fullName, testUser.email, testUser.phone);

      // Q1: Property type - Flat
      await expectQuestionContains(page, 'flat or a house');
      await selectRadioOption(page, 'Flat');
      await clickContinue(page);

      // Q2: Is leasehold - Yes
      await expectQuestionContains(page, 'leasehold');
      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      // Q3a: Existing RMC - No
      await expectQuestionContains(page, 'Residents\' Management Company');
      await selectRadioOption(page, 'No');
      await clickContinue(page);

      // Q3b: Existing RTM - No
      await expectQuestionContains(page, 'RTM');
      await selectRadioOption(page, 'No');
      await clickContinue(page);

      // Q4: Number of flats - 10
      await expectQuestionContains(page, 'How many flats');
      await fillNumberInput(page, 10);
      await clickContinue(page);

      // Q5: Two thirds long leaseholders - Yes
      await expectQuestionContains(page, 'two thirds');
      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      // Q6: Single owner multiple flats - No
      await expectQuestionContains(page, 'more than two flats');
      await selectRadioOption(page, 'No');
      await clickContinue(page);

      // Q7a: Non-residential space - No
      await expectQuestionContains(page, 'non residential space');
      await selectRadioOption(page, 'No');
      await clickContinue(page);

      // Q8: Converted house - No
      await expectQuestionContains(page, 'converted into flats');
      await selectRadioOption(page, 'No');
      await clickContinue(page);

      // Q10: Leaseholder support - Yes
      await expectQuestionContains(page, 'support taking back control');
      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      // Wait for outcome
      await waitForOutcome(page);

      // Verify success outcome
      const outcomeTitle = await getOutcomeTitle(page);
      expect(outcomeTitle).toContain('eligible');
      expect(await isSuccessOutcome(page)).toBe(true);

      // Wait for case to be created and get the ID
      await page.waitForTimeout(3000); // Wait for async case creation
      
      // Verify the case ID is displayed
      const caseIdElement = page.locator('code').first();
      await expect(caseIdElement).toBeVisible({ timeout: 10000 });
      const caseId = await caseIdElement.textContent();
      
      if (caseId) {
        trackEligibilityId(testRecords, caseId);
        console.log('Created eligibility case:', caseId);
        
        // Verify it looks like a UUID
        expect(caseId).toMatch(/^[a-f0-9-]{36}$/i);
      }

      // Verify the Register Now button is present
      await expect(page.getByRole('button', { name: /Register Now/i })).toBeVisible();

      console.log('Test records for cleanup:', testRecords);
    });
  });

  test.describe('Leaseholder Engagement Path', () => {
    test('should direct to leaseholder engagement when support is uncertain', async ({ page }) => {
      const testUser = generateTestUser('E2E Engagement');

      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      // Fill contact details (phone is required by the wizard even though marked optional)
      await fillContactDetails(page, testUser.fullName, testUser.email, testUser.phone);

      // Answer questions leading to engagement path
      await selectRadioOption(page, 'Flat');
      await clickContinue(page);

      await selectRadioOption(page, 'Yes'); // leasehold
      await clickContinue(page);

      await selectRadioOption(page, 'No'); // no RMC
      await clickContinue(page);

      await selectRadioOption(page, 'No'); // no RTM
      await clickContinue(page);

      await fillNumberInput(page, 8); // 8 flats
      await clickContinue(page);

      await selectRadioOption(page, 'Yes'); // two thirds
      await clickContinue(page);

      await selectRadioOption(page, 'No'); // single owner
      await clickContinue(page);

      await selectRadioOption(page, 'No'); // no commercial
      await clickContinue(page);

      await selectRadioOption(page, 'No'); // not converted
      await clickContinue(page);

      // Key difference: Don't know about leaseholder support
      await selectRadioOption(page, "Don't know");
      await clickContinue(page);

      // Wait for outcome
      await waitForOutcome(page);

      // Verify leaseholder engagement outcome
      const outcomeTitle = await getOutcomeTitle(page);
      expect(outcomeTitle.toLowerCase()).toContain('support');
      expect(await isSuccessOutcome(page)).toBe(true);

      // Verify the engagement button
      await expect(page.getByRole('button', { name: /Register.*Support/i })).toBeVisible();
    });
  });

  test.describe('Existing RMC Path', () => {
    test('should direct to RMC process when RMC already exists', async ({ page }) => {
      const testUser = generateTestUser('E2E RMC');

      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      // Fill contact details (phone is required by the wizard even though marked optional)
      await fillContactDetails(page, testUser.fullName, testUser.email, testUser.phone);

      // Property type - Flat
      await selectRadioOption(page, 'Flat');
      await clickContinue(page);

      // Leasehold - Yes
      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      // Existing RMC - Yes (triggers RMC process)
      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      // Wait for outcome
      await waitForOutcome(page);

      // Verify RMC process outcome
      const outcomeTitle = await getOutcomeTitle(page);
      expect(outcomeTitle.toLowerCase()).toContain('rmc');
      expect(await isSuccessOutcome(page)).toBe(true);

      // Verify the RMC options button
      await expect(page.getByRole('button', { name: /RMC/i })).toBeVisible();
    });
  });

  test.describe('Existing RTM Path', () => {
    test('should direct to RTM takeover when RTM already exists', async ({ page }) => {
      const testUser = generateTestUser('E2E RTM');

      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      // Fill contact details
      await fillContactDetails(page, testUser.fullName, testUser.email, testUser.phone);

      // Property type - Flat
      await selectRadioOption(page, 'Flat');
      await clickContinue(page);

      // Leasehold - Yes
      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      // Existing RMC - No
      await selectRadioOption(page, 'No');
      await clickContinue(page);

      // Existing RTM - Yes (triggers RTM takeover)
      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      // Wait for outcome
      await waitForOutcome(page);

      // Verify RTM takeover outcome
      const outcomeTitle = await getOutcomeTitle(page);
      expect(outcomeTitle.toLowerCase()).toContain('rtm');
      expect(await isSuccessOutcome(page)).toBe(true);

      // Verify the RTM options button
      await expect(page.getByRole('button', { name: /RTM/i })).toBeVisible();
    });
  });

  test.describe('Ineligible Scenarios', () => {
    test('should show ineligible message for house without RMC', async ({ page }) => {
      const testUser = generateTestUser('E2E House');

      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      await fillContactDetails(page, testUser.fullName, testUser.email, testUser.phone);

      // Property type - House
      await selectRadioOption(page, 'House');
      await clickContinue(page);

      // House RMC - No
      await selectRadioOption(page, 'No');
      await clickContinue(page);

      // Wait for outcome
      await waitForOutcome(page);

      // Verify ineligible outcome
      expect(await isErrorOutcome(page)).toBe(true);
      const outcomeTitle = await getOutcomeTitle(page);
      expect(outcomeTitle.toLowerCase()).toContain('unfortunately');
    });

    test('should show ineligible message for non-leasehold flat', async ({ page }) => {
      const testUser = generateTestUser('E2E NonLeasehold');

      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      await fillContactDetails(page, testUser.fullName, testUser.email, testUser.phone);

      await selectRadioOption(page, 'Flat');
      await clickContinue(page);

      // Not leasehold
      await selectRadioOption(page, 'No');
      await clickContinue(page);

      await waitForOutcome(page);

      expect(await isErrorOutcome(page)).toBe(true);
      const outcomeTitle = await getOutcomeTitle(page);
      expect(outcomeTitle.toLowerCase()).toContain('leasehold');
    });

    test('should show ineligible message for single flat building', async ({ page }) => {
      const testUser = generateTestUser('E2E SingleFlat');

      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      await fillContactDetails(page, testUser.fullName, testUser.email, testUser.phone);

      await selectRadioOption(page, 'Flat');
      await clickContinue(page);

      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      await selectRadioOption(page, 'No'); // no RMC
      await clickContinue(page);

      await selectRadioOption(page, 'No'); // no RTM
      await clickContinue(page);

      // Single flat
      await fillNumberInput(page, 1);
      await clickContinue(page);

      await waitForOutcome(page);

      expect(await isErrorOutcome(page)).toBe(true);
      const outcomeTitle = await getOutcomeTitle(page);
      expect(outcomeTitle.toLowerCase()).toContain('2 flats');
    });

    test('should show ineligible message for too much commercial space', async ({ page }) => {
      const testUser = generateTestUser('E2E Commercial');

      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      await fillContactDetails(page, testUser.fullName, testUser.email, testUser.phone);

      await selectRadioOption(page, 'Flat');
      await clickContinue(page);

      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      await selectRadioOption(page, 'No'); // no RMC
      await clickContinue(page);

      await selectRadioOption(page, 'No'); // no RTM
      await clickContinue(page);

      await fillNumberInput(page, 10);
      await clickContinue(page);

      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      await selectRadioOption(page, 'No');
      await clickContinue(page);

      // Has non-residential space
      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      // More than 50% commercial
      await selectRadioOption(page, 'More than 50%');
      await clickContinue(page);

      await waitForOutcome(page);

      expect(await isErrorOutcome(page)).toBe(true);
      const outcomeTitle = await getOutcomeTitle(page);
      expect(outcomeTitle.toLowerCase()).toContain('50%');
    });
  });

  test.describe('Navigation', () => {
    test('should allow going back through questions', async ({ page }) => {
      const testUser = generateTestUser('E2E Navigation');

      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      // Fill first question
      await fillTextInput(page, testUser.fullName);
      await clickContinue(page);

      // Fill second question
      await fillTextInput(page, testUser.email);
      await clickContinue(page);

      // Now on phone question - go back
      await clickBack(page);

      // Should be back on email question
      await expectQuestionContains(page, 'email');

      // Go back again
      await clickBack(page);

      // Should be back on name question
      await expectQuestionContains(page, 'full name');
    });

    test('should allow restarting the wizard', async ({ page }) => {
      const testUser = generateTestUser('E2E Restart');

      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      // Complete several questions (phone is required by the wizard even though marked optional)
      await fillContactDetails(page, testUser.fullName, testUser.email, testUser.phone);
      
      await selectRadioOption(page, 'Flat');
      await clickContinue(page);

      await selectRadioOption(page, 'Yes');
      await clickContinue(page);

      await selectRadioOption(page, 'No'); // no RMC
      await clickContinue(page);

      await selectRadioOption(page, 'No'); // no RTM
      await clickContinue(page);

      await fillNumberInput(page, 5);
      await clickContinue(page);

      // Now restart by navigating back to eligibility check
      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      // Should be back at the first question
      await expectQuestionContains(page, 'full name');
      
      // Progress should be reset
      const progress = page.locator('text=Question 1');
      await expect(progress).toBeVisible();
    });

    test('back button should be disabled on first question', async ({ page }) => {
      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      // Back button should be disabled
      const backButton = page.getByRole('button', { name: /back/i });
      await expect(backButton).toBeDisabled();
    });
  });

  test.describe('Progress Tracking', () => {
    test('should show progress through the wizard', async ({ page }) => {
      const testUser = generateTestUser('E2E Progress');

      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      // Check initial state
      await expect(page.locator('text=Question 1')).toBeVisible();

      // Progress through questions
      await fillTextInput(page, testUser.fullName);
      await clickContinue(page);

      await expect(page.locator('text=Question 2')).toBeVisible();

      await fillTextInput(page, testUser.email);
      await clickContinue(page);

      await expect(page.locator('text=Question 3')).toBeVisible();
    });
  });

  test.describe('Validation', () => {
    test('continue button should be disabled without input', async ({ page }) => {
      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      // Continue button should be disabled initially
      const continueButton = page.getByRole('button', { name: /continue/i });
      await expect(continueButton).toBeDisabled();

      // Fill in input
      await fillTextInput(page, 'Test Name');

      // Now should be enabled
      await expect(continueButton).toBeEnabled();
    });

    test('should require valid email format', async ({ page }) => {
      await page.goto('/eligibility-check');
      await waitForWizardReady(page);

      // Fill name and continue
      await fillTextInput(page, 'Test User');
      await clickContinue(page);

      // Try invalid email
      const input = page.locator('input[type="email"]');
      await input.fill('invalid-email');

      // The input should have validation state
      // Note: Browser validation may prevent submission
      const continueButton = page.getByRole('button', { name: /continue/i });
      
      // Click and check if we're still on the email question
      await continueButton.click();
      
      // Should still be on email question if validation failed
      await expectQuestionContains(page, 'email');
    });
  });
});
