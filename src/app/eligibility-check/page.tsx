import { EligibilityWrapper } from "@/components/eligibility-wrapper";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
  
  // Support both eligibilityId (new) and prefillId (legacy) for now
  const eligibilityId = params?.eligibilityId || params?.prefillId;
  const focusQuestion = params?.focusQuestion;

  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      <EligibilityWrapper 
        eligibilityId={eligibilityId} 
        focusQuestion={focusQuestion} 
      />
      <Footer />
    </div>
  );
}
