/**
 * Base Repository
 * Abstract class for common database operations
 */

import { db } from '../drizzle';
import type { Database } from '../drizzle';

export abstract class BaseRepository {
  protected db: Database;

  constructor() {
    this.db = db;
  }

  /**
   * Handle database errors consistently
   */
  protected handleError(error: unknown, operation: string): never {
    console.error(`Database error in ${operation}:`, error);
    
    if (error instanceof Error) {
      throw new Error(`${operation} failed: ${error.message}`);
    }
    
    throw new Error(`${operation} failed: Unknown error`);
  }

  /**
   * Log operations for debugging
   */
  protected log(operation: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DB] ${operation}`, data ? JSON.stringify(data, null, 2) : '');
    }
  }
}
