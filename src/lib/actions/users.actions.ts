/**
 * Users Server Actions
 * Server-side functions for managing users (admin only)
 */

'use server';

import { AuthRepository } from '@/lib/db/repositories/auth.repository';
import { RegistrationRepository } from '@/lib/db/repositories/registration.repository';
import type { Registration } from '@/lib/db/schema';

export interface AdminUserData {
  id: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  isAdmin: boolean;
  emailConfirmedAt: Date | null;
  createdAt: Date;
  lastSignInAt: Date | null;
  // Registration data (nullable - not all users have registrations)
  registration: Registration | null;
}

/**
 * Get all users with their registration data (admin only)
 */
export async function getAllUsers(): Promise<{
  success: boolean;
  users?: AdminUserData[];
  error?: string;
}> {
  try {
    // Get all auth users via repository
    const authUsers = await AuthRepository.getAllAuthUsers();

    // Get all registrations via repository
    const allRegistrations = await RegistrationRepository.getAllRegistrations(1000);

    // Create a map of registrations by user_id for quick lookup
    const registrationMap = new Map(
      allRegistrations.map(reg => [reg.userId, reg])
    );

    // Combine auth users with registration data
    const users: AdminUserData[] = authUsers.map(authUser => {
      const registration = registrationMap.get(authUser.id) || null;

      return {
        id: authUser.id,
        email: authUser.email,
        fullName: authUser.userMetadata.full_name || null,
        phone: authUser.userMetadata.phone || null,
        isAdmin: authUser.userMetadata.is_admin === true,
        emailConfirmedAt: authUser.emailConfirmedAt,
        createdAt: authUser.createdAt,
        lastSignInAt: authUser.lastSignInAt,
        registration,
      };
    });

    // Sort by creation date (newest first)
    users.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return {
      success: true,
      users,
    };
  } catch (error) {
    console.error('Error fetching all users:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch users',
    };
  }
}

/**
 * Get a single user by ID with registration data (admin only)
 */
export async function getUserById(userId: string): Promise<{
  success: boolean;
  user?: AdminUserData;
  error?: string;
}> {
  try {
    // Get auth user via repository
    const authUser = await AuthRepository.getAuthUserById(userId);

    if (!authUser) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    // Get registration data via repository
    const registration = await RegistrationRepository.getRegistrationByUserId(userId);

    const adminUser: AdminUserData = {
      id: authUser.id,
      email: authUser.email,
      fullName: authUser.userMetadata.full_name || null,
      phone: authUser.userMetadata.phone || null,
      isAdmin: authUser.userMetadata.is_admin === true,
      emailConfirmedAt: authUser.emailConfirmedAt,
      createdAt: authUser.createdAt,
      lastSignInAt: authUser.lastSignInAt,
      registration,
    };

    return {
      success: true,
      user: adminUser,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch user',
    };
  }
}
