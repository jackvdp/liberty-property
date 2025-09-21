"use client";

import {
  RegistrationQuestionnaire,
  RegistrationData,
  RegistrationOutcome,
  RegistrationSection,
  EligibilityData,
  RegistrationAnswer
} from "@/components/questionnaire";
import registrationData from "@/data/registration-wizard-flow.json";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { getEligibilityCase } from "@/lib/actions/eligibility.actions";
import { createEligibilityDerivedData } from "@/use_cases/eligibility/createEligibilityDerivedData";
import { Spinner } from "@/components/ui/spinner";
import {cn} from "@/lib/utils";

interface RegisterClientProps {
  eligibilityId?: string;
}

export function RegisterClient({ eligibilityId }: RegisterClientProps) {
  const [eligibilityData, setEligibilityData] = useState<EligibilityData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load eligibility data from server when available
  useEffect(() => {
    if (eligibilityId) {
      const loadEligibilityData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          console.log('Loading eligibility data for ID:', eligibilityId);
          const result = await getEligibilityCase(eligibilityId);
          
          if (result.success && result.answers && result.outcome) {
            // Convert server data to the format expected by components
            const eligData: EligibilityData = {
              uuid: eligibilityId,
              answers: result.answers.map(a => ({
                questionId: a.questionId,
                value: a.value
              })),
              outcome: result.outcome,
              timestamp: result.case?.createdAt || new Date().toISOString(),
              // Use the imported helper function
              derivedData: createEligibilityDerivedData(result.answers, result.outcome)
            };
            
            console.log('Loaded eligibility data from server:', eligData);
            setEligibilityData(eligData);
          } else {
            setError(`Could not load eligibility data: ${result.error}`);
            console.warn('Failed to load eligibility data:', result.error);
          }
        } catch (error) {
          const errorMessage = 'Failed to load eligibility data';
          setError(errorMessage);
          console.error('Error loading eligibility data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadEligibilityData();
    }
  }, [eligibilityId]);

  // Type assertion for the registration data
  const questionnaireData: RegistrationData = {
    title: registrationData.registrationWizard.title,
    description: registrationData.registrationWizard.description,
    sections: registrationData.registrationWizard.sections as Record<string, RegistrationSection>,
    outcomes: registrationData.registrationWizard.outcomes as Record<string, RegistrationOutcome>
  };

  const handleRegistrationComplete = (outcome: RegistrationOutcome, answers: Record<string, RegistrationAnswer[]>) => {
    console.log("Registration completed:", { outcome, answers });
    
    // TODO: Implement server-side registration saving
    // For now, just log the completion
    console.log("Registration data would be saved to server here");
    
    // Additional completion logic - could redirect to dashboard, send to backend, etc.
  };

  const handleSectionComplete = (section: RegistrationSection, answers: RegistrationAnswer[]) => {
    console.log("Section completed:", section.title, answers);
    
    // TODO: Implement server-side draft saving
    console.log("Section progress would be saved to server here");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-liberty-base">
        <Navbar />
        <div className={cn("min-h-[calc(100vh-64px)] container mx-auto px-4 py-8 flex items-center justify-center")}>
          <div className="flex flex-col items-center space-x-2">
            <Spinner />
            <p className="mt-2 text-liberty-standard">Loading your eligibility data...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-liberty-base">
        <Navbar />
        <div className={cn("min-h-[calc(100vh-64px)] container mx-auto px-4 py-8")}>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Unable to Load Registration</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-sm text-red-500">
              Please complete the eligibility check first or check that your case ID is correct.
            </p>
            <div className="mt-4">
              <a 
                href="/eligibility-check" 
                className="inline-block bg-liberty-primary text-white px-6 py-2 rounded-lg hover:bg-liberty-primary/90"
              >
                Start Eligibility Check
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      <RegistrationQuestionnaire
        data={questionnaireData}
        eligibilityData={eligibilityData}
        onComplete={handleRegistrationComplete}
        onSectionComplete={handleSectionComplete}
      />
      <Footer />
    </div>
  );
}
