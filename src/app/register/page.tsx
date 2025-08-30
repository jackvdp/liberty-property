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
  
  // Get eligibility data from URL params or localStorage
  const eligibilityData: EligibilityData = {
    flatCount: searchParams.get('flatCount') ? parseInt(searchParams.get('flatCount')!) : undefined,
    allowsBothRtmAndCe: searchParams.get('allowsBoth') === 'true',
    rmcStatus: searchParams.get('rmcStatus') || 'No RMC/RTM recorded',
    provisionalPath: searchParams.get('path') || 'RTM or CE available'
  };

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
