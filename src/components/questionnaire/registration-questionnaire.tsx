"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAlertIcon } from "./shared-utils";
import { RadioInput, TextInput, CheckboxInput, FileInput } from "./shared-inputs";
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
  const [currentSectionData, setCurrentSectionData] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<RegistrationOutcome | null>(null);
  const [supportersList, setSupportersList] = useState<Array<{ name: string; email: string }>>([]);

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

  // Prefill data from eligibility wizard
  useEffect(() => {
    if (eligibilityData?.derivedData && currentSectionId === "step2") {
      const prefillData = { ...currentSectionData };
      if (eligibilityData.derivedData.flatCount) {
        prefillData.number_of_flats = eligibilityData.derivedData.flatCount;
      }
      setCurrentSectionData(prefillData);
    }
  }, [currentSectionId, eligibilityData]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setCurrentSectionData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleCheckboxChange = (fieldId: string, optionValue: string, checked: boolean) => {
    setCurrentSectionData(prev => {
      const currentValues = prev[fieldId] || [];
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

  const addSupporter = () => {
    setSupportersList(prev => [...prev, { name: "", email: "" }]);
  };

  const removeSupporter = (index: number) => {
    setSupportersList(prev => prev.filter((_, i) => i !== index));
  };

  const updateSupporter = (index: number, field: "name" | "email", value: string) => {
    setSupportersList(prev => prev.map((supporter, i) => 
      i === index ? { ...supporter, [field]: value } : supporter
    ));
  };

  const validateSection = () => {
    for (const question of currentSection.questions) {
      if (question.required && !currentSectionData[question.id]) {
        return false;
      }
      if (question.type === "email" && currentSectionData[question.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(currentSectionData[question.id])) {
          return false;
        }
      }
      if (question.type === "checkbox" && question.validation?.required) {
        if (!currentSectionData[question.id]) {
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
      value: currentSectionData[question.id] || null,
      sectionId: currentSectionId
    }));

    // Add supporters data if applicable
    if (currentSectionId === "step3" && currentSectionData.add_supporters === "yes") {
      sectionAnswerData.push({
        questionId: "supporters_list",
        value: supportersList,
        sectionId: currentSectionId
      });
    }

    const newSectionAnswers = {
      ...sectionAnswers,
      [currentSectionId]: sectionAnswerData
    };
    setSectionAnswers(newSectionAnswers);

    // Call section complete callback
    onSectionComplete?.(currentSection, sectionAnswerData);

    // Determine next section
    let nextSectionId = currentSection.nextSection;

    // Skip step6a if not both RTM and CE are available
    if (nextSectionId === "step6a" && !shouldShowChooseProcess()) {
      nextSectionId = "step7";
    }

    if (nextSectionId === "success") {
      // We've reached the end
      setOutcome(outcomes.success as RegistrationOutcome);
      setIsComplete(true);
      onComplete?.(outcomes.success as RegistrationOutcome, newSectionAnswers);
    } else {
      // Move to next section
      setCurrentSectionId(nextSectionId);
      setCurrentSectionData({});
      setSupportersList([]);
    }
  };

  const handleBack = () => {
    if (currentSectionIndex === 0) return;

    const prevSectionId = sectionKeys[currentSectionIndex - 1];
    setCurrentSectionId(prevSectionId);
    
    // Restore previous section data
    const prevAnswers = sectionAnswers[prevSectionId];
    if (prevAnswers) {
      const restoredData: Record<string, any> = {};
      prevAnswers.forEach(answer => {
        if (answer.questionId === "supporters_list" && Array.isArray(answer.value)) {
          setSupportersList(answer.value as Array<{ name: string; email: string }>);
        } else {
          restoredData[answer.questionId] = answer.value;
        }
      });
      setCurrentSectionData(restoredData);
    }
  };

  const shouldShowChooseProcess = () => {
    return eligibilityData?.derivedData?.allowsBothRtmAndCe || false;
  };

  const shouldShowConditionalQuestions = (questionId: string, triggerValue: string) => {
    return currentSectionData[questionId] === triggerValue;
  };

  const renderQuestion = (question: RegistrationQuestion) => {
    const value = currentSectionData[question.id] || "";

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

  const renderSupportersList = () => {
    if (!shouldShowConditionalQuestions("add_supporters", "yes")) {
      return null;
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium text-liberty-standard">
            Supporter Details
          </Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addSupporter}
            className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Supporter
          </Button>
        </div>
        {supportersList.map((supporter, index) => (
          <div key={index} className="flex gap-3 items-end p-4 border border-liberty-secondary/30 rounded-lg">
            <div className="flex-1 space-y-3">
              <div>
                <Label className="text-sm text-liberty-standard/70">Name</Label>
                <Input
                  value={supporter.name}
                  onChange={(e) => updateSupporter(index, "name", e.target.value)}
                  placeholder="Supporter name"
                  className="border-liberty-secondary/50"
                />
              </div>
              <div>
                <Label className="text-sm text-liberty-standard/70">Email</Label>
                <Input
                  type="email"
                  value={supporter.email}
                  onChange={(e) => updateSupporter(index, "email", e.target.value)}
                  placeholder="supporter@example.com"
                  className="border-liberty-secondary/50"
                />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeSupporter(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  if (isComplete && outcome) {
    return (
      <div className={cn("min-h-[calc(100vh-64px)] bg-liberty-secondary/20 flex items-center justify-center p-4", className)}>
        <motion.div 
          className="w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="bg-liberty-base border-liberty-secondary/20">
            <CardHeader className="text-center">
              <motion.div 
                className="mx-auto mb-6 w-16 h-16 bg-liberty-primary/10 rounded-full flex items-center justify-center border border-liberty-primary/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
              >
                <CheckCircle2 className="text-liberty-primary w-8 h-8" />
              </motion.div>
              <CardTitle className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-standard mb-4">
                {outcome.title}
              </CardTitle>
              <CardDescription className="text-lg text-liberty-standard/70 leading-relaxed">
                {outcome.message}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-3 justify-center flex-wrap">
              {outcome.actions?.map((action, index) => (
                <Button 
                  key={index}
                  variant={action.primary ? "default" : "outline"}
                  onClick={() => router.push(action.href)}
                  className={action.primary ? "bg-liberty-primary hover:bg-liberty-primary/90 text-white" : "border-liberty-secondary text-liberty-standard hover:bg-liberty-secondary/10"}
                >
                  {action.text}
                </Button>
              ))}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Skip step6a if conditions not met
  if (currentSectionId === "step6a" && !shouldShowChooseProcess()) {
    useEffect(() => {
      setCurrentSectionId("step7");
    }, []);
    return null;
  }

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
                {data.title}
              </CardTitle>
              <div className="text-sm text-liberty-standard/60 font-medium bg-liberty-secondary/20 px-3 py-1 rounded-full">
                Step {currentSectionIndex + 1} of {totalSections}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
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
                <h2 className="text-2xl font-bold text-liberty-standard mb-2">
                  {currentSection.title}
                </h2>
                <p className="text-liberty-standard/70 leading-relaxed">
                  {currentSection.description}
                </p>
              </div>

              {/* Display chips for step2 */}
              {currentSectionId === "step2" && (
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
                            console.log('Debug - RMC Status:', status, 'RMC Answer:', rmcAnswer, 'All answers:', eligibilityData?.answers?.map(a => ({id: a.questionId, value: a.value})));
                            
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
                          {(() => {
                            const path = eligibilityData?.derivedData?.provisionalPath;
                            if (path === "RTM or CE available") return "Right to Manage or buy your freehold";
                            if (path === "RTM available") return "Right to Manage (freehold not available)";
                            if (path === "Leaseholder engagement required") return "Build neighbor support first";
                            if (path === "RMC takeover/improvement") return "Improve existing management";
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

          <CardContent className="space-y-8 py-8">
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
                
                {/* Render conditional supporter list */}
                {currentSectionId === "step3" && renderSupportersList()}
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
