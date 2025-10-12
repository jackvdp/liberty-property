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

export interface CurrentUser {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  isAdmin: boolean;
}

/**
 * Gets the current authenticated user from the server
 * This reads the session cookie set by the magic link
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const { createSupabaseServer } = await import('@/lib/db/supabase/server');
    const supabase = await createSupabaseServer();
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }
    
    return {
      id: user.id,
      email: user.email || '',
      fullName: user.user_metadata?.full_name,
      phone: user.user_metadata?.phone,
      isAdmin: user.user_metadata?.is_admin === true,
    };
    
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Signs out the current user
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    const { createSupabaseServer } = await import('@/lib/db/supabase/server');
    const supabase = await createSupabaseServer();
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Error signing out:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sign out'
    };
  }
}

/**
 * Checks if the current user is an admin
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return user?.isAdmin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Sets admin status for a user (use with caution - should be protected)
 * This is for initial admin setup only
 */
export async function setUserAdminStatus(
  userId: string,
  isAdmin: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabaseAdmin = createSupabaseAdmin();
    
    // Get current user metadata
    const { data: userData, error: getUserError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (getUserError || !userData.user) {
      throw new Error('User not found');
    }
    
    // Update user metadata with admin flag
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...userData.user.user_metadata,
        is_admin: isAdmin
      }
    });
    
    if (error) {
      throw error;
    }
    
    console.log(`Successfully set admin status to ${isAdmin} for user:`, userId);
    
    return { success: true };
    
  } catch (error) {
    console.error('Error setting admin status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to set admin status'
    };
  }
}