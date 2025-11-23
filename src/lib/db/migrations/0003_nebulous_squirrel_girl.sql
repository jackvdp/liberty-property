DROP TABLE "sharepoint_contacts" CASCADE;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "main_building_address" text;--> statement-breakpoint
-- Populate existing records with their building_address as default
UPDATE "registrations" SET "main_building_address" = "building_address" WHERE "main_building_address" IS NULL;--> statement-breakpoint
-- Now make it NOT NULL
ALTER TABLE "registrations" ALTER COLUMN "main_building_address" SET NOT NULL;--> statement-breakpoint
DROP TYPE "public"."contact_role";--> statement-breakpoint
DROP TYPE "public"."contact_source";--> statement-breakpoint
DROP TYPE "public"."contact_type";--> statement-breakpoint
DROP TYPE "public"."preferred_channel";