"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Info, ArrowLeft, ArrowRight } from "lucide-react";

// Import the wizard flow data
import wizardData from "@/data/eligibility-wizard-flow.json";

interface Answer {
  questionId: string;
  value: string | number;
}

export default function EligibilityWizard() {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("q1");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | number>("");
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<any>(null);

  const { questions, outcomes } = wizardData.wizardFlow;
  const currentQuestion = questions[currentQuestionId as keyof typeof questions];
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
    const question = questions[questionId as keyof typeof questions];
    
    if (typeof question.nextQuestion === "string") {
      return question.nextQuestion;
    } else if (typeof question.nextQuestion === "object") {
      return question.nextQuestion[answer as string];
    }
    
    return null;
  };

  const handleNext = () => {
    if (!currentAnswer) return;

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
      setOutcome(outcomes[nextQuestionId as keyof typeof outcomes]);
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (answers.length === 0) return;

    const previousAnswers = answers.slice(0, -1);
    setAnswers(previousAnswers);

    if (previousAnswers.length === 0) {
      setCurrentQuestionId("q1");
    } else {
      const lastAnswer = previousAnswers[previousAnswers.length - 1];
      setCurrentQuestionId(lastAnswer.questionId);
      setCurrentAnswer(lastAnswer.value);
    }

    setIsComplete(false);
    setOutcome(null);
  };

  const handleRestart = () => {
    setCurrentQuestionId("q1");
    setAnswers([]);
    setCurrentAnswer("");
    setProgress(0);
    setIsComplete(false);
    setOutcome(null);
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case "error":
        return "destructive";
      default:
        return "default";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="text-green-600" />;
      case "error":
        return <AlertCircle className="text-red-600" />;
      case "info":
        return <Info className="text-blue-600" />;
      default:
        return <Info className="text-blue-600" />;
    }
  };

  if (isComplete && outcome) {
    return (
      <div className="min-h-screen bg-liberty-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="bg-liberty-base border-liberty-secondary/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-liberty-primary/10 rounded-full flex items-center justify-center">
                {getAlertIcon(outcome.type)}
              </div>
              <CardTitle className="text-2xl font-reckless text-liberty-standard mb-2">
                Assessment Complete
              </CardTitle>
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm max-w-md mx-auto">
                    <span className="text-liberty-standard/70">Progress</span>
                    <span className="text-liberty-primary font-medium">100%</span>
                  </div>
                  <div className="relative max-w-md mx-auto">
                    <Progress value={100} className="h-3 bg-liberty-secondary/30" />
                    <div 
                      className="absolute top-0 left-0 h-3 w-full bg-liberty-primary rounded-full"
                    />
                  </div>
                </div>
              </div>
              <CardDescription className="text-liberty-standard/70">
                Based on your answers, here's what we found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant={getAlertVariant(outcome.type)}>
                {getAlertIcon(outcome.type)}
                <AlertTitle className="text-lg">{outcome.title}</AlertTitle>
                <AlertDescription className="mt-2 text-base">
                  {outcome.message}
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={handleRestart}
                className="border-liberty-secondary text-liberty-standard hover:bg-liberty-secondary/10"
              >
                <ArrowLeft className="w-4 h-4" />
                Start Over
              </Button>
              {outcome.type === "success" && (
                <Button className="bg-liberty-primary hover:bg-liberty-primary/90 text-white">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
              {outcome.type === "info" && (
                <Button className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-standard">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-liberty-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-liberty-base border-liberty-secondary/20">
          <CardHeader>
            <div className="flex items-center justify-between mb-6">
              <CardTitle className="text-2xl font-reckless text-liberty-standard">
                Eligibility Check
              </CardTitle>
              <div className="text-sm text-liberty-standard/60 font-medium bg-liberty-secondary/20 px-3 py-1 rounded-full">
                Question {answeredQuestions + 1} of {totalQuestions}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-liberty-standard/70">Progress</span>
                  <span className="text-liberty-primary font-medium">{Math.round(progress)}%</span>
                </div>
                <div className="relative">
                  <Progress 
                    value={progress} 
                    className="h-3 bg-liberty-secondary/30" 
                  />
                  <div 
                    className="absolute top-0 left-0 h-3 bg-liberty-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <CardDescription className="text-liberty-standard/70">
                Let's determine if your building qualifies for Right to Manage or Collective Enfranchisement
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-liberty-standard mb-2">
                  {currentQuestion.question}
                </h3>
                {currentQuestion.description && (
                  <p className="text-sm text-liberty-standard/70 mb-4">
                    {currentQuestion.description}
                  </p>
                )}
              </div>

              {currentQuestion.type === "radio" && (
                <RadioGroup 
                  value={currentAnswer.toString()} 
                  onValueChange={handleAnswerChange}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option: any) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem 
                        value={option.value} 
                        id={option.value}
                        className="border-liberty-secondary text-liberty-primary"
                      />
                      <Label 
                        htmlFor={option.value}
                        className="text-liberty-standard cursor-pointer flex-1 py-3 px-4 rounded-lg border border-transparent hover:border-liberty-secondary/50 hover:bg-liberty-secondary/5 transition-all"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === "number" && (
                <div>
                  <Label className="text-liberty-standard mb-2 block">
                    Number of flats
                  </Label>
                  <Input
                    type="number"
                    value={currentAnswer}
                    onChange={(e) => handleAnswerChange(Number(e.target.value))}
                    min={currentQuestion.validation?.min || 0}
                    placeholder="Enter number of flats"
                    className="border-liberty-secondary focus:border-liberty-primary"
                  />
                  {currentQuestion.validation?.min && (
                    <p className="text-sm text-liberty-standard/60 mt-1">
                      Minimum {currentQuestion.validation.min} flats required
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={answers.length === 0}
              className="border-liberty-secondary text-liberty-standard hover:bg-liberty-secondary/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!currentAnswer}
              className="bg-liberty-primary hover:bg-liberty-primary/90 text-white"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
