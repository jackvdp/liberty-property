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
              // Create derived data
              derivedData: createDerivedData(result.answers, result.outcome)
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

  // Helper to create derived data (matches the localStorage helper logic)
  const createDerivedData = (answers: any[], outcome: any) => {
    const findAnswer = (questionId: string) => 
      answers.find(a => a.questionId === questionId)?.value;

    return {
      flatCount: findAnswer('flat_count') as number | undefined,
      propertyType: findAnswer('property_type') as string | undefined,
      isLeasehold: findAnswer('flat_leasehold') as string | undefined,
      existingRmcRtm: findAnswer('existing_rmc_rtm') as string | undefined,
      nonResidentialProportion: findAnswer('non_residential_proportion') as string | undefined,
      leaseholderSupport: findAnswer('leaseholder_support') as string | undefined,
      
      allowsBothRtmAndCe: (() => {
        const nonResAnswer = findAnswer('non_residential_proportion');
        return !nonResAnswer || nonResAnswer === '25_or_less';
      })(),
      
      rmcStatus: (() => {
        const rmcAnswer = findAnswer('existing_rmc_rtm');
        if (rmcAnswer === 'no') return 'No RMC/RTM recorded';
        if (rmcAnswer === 'yes') return 'RMC/RTM exists';
        return 'RMC/RTM status unknown';
      })(),
      
      provisionalPath: (() => {
        if (!outcome) return 'Path to be determined';
        
        if (outcome.action === 'registration') {
          const nonResAnswer = findAnswer('non_residential_proportion');
          const allowsBoth = !nonResAnswer || nonResAnswer === '25_or_less';
          return allowsBoth ? 'RTM or CE available' : 'RTM available';
        }
        return 'Path to be determined';
      })()
    };
  };

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
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-liberty-primary mx-auto"></div>
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
        <div className="container mx-auto px-4 py-8">
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
