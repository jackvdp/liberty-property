import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Liberty Bell E2E tests
 * 
 * These tests run against the local dev server and interact with
 * the real dev database (Supabase).
 */
export default defineConfig({
  testDir: './tests/e2e',
  
  // Run tests sequentially to avoid database conflicts
  fullyParallel: false,
  
  // No retries - we want to see failures immediately
  retries: 0,
  
  // Single worker for database consistency
  workers: 1,
  
  // HTML reporter for easy viewing
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  
  // Global timeout for each test
  timeout: 60 * 1000,
  
  // Expect timeout
  expect: {
    timeout: 10 * 1000,
  },
  
  use: {
    // Base URL for all tests
    baseURL: 'http://localhost:3000',
    
    // Collect trace on first retry (helpful for debugging)
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure (useful for debugging wizard flows)
    video: 'on-first-retry',
    
    // Slow down actions slightly for stability
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to test on more browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'mobile',
    //   use: { ...devices['iPhone 13'] },
    // },
  ],
  
  // Start the dev server before running tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
