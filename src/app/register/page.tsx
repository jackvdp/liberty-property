import { RegisterClient } from "./register-client";

type SearchParams = {
  searchParams?: Promise<{
    eligibilityId?: string;
    prefillId?: string;
    focusQuestion?: string;
  }>;
};

export default async function Register({ searchParams }: SearchParams) {
  const params = await (searchParams || Promise.resolve({})) as {
    eligibilityId?: string;
    prefillId?: string;
    focusQuestion?: string;
  };
  const eligibilityId = params.eligibilityId;

  return <RegisterClient eligibilityId={eligibilityId} />;
}
