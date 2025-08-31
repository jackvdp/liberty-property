/**
 * Example usage of the questionnaire storage system
 * This file demonstrates common patterns for using the storage service and hooks
 */

import { 
  useEligibilityStorage, 
  useRegistrationStorage,
  EligibilityStorageHelper,
  StorageService,
  StorageKeyPrefix
} from './index';

// ==============================================
// Example 1: Basic Usage in a Component
// ==============================================
export function ExampleComponent() {
  const storage = useEligibilityStorage();
  
  // Save data when questionnaire completes
  const handleQuestionnaireComplete = (answers: any[], outcome: any) => {
    const uuid = storage.save({
      answers,
      outcome,
      derivedData: {
        // Your computed data here
        flatCount: 10,
        propertyType: 'flat'
      }
    });
    
    console.log('Saved with UUID:', uuid);
    
    // Generate shareable URL
    const url = EligibilityStorageHelper.getRegistrationUrl(uuid);
    console.log('Share this URL:', url);
  };
  
  // Load existing data
  const handleLoadData = (uuid: string) => {
    const data = storage.load(uuid);
    if (data) {
      console.log('Loaded data:', data);
      
      // Get a summary
      const summary = EligibilityStorageHelper.getSummary(data);
      console.log('Summary:', summary);
    }
  };
  
  // Update existing data
  const handleUpdateData = () => {
    if (storage.uuid) {
      storage.update({
        derivedData: {
          // Updated computed data
          leaseholderSupport: 'yes'
        }
      });
    }
  };
  
  // List all saved questionnaires
  const handleListAll = () => {
    const allUuids = storage.listSaved();
    console.log('All saved UUIDs:', allUuids);
  };
  
  return null; // Your component JSX
}

// ==============================================
// Example 2: Direct Service Usage (Non-React)
// ==============================================
export function directServiceExample() {
  // Create a service instance
  const service = new StorageService(StorageKeyPrefix.ELIGIBILITY);
  
  // Save data
  const uuid = service.save({
    uuid: '', // Will be auto-generated
    timestamp: '', // Will be auto-generated
    answers: [
      { questionId: 'property_type', value: 'flat' },
      { questionId: 'flat_count', value: 10 }
    ],
    outcome: {
      type: 'success',
      title: 'Eligible',
      message: 'Your building qualifies',
      color: 'green'
    }
  });
  
  // Get data
  const data = service.get(uuid);
  console.log('Retrieved data:', data);
  
  // Check if exists
  if (service.exists(uuid)) {
    console.log('Data exists for UUID:', uuid);
  }
  
  // Update data
  service.update(uuid, {
    outcome: {
      type: 'success',
      title: 'Updated Title',
      message: 'Updated message',
      color: 'blue'
    }
  });
  
  // List all
  const allUuids = service.list();
  console.log('All UUIDs:', allUuids);
  
  // Export all data (for backup)
  const allData = service.exportAll();
  const backup = JSON.stringify(allData);
  console.log('Backup data:', backup);
  
  // Import data (from backup)
  const dataToImport = JSON.parse(backup);
  const importedUuids = service.importData(dataToImport);
  console.log('Imported UUIDs:', importedUuids);
  
  // Get storage size
  const sizeInBytes = service.getStorageSize();
  console.log('Storage size:', sizeInBytes, 'bytes');
  
  // Delete specific data
  service.delete(uuid);
  
  // Clear all data for this prefix
  service.clear();
}

// ==============================================
// Example 3: Registration Flow with Eligibility
// ==============================================
export function RegistrationFlowExample({ eligibilityId }: { eligibilityId?: string }) {
  const eligibilityStorage = useEligibilityStorage(eligibilityId);
  const registrationStorage = useRegistrationStorage();
  
  // Load eligibility data if ID provided
  if (eligibilityId && eligibilityStorage.data) {
    const eligData = EligibilityStorageHelper.toEligibilityData(eligibilityStorage.data);
    console.log('Eligibility data loaded:', eligData);
    
    // Use eligibility data to prefill registration
    const prefillData = {
      flatCount: eligData.derivedData?.flatCount,
      propertyType: eligData.derivedData?.propertyType
    };
    
    console.log('Prefill data:', prefillData);
  }
  
  // Save registration progress
  const handleRegistrationProgress = (sectionAnswers: any) => {
    const uuid = registrationStorage.save({
      answers: sectionAnswers,
      sections: { step1: sectionAnswers },
      metadata: {
        eligibilityId,
        progress: 'in-progress'
      }
    });
    
    console.log('Registration progress saved:', uuid);
  };
  
  // Complete registration
  const handleRegistrationComplete = (allAnswers: any, outcome: any) => {
    const uuid = registrationStorage.save({
      answers: allAnswers,
      outcome,
      metadata: {
        eligibilityId,
        completedAt: new Date().toISOString(),
        status: 'complete'
      }
    });
    
    console.log('Registration complete:', uuid);
  };
  
  return null; // Your component JSX
}

// ==============================================
// Example 4: Draft Management
// ==============================================
export function DraftManagementExample() {
  const draftStorage = useQuestionnaireStorage(StorageKeyPrefix.DRAFT);
  
  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentAnswers.length > 0) {
        draftStorage.save({
          answers: currentAnswers,
          metadata: {
            lastSaved: new Date().toISOString(),
            questionnaireType: 'eligibility'
          }
        });
        console.log('Draft auto-saved');
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [currentAnswers]);
  
  // Load latest draft
  const handleLoadDraft = () => {
    const drafts = draftStorage.listSaved();
    if (drafts.length > 0) {
      // Get the most recent draft
      const latestDraft = drafts
        .map(uuid => draftStorage.load(uuid))
        .filter(Boolean)
        .sort((a, b) => {
          const timeA = new Date(a!.timestamp).getTime();
          const timeB = new Date(b!.timestamp).getTime();
          return timeB - timeA;
        })[0];
      
      if (latestDraft) {
        console.log('Loaded latest draft:', latestDraft);
        // Restore the draft data
      }
    }
  };
  
  // Clear old drafts
  const handleClearOldDrafts = () => {
    const drafts = draftStorage.listSaved();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    drafts.forEach(uuid => {
      const draft = new StorageService(StorageKeyPrefix.DRAFT).get(uuid);
      if (draft) {
        const draftDate = new Date(draft.timestamp);
        if (draftDate < oneWeekAgo) {
          new StorageService(StorageKeyPrefix.DRAFT).delete(uuid);
          console.log('Deleted old draft:', uuid);
        }
      }
    });
  };
  
  return null; // Your component JSX
}

// ==============================================
// Example 5: Error Handling
// ==============================================
export function ErrorHandlingExample() {
  const storage = useEligibilityStorage();
  
  const handleSaveWithErrorHandling = () => {
    try {
      const uuid = storage.save({
        answers: [],
        outcome: {
          type: 'success',
          title: 'Test',
          message: 'Test message',
          color: 'green'
        }
      });
      
      console.log('Successfully saved:', uuid);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('QuotaExceededError')) {
          console.error('Storage quota exceeded. Please clear some data.');
          // Show user message to clear old data
        } else {
          console.error('Failed to save:', error.message);
        }
      }
    }
  };
  
  const handleLoadWithValidation = (uuid: string) => {
    const data = storage.load(uuid);
    
    if (!data) {
      console.warn('No data found for UUID:', uuid);
      return;
    }
    
    // Validate the data
    if (!EligibilityStorageHelper.isComplete(data)) {
      console.warn('Eligibility data is incomplete');
      // Show message to user to complete eligibility
    }
    
    // Check data age
    const dataAge = new Date().getTime() - new Date(data.timestamp).getTime();
    const oneMonthMs = 30 * 24 * 60 * 60 * 1000;
    
    if (dataAge > oneMonthMs) {
      console.warn('Data is older than one month');
      // Suggest user to update their eligibility
    }
    
    // Use the data
    console.log('Valid data loaded:', data);
  };
  
  return null; // Your component JSX
}

// Import for useEffect and other React hooks
import { useEffect } from 'react';
import { useQuestionnaireStorage } from './use-questionnaire-storage';

// Placeholder for current answers (would come from your component state)
const currentAnswers: any[] = [];
