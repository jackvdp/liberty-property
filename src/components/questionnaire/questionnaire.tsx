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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertCircle, Info, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  QuestionnaireProps, 
  QuestionnaireQuestion, 
  QuestionnaireOutcome, 
  QuestionnaireAnswer,
  QuestionnaireOption
} from "./types";

export default function Questionnaire({
  data,
  onComplete,
  onRestart,
  className,
  showSeparator = false,
  completionActions
}: QuestionnaireProps) {
  const router = useRouter();
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("q1");
  const [answers, setAnswers] = useState<QuestionnaireAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | number>("");
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<QuestionnaireOutcome | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const { questions, outcomes } = data;
  const currentQuestion = questions[currentQuestionId as keyof typeof questions] as QuestionnaireQuestion;
  const totalQuestions = Object.keys(questions).length;
  const answeredQuestions = answers.length;

  // Calculate progress
  useEffect(() => {
    const progressPercentage = (answeredQuestions / totalQuestions) * 100;
    setProgress(Math.min(progressPercentage, 100));
  }, [answeredQuestions, totalQuestions]);

  const handleAnswerChange = (value: string | number) => {
    setCurrentAnswer(value);
  };

  const getNextQuestion = (questionId: string, answer: string | number) => {
    const question = questions[questionId as keyof typeof questions] as QuestionnaireQuestion;
    
    if (typeof question.nextQuestion === "string") {
      return question.nextQuestion;
    } else if (typeof question.nextQuestion === "object" && question.nextQuestion) {
      return question.nextQuestion[answer as string];
    }
    
    return null;
  };

  const handleNext = async () => {
    if (!currentAnswer) return;

    setIsAnimating(true);

    // Small delay for exit animation
    await new Promise(resolve => setTimeout(resolve, 150));

    // Save the current answer
    const newAnswers = [...answers, { questionId: currentQuestionId, value: currentAnswer }];
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
    onRestart?.();
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case "success":
        return "success" as const;
      case "error":
        return "destructive" as const;
      case "info":
        return "info" as const;
      default:
        return "default" as const;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="text-liberty-primary" />;
      case "error":
        return <AlertCircle className="text-red-600" />;
      case "info":
        return <Info className="text-liberty-primary" />;
      default:
        return <Info className="text-liberty-primary" />;
    }
  };

  const handleOutcomeButtonClick = () => {
    if (outcome?.button?.href) {
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
                <div>
                  <motion.h3 
                    className="text-2xl font-bold text-liberty-standard mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    {currentQuestion.question}
                  </motion.h3>
                  {currentQuestion.description && (
                    <motion.p 
                      className="text-base text-liberty-standard/70 mb-6 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      {currentQuestion.description}
                    </motion.p>
                  )}
                </div>

                {currentQuestion.type === "radio" && currentQuestion.options && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <RadioGroup 
                      value={currentAnswer.toString()} 
                      onValueChange={handleAnswerChange}
                    >
                      {currentQuestion.options.map((option: QuestionnaireOption, index: number) => {
                        const isSelected = currentAnswer.toString() === option.value;
                        return (
                          <motion.div 
                            key={option.value} 
                            className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                              isSelected 
                                ? 'border-liberty-primary bg-liberty-primary/5 shadow-md' 
                                : 'border-liberty-secondary/30 hover:border-liberty-secondary hover:bg-liberty-secondary/5'
                            }`}
                            onClick={() => handleAnswerChange(option.value)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2, ease: "easeOut" }}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                          >
                            <RadioGroupItem 
                              value={option.value} 
                              id={option.value}
                              className={`${
                                isSelected 
                                  ? 'border-liberty-primary text-liberty-primary shadow-sm' 
                                  : 'border-liberty-secondary/50 text-liberty-standard/40'
                              }`}
                            />
                            <Label 
                              htmlFor={option.value}
                              className={`cursor-pointer flex-1 font-medium text-base transition-colors ${
                                isSelected 
                                  ? 'text-liberty-primary' 
                                  : 'text-liberty-standard hover:text-liberty-standard/80'
                              }`}
                            >
                              {option.label}
                            </Label>
                          </motion.div>
                        );
                      })}
                    </RadioGroup>
                  </motion.div>
                )}

                {currentQuestion.type === "number" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <Label className="text-base font-medium text-liberty-standard mb-3 block">
                      {currentQuestion.question}
                    </Label>
                    <Input
                      type="number"
                      value={currentAnswer}
                      onChange={(e) => handleAnswerChange(Number(e.target.value))}
                      min={currentQuestion.validation?.min || 0}
                      max={currentQuestion.validation?.max}
                      placeholder="Enter number"
                      className="border-liberty-secondary focus-visible:border-liberty-primary focus-visible:ring-liberty-primary/20"
                    />
                    {currentQuestion.validation?.min && (
                      <p className="text-sm text-liberty-standard/60 mt-2 leading-relaxed">
                        Minimum {currentQuestion.validation.min} required
                      </p>
                    )}
                  </motion.div>
                )}

                {currentQuestion.type === "text" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <Label className="text-base font-medium text-liberty-standard mb-3 block">
                      {currentQuestion.question}
                    </Label>
                    <Input
                      type="text"
                      value={currentAnswer}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder="Enter your answer"
                      className="border-liberty-secondary focus-visible:border-liberty-primary focus-visible:ring-liberty-primary/20"
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
