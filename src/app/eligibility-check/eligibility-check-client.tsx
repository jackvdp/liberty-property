"use client";

import {
  Questionnaire,
  QuestionnaireData,
  QuestionnaireOutcome,
  QuestionnaireQuestion,
  QuestionnaireAnswer
} from "@/components/questionnaire";
import eligibilityData from "@/data/eligibility-wizard-flow.json";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useEffect, useState, useRef } from "react";
import { 
  useEligibilityStorage, 
  EligibilityStorageHelper,
  PrefillData
} from "@/lib/storage";

interface EligibilityCheckClientProps {
  prefillId?: string;
  focusQuestion?: string;
}

export function EligibilityCheckClient({ prefillId, focusQuestion }: EligibilityCheckClientProps) {
  const storage = useEligibilityStorage(prefillId);
  const [prefillData, setPrefillData] = useState<PrefillData | undefined>(undefined);
  // Store the UUID that will be used for saving
  const completionUuidRef = useRef<string | null>(null);

  // Simple type assertion - much cleaner!
  const questionnaireData: QuestionnaireData = {
    title: "Eligibility Check",
    description: "Let's determine if your building qualifies for Right to Manage or Collective Enfranchisement",
    questions: eligibilityData.wizardFlow.questions as Record<string, QuestionnaireQuestion>,
    outcomes: eligibilityData.wizardFlow.outcomes as Record<string, QuestionnaireOutcome>
  };

  // Load prefill data if ID provided
  useEffect(() => {
    if (prefillId && storage.data) {
      const eligData = EligibilityStorageHelper.toEligibilityData(storage.data);
      
      setPrefillData({
        answers: eligData.answers || [],
        uuid: eligData.uuid,
        focusQuestion: focusQuestion
      });
      
      console.log('Loaded eligibility data for prefilling:', eligData, 'focus question:', focusQuestion);
    }
  }, [prefillId, focusQuestion, storage.data]);

  // Generate UUID once when needed
  const getOrCreateCompletionUuid = () => {
    if (!completionUuidRef.current) {
      completionUuidRef.current = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    return completionUuidRef.current;
  };

  // Handle outcome button click with proper storage
  const handleOutcomeButtonClick = (outcome: QuestionnaireOutcome, answers: QuestionnaireAnswer[]) => {
    console.log('handleOutcomeButtonClick called with:', { outcome, answers });
    
    if (!outcome.button?.href) {
      return "";
    }

    let href = outcome.button.href;
    
    // If it's a success outcome, save eligibility data
    if (outcome.type === "success") {
      // Use the same UUID that was shown to the user
      const uuid = getOrCreateCompletionUuid();
      console.log('Using UUID for save:', uuid);
      
      // Create and save eligibility data with the specific UUID
      const eligibilityData = EligibilityStorageHelper.createStorageData(
        answers,
        outcome,
        uuid
      );
      
      const savedUuid = storage.save(eligibilityData);
      
      console.log('Saved eligibility data with UUID:', savedUuid);
      console.log('UUID matches displayed:', savedUuid === uuid);
      console.log('Eligibility data:', eligibilityData);
      
      // Verify it was saved
      const verification = storage.exists(savedUuid);
      console.log('Verification - data exists in storage:', verification ? 'Yes' : 'No');
      
      // Add UUID as query parameter to all success outcomes
      href = `${href}?eligibilityId=${savedUuid}`;
      console.log('Final href with UUID:', href);
    }
    
    return href;
  };

  // Render completion content with case ID and return URL
  const renderCompletionContent = (uuid: string, outcome: QuestionnaireOutcome) => {
    console.log('renderCompletionContent called with uuid:', uuid, 'outcome:', outcome);
    
    // Only show for registration outcomes (success type that leads to registration)
    if (outcome.type !== "success" || outcome.action !== "registration") {
      return null;
    }

    // Use the consistent UUID
    const actualUuid = getOrCreateCompletionUuid();
    console.log('Displaying UUID to user:', actualUuid);
    const returnUrl = EligibilityStorageHelper.getRegistrationUrl(actualUuid);
    
    return (
      <div className="mt-4 pt-4 border-t border-liberty-accent/20">
        <div className="space-y-2">
          <p className="font-semibold">
            Your Case ID: <code className="bg-liberty-base px-2 py-1 rounded font-mono text-sm">{actualUuid}</code>
          </p>
          <p className="text-sm">Save this ID for your records.</p>
          <p className="text-sm">
            To return to registration later, use: 
            <code className="bg-liberty-base px-1 rounded font-mono text-xs break-all">{returnUrl}</code>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      <Questionnaire
        data={questionnaireData}
        showSeparator={true}
        prefillData={prefillData}
        onOutcomeButtonClick={handleOutcomeButtonClick}
        renderCompletionContent={renderCompletionContent}
        onComplete={(outcome, answers) => {
          console.log("Questionnaire onComplete called:", { outcome, answers });
          // Additional completion logic if needed
        }}
        onRestart={() => {
          console.log("Questionnaire restarted");
          storage.clear(); // Clear stored data on restart
          completionUuidRef.current = null; // Reset UUID on restart
        }}
      />
      <Footer />
    </div>
  );
}
