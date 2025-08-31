import { 
  IStorageService, 
  StorageKeyPrefix, 
  StoredQuestionnaireData 
} from './types';

/**
 * Generic storage service for managing questionnaire data in localStorage
 * @template T The type of data being stored, must extend StoredQuestionnaireData
 */
export class StorageService<T extends StoredQuestionnaireData> implements IStorageService<T> {
  private readonly keyPrefix: StorageKeyPrefix;

  constructor(keyPrefix: StorageKeyPrefix) {
    this.keyPrefix = keyPrefix;
  }

  /**
   * Generate a storage key for a given UUID
   */
  private getKey(uuid: string): string {
    return `${this.keyPrefix}-${uuid}`;
  }

  /**
   * Generate a new UUID v4
   */
  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Check if we're in a browser environment
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  /**
   * Save data to localStorage
   * @returns The UUID of the saved data
   */
  save(data: Omit<T, 'uuid' | 'timestamp'> & Partial<Pick<T, 'uuid' | 'timestamp'>>): string {
    if (!this.isBrowser()) {
      console.warn('StorageService: localStorage is not available');
      return '';
    }

    const uuid = data.uuid || this.generateUuid();
    const timestamp = data.timestamp || new Date().toISOString();
    
    const dataToStore: T = {
      ...data,
      uuid,
      timestamp
    } as T;

    try {
      const key = this.getKey(uuid);
      localStorage.setItem(key, JSON.stringify(dataToStore));
      console.log(`StorageService: Saved data with key ${key}`);
      return uuid;
    } catch (error) {
      console.error('StorageService: Failed to save data', error);
      throw new Error(`Failed to save data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get data from localStorage by UUID
   */
  get(uuid: string): T | null {
    if (!this.isBrowser()) {
      console.warn('StorageService: localStorage is not available');
      return null;
    }

    try {
      const key = this.getKey(uuid);
      const stored = localStorage.getItem(key);
      
      if (!stored) {
        console.log(`StorageService: No data found for key ${key}`);
        return null;
      }

      const parsed = JSON.parse(stored) as T;
      console.log(`StorageService: Retrieved data for key ${key}`);
      return parsed;
    } catch (error) {
      console.error('StorageService: Failed to get data', error);
      return null;
    }
  }

  /**
   * Update existing data in localStorage
   */
  update(uuid: string, data: Partial<T>): boolean {
    if (!this.isBrowser()) {
      console.warn('StorageService: localStorage is not available');
      return false;
    }

    try {
      const existing = this.get(uuid);
      if (!existing) {
        console.warn(`StorageService: Cannot update - no data found for UUID ${uuid}`);
        return false;
      }

      const updated: T = {
        ...existing,
        ...data,
        uuid, // Ensure UUID doesn't change
        timestamp: existing.timestamp // Preserve original timestamp
      } as T;

      const key = this.getKey(uuid);
      localStorage.setItem(key, JSON.stringify(updated));
      console.log(`StorageService: Updated data for key ${key}`);
      return true;
    } catch (error) {
      console.error('StorageService: Failed to update data', error);
      return false;
    }
  }

  /**
   * Delete data from localStorage
   */
  delete(uuid: string): boolean {
    if (!this.isBrowser()) {
      console.warn('StorageService: localStorage is not available');
      return false;
    }

    try {
      const key = this.getKey(uuid);
      localStorage.removeItem(key);
      console.log(`StorageService: Deleted data for key ${key}`);
      return true;
    } catch (error) {
      console.error('StorageService: Failed to delete data', error);
      return false;
    }
  }

  /**
   * List all UUIDs for this key prefix
   */
  list(): string[] {
    if (!this.isBrowser()) {
      console.warn('StorageService: localStorage is not available');
      return [];
    }

    try {
      const uuids: string[] = [];
      const prefix = `${this.keyPrefix}-`;
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(prefix)) {
          const uuid = key.replace(prefix, '');
          uuids.push(uuid);
        }
      }
      
      console.log(`StorageService: Found ${uuids.length} items with prefix ${this.keyPrefix}`);
      return uuids;
    } catch (error) {
      console.error('StorageService: Failed to list items', error);
      return [];
    }
  }

  /**
   * Clear all data for this key prefix
   */
  clear(): void {
    if (!this.isBrowser()) {
      console.warn('StorageService: localStorage is not available');
      return;
    }

    try {
      const uuids = this.list();
      uuids.forEach(uuid => this.delete(uuid));
      console.log(`StorageService: Cleared ${uuids.length} items with prefix ${this.keyPrefix}`);
    } catch (error) {
      console.error('StorageService: Failed to clear data', error);
    }
  }

  /**
   * Check if data exists for a given UUID
   */
  exists(uuid: string): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    const key = this.getKey(uuid);
    return localStorage.getItem(key) !== null;
  }

  /**
   * Get the total size of stored data for this prefix (in bytes)
   */
  getStorageSize(): number {
    if (!this.isBrowser()) {
      return 0;
    }

    try {
      let totalSize = 0;
      const uuids = this.list();
      
      uuids.forEach(uuid => {
        const key = this.getKey(uuid);
        const data = localStorage.getItem(key);
        if (data) {
          // Rough estimate: each character is 2 bytes in JavaScript strings
          totalSize += data.length * 2;
        }
      });
      
      return totalSize;
    } catch (error) {
      console.error('StorageService: Failed to calculate storage size', error);
      return 0;
    }
  }

  /**
   * Export all data as JSON
   */
  exportAll(): T[] {
    if (!this.isBrowser()) {
      return [];
    }

    const uuids = this.list();
    const allData: T[] = [];
    
    uuids.forEach(uuid => {
      const data = this.get(uuid);
      if (data) {
        allData.push(data);
      }
    });
    
    return allData;
  }

  /**
   * Import data from JSON
   */
  importData(data: T[]): string[] {
    if (!this.isBrowser()) {
      return [];
    }

    const savedUuids: string[] = [];
    
    data.forEach(item => {
      try {
        const uuid = this.save(item);
        savedUuids.push(uuid);
      } catch (error) {
        console.error('StorageService: Failed to import item', error);
      }
    });
    
    return savedUuids;
  }
}

// Factory functions for creating typed storage services
export const createEligibilityStorageService = () => {
  return new StorageService(StorageKeyPrefix.ELIGIBILITY);
};

export const createRegistrationStorageService = () => {
  return new StorageService(StorageKeyPrefix.REGISTRATION);
};

export const createDraftStorageService = () => {
  return new StorageService(StorageKeyPrefix.DRAFT);
};
