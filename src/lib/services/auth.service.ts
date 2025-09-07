/**
 * Authentication Service
 * Handles user authentication and session management
 */

import { createSupabaseServer } from '@/lib/db/supabase/server';
import { userRepository } from '@/lib/db/repositories';
import type { User } from '@/lib/db/schema';

export class AuthService {
  /**
   * Sign up a new user
   */
  async signUp(email: string, password: string, fullName: string, mobileNumber?: string): Promise<User> {
    const supabase = await createSupabaseServer();
    
    // Create auth user with Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (authError) {
      throw new Error(`Authentication failed: ${authError.message}`);
    }
    
    if (!authData.user) {
      throw new Error('User creation failed');
    }
    
    // Create user in our database
    const user = await userRepository.create({
      id: authData.user.id,
      email: email.toLowerCase(),
      fullName,
      mobileNumber,
      role: 'leaseholder',
    });
    
    return user;
  }

  /**
   * Sign in a user
   */
  async signIn(email: string, password: string): Promise<User> {
    const supabase = await createSupabaseServer();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw new Error(`Sign in failed: ${error.message}`);
    }
    
    if (!data.user) {
      throw new Error('Sign in failed');
    }
    
    // Get user from our database
    const user = await userRepository.findById(data.user.id);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    const supabase = await createSupabaseServer();
    await supabase.auth.signOut();
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    const supabase = await createSupabaseServer();
    
    const { data: { user: authUser } } = await supabase.auth.getUser();
    
    if (!authUser) {
      return null;
    }
    
    return userRepository.findById(authUser.id);
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: Partial<Pick<User, 'fullName' | 'mobileNumber'>>): Promise<User> {
    return userRepository.update(userId, data);
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    const supabase = await createSupabaseServer();
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    });
    
    if (error) {
      throw new Error(`Password reset failed: ${error.message}`);
    }
  }

  /**
   * Update password
   */
  async updatePassword(newPassword: string): Promise<void> {
    const supabase = await createSupabaseServer();
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) {
      throw new Error(`Password update failed: ${error.message}`);
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
