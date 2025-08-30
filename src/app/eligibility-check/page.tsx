import { EligibilityCheckClient } from "./eligibility-check-client";

type SearchParams = {
  searchParams?: Promise<{
    eligibilityId?: string;
    prefillId?: string;
    focusQuestion?: string;
  }>;
};

export default async function EligibilityCheck({ searchParams }: SearchParams) {
  const params = await (searchParams || Promise.resolve({})) as {
    eligibilityId?: string;
    prefillId?: string;
    focusQuestion?: string;
  };
  const prefillId = params?.prefillId;
  const focusQuestion = params?.focusQuestion;

  return <EligibilityCheckClient prefillId={prefillId} focusQuestion={focusQuestion} />;
}
