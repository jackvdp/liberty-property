/**
 * Drizzle ORM Database Connection
 * Provides typed database client
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { dbConfig } from './config';

// Create postgres connection
const connectionString = dbConfig.database.url;

if (!connectionString) {
  throw new Error('Database URL not configured. Please check your environment variables.');
}

// For migrations and one-time scripts
const migrationClient = postgres(connectionString, { max: 1 });

// For query purposes
const queryClient = postgres(connectionString);

// Create drizzle instance with schema
export const db = drizzle(queryClient, { schema });

// Export for migrations
export const migrationDb = drizzle(migrationClient, { schema });

// Export schema for use in other files
export { schema };

// Export types
export type Database = typeof db;
