/**
 * Wizard Interaction Helpers
 * 
 * Reusable functions for interacting with questionnaire wizards
 * in Playwright tests.
 */

import { Page, expect } from '@playwright/test';

/**
 * Waits for the wizard to be ready and visible
 */
export async function waitForWizardReady(page: Page): Promise<void> {
  // Wait for the questionnaire card to be visible (the one with the form)
  await expect(page.locator('[data-slot="card"]')).toBeVisible();
  
  // Wait for any loading spinners to disappear
  const spinner = page.locator('text=Loading');
  if (await spinner.isVisible({ timeout: 1000 }).catch(() => false)) {
    await expect(spinner).not.toBeVisible({ timeout: 10000 });
  }
}

/**
 * Clicks the Continue button and waits for the next question
 */
export async function clickContinue(page: Page): Promise<void> {
  const continueButton = page.getByRole('button', { name: /continue/i });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();
  
  // Wait for animation to complete
  await page.waitForTimeout(400);
}

/**
 * Clicks the Back button
 */
export async function clickBack(page: Page): Promise<void> {
  const backButton = page.getByRole('button', { name: /back/i });
  await expect(backButton).toBeEnabled();
  await backButton.click();
  
  // Wait for animation to complete
  await page.waitForTimeout(400);
}

/**
 * Selects a radio option by its label text
 */
export async function selectRadioOption(page: Page, labelText: string): Promise<void> {
  // Find the radio button label with exact text match
  // Use getByText with exact: true for precise matching
  const label = page.getByText(labelText, { exact: true });
  await expect(label).toBeVisible();
  await label.click();
  
  // Wait for selection to register
  await page.waitForTimeout(100);
}

/**
 * Fills a text input field
 * Looks for the input within the current question context
 */
export async function fillTextInput(page: Page, value: string): Promise<void> {
  // Find the visible input field (text, email, tel, or number)
  const input = page.locator('input[type="text"], input[type="email"], input[type="tel"], input[type="number"]').first();
  await expect(input).toBeVisible();
  await input.fill(value);
  
  // Wait for value to register
  await page.waitForTimeout(100);
}

/**
 * Fills a number input field
 */
export async function fillNumberInput(page: Page, value: number): Promise<void> {
  const input = page.locator('input[type="number"]');
  await expect(input).toBeVisible();
  await input.fill(value.toString());
  
  // Wait for value to register
  await page.waitForTimeout(100);
}

/**
 * Gets the current question text
 */
export async function getCurrentQuestionText(page: Page): Promise<string> {
  const questionLabel = page.locator('label').first();
  return await questionLabel.textContent() || '';
}

/**
 * Verifies we're on a specific question by checking for text in the label
 */
export async function expectQuestionContains(page: Page, text: string): Promise<void> {
  // Look for the text in the main label element
  await expect(page.locator('label').filter({ hasText: new RegExp(text, 'i') }).first()).toBeVisible();
}

/**
 * Waits for the outcome/completion screen
 */
export async function waitForOutcome(page: Page): Promise<void> {
  await expect(page.locator('text=Assessment Complete')).toBeVisible({ timeout: 15000 });
}

/**
 * Gets the outcome title text
 */
export async function getOutcomeTitle(page: Page): Promise<string> {
  // Use data-slot="alert" to be more specific and avoid Next.js route announcer
  const alert = page.locator('[data-slot="alert"]');
  await expect(alert).toBeVisible();
  const title = alert.locator('h5, [data-slot="alert-title"]').first();
  return await title.textContent() || '';
}

/**
 * Gets the outcome message text
 */
export async function getOutcomeMessage(page: Page): Promise<string> {
  const alert = page.locator('[data-slot="alert"]');
  await expect(alert).toBeVisible();
  const message = alert.locator('[data-slot="alert-description"]').first();
  return await message.textContent() || '';
}

/**
 * Checks if the outcome is a success type
 */
export async function isSuccessOutcome(page: Page): Promise<boolean> {
  const alert = page.locator('[data-slot="alert"]');
  const className = await alert.getAttribute('class');
  // Success outcomes have liberty-primary colors (not red/destructive)
  return (className?.includes('liberty-primary') ?? false) && !className?.includes('red-')
}

/**
 * Checks if the outcome is an error type
 */
export async function isErrorOutcome(page: Page): Promise<boolean> {
  const alert = page.locator('[data-slot="alert"]');
  const className = await alert.getAttribute('class');
  // Error/destructive outcomes have red classes like text-red-700, bg-red-50
  return className?.includes('red-') || false;
}

/**
 * Gets the case ID from the completion screen
 */
export async function getCaseId(page: Page): Promise<string | null> {
  // Wait for case creation to complete
  await page.waitForTimeout(2000);
  
  // Look for the case ID in the completion content
  const caseIdElement = page.locator('code').first();
  if (await caseIdElement.isVisible({ timeout: 5000 }).catch(() => false)) {
    const text = await caseIdElement.textContent();
    // Check if it looks like a UUID
    if (text && text.match(/^[a-f0-9-]{36}$/i)) {
      return text;
    }
  }
  
  return null;
}

/**
 * Clicks the primary action button on the outcome screen
 */
export async function clickOutcomeButton(page: Page, buttonText?: string): Promise<void> {
  if (buttonText) {
    await page.getByRole('button', { name: buttonText }).click();
  } else {
    // Click the primary (non-outline) button
    const primaryButton = page.locator('button.bg-liberty-primary');
    await primaryButton.click();
  }
  
  // Wait for navigation
  await page.waitForTimeout(500);
}

/**
 * Completes the contact details section (first 3 questions)
 */
export async function fillContactDetails(
  page: Page, 
  fullName: string, 
  email: string, 
  phone?: string
): Promise<void> {
  // Question 1: Full name
  await expectQuestionContains(page, 'full name');
  await fillTextInput(page, fullName);
  await clickContinue(page);
  
  // Question 2: Email
  await expectQuestionContains(page, 'email');
  await fillTextInput(page, email);
  await clickContinue(page);
  
  // Question 3: Phone (optional)
  await expectQuestionContains(page, 'mobile');
  if (phone) {
    await fillTextInput(page, phone);
  }
  await clickContinue(page);
}

/**
 * Answers a question and continues
 */
export async function answerAndContinue(
  page: Page, 
  answer: string | number
): Promise<void> {
  if (typeof answer === 'number') {
    await fillNumberInput(page, answer);
  } else {
    // Try radio first, then text input
    const radioLabel = page.locator(`label:has-text("${answer}")`);
    if (await radioLabel.isVisible({ timeout: 1000 }).catch(() => false)) {
      await selectRadioOption(page, answer);
    } else {
      await fillTextInput(page, answer);
    }
  }
  await clickContinue(page);
}

/**
 * Checks a checkbox by its label text
 */
export async function checkCheckbox(page: Page, labelText: string): Promise<void> {
  const label = page.getByText(labelText, { exact: false });
  await expect(label).toBeVisible();
  await label.click();
  
  // Wait for checkbox state to register
  await page.waitForTimeout(100);
}
