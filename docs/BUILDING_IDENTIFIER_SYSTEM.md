# Building Identifier System

## Overview

The Building Identifier system automatically groups leaseholders from the same building and syncs building data to SharePoint. This enables tracking of multiple leaseholders per building and provides a foundation for future features like collaborative enfranchisement.

## How It Works

### 1. Data Capture

During registration, users provide:
- **Building Address** (e.g., "Flat 5, Wymering Mansions") → stored in `building_address`
- **Main Building Address** (e.g., "Wymering Mansions") → stored in `main_building_address`
- **Postcode** (e.g., "NW6 6HE") → stored in `postcode`

### 2. Identifier Computation

The system automatically computes a **normalized building identifier**:

```typescript
// Example: "Wymering Mansions" + "NW6 6HE"
// Becomes: "wymeringmansionsnw66he"

function normalizeForMatching(address: string, postcode: string): string {
  const combined = address + postcode;
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ''); // Remove all non-alphanumeric characters
}
```

This identifier is stored in the `building_identifier` column and used for:
- Matching leaseholders from the same building
- Preventing duplicate building records in SharePoint
- Fast database lookups via indexed column

### 3. Database Schema

```sql
-- Registrations table
CREATE TABLE registrations (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  
  -- Address fields
  building_address TEXT NOT NULL,           -- User's full address with flat number
  main_building_address TEXT NOT NULL,      -- Building address WITHOUT flat number
  building_identifier TEXT NOT NULL,        -- Normalized: "wymeringmansionsnw66he"
  postcode TEXT NOT NULL,
  
  -- Other fields...
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index for fast building lookups
CREATE INDEX idx_registrations_building_identifier 
ON registrations (building_identifier);
```

### 4. SharePoint Sync

When the sync button is pressed, the system:

#### Syncs Contacts (Contacts_Sync_List)
- One row per leaseholder
- Includes `Building_Identifier` for linking to buildings
- Only syncs new contacts (checks `Supabase_User_ID`)

#### Syncs Buildings (Buildings_Sync_List)
- Groups registrations by `building_identifier`
- One row per unique building
- Includes count of registered leaseholders
- Only syncs new buildings (checks `Building_ID`)

## SharePoint Schema

### Contacts_Sync_List

| Column | Type | Description |
|--------|------|-------------|
| Title | Text | Full name |
| Email | Text | Email address |
| Phone | Text | Mobile number |
| Supabase_User_ID | Text | Unique user identifier |
| Building_Identifier | Text | Normalized building ID |
| BuildingAddress | Text | Full address with flat |
| Postcode | Text | Postcode |
| NumberofFlats | Number | Number of flats in building |

### Buildings_Sync_List

| Column | Type | Description |
|--------|------|-------------|
| Title | Text | Display name (Address, Town) |
| Building_ID | Text | Normalized identifier |
| Address_Line_1 | Text | Main building address |
| Town_City | Text | Town/city name |
| Postcode | Text | Postcode |
| Number_of_Units | Number | Number of flats |
| Created_By_Source | Text | "Website (Supabase)" |
| Notes | Text | Leaseholder count info |

## Usage Examples

### Find All Leaseholders in a Building

```sql
SELECT 
  u.id,
  u.email,
  r.full_name,
  r.building_address,
  r.mobile_number
FROM registrations r
JOIN auth.users u ON u.id = r.user_id
WHERE r.building_identifier = 'wymeringmansionsnw66he'
ORDER BY r.created_at;
```

### Find Buildings with Multiple Registrations

```sql
SELECT 
  building_identifier,
  main_building_address,
  postcode,
  COUNT(*) as leaseholder_count
FROM registrations
GROUP BY building_identifier, main_building_address, postcode
HAVING COUNT(*) > 1
ORDER BY leaseholder_count DESC;
```

### Get Building Summary

```sql
SELECT 
  building_identifier,
  main_building_address,
  postcode,
  number_of_flats,
  COUNT(*) as registered_leaseholders,
  ROUND(COUNT(*) * 100.0 / number_of_flats, 1) as participation_rate
FROM registrations
GROUP BY building_identifier, main_building_address, postcode, number_of_flats
ORDER BY participation_rate DESC;
```

## Key Files

### Database
- `src/lib/db/schema/index.ts` - Database schema
- `src/lib/db/migrations/0003_nebulous_squirrel_girl.sql` - Adds main_building_address
- `src/lib/db/migrations/0004_sharp_impossible_man.sql` - Adds building_identifier + index

### Business Logic
- `src/lib/utils/building-identifier.ts` - Normalization function
- `src/lib/actions/registration.actions.ts` - Computes identifier on save

### SharePoint Integration
- `src/lib/actions/sharepoint-sync.actions.ts` - Syncs contacts and buildings
- `src/components/sharepoint-sync-button.tsx` - UI for triggering sync

### Tests
- `src/lib/utils/__tests__/building-identifier.test.ts` - Unit tests

## Migration History

1. **0003**: Added `main_building_address` column
2. **0004**: Added `building_identifier` column with index, populated existing records

Both dev and prod databases have been migrated.

## Future Enhancements

Potential features that could build on this system:

1. **Buildings Table**: Create a separate `buildings` table to store building metadata
2. **Admin Dashboard**: View all buildings, leaseholder counts, participation rates
3. **Building Pages**: Dedicated pages showing all leaseholders in a building
4. **Collaboration Tools**: Allow leaseholders from same building to connect
5. **Progress Tracking**: Track RTM/CE progress per building
6. **Manual Matching**: Admin tool to merge buildings with typo variations

## Testing

Run the unit tests:

```bash
npm test src/lib/utils/__tests__/building-identifier.test.ts
```

The tests verify:
- Basic normalization (removes spaces, punctuation, converts to lowercase)
- Empty string handling
- Special characters and unicode
- Real-world address examples
