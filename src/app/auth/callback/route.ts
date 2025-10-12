/**
 * Auth Callback Route
 * Handles magic link redirects from Supabase Auth
 */

import { createSupabaseServer } from '@/lib/db/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';
  
  console.log('Auth callback triggered with code:', code ? 'present' : 'missing');

  if (code) {
    try {
      const supabase = await createSupabaseServer();
      
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('Error exchanging code for session:', error);
        
        // Redirect to login with error
        return NextResponse.redirect(
          new URL(`/login?error=${encodeURIComponent('Invalid or expired magic link. Please try again.')}`, requestUrl.origin)
        );
      }

      if (data.session) {
        console.log('Session created successfully for user:', data.user?.email);
        
        // Successfully authenticated - redirect to intended destination
        // For now, redirect to home page (will be dashboard once it exists)
        return NextResponse.redirect(new URL(next, requestUrl.origin));
      }
    } catch (error) {
      console.error('Unexpected error in auth callback:', error);
      
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent('An error occurred. Please try again.')}`, requestUrl.origin)
      );
    }
  }

  // No code present - invalid callback
  console.warn('Auth callback called without code parameter');
  
  return NextResponse.redirect(
    new URL('/login?error=Invalid authentication link', requestUrl.origin)
  );
}