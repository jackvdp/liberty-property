import { useState, useCallback, useEffect } from 'react';
import { StorageService } from './storage-service';
import { 
  QuestionnaireDataManager, 
  StoredQuestionnaireData,
  StorageKeyPrefix,
  StoredEligibilityData,
  StoredRegistrationData
} from './types';

/**
 * Custom hook for managing questionnaire data in localStorage
 * @template T The type of data being stored
 * @param storagePrefix The storage key prefix to use
 * @param initialUuid Optional UUID to load data on mount
 */
export function useQuestionnaireStorage<T extends StoredQuestionnaireData>(
  storagePrefix: StorageKeyPrefix,
  initialUuid?: string
): QuestionnaireDataManager<T> {
  const [storage] = useState(() => new StorageService<T>(storagePrefix));
  const [data, setData] = useState<T | null>(null);
  const [uuid, setUuid] = useState<string | null>(initialUuid || null);

  // Load initial data if UUID provided
  useEffect(() => {
    if (initialUuid) {
      const loaded = storage.get(initialUuid);
      if (loaded) {
        setData(loaded);
        setUuid(initialUuid);
        console.log(`useQuestionnaireStorage: Loaded initial data for UUID ${initialUuid}`);
      } else {
        console.warn(`useQuestionnaireStorage: No data found for initial UUID ${initialUuid}`);
      }
    }
  }, [initialUuid, storage]);

  /**
   * Save new data to storage
   */
  const save = useCallback((dataToSave: Omit<T, 'uuid' | 'timestamp'> & Partial<Pick<T, 'uuid' | 'timestamp'>>): string => {
    try {
      const savedUuid = storage.save(dataToSave);
      const savedData = storage.get(savedUuid);
      
      if (savedData) {
        setData(savedData);
        setUuid(savedUuid);
      }
      
      console.log(`useQuestionnaireStorage: Saved data with UUID ${savedUuid}`);
      return savedUuid;
    } catch (error) {
      console.error('useQuestionnaireStorage: Failed to save data', error);
      throw error;
    }
  }, [storage]);

  /**
   * Load data from storage by UUID
   */
  const load = useCallback((loadUuid: string): T | null => {
    try {
      const loaded = storage.get(loadUuid);
      
      if (loaded) {
        setData(loaded);
        setUuid(loadUuid);
        console.log(`useQuestionnaireStorage: Loaded data for UUID ${loadUuid}`);
      } else {
        console.warn(`useQuestionnaireStorage: No data found for UUID ${loadUuid}`);
      }
      
      return loaded;
    } catch (error) {
      console.error('useQuestionnaireStorage: Failed to load data', error);
      return null;
    }
  }, [storage]);

  /**
   * Update existing data
   */
  const update = useCallback((updates: Partial<T>): boolean => {
    if (!uuid) {
      console.warn('useQuestionnaireStorage: Cannot update - no UUID set');
      return false;
    }

    try {
      const success = storage.update(uuid, updates);
      
      if (success) {
        const updated = storage.get(uuid);
        if (updated) {
          setData(updated);
        }
        console.log(`useQuestionnaireStorage: Updated data for UUID ${uuid}`);
      }
      
      return success;
    } catch (error) {
      console.error('useQuestionnaireStorage: Failed to update data', error);
      return false;
    }
  }, [uuid, storage]);

  /**
   * Clear current data from state (doesn't delete from storage)
   */
  const clear = useCallback(() => {
    setData(null);
    setUuid(null);
    console.log('useQuestionnaireStorage: Cleared current data from state');
  }, []);

  /**
   * Check if data exists for a given UUID
   */
  const exists = useCallback((checkUuid: string): boolean => {
    return storage.exists(checkUuid);
  }, [storage]);

  /**
   * List all saved UUIDs for this storage prefix
   */
  const listSaved = useCallback((): string[] => {
    return storage.list();
  }, [storage]);

  return {
    data,
    uuid,
    save,
    load,
    update,
    clear,
    exists,
    listSaved
  };
}

/**
 * Hook specifically for eligibility data
 */
export function useEligibilityStorage(initialUuid?: string) {
  return useQuestionnaireStorage<StoredEligibilityData>(StorageKeyPrefix.ELIGIBILITY, initialUuid);
}

/**
 * Hook specifically for registration data
 */
export function useRegistrationStorage(initialUuid?: string) {
  return useQuestionnaireStorage<StoredRegistrationData>(StorageKeyPrefix.REGISTRATION, initialUuid);
}

/**
 * Hook specifically for draft data
 */
export function useDraftStorage(initialUuid?: string) {
  return useQuestionnaireStorage<StoredQuestionnaireData>(StorageKeyPrefix.DRAFT, initialUuid);
}
