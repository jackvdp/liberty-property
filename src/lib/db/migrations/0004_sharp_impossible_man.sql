-- Add building_identifier column as nullable first
ALTER TABLE "registrations" ADD COLUMN "building_identifier" text;--> statement-breakpoint

-- Populate existing records by normalizing their main_building_address + postcode
-- Remove spaces, punctuation, convert to lowercase, keep only alphanumeric
UPDATE "registrations" 
SET "building_identifier" = LOWER(
  REGEXP_REPLACE(
    CONCAT(main_building_address, postcode), 
    '[^a-zA-Z0-9]', 
    '', 
    'g'
  )
)
WHERE "building_identifier" IS NULL;--> statement-breakpoint

-- Now make it NOT NULL since all rows have values
ALTER TABLE "registrations" ALTER COLUMN "building_identifier" SET NOT NULL;--> statement-breakpoint

-- Add index for fast building lookups
CREATE INDEX IF NOT EXISTS "idx_registrations_building_identifier" ON "registrations" ("building_identifier");