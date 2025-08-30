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
import { useEffect, useState } from "react";

interface RegisterClientProps {
  eligibilityId?: string;
}

export function RegisterClient({ eligibilityId }: RegisterClientProps) {
  const [eligibilityData, setEligibilityData] = useState<EligibilityData | undefined>(undefined);

  useEffect(() => {
    console.log('RegisterClient received eligibilityId:', eligibilityId);
    
    if (eligibilityId && typeof window !== 'undefined') {
      try {
        // Let's also check what keys exist in localStorage
        const allKeys = Object.keys(localStorage).filter(key => key.startsWith('liberty-bell-eligibility-'));
        console.log('All eligibility keys in localStorage:', allKeys);
        
        const stored = localStorage.getItem(`liberty-bell-eligibility-${eligibilityId}`);
        console.log('Attempting to fetch from localStorage with key:', `liberty-bell-eligibility-${eligibilityId}`);
        console.log('Found stored data:', stored ? 'Yes' : 'No');
        
        if (stored) {
          const parsedData = JSON.parse(stored);
          console.log('Loaded eligibility data from UUID:', eligibilityId, parsedData);
          setEligibilityData(parsedData as EligibilityData);
        } else {
          console.warn('No eligibility data found for UUID:', eligibilityId);
        }
      } catch (error) {
        console.error('Failed to parse eligibility data from localStorage:', error);
      }
    } else {
      console.log('No eligibilityId provided or window not available');
    }
  }, [eligibilityId]);

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
