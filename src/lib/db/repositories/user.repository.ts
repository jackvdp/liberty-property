/**
 * User Repository
 * Handles all user-related database operations
 */

import { eq } from 'drizzle-orm';
import { BaseRepository } from './base.repository';
import { users, type User, type NewUser } from '../schema';

export class UserRepository extends BaseRepository {
  /**
   * Create a new user
   */
  async create(data: NewUser): Promise<User> {
    try {
      this.log('Creating user', data);
      
      const [user] = await this.db
        .insert(users)
        .values(data)
        .returning();
      
      return user;
    } catch (error) {
      this.handleError(error, 'UserRepository.create');
    }
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.db.query.users.findFirst({
        where: eq(users.id, id),
      });
      
      return user || null;
    } catch (error) {
      this.handleError(error, 'UserRepository.findById');
    }
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.db.query.users.findFirst({
        where: eq(users.email, email.toLowerCase()),
      });
      
      return user || null;
    } catch (error) {
      this.handleError(error, 'UserRepository.findByEmail');
    }
  }

  /**
   * Update user
   */
  async update(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    try {
      this.log('Updating user', { id, data });
      
      const [user] = await this.db
        .update(users)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(users.id, id))
        .returning();
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      this.handleError(error, 'UserRepository.update');
    }
  }

  /**
   * Delete user
   */
  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.db
        .delete(users)
        .where(eq(users.id, id));
      
      return true;
    } catch (error) {
      this.handleError(error, 'UserRepository.delete');
    }
  }
}

// Export singleton instance
export const userRepository = new UserRepository();
