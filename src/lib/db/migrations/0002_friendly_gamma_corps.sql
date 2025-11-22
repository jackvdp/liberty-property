CREATE TYPE "public"."contact_role" AS ENUM('lead_leaseholder', 'director_rmc_rtm', 'referrer', 'freeholder', 'other');--> statement-breakpoint
CREATE TYPE "public"."contact_source" AS ENUM('website_supabase', 'email', 'facebook', 'phone', 'referral', 'other');--> statement-breakpoint
CREATE TYPE "public"."contact_type" AS ENUM('individual', 'organisation', 'representative');--> statement-breakpoint
CREATE TYPE "public"."preferred_channel" AS ENUM('email', 'phone', 'whatsapp', 'messenger');--> statement-breakpoint
CREATE TABLE "sharepoint_contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sharepoint_id" text,
	"sharepoint_url" text,
	"last_synced_at" timestamp,
	"full_name" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"contact_role" "contact_role",
	"contact_type" "contact_type",
	"email" text NOT NULL,
	"phone" text,
	"preferred_channel" "preferred_channel",
	"consent_to_contact" boolean DEFAULT false,
	"source" "contact_source",
	"associated_building_id" uuid,
	"owner" text,
	"notes" text,
	"is_director" boolean DEFAULT false,
	"director_of" text,
	"raw_sharepoint_data" jsonb,
	"created_on" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sharepoint_contacts_sharepoint_id_unique" UNIQUE("sharepoint_id")
);
--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "sharepoint_contacts" ADD CONSTRAINT "sharepoint_contacts_associated_building_id_registrations_id_fk" FOREIGN KEY ("associated_building_id") REFERENCES "public"."registrations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_user_id_auth.users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth.users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_user_id_unique" UNIQUE("user_id");