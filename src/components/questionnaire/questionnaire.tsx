"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {ArrowLeft, ArrowRight, Info} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAlertVariant, getAlertIcon } from "./shared-utils";
import { RadioInput, TextInput } from "./shared-inputs";
import { 
  QuestionnaireProps, 
  QuestionnaireQuestion, 
  QuestionnaireOutcome, 
  QuestionnaireAnswer,
  QuestionnaireValue
} from "./types";

export default function Questionnaire({
  data,
  onComplete,
  onRestart,
  className,
  showSeparator = false,
  completionActions,
  prefillData,
  onOutcomeButtonClick,
  renderCompletionContent
}: QuestionnaireProps & { renderCompletionContent?: (uuid: string, outcome: QuestionnaireOutcome) => React.ReactNode }) {
  const router = useRouter();
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("q1");
  const [answers, setAnswers] = useState<QuestionnaireAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<QuestionnaireValue>("");
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<QuestionnaireOutcome | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isPrefilling, setIsPrefilling] = useState<boolean>(false);
  const [completionUuid, setCompletionUuid] = useState<string | null>(null);

  const { questions, outcomes } = data;
  const currentQuestion = questions[currentQuestionId as keyof typeof questions] as QuestionnaireQuestion;
  const totalQuestions = Object.keys(questions).length;
  
  // Calculate unique questions answered
  const uniqueQuestions = new Set(answers.map(a => a.questionId));
  const answeredQuestions = uniqueQuestions.size;

  const getNextQuestion = (questionId: string, answer: QuestionnaireValue) => {
    const question = questions[questionId as keyof typeof questions] as QuestionnaireQuestion;
    
    if (typeof question.nextQuestion === "string") {
      return question.nextQuestion;
    } else if (typeof question.nextQuestion === "object" && question.nextQuestion) {
      // For number type questions, check for exact numeric matches first
      if (question.type === "number" && typeof answer === "number") {
        const numericKey = answer.toString();
        if (numericKey in question.nextQuestion) {
          return question.nextQuestion[numericKey];
        }
        // If no exact match, check for 'default' key
        if ("default" in question.nextQuestion && question.nextQuestion.default) {
          return question.nextQuestion.default;
        }
      }
      
      // For string/boolean answers or fallback
      const stringValue = typeof answer === 'string' ? answer : String(answer);
      return question.nextQuestion[stringValue];
    }
    
    return null;
  };

  // Handle prefilling from saved data
  useEffect(() => {
    const handlePrefill = (prefillData: NonNullable<QuestionnaireProps['prefillData']>) => {
      if (!prefillData.answers) return;
      
      if (prefillData.focusQuestion) {
        // User wants to focus on a specific question
        console.log('Focusing on question:', prefillData.focusQuestion);
        
        // Find answers up to (but not including) the focus question
        const answersBeforeFocus = [];
        const focusQuestionAnswer = prefillData.answers.find(a => a.questionId === prefillData.focusQuestion);
        
        // Navigate through the flow to get all answers before the focus question
        let currentQuestionKey = "q1";
        for (const answer of prefillData.answers) {
          if (answer.questionId === prefillData.focusQuestion) {
            break; // Stop before the focus question
          }
          answersBeforeFocus.push(answer);
          currentQuestionKey = getNextQuestion(currentQuestionKey, answer.value) || currentQuestionKey;
        }
        
        // Find the question key that corresponds to the focus question ID
        let focusQuestionKey = "q1";
        for (const [key, question] of Object.entries(questions)) {
          if ((question as QuestionnaireQuestion).id === prefillData.focusQuestion) {
            focusQuestionKey = key;
            break;
          }
        }
        
        setAnswers(answersBeforeFocus);
        setCurrentQuestionId(focusQuestionKey);
        setCurrentAnswer(focusQuestionAnswer?.value || "");
        
        console.log('Set up focus on', prefillData.focusQuestion, 'with', answersBeforeFocus.length, 'previous answers');
      } else {
        // Default behavior - position at last question
        const previousAnswers = prefillData.answers.slice(0, -1);
        const lastAnswer = prefillData.answers[prefillData.answers.length - 1];
        
        setAnswers(previousAnswers);
        
        if (lastAnswer) {
          // Find the question key that corresponds to the last answer's question ID
          let lastQuestionKey = "q1";
          for (const [key, question] of Object.entries(questions)) {
            if ((question as QuestionnaireQuestion).id === lastAnswer.questionId) {
              lastQuestionKey = key;
              break;
            }
          }
          
          setCurrentQuestionId(lastQuestionKey);
          setCurrentAnswer(lastAnswer.value);
        }
        
        console.log('Prefilled with', previousAnswers.length, 'previous answers, positioned at question:', lastAnswer?.questionId);
      }
    };

    if (prefillData?.answers && prefillData.answers.length > 0 && !isPrefilling) {
      setIsPrefilling(true);
      console.log('Prefilling questionnaire with data:', prefillData);
      handlePrefill(prefillData);
    }
  }, [prefillData, isPrefilling, questions, getNextQuestion]);

  // Calculate progress
  useEffect(() => {
    const progressPercentage = (answeredQuestions / totalQuestions) * 100;
    setProgress(Math.min(progressPercentage, 100));
  }, [answeredQuestions, totalQuestions]);

  const handleAnswerChange = (value: QuestionnaireValue) => {
    setCurrentAnswer(value);
  };

  const handleNext = async () => {
    if (!currentAnswer) return;

    setIsAnimating(true);

    // Small delay for exit animation
    await new Promise(resolve => setTimeout(resolve, 150));

    // Save the current answer - remove any existing answer for this question first
    const questionId = currentQuestion.id; // Use the actual question ID, not the key
    const answersWithoutCurrent = answers.filter(a => a.questionId !== questionId);
    const newAnswers: QuestionnaireAnswer[] = [...answersWithoutCurrent, { questionId: questionId, value: currentAnswer }];
    setAnswers(newAnswers);

    // Determine next question or outcome
    const nextQuestionId = getNextQuestion(currentQuestionId, currentAnswer);

    if (nextQuestionId && questions[nextQuestionId as keyof typeof questions]) {
      setCurrentQuestionId(nextQuestionId);
      setCurrentAnswer("");
    } else if (nextQuestionId && outcomes[nextQuestionId as keyof typeof outcomes]) {
      // We've reached an outcome
      const finalOutcome = outcomes[nextQuestionId as keyof typeof outcomes] as QuestionnaireOutcome;
      setOutcome(finalOutcome);
      setIsComplete(true);
      
      // Generate UUID for completion content if needed
      if (renderCompletionContent) {
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
        setCompletionUuid(uuid);
      }
      
      // Call completion callback
      onComplete?.(finalOutcome, newAnswers);
    }

    setIsAnimating(false);
  };

  const handleBack = async () => {
    if (answers.length === 0) return;

    setIsAnimating(true);

    // Small delay for exit animation
    await new Promise(resolve => setTimeout(resolve, 150));

    // Remove the last answer
    const previousAnswers = answers.slice(0, -1);
    setAnswers(previousAnswers);

    // Clear the current answer first
    setCurrentAnswer("");

    // If no previous answers, go back to first question
    if (previousAnswers.length === 0) {
      setCurrentQuestionId("q1");
    } else {
      // Get the question ID we should be on based on the previous answers
      let currentId = "q1";
      
      // Replay the answers to determine the correct current question
      for (const answer of previousAnswers) {
        const nextId = getNextQuestion(currentId, answer.value);
        if (nextId && questions[nextId as keyof typeof questions]) {
          currentId = nextId;
        }
      }
      
      setCurrentQuestionId(currentId);
      
      // Set the current answer to what it was for this question
      const currentQuestionObj = questions[currentId as keyof typeof questions] as QuestionnaireQuestion;
      const currentQuestionAnswer = previousAnswers.find(a => a.questionId === currentQuestionObj?.id);
      if (currentQuestionAnswer) {
        setCurrentAnswer(currentQuestionAnswer.value);
        // Remove this answer from the answers array since we're editing it again
        const answersWithoutCurrent = previousAnswers.filter(a => a.questionId !== currentQuestionObj.id);
        setAnswers(answersWithoutCurrent);
      }
    }

    setIsComplete(false);
    setOutcome(null);
    setIsAnimating(false);
  };

  const handleRestart = () => {
    setCurrentQuestionId("q1");
    setAnswers([]);
    setCurrentAnswer("");
    setProgress(0);
    setIsComplete(false);
    setOutcome(null);
    setCompletionUuid(null);
    onRestart?.();
  };

  const handleOutcomeButtonClick = () => {
    if (onOutcomeButtonClick && outcome) {
      // Use injected logic if provided
      const redirectData = onOutcomeButtonClick(outcome, answers);
      if (typeof redirectData === 'string' && redirectData) {
        router.push(redirectData);
      }
    } else if (outcome?.button?.href) {
      // Default behavior - just navigate to the href
      router.push(outcome.button.href);
    } else if (outcome?.button?.action) {
      // Handle custom actions if needed
      console.log("Custom action:", outcome.button.action);
    }
  };

  const getCompletionAction = (type: string) => {
    return completionActions?.[type as keyof typeof completionActions];
  };

  if (isComplete && outcome) {
    const action = getCompletionAction(outcome.type);
    
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
                {getAlertIcon(outcome.type)}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <CardTitle className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-standard mb-4">
                  Assessment Complete
                </CardTitle>
              </motion.div>
              <motion.div 
                className="space-y-4 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <div className="space-y-2">
                  <div className="relative max-w-md mx-auto">
                    <div className="flex items-center justify-between text-sm max-w-md mx-auto">
                      <span className="text-liberty-standard/70">Progress</span>
                      <span className="text-liberty-standard/80 font-medium">100%</span>
                    </div>
                  </div>
                  <div className="relative max-w-md mx-auto">
                    <Progress value={100} className="h-3 bg-liberty-secondary/30 border border-liberty-accent/30" />
                    <motion.div 
                      className="absolute top-0 left-0 h-3 w-full bg-liberty-accent rounded-full border border-liberty-accent"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <CardDescription className="text-lg text-liberty-standard/70 leading-relaxed">
                  Based on your answers, here's what we found
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <Alert variant={getAlertVariant(outcome.type)}>
                  {getAlertIcon(outcome.type)}
                  <AlertTitle className="text-xl font-reckless font-bold">{outcome.title}</AlertTitle>
                  <AlertDescription className="text-base leading-relaxed">
                    {outcome.message}
                    
                    {/* Generic completion content inside the main alert */}
                    {renderCompletionContent && completionUuid && outcome && (
                      <div className="mt-4">
                        {renderCompletionContent(completionUuid, outcome)}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              </motion.div>
            </CardContent>
            <CardFooter className="flex gap-3 justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="flex gap-3"
              >
                <Button 
                  variant="outline" 
                  onClick={handleRestart}
                  className="border-liberty-secondary text-liberty-standard hover:bg-liberty-secondary/10"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Start Over
                </Button>
                {outcome.button && (
                  <Button 
                    className="bg-liberty-primary hover:bg-liberty-primary/90 text-white"
                    onClick={handleOutcomeButtonClick}
                  >
                    {outcome.button.text}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
                {!outcome.button && action && (
                  <Button 
                    className="bg-liberty-primary hover:bg-liberty-primary/90 text-white"
                    onClick={action.onClick}
                  >
                    {action.text}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-[calc(100vh-64px)] bg-liberty-secondary/20 flex items-center justify-center p-4", className)}>
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="bg-liberty-base border-liberty-secondary/20">
          <CardHeader>
            {prefillData?.answers && (
              <motion.div 
                className="mb-4 p-3 bg-liberty-accent/10 border border-liberty-accent/20 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-liberty-accent" />
                  <p className="text-sm font-medium text-liberty-standard">
                    Updating your previous eligibility assessment. You can review and change any of your answers.
                  </p>
                </div>
              </motion.div>
            )}
            
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CardTitle className="text-3xl text-liberty-standard">
                <h3>{data.title}</h3>
              </CardTitle>
              <motion.div 
                className="text-sm text-liberty-standard/60 font-medium bg-liberty-secondary/20 px-3 py-1 rounded-full"
                key={`question-${answeredQuestions}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Question {answeredQuestions + 1} of {totalQuestions}
              </motion.div>
            </motion.div>
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-liberty-standard/70">Progress</span>
                  <motion.span 
                    className="text-liberty-standard/80 font-medium"
                    key={progress}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
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
              <CardDescription className="text-lg text-liberty-standard/70 leading-relaxed">
                {data.description}
              </CardDescription>
            </motion.div>
          </CardHeader>

          {showSeparator && <Separator />}

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQuestionId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-4"
              >
                {currentQuestion.type === "radio" && currentQuestion.options && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <RadioInput 
                      question={currentQuestion} 
                      value={currentAnswer} 
                      onChange={handleAnswerChange} 
                    />
                  </motion.div>
                )}

                {currentQuestion.type === "number" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <TextInput 
                      question={currentQuestion} 
                      value={currentAnswer} 
                      onChange={handleAnswerChange}
                      type="number"
                    />
                  </motion.div>
                )}

                {currentQuestion.type === "text" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <TextInput 
                      question={currentQuestion} 
                      value={currentAnswer} 
                      onChange={handleAnswerChange}
                      type="text"
                    />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-between">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                onClick={handleBack} 
                disabled={answers.length === 0}
                className="border-liberty-secondary text-liberty-standard hover:bg-liberty-secondary/10"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleNext} 
                disabled={!currentAnswer || isAnimating}
                className="bg-liberty-primary hover:bg-liberty-primary/90 text-white"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
