"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {ArrowLeft, ArrowRight, CheckCircle2} from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioInput, TextInput, CheckboxInput, FileInput } from "./shared-inputs";
import { QuestionnaireValue } from "./types";
import { 
  RegistrationQuestionnaireProps,
  RegistrationSection,
  RegistrationQuestion,
  RegistrationAnswer,
  RegistrationOutcome
} from "./registration-types";

export default function RegistrationQuestionnaire({
  data,
  onComplete,
  onSectionComplete,
  className,
  eligibilityData
}: RegistrationQuestionnaireProps) {
  const router = useRouter();
  const [currentSectionId, setCurrentSectionId] = useState<string>("step1");
  const [sectionAnswers, setSectionAnswers] = useState<Record<string, RegistrationAnswer[]>>({});
  const [currentSectionData, setCurrentSectionData] = useState<Record<string, QuestionnaireValue>>({});
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<RegistrationOutcome | null>(null);

  const { sections, outcomes } = data;
  const sectionKeys = Object.keys(sections);
  const currentSection = sections[currentSectionId] as RegistrationSection;
  const currentSectionIndex = sectionKeys.indexOf(currentSectionId);
  const totalSections = sectionKeys.length;

  // Calculate progress based on completed sections
  useEffect(() => {
    const completedSections = Object.keys(sectionAnswers).length;
    const progressPercentage = (completedSections / totalSections) * 100;
    setProgress(Math.min(progressPercentage, 100));
  }, [sectionAnswers, totalSections]);

  // Prefill data from eligibility wizard - only run once when section changes
  useEffect(() => {
    if (eligibilityData?.derivedData && currentSectionId === "step2") {
      setCurrentSectionData(prev => {
        // Only update if the value isn't already set
        if (prev.number_of_flats) {
          return prev; // Don't update if already has data
        }
        
        const prefillData = { ...prev };
        if (eligibilityData.derivedData && eligibilityData.derivedData.flatCount) {
          prefillData.number_of_flats = eligibilityData.derivedData.flatCount;
        }
        return prefillData;
      });
    }
  }, [currentSectionId, eligibilityData?.derivedData?.flatCount]); // Remove currentSectionData from deps

  const handleFieldChange = (fieldId: string, value: QuestionnaireValue) => {
    setCurrentSectionData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleCheckboxChange = (fieldId: string, optionValue: string, checked: boolean) => {
    setCurrentSectionData(prev => {
      const currentValue = prev[fieldId];
      const currentValues = Array.isArray(currentValue) ? currentValue as string[] : [];
      
      if (checked) {
        return {
          ...prev,
          [fieldId]: [...currentValues, optionValue]
        };
      } else {
        return {
          ...prev,
          [fieldId]: currentValues.filter((v: string) => v !== optionValue)
        };
      }
    });
  };

  const validateSection = () => {
    for (const question of currentSection.questions) {
      const value = currentSectionData[question.id];
      
      if (question.required && (!value || (Array.isArray(value) && value.length === 0))) {
        return false;
      }
      
      if (question.type === "email" && value && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return false;
        }
      }
      
      if (question.type === "checkbox" && question.validation?.required) {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return false;
        }
      }
    }

    // Special validation for consent checkbox in step1
    if (currentSectionId === "step1" && !currentSectionData.consent_contact) {
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    if (!validateSection()) {
      return;
    }

    // Check for consent requirement
    if (currentSectionId === "step1" && !currentSectionData.consent_contact) {
      setOutcome(outcomes.consent_required as RegistrationOutcome);
      setIsComplete(true);
      return;
    }

    // Save current section data
    const sectionAnswerData: RegistrationAnswer[] = currentSection.questions.map(question => ({
      questionId: question.id,
      value: currentSectionData[question.id] ?? "",
      sectionId: currentSectionId
    }));

    const newSectionAnswers = {
      ...sectionAnswers,
      [currentSectionId]: sectionAnswerData
    };
    setSectionAnswers(newSectionAnswers);

    // Call section complete callback
    onSectionComplete?.(currentSection, sectionAnswerData);

    // Determine next section
    const nextSectionId = currentSection.nextSection;

    if (nextSectionId === "success") {
      // We've reached the end
      setOutcome(outcomes.success as RegistrationOutcome);
      setIsComplete(true);
      onComplete?.(outcomes.success as RegistrationOutcome, newSectionAnswers);
    } else {
      // Move to next section
      setCurrentSectionId(nextSectionId);
      setCurrentSectionData({});
    }
  };

  const handleBack = () => {
    if (currentSectionIndex === 0) return;

    const prevSectionId = sectionKeys[currentSectionIndex - 1];
    setCurrentSectionId(prevSectionId);
    
    // Restore previous section data
    const prevAnswers = sectionAnswers[prevSectionId];
    if (prevAnswers) {
      const restoredData: Record<string, QuestionnaireValue> = {};
      prevAnswers.forEach(answer => {
        restoredData[answer.questionId] = answer.value;
      });
      setCurrentSectionData(restoredData);
    }
  };

  const renderQuestion = (question: RegistrationQuestion) => {
    const value = currentSectionData[question.id] ?? "";

    switch (question.type) {
      case "text":
      case "email":
      case "tel":
        return <TextInput key={question.id} question={question} value={value} onChange={(val) => handleFieldChange(question.id, val)} type={question.type} />;
      case "number":
        return <TextInput key={question.id} question={question} value={value} onChange={(val) => handleFieldChange(question.id, val)} type="number" />;
      case "radio":
        return <RadioInput key={question.id} question={question} value={value} onChange={(val) => handleFieldChange(question.id, val)} />;
      case "checkbox":
        return <CheckboxInput key={question.id} question={question} value={value} onChange={(val) => handleFieldChange(question.id, val)} onCheckboxChange={handleCheckboxChange} />;
      case "file":
        return <FileInput key={question.id} question={question} value={value} onChange={(val) => handleFieldChange(question.id, val)} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("min-h-[calc(100vh-64px)] bg-liberty-secondary/20 flex items-center justify-center p-4", className)}>
      <motion.div 
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="bg-liberty-base border-liberty-secondary/20">
          <CardHeader>
            <div className="flex items-center justify-between mb-6">
              <CardTitle className="text-3xl text-liberty-standard font-reckless">
                <h3>{data.title}</h3>
              </CardTitle>
              <div className="text-sm text-liberty-standard/60 font-medium bg-liberty-secondary/20 px-3 py-1 rounded-full">
                Step {currentSectionIndex + 1} of {totalSections}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-liberty-standard/70">Progress</span>
                  <span className="text-liberty-standard/80 font-medium">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={progress} 
                    className="h-3 bg-liberty-secondary/30 border border-liberty-accent/30" 
                  />
                  {progress > 0 && (
                    <motion.div
                      className="absolute top-0 left-0 h-3 bg-liberty-accent rounded-full transition-all duration-500 ease-out border border-liberty-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-xl font-bold text-liberty-standard mb-2">
                  {currentSection.title}
                </p>
                <p className="text-liberty-standard/70 leading-relaxed">
                  {currentSection.description}
                </p>
              </div>

              {/* Display chips for step2 and step6a */}
              {(currentSectionId === "step2" || currentSectionId === "step6a") && (
                <div className="space-y-4 p-4 bg-liberty-secondary/10 rounded-lg border border-liberty-secondary/20">
                  <h4 className="font-semibold text-liberty-standard mb-3">Your Eligibility Summary</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-liberty-base rounded-lg border border-liberty-secondary/20">
                      <div>
                        <span className="text-sm font-medium text-liberty-standard/60">Management Status:</span>
                        <p className="font-medium text-liberty-standard">
                          {(() => {
                            const status = eligibilityData?.derivedData?.rmcStatus;
                            const rmcAnswer = eligibilityData?.answers?.find(a => a.questionId === "existing_rmc_rtm")?.value;
                            
                            if (status === "No RMC/RTM recorded") return "No existing management company";
                            if (status === "RMC/RTM exists") return "Management company already exists";  
                            if (status === "RMC/RTM status unknown") return "Management status unclear";
                            
                            // Fallback check using RMC answer directly if derivedData is wrong
                            if (rmcAnswer === "no") return "No existing management company";
                            if (rmcAnswer === "yes") return "Management company already exists";
                            if (rmcAnswer === "dont_know") return "Management status unclear";
                            
                            return "Not yet determined";
                          })()}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-liberty-primary border-liberty-primary hover:bg-liberty-primary hover:text-white"
                        onClick={() => {
                          const url = eligibilityData?.uuid 
                            ? `/eligibility-check?prefillId=${eligibilityData.uuid}&focusQuestion=existing_rmc_rtm`
                            : '/eligibility-check';
                          router.push(url);
                        }}
                      >
                        {eligibilityData?.derivedData?.rmcStatus ? "Update this" : "Complete eligibility check"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-liberty-base rounded-lg border border-liberty-secondary/20">
                      <div>
                        <span className="text-sm font-medium text-liberty-standard/60">Recommended Path:</span>
                        <p className="font-medium text-liberty-standard">
                          {eligibilityData?.derivedData?.provisionalPath || "Not yet determined"}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-liberty-primary border-liberty-primary hover:bg-liberty-primary hover:text-white"
                        onClick={() => {
                          const url = eligibilityData?.uuid 
                            ? `/eligibility-check?prefillId=${eligibilityData.uuid}&focusQuestion=leaseholder_support`
                            : '/eligibility-check';
                          router.push(url);
                        }}
                      >
                        {eligibilityData?.derivedData?.provisionalPath ? "Update this" : "Complete eligibility check"}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Debug info - show complete eligibility data if available */}
                  {process.env.NODE_ENV === 'development' && eligibilityData?.answers && (
                    <div className="w-full mt-4 p-3 bg-gray-100 rounded text-xs">
                      <details>
                        <summary className="cursor-pointer font-medium">Debug: Complete Eligibility Data (UUID: {eligibilityData.uuid})</summary>
                        <pre className="mt-2 overflow-auto text-[10px]">{JSON.stringify(eligibilityData, null, 2)}</pre>
                      </details>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSectionId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-6"
              >
                {currentSection.questions.map((question) => renderQuestion(question))}
              </motion.div>
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={currentSectionIndex === 0}
              className="border-liberty-secondary text-liberty-standard hover:bg-liberty-secondary/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!validateSection()}
              className="bg-liberty-primary hover:bg-liberty-primary/90 text-white"
            >
              {currentSection.nextSection === "success" ? "Submit" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}