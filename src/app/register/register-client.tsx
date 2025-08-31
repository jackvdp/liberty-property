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
import { 
  useEligibilityStorage, 
  useRegistrationStorage,
  EligibilityStorageHelper,
  StoredRegistrationData
} from "@/lib/storage";

interface RegisterClientProps {
  eligibilityId?: string;
}

export function RegisterClient({ eligibilityId }: RegisterClientProps) {
  const eligibilityStorage = useEligibilityStorage(eligibilityId);
  const registrationStorage = useRegistrationStorage();
  const [eligibilityData, setEligibilityData] = useState<EligibilityData | undefined>(undefined);

  // Load eligibility data when available
  useEffect(() => {
    console.log('RegisterClient useEffect triggered:', {
      eligibilityId,
      hasData: !!eligibilityStorage.data,
      dataUuid: eligibilityStorage.data?.uuid
    });
    
    if (eligibilityStorage.data) {
      const eligData = EligibilityStorageHelper.toEligibilityData(eligibilityStorage.data);
      console.log('Loaded eligibility data from storage:', eligData);
      setEligibilityData(eligData);
    } else if (eligibilityId) {
      console.warn('No eligibility data found for UUID:', eligibilityId);
      
      // Debug: List available UUIDs only once
      if (typeof window !== 'undefined') {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('liberty-bell-eligibility-'));
        console.log('Available eligibility keys in localStorage:', keys);
      }
    }
  }, [eligibilityId, eligibilityStorage.data]); // Only depend on these two

  // Type assertion for the registration data
  const questionnaireData: RegistrationData = {
    title: registrationData.registrationWizard.title,
    description: registrationData.registrationWizard.description,
    sections: registrationData.registrationWizard.sections as Record<string, RegistrationSection>,
    outcomes: registrationData.registrationWizard.outcomes as Record<string, RegistrationOutcome>
  };

  const handleRegistrationComplete = (outcome: RegistrationOutcome, answers: Record<string, RegistrationAnswer[]>) => {
    console.log("Registration completed:", { outcome, answers });
    
    // Flatten all answers into a single array
    const allAnswers = Object.values(answers).flat();
    
    // Save registration data with proper typing
    const registrationData: Omit<StoredRegistrationData, 'uuid' | 'timestamp'> = {
      answers: allAnswers,
      outcome: outcome as RegistrationOutcome & { color: string }, // Ensure color is defined
      sections: answers,
      metadata: {
        eligibilityId: eligibilityId,
        completedAt: new Date().toISOString()
      }
    };
    
    const savedUuid = registrationStorage.save(registrationData);
    console.log("Registration saved with UUID:", savedUuid);
    
    // Additional completion logic - could redirect to dashboard, send to backend, etc.
  };

  const handleSectionComplete = (section: RegistrationSection, answers: RegistrationAnswer[]) => {
    console.log("Section completed:", section.title, answers);
    
    // Could save draft progress here if needed
    // const draftData: Omit<StoredRegistrationData, 'uuid' | 'timestamp'> = {
    //   answers: answers,
    //   currentSection: section.id,
    //   metadata: {
    //     eligibilityId: eligibilityId,
    //     lastUpdated: new Date().toISOString()
    //   }
    // };
    
    // Optionally save draft (using registration storage for now)
    // registrationStorage.save(draftData);
  };

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
