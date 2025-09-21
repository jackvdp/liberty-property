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
import { Spinner } from "@/components/ui/spinner";

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
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [isCreatingCase, setIsCreatingCase] = useState(false);
  const [createdCaseId, setCreatedCaseId] = useState<string | null>(null);
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
        setIsLoadingInitial(true);
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
          setIsLoadingInitial(false);
        }
      };

      loadExistingCase();
    }
  }, [eligibilityId, focusQuestion]);

  // Handle outcome button click with stored case ID
  const handleOutcomeButtonClick = async (
    outcome: QuestionnaireOutcome, 
    answers: QuestionnaireAnswer[]
  ): Promise<string> => {
    console.log('handleOutcomeButtonClick called with:', { outcome, answers });
    
    if (!outcome.button?.href) {
      return "";
    }

    let href = outcome.button.href;
    
    // If it's a success outcome and we have a created case ID, use it
    if (outcome.type === "success" && createdCaseId) {
      href = `${href}?eligibilityId=${createdCaseId}`;
      console.log('Final href with stored case ID:', href);
      console.log('Navigating to:', href);
      router.push(href);
      return ""; // Return empty since we handled navigation
    }
    
    // For non-success outcomes or when no case ID, navigate normally
    if (href) {
      console.log('Navigating to:', href);
      router.push(href);
      return "";
    }
    
    return "";
  };

  // Render completion content with case information
  const renderCompletionContent = (caseId: string, outcome: QuestionnaireOutcome) => {
    console.log('renderCompletionContent called with caseId:', caseId, 'outcome:', outcome);
    
    // Show for all success outcomes that lead to registration
    if (outcome.type !== "success") {
      return null;
    }

    // Show loading state while creating case
    if (isCreatingCase) {
      return (
        <div className="mt-4 pt-4 border-t border-liberty-accent/20">
          <div className="flex floex-col items-center space-x-2">
            <Spinner />
            <p className="text-sm">Creating your case...</p>
          </div>
        </div>
      );
    }

    // Show case details once created
    const displayCaseId = createdCaseId || 'Case creation pending...';
    const returnUrl = createdCaseId 
      ? `${window.location.origin}/register?eligibilityId=${createdCaseId}`
      : 'Will be available once case is created';
    
    return (
      <div className="mt-4 pt-4 border-t border-liberty-accent/20">
        <div className="space-y-2">
          <p className="font-semibold">
            Your Case ID: <code className="bg-liberty-base px-2 py-1 rounded font-mono text-sm">{displayCaseId}</code>
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

  if (isLoadingInitial) {
    return (
      <div className="min-h-screen bg-liberty-base flex items-center justify-center">
        <div className="text-center flex flex-col items-center space-x-2">
          <Spinner />
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
        
        // Create case immediately when outcome is determined
        if (outcome.type === "success") {
          setIsCreatingCase(true);
          
          createEligibilityCase({
            answers,
            outcome
          }).then((result) => {
            if (result.success && result.eligibilityId) {
              console.log('Created case successfully on completion:', result);
              setCreatedCaseId(result.eligibilityId);
            } else {
              console.error('Failed to create case on completion:', result.error);
            }
          }).catch((error) => {
            console.error('Error creating case on completion:', error);
          }).finally(() => {
            setIsCreatingCase(false);
          });
        }
      }}
      onRestart={() => {
        console.log("Questionnaire restarted");
        setPrefillData(undefined);
        setCreatedCaseId(null); // Clear created case ID on restart
        // Navigate to clean eligibility check
        router.push('/eligibility-check');
      }}
    />
  );
}
