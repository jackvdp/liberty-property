import { LeaseholderEngagementClient } from "./leaseholder-engagement-client";

type SearchParams = {
  searchParams?: Promise<{
    eligibilityId?: string;
    prefillId?: string;
    focusQuestion?: string;
  }>;
};

export default async function LeaseholderEngagement({ searchParams }: SearchParams) {
  const params = await searchParams || Promise.resolve({}) as {
    eligibilityId?: string;
    prefillId?: string;
    focusQuestion?: string;
  };
  const eligibilityId = params.eligibilityId;

  return <LeaseholderEngagementClient eligibilityId={eligibilityId} />;
}
