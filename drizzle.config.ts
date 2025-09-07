/**
 * Drizzle Configuration
 * Used for migrations and drizzle-kit CLI
 */

import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Determine which database URL to use
const getDatabaseUrl = () => {
  // For local development, use DEV_ prefixed variables
  if (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'development') {
    return process.env.DEV_POSTGRES_URL_POSTGRES_URL || 
           process.env.DEV_POSTGRES_URL_POSTGRES_PRISMA_URL;
  }
  // For production/preview
  return process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;
};

const databaseUrl = getDatabaseUrl();

if (!databaseUrl) {
  throw new Error('No database URL found. Please check your .env.local file.');
}

export default defineConfig({
  schema: './src/lib/db/schema/index.ts',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
  strict: true,
});
