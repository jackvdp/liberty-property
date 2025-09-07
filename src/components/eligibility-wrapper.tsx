/**
 * Eligibility Check Wrapper Component
 * Handles eligibility wizard with server-side case creation
 */

"use client";

import {
  Questionnaire,
  QuestionnaireData,
  QuestionnaireOutcome,
  QuestionnaireQuestion,
  QuestionnaireAnswer
} from "@/components/questionnaire";
import eligibilityData from "@/data/eligibility-wizard-flow.json";
import { createEligibilityCase, getEligibilityCase } from "@/lib/actions/eligibility.actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface EligibilityWrapperProps {
  eligibilityId?: string;
  focusQuestion?: string;
}

interface PrefillData {
  answers?: QuestionnaireAnswer[];
  focusQuestion?: string;
}

export function EligibilityWrapper({ eligibilityId, focusQuestion }: EligibilityWrapperProps) {
  const [prefillData, setPrefillData] = useState<PrefillData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Simple type assertion for questionnaire data
  const questionnaireData: QuestionnaireData = {
    title: "Eligibility Check",
    description: "Let's determine if your building qualifies for Right to Manage or Collective Enfranchisement",
    questions: eligibilityData.wizardFlow.questions as Record<string, QuestionnaireQuestion>,
    outcomes: eligibilityData.wizardFlow.outcomes as Record<string, QuestionnaireOutcome>
  };

  // Load existing case data if eligibilityId provided
  useEffect(() => {
    if (eligibilityId) {
      const loadExistingCase = async () => {
        setIsLoading(true);
        try {
          const result = await getEligibilityCase(eligibilityId);
          if (result.success && result.answers) {
            setPrefillData({
              answers: result.answers,
              focusQuestion: focusQuestion
            });
            console.log('Loaded existing case data:', result);
          } else {
            console.warn('Could not load existing case:', result.error);
          }
        } catch (error) {
          console.error('Error loading existing case:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadExistingCase();
    }
  }, [eligibilityId, focusQuestion]);

  // Handle outcome button click with server-side case creation
  const handleOutcomeButtonClick = async (
    outcome: QuestionnaireOutcome, 
    answers: QuestionnaireAnswer[]
  ): Promise<string> => {
    console.log('handleOutcomeButtonClick called with:', { outcome, answers });
    
    if (!outcome.button?.href) {
      return "";
    }

    let href = outcome.button.href;
    
    // If it's a success outcome, create case on server
    if (outcome.type === "success") {
      setIsLoading(true);
      
      try {
        const result = await createEligibilityCase({
          answers,
          outcome
        });
        
        if (result.success && result.eligibilityId) {
          console.log('Created case successfully:', result);
          
          // Add eligibilityId as query parameter to success outcomes
          href = `${href}?eligibilityId=${result.eligibilityId}`;
          console.log('Final href with eligibilityId:', href);
        } else {
          console.error('Failed to create case:', result.error);
          // Still allow navigation but without eligibilityId
        }
      } catch (error) {
        console.error('Error creating case:', error);
        // Still allow navigation but without eligibilityId
      } finally {
        setIsLoading(false);
      }
    }
    
    return href;
  };

  // Render completion content with case information
  const renderCompletionContent = (caseId: string, outcome: QuestionnaireOutcome) => {
    console.log('renderCompletionContent called with caseId:', caseId, 'outcome:', outcome);
    
    // Only show for registration outcomes (success type that leads to registration)
    if (outcome.type !== "success" || outcome.action !== "registration") {
      return null;
    }

    const returnUrl = `${window.location.origin}/register?eligibilityId=${caseId}`;
    
    return (
      <div className="mt-4 pt-4 border-t border-liberty-accent/20">
        <div className="space-y-2">
          <p className="font-semibold">
            Your Case ID: <code className="bg-liberty-base px-2 py-1 rounded font-mono text-sm">{caseId}</code>
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-liberty-base flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-liberty-primary mx-auto"></div>
          <p className="mt-2 text-liberty-standard">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Questionnaire
      data={questionnaireData}
      showSeparator={true}
      prefillData={prefillData}
      onOutcomeButtonClick={handleOutcomeButtonClick}
      renderCompletionContent={renderCompletionContent}
      onComplete={(outcome, answers) => {
        console.log("Questionnaire onComplete called:", { outcome, answers });
      }}
      onRestart={() => {
        console.log("Questionnaire restarted");
        setPrefillData(undefined);
        // Navigate to clean eligibility check
        router.push('/eligibility-check');
      }}
    />
  );
}
