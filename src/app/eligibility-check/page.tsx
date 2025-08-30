"use client";

import {
  Questionnaire,
  QuestionnaireData,
  QuestionnaireOutcome,
  QuestionnaireQuestion
} from "@/components/questionnaire";
import eligibilityData from "@/data/eligibility-wizard-flow.json";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EligibilityCheck() {
  const searchParams = useSearchParams();
  const [prefillData, setPrefillData] = useState<any>(null);

  // Simple type assertion - much cleaner!
  const questionnaireData: QuestionnaireData = {
    title: "Eligibility Check",
    description: "Let's determine if your building qualifies for Right to Manage or Collective Enfranchisement",
    questions: eligibilityData.wizardFlow.questions as Record<string, QuestionnaireQuestion>,
    outcomes: eligibilityData.wizardFlow.outcomes as Record<string, QuestionnaireOutcome>
  };

  useEffect(() => {
    const prefillId = searchParams.get('prefillId');
    const focusQuestion = searchParams.get('focusQuestion');
    
    if (prefillId && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(`liberty-bell-eligibility-${prefillId}`);
        if (stored) {
          const parsedData = JSON.parse(stored);
          
          // Add focusQuestion to the prefill data
          if (focusQuestion) {
            parsedData.focusQuestion = focusQuestion;
          }
          
          setPrefillData(parsedData);
          console.log('Loaded eligibility data for prefilling:', parsedData, 'focus question:', focusQuestion);
        }
      } catch (error) {
        console.error('Failed to load prefill data:', error);
      }
    }
  }, [searchParams]);

  return (
      <div className="min-h-screen bg-liberty-base">
        <Navbar />
        <Questionnaire
            data={questionnaireData}
            showSeparator={true}
            prefillData={prefillData}
            onComplete={(outcome, answers) => {
              console.log("Questionnaire completed:", { outcome, answers });
              // Handle completion - could send data to analytics, redirect, etc.
            }}
            onRestart={() => {
              console.log("Questionnaire restarted");
              // Handle restart - could clear saved data, reset analytics, etc.
            }}
        />
        <Footer />
      </div>
  );
}
