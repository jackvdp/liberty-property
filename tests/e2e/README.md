# E2E Tests for Liberty Bell

## Overview

These end-to-end tests use [Playwright](https://playwright.dev/) to test the complete user journeys through the eligibility check and registration wizards. The tests interact with your **real dev database** when running against localhost.

## Prerequisites

1. Have the dev server running OR let Playwright start it automatically
2. Have your `.env.local` configured with dev database credentials
3. Have Playwright browsers installed: `npx playwright install`

## Running Tests

```bash
# Run all E2E tests (headless)
npm run test:e2e

# Run tests with UI mode (interactive, great for debugging)
npm run test:e2e:ui

# Run tests in headed mode (see the browser)
npm run test:e2e:headed

# Run tests in debug mode (step through)
npm run test:e2e:debug

# Run a specific test file
npm run test:e2e -- eligibility-wizard.spec.ts

# Run tests matching a pattern
npm run test:e2e -- -g "Qualifying Flat"
```

## Test Structure

```
tests/e2e/
├── README.md                      # This file
├── helpers/
│   ├── index.ts                   # Central exports
│   ├── test-data.ts               # Test data generators
│   ├── wizard-helpers.ts          # Wizard interaction utilities
│   └── db-cleanup.ts              # Database cleanup utilities
├── eligibility-wizard.spec.ts     # Eligibility wizard tests
└── registration-wizard.spec.ts    # Registration wizard tests (TODO)
```

## Test Scenarios

### Eligibility Wizard Tests

| Scenario | Description |
|----------|-------------|
| Qualifying Flat | Full success path for an eligible flat building |
| Leaseholder Engagement | Flat where support is uncertain, needs engagement |
| Existing RMC | Flat with existing RMC, directs to RMC process |
| Ineligible - House | House without RMC |
| Ineligible - Not Leasehold | Flat that isn't leasehold |
| Ineligible - Single Flat | Building with only 1 flat |
| Ineligible - Commercial | More than 50% commercial space |
| Navigation | Back button and restart functionality |
| Progress | Progress indicator updates |
| Validation | Input validation behavior |

## Database Considerations

### Test Data Isolation

Tests generate unique data using timestamps and random strings:
- Emails: `test-{timestamp}-{random}@test-liberty-bell.com`
- Phone numbers: Random UK mobile format
- User names: Include timestamps

This prevents conflicts between test runs.

### Cleanup

Currently, test data is **NOT automatically cleaned up**. Options:

1. **Manual cleanup**: Use Supabase dashboard to delete test records
2. **Filter by email domain**: Test emails use `@test-liberty-bell.com`
3. **Future**: Implement `/api/test-cleanup` endpoint for automated cleanup

### What Gets Created

When tests run, they create real records:
- `eligibility_checks` table entries
- `registrations` table entries (for registration tests)
- Supabase Auth users (for registration tests)

## Writing New Tests

### Helper Functions

Use the provided helpers for consistent interactions:

```typescript
import {
  generateTestUser,          // Generate unique test user data
  waitForWizardReady,         // Wait for wizard to load
  fillContactDetails,         // Fill name, email, phone
  selectRadioOption,          // Click a radio button by label
  fillNumberInput,            // Fill a number input
  clickContinue,              // Click Continue and wait
  waitForOutcome,             // Wait for completion screen
  isSuccessOutcome,           // Check if outcome is success
} from './helpers';
```

### Test Pattern

```typescript
test('should complete a specific flow', async ({ page }) => {
  // 1. Generate unique test data
  const testUser = generateTestUser('E2E TestName');

  // 2. Navigate to the wizard
  await page.goto('/eligibility-check');
  await waitForWizardReady(page);

  // 3. Fill out the wizard
  await fillContactDetails(page, testUser.fullName, testUser.email);
  await selectRadioOption(page, 'Flat');
  await clickContinue(page);
  // ... more steps

  // 4. Verify the outcome
  await waitForOutcome(page);
  expect(await isSuccessOutcome(page)).toBe(true);
});
```

## Debugging Tips

1. **Use UI mode**: `npm run test:e2e:ui` gives you a visual interface
2. **Use debug mode**: `npm run test:e2e:debug` lets you step through
3. **Screenshots**: Automatically captured on failure in `test-results/`
4. **Videos**: Captured on first retry for debugging
5. **Console logs**: Test records are logged for manual cleanup

## Configuration

See `playwright.config.ts` for settings:
- Timeout: 60s per test
- Workers: 1 (sequential for database consistency)
- Retries: 0 (see failures immediately)
- Web server: Auto-starts `npm run dev` if not running

## CI/CD Integration

For CI, you'll need to:
1. Set up environment variables for a test/staging database
2. Or mock the database layer
3. Consider using a separate Supabase project for testing

```yaml
# Example GitHub Actions step
- name: Run E2E tests
  run: npm run test:e2e
  env:
    DEV_POSTGRES_URL_SUPABASE_URL: ${{ secrets.TEST_SUPABASE_URL }}
    DEV_POSTGRES_URL_SUPABASE_ANON_KEY: ${{ secrets.TEST_SUPABASE_ANON_KEY }}
```
