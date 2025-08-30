"use client";

import {
  RegistrationQuestionnaire,
  RegistrationData,
  RegistrationOutcome,
  RegistrationSection,
  EligibilityData
} from "@/components/questionnaire";
import registrationData from "@/data/registration-wizard-flow.json";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useSearchParams } from "next/navigation";

export default function Register() {
  const searchParams = useSearchParams();
  
  // Get eligibility data from localStorage (complete form data)
  const eligibilityData: EligibilityData | undefined = (() => {
    if (typeof window === 'undefined') return undefined;
    
    try {
      const stored = localStorage.getItem('liberty-bell-eligibility-data');
      if (stored) {
        const parsedData = JSON.parse(stored);
        console.log('Loaded eligibility data:', parsedData);
        return parsedData as EligibilityData;
      }
    } catch (error) {
      console.error('Failed to parse eligibility data from localStorage:', error);
    }
    
    // Fallback to URL params for legacy support
    const flatCount = searchParams.get('flatCount');
    const allowsBoth = searchParams.get('allowsBoth');
    const rmcStatus = searchParams.get('rmcStatus');
    const path = searchParams.get('path');
    
    if (flatCount || allowsBoth || rmcStatus || path) {
      return {
        derivedData: {
          flatCount: flatCount ? parseInt(flatCount) : undefined,
          allowsBothRtmAndCe: allowsBoth === 'true',
          rmcStatus: rmcStatus || undefined,
          provisionalPath: path || undefined
        }
      };
    }
    
    return undefined;
  })();

  // Type assertion for the registration data
  const questionnaireData: RegistrationData = {
    title: registrationData.registrationWizard.title,
    description: registrationData.registrationWizard.description,
    sections: registrationData.registrationWizard.sections as Record<string, RegistrationSection>,
    outcomes: registrationData.registrationWizard.outcomes as Record<string, RegistrationOutcome>
  };

  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      <RegistrationQuestionnaire
        data={questionnaireData}
        eligibilityData={eligibilityData}
        onComplete={(outcome, answers) => {
          console.log("Registration completed:", { outcome, answers });
          // Handle completion - could send data to backend, redirect to dashboard, etc.
        }}
        onSectionComplete={(section, answers) => {
          console.log("Section completed:", section.title, answers);
          // Handle section completion - could save progress, trigger analytics, etc.
        }}
      />
      <Footer />
    </div>
  );
}
