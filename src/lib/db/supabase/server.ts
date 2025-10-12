/**
 * Supabase Server Client
 * For server-side operations that need to handle cookies/sessions
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { dbConfig } from '../config';

/**
 * Creates a Supabase client for Server Components and Route Handlers
 * Handles cookie-based sessions for authenticated users
 */
export async function createSupabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    dbConfig.supabase.url,
    dbConfig.supabase.anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            console.error('Error setting cookies:', error);
          }
        },
      },
    }
  );
}
