/**
 * Supabase Client Configuration
 * Provides different clients for different contexts
 */

import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { dbConfig } from '../config';

/**
 * Browser client for client-side operations
 * Uses anon key with RLS policies
 */
export function createSupabaseBrowser() {
  console.log(
      'Creating Supabase Admin Client with URL:',
      dbConfig.supabase.url,
      dbConfig.supabase.serviceRoleKey
  )
  return createBrowserClient(
    dbConfig.supabase.url,
    dbConfig.supabase.anonKey
  );
}

/**
 * Server client with service role for admin operations
 * Bypasses RLS - use with caution
 */
export function createSupabaseAdmin() {
  return createClient(
    dbConfig.supabase.url,
    dbConfig.supabase.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * Type-safe singleton for browser client
 */
let browserClient: ReturnType<typeof createSupabaseBrowser> | undefined;

export function getSupabaseBrowser() {
  if (!browserClient) {
    browserClient = createSupabaseBrowser();
  }
  return browserClient;
}
