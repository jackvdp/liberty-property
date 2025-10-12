/**
 * Authentication Server Actions
 * Server-side functions for managing user accounts
 */

'use server';

import { createSupabaseAdmin } from '@/lib/db/supabase/client';

export interface CreateUserResult {
  success: boolean;
  userId?: string;
  error?: string;
  userAlreadyExists?: boolean;
}

export interface UserMetadata {
  registration_id?: string;
  eligibility_id?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Creates a Supabase Auth user account after registration
 * This happens silently in the background without blocking the registration flow
 */
export async function createUserAccount(
  email: string,
  fullName: string,
  phone?: string,
  metadata?: UserMetadata
): Promise<CreateUserResult> {
  try {
    const supabaseAdmin = createSupabaseAdmin();
    
    // Try to create the user directly - if they exist, it will error
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true, // Auto-confirm email since we verified it during registration
      user_metadata: {
        full_name: fullName,
        phone,
        source: 'registration',
        created_via: 'liberty-bell-registration',
        ...metadata
      }
    });

    if (error) {
      // Check if error is because user already exists
      if (error.message?.includes('already been registered') || 
          error.message?.includes('already exists') ||
          error.message?.includes('duplicate key value') ||
          error.code === 'email_exists' ||
          error.code === 'user_already_exists') {
        console.log('User already exists for email:', email);
        
        // We can't easily get the existing user ID without searching all users
        // But that's OK - the user exists, which is what matters
        return {
          success: true,
          userId: undefined, // We don't have the ID but user exists
          userAlreadyExists: true
        };
      }
      
      // Some other error occurred
      throw error;
    }

    console.log('Successfully created user account for:', email);
    
    return {
      success: true,
      userId: data.user?.id,
      userAlreadyExists: false
    };
    
  } catch (error) {
    console.error('Error creating user account:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user account'
    };
  }
}

/**
 * Checks if a user exists with the given email
 * Note: This requires listing all users, so use sparingly
 */
export async function checkUserExists(email: string): Promise<boolean> {
  try {
    const supabaseAdmin = createSupabaseAdmin();
    
    // listUsers returns paginated results, need to search through them
    // For now, just check the first page - in production you might want to paginate
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000 // Max allowed per page
    });
    
    if (error) {
      console.error('Error listing users:', error);
      return false;
    }
    
    // Check if email exists in this batch
    const userExists = data.users.some(user => user.email === email);
    return userExists;
    
  } catch (error) {
    console.error('Error checking user existence:', error);
    return false;
  }
}

export interface SignInWithMagicLinkResult {
  success: boolean;
  error?: string;
}

/**
 * Send a magic link to the user's email for passwordless sign in
 * Uses Supabase Auth's signInWithOtp method
 * 
 * The magic link will redirect to /auth/callback after clicking
 * The email template should contain {{ .ConfirmationURL }} to send a magic link
 * (or {{ .Token }} if you want to send an OTP instead)
 */
export async function signInWithMagicLink(email: string): Promise<SignInWithMagicLinkResult> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address'
      };
    }

    // Use admin client to send magic link
    const supabaseAdmin = createSupabaseAdmin();
    
    const { error } = await supabaseAdmin.auth.signInWithOtp({
      email: email,
      options: {
        // Don't create a new user if they don't exist
        // Only allow sign in for existing users (who registered first)
        shouldCreateUser: false,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      }
    });

    if (error) {
      console.error('Magic link send error:', error);
      
      // Handle specific error cases
      if (
          error.message?.includes('User not found') ||
          error.message?.includes('Invalid login credentials') ||
          error.message?.includes('Signups not allowed for otp')
      ) {
        return {
          success: false,
          error: 'No account found with this email. Please register first.'
        };
      }
      
      if (error.message?.includes('rate limit')) {
        return {
          success: false,
          error: 'Too many requests. Please wait a moment and try again.'
        };
      }
      
      // Generic error
      return {
        success: false,
        error: 'Unable to send magic link. Please try again. ' + (error.message || '')
      };
    }
    
    return {
      success: true
    };
    
  } catch (error) {
    console.error('Unexpected error sending magic link:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send magic link'
    };
  }
}
