/**
 * Supabase Server Configuration
 * For Next.js App Router server components and actions
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { dbConfig } from '../config';

/**
 * Server client for server components and actions
 * Handles cookie-based auth automatically
 */
export async function createSupabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    dbConfig.supabase.url,
    dbConfig.supabase.anonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie setting errors in server components
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookie removal errors
          }
        },
      },
    }
  );
}
