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

export default function EligibilityCheck() {
  // Simple type assertion - much cleaner!
  const questionnaireData: QuestionnaireData = {
    title: "Eligibility Check",
    description: "Let's determine if your building qualifies for Right to Manage or Collective Enfranchisement",
    questions: eligibilityData.wizardFlow.questions as Record<string, QuestionnaireQuestion>,
    outcomes: eligibilityData.wizardFlow.outcomes as Record<string, QuestionnaireOutcome>
  };

  const completionActions = {
    success: {
      text: "Get Started",
      onClick: () => {
        // Navigate to next step or show registration form
        console.log("Get Started clicked");
      }
    },
    info: {
      text: "Learn More", 
      onClick: () => {
        // Navigate to relevant information page
        console.log("Learn More clicked");
      }
    },
    error: {
      text: "Contact Support",
      onClick: () => {
        // Navigate to contact or support page
        console.log("Contact Support clicked");
      }
    }
  };

  return (
      <div className="min-h-screen bg-liberty-base">
        <Navbar />
        <Questionnaire
            data={questionnaireData}
            showSeparator={true}
            completionActions={completionActions}
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
