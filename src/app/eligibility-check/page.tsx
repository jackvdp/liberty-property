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

  // Eligibility-specific logic for creating derived data
  const createDerivedData = (answers: QuestionnaireAnswer[], outcome: QuestionnaireOutcome) => {
    return {
      flatCount: answers.find(a => a.questionId === "flat_count")?.value,
      propertyType: answers.find(a => a.questionId === "property_type")?.value,
      isLeasehold: answers.find(a => a.questionId === "flat_leasehold")?.value,
      existingRmcRtm: answers.find(a => a.questionId === "existing_rmc_rtm")?.value,
      nonResidentialProportion: answers.find(a => a.questionId === "non_residential_proportion")?.value,
      leaseholderSupport: answers.find(a => a.questionId === "leaseholder_support")?.value,
      // Determine if both RTM and CE are available
      allowsBothRtmAndCe: (() => {
        const nonResAnswer = answers.find(a => a.questionId === "non_residential_proportion");
        return !nonResAnswer || nonResAnswer.value === "25_or_less";
      })(),
      // Set RMC status
      rmcStatus: (() => {
        const rmcAnswer = answers.find(a => a.questionId === "existing_rmc_rtm");
        console.log('Debug - Creating rmcStatus from answer:', rmcAnswer);
        if (rmcAnswer?.value === "no") return "No RMC/RTM recorded";
        if (rmcAnswer?.value === "yes") return "RMC/RTM exists";
        return "RMC/RTM status unknown";
      })(),
      // Set provisional path based on outcome
      provisionalPath: (() => {
        if (outcome.action === "registration") {
          const nonResAnswer = answers.find(a => a.questionId === "non_residential_proportion");
          const allowsBoth = !nonResAnswer || nonResAnswer.value === "25_or_less";
          return allowsBoth ? "RTM or CE available" : "RTM available";
        }
        if (outcome.action === "leaseholder_engagement_module") {
          return "Leaseholder engagement required";
        }
        if (outcome.action === "rmc_process") {
          return "RMC takeover/improvement";
        }
        return "Path to be determined";
      })()
    };
  };

  // Eligibility-specific outcome button click handler
  const handleOutcomeButtonClick = (outcome: QuestionnaireOutcome, answers: QuestionnaireAnswer[], uuid?: string | null) => {
    if (!outcome.button?.href || !uuid) {
      return outcome.button?.href || "";
    }

    let href = outcome.button.href;
    
    // If it's a success outcome, save eligibility data with UUID and append to URL
    if (outcome.type === "success") {      
      const eligibilityFormData = {
        uuid: uuid,
        answers: answers,
        outcome: outcome,
        timestamp: new Date().toISOString(),
        derivedData: createDerivedData(answers, outcome)
      };
      
      localStorage.setItem(`liberty-bell-eligibility-${uuid}`, JSON.stringify(eligibilityFormData));
      console.log('Saved eligibility data with UUID:', uuid, 'for outcome:', outcome.action);
      
      // Add UUID as query parameter to all success outcomes
      href = `${href}?eligibilityId=${uuid}`;
    }
    
    return href;
  };

  // Render completion content with case ID and return URL - only for registration outcomes
  const renderCompletionContent = (uuid: string, outcome: QuestionnaireOutcome) => {
    // Only show for registration outcomes (success type that leads to registration)
    if (outcome.type !== "success" || outcome.action !== "registration") {
      return null;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const returnUrl = `${baseUrl}/register?eligibilityId=${uuid}`;
    
    return (
      <div className="mt-4 pt-4 border-t border-liberty-accent/20">
        <div className="space-y-2">
          <p className="font-semibold">Your Case ID: <code className="bg-liberty-base px-2 py-1 rounded font-mono text-sm">{uuid}</code></p>
          <p className="text-sm">Save this ID for your records.</p>
          <p className="text-sm">To return to registration later, use: <code className="bg-liberty-base px-1 rounded font-mono text-xs break-all">{returnUrl}</code></p>
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
