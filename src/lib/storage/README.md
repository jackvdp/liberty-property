# Questionnaire Storage System

A scalable, type-safe storage solution for managing questionnaire data in localStorage.

## Overview

This storage system provides a decoupled, reusable way to manage questionnaire data with proper TypeScript typing. It includes:

- **Generic storage service** that works with any questionnaire type
- **Custom React hooks** for easy integration with components
- **Type-safe interfaces** for all data structures
- **Helper utilities** for eligibility-specific logic

## Architecture

```
src/lib/storage/
├── types.ts                    # TypeScript interfaces and types
├── storage-service.ts          # Core storage service class
├── use-questionnaire-storage.ts # React hooks for storage
├── eligibility-storage-helper.ts # Eligibility-specific helpers
└── index.ts                    # Public API exports
```

## Basic Usage

### 1. Using the Eligibility Storage Hook

```typescript
import { useEligibilityStorage } from '@/lib/storage';

function MyComponent() {
  // Initialize with optional UUID to load existing data
  const storage = useEligibilityStorage(existingUuid);
  
  // Save new data (returns UUID)
  const handleSave = () => {
    const uuid = storage.save({
      answers: questionAnswers,
      outcome: questionOutcome,
      derivedData: computedData
    });
    console.log('Saved with UUID:', uuid);
  };
  
  // Load data by UUID
  const handleLoad = (uuid: string) => {
    const data = storage.load(uuid);
    if (data) {
      console.log('Loaded:', data);
    }
  };
  
  // Update existing data
  const handleUpdate = () => {
    storage.update({
      derivedData: newComputedData
    });
  };
  
  // Check if data exists
  const exists = storage.exists(someUuid);
  
  // List all saved UUIDs
  const allUuids = storage.listSaved();
  
  // Clear current data from state
  storage.clear();
}
```

### 2. Using the Generic Storage Service

```typescript
import { StorageService, StorageKeyPrefix } from '@/lib/storage';

// Create a service for a custom questionnaire type
const customStorage = new StorageService(StorageKeyPrefix.DRAFT);

// Save data
const uuid = customStorage.save({
  uuid: 'optional-uuid',
  timestamp: new Date().toISOString(),
  answers: questionAnswers,
  outcome: questionOutcome
});

// Get data
const data = customStorage.get(uuid);

// Update data
customStorage.update(uuid, { outcome: newOutcome });

// Delete data
customStorage.delete(uuid);

// List all UUIDs
const uuids = customStorage.list();

// Clear all data for this prefix
customStorage.clear();

// Export all data
const allData = customStorage.exportAll();

// Import data
const importedUuids = customStorage.importData(dataArray);
```

### 3. Using Eligibility Helpers

```typescript
import { EligibilityStorageHelper } from '@/lib/storage';

// Create storage data from questionnaire answers
const storageData = EligibilityStorageHelper.createStorageData(
  answers,
  outcome,
  optionalUuid
);

// Convert stored data to component format
const eligibilityData = EligibilityStorageHelper.toEligibilityData(storedData);

// Check if data is complete
const isComplete = EligibilityStorageHelper.isComplete(storedData);

// Get human-readable summary
const summary = EligibilityStorageHelper.getSummary(storedData);

// Generate URLs
const registrationUrl = EligibilityStorageHelper.getRegistrationUrl(uuid);
const updateUrl = EligibilityStorageHelper.getUpdateUrl(uuid, 'question_id');
```

## Advanced Features

### Custom Questionnaire Types

Create your own typed storage for custom questionnaire types:

```typescript
// Define your data structure
interface MyQuestionnaireData extends StoredQuestionnaireData {
  customField: string;
  scores: number[];
}

// Create a typed storage service
const myStorage = new StorageService<MyQuestionnaireData>(
  StorageKeyPrefix.DRAFT
);

// Use with full type safety
const data = myStorage.get(uuid); // data is MyQuestionnaireData | null
```

### Creating Custom Hooks

```typescript
import { useQuestionnaireStorage, StorageKeyPrefix } from '@/lib/storage';

// Create a custom hook for your questionnaire type
export function useMyQuestionnaireStorage(initialUuid?: string) {
  return useQuestionnaireStorage<MyQuestionnaireData>(
    StorageKeyPrefix.DRAFT,
    initialUuid
  );
}
```

### Storage Management

```typescript
// Get storage size for a prefix
const sizeInBytes = storage.getStorageSize();

// Export data for backup
const backup = storage.exportAll();
localStorage.setItem('backup', JSON.stringify(backup));

// Import data from backup
const backupData = JSON.parse(localStorage.getItem('backup'));
const importedUuids = storage.importData(backupData);
```

## Storage Key Structure

Data is stored in localStorage with the following key format:
```
{prefix}-{uuid}
```

Available prefixes:
- `liberty-bell-eligibility` - Eligibility questionnaire data
- `liberty-bell-registration` - Registration questionnaire data
- `liberty-bell-draft` - Draft/temporary data

## Type Safety

All storage operations are fully type-safe:

```typescript
// TypeScript will enforce correct data structure
storage.save({
  answers: [...], // Must be QuestionnaireAnswer[]
  outcome: {...}, // Must be QuestionnaireOutcome
  // uuid and timestamp are auto-generated if not provided
});

// Type inference works automatically
const data = storage.get(uuid);
if (data) {
  // data.answers is QuestionnaireAnswer[]
  // data.outcome is QuestionnaireOutcome | undefined
  // data.derivedData is type-safe based on your definition
}
```

## Error Handling

The storage system includes comprehensive error handling:

```typescript
try {
  const uuid = storage.save(data);
} catch (error) {
  console.error('Failed to save:', error);
  // Handle storage quota exceeded, etc.
}

// Safe operations return null/false on failure
const data = storage.get(uuid); // Returns null if not found
const success = storage.update(uuid, updates); // Returns false on failure
```

## Browser Compatibility

The system checks for localStorage availability:
- Returns empty/null values when localStorage is not available
- Works in SSR environments (returns safe defaults)
- Handles storage quota limits gracefully

## Best Practices

1. **Always check for data existence** before using it
2. **Use the typed hooks** instead of direct localStorage access
3. **Handle storage errors** gracefully (quota exceeded, etc.)
4. **Clear old data** periodically to manage storage space
5. **Use helpers** for common operations (URLs, summaries, etc.)

## Migration from Direct localStorage

Replace direct localStorage usage:

```typescript
// Before
localStorage.setItem(`liberty-bell-eligibility-${uuid}`, JSON.stringify(data));
const stored = localStorage.getItem(`liberty-bell-eligibility-${uuid}`);

// After
const storage = useEligibilityStorage();
const uuid = storage.save(data);
const stored = storage.get(uuid);
```

## Testing

The storage system can be easily mocked for testing:

```typescript
// Mock the storage service
jest.mock('@/lib/storage', () => ({
  useEligibilityStorage: () => ({
    save: jest.fn().mockReturnValue('test-uuid'),
    get: jest.fn().mockReturnValue(mockData),
    update: jest.fn().mockReturnValue(true),
    // ... other methods
  })
}));
```

## Future Enhancements

Potential improvements that can be added:

1. **IndexedDB support** for larger data storage
2. **Encryption** for sensitive data
3. **Sync to backend** API
4. **Compression** for large datasets
5. **Versioning** for data migration
6. **Expiration** for automatic cleanup
