import { RMCProcessClient } from "./rmc-process-client";

type SearchParams = {
  searchParams?: Promise<Record<string, string>>;
};

export default async function RMCProcess({ searchParams }: SearchParams) {
  const params = await (searchParams || Promise.resolve({})) as {
    eligibilityId?: string;
    prefillId?: string;
    focusQuestion?: string;
  };
  const eligibilityId = params.eligibilityId;

  return <RMCProcessClient eligibilityId={eligibilityId} />;
}
