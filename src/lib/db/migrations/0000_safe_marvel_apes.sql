CREATE TYPE "public"."case_type" AS ENUM('rtm', 'enfranchisement', 'rmc_takeover');--> statement-breakpoint
CREATE TYPE "public"."eligibility_status" AS ENUM('success', 'failure', 'info');--> statement-breakpoint
CREATE TYPE "public"."registration_status" AS ENUM('pending', 'contacted', 'active', 'completed');--> statement-breakpoint
CREATE TABLE "eligibility_checks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_type" text,
	"is_leasehold" boolean,
	"flat_count" integer,
	"has_rmc_rtm" boolean,
	"non_residential_proportion" text,
	"was_converted" boolean,
	"freeholder_lives_in_building" boolean,
	"leaseholder_support" text,
	"two_thirds_long_leases" boolean,
	"single_owner_multiple_flats" boolean,
	"eligibility_status" "eligibility_status" NOT NULL,
	"recommended_case_type" "case_type",
	"outcome_action" text,
	"all_answers" jsonb NOT NULL,
	"outcome" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eligibility_check_id" uuid,
	"full_name" text NOT NULL,
	"email_address" text NOT NULL,
	"mobile_number" text,
	"consent_contact" boolean NOT NULL,
	"building_address" text NOT NULL,
	"postcode" text NOT NULL,
	"local_authority" text,
	"number_of_flats" integer NOT NULL,
	"preferred_process" text,
	"terms_conditions" boolean NOT NULL,
	"privacy_policy" boolean NOT NULL,
	"data_processing" boolean NOT NULL,
	"marketing_consent" boolean,
	"all_answers" jsonb,
	"status" "registration_status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_eligibility_check_id_eligibility_checks_id_fk" FOREIGN KEY ("eligibility_check_id") REFERENCES "public"."eligibility_checks"("id") ON DELETE no action ON UPDATE no action;