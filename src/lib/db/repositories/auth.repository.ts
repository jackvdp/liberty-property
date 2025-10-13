/**
 * Auth Repository
 * Handles all Supabase Auth operations
 */

import { createSupabaseAdmin } from '@/lib/db/supabase/client';
import type { User } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  emailConfirmedAt: Date | null;
  createdAt: Date;
  lastSignInAt: Date | null;
  userMetadata: {
    full_name?: string;
    phone?: string;
    is_admin?: boolean;
    [key: string]: any;
  };
}

export class AuthRepository {
  /**
   * Transform Supabase User to our AuthUser type
   */
  private static transformUser(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email || '',
      emailConfirmedAt: user.email_confirmed_at ? new Date(user.email_confirmed_at) : null,
      createdAt: new Date(user.created_at),
      lastSignInAt: user.last_sign_in_at ? new Date(user.last_sign_in_at) : null,
      userMetadata: user.user_metadata || {},
    };
  }

  /**
   * Get all users from Supabase Auth
   */
  static async getAllAuthUsers(): Promise<AuthUser[]> {
    const supabaseAdmin = createSupabaseAdmin();

    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000, // Adjust if you have more users
    });

    if (error) {
      throw new Error(`Failed to fetch auth users: ${error.message}`);
    }

    return data.users.map(this.transformUser);
  }

  /**
   * Get a single user by ID from Supabase Auth
   */
  static async getAuthUserById(userId: string): Promise<AuthUser | null> {
    const supabaseAdmin = createSupabaseAdmin();

    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (error || !data.user) {
      return null;
    }

    return this.transformUser(data.user);
  }

  /**
   * Update user metadata
   */
  static async updateUserMetadata(
    userId: string,
    metadata: Record<string, any>
  ): Promise<AuthUser | null> {
    const supabaseAdmin = createSupabaseAdmin();

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: metadata,
    });

    if (error || !data.user) {
      return null;
    }

    return this.transformUser(data.user);
  }

  /**
   * Delete a user from Supabase Auth
   */
  static async deleteAuthUser(userId: string): Promise<boolean> {
    const supabaseAdmin = createSupabaseAdmin();

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    return !error;
  }
}
