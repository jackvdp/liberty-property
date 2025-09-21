import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";

import { QuestionnaireValue } from "./types";

interface SharedInputProps {
  question: {
    id: string;
    question: string;
    description?: string;
    required?: boolean;
    options?: Array<{ 
      value: string; 
      label: string; 
      description?: string;
      link?: string;  // Add link support
    }>;
    validation?: {
      min?: number;
      max?: number;
      acceptedTypes?: string[];
      maxSize?: string;
    };
  };
  value: QuestionnaireValue;
  onChange: (value: QuestionnaireValue) => void;
  onCheckboxChange?: (fieldId: string, optionValue: string, checked: boolean) => void;
}

export function RadioInput({ question, value, onChange }: SharedInputProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium text-liberty-standard">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {question.description && (
        <p className="text-sm text-liberty-standard/60">{question.description}</p>
      )}
      <RadioGroup 
        value={value?.toString() || ""} 
        onValueChange={onChange}
      >
        {question.options?.map((option, index) => {
          const isSelected = value?.toString() === option.value;
          return (
            <motion.div 
              key={option.value} 
              className={`flex items-start space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected 
                  ? 'border-liberty-primary bg-liberty-primary/5 shadow-xs' 
                  : 'border-liberty-secondary hover:border-liberty-secondary hover:bg-liberty-secondary/5 shadow-xs'
              }`}
              onClick={() => onChange(option.value)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.002 }}
              whileTap={{ scale: 0.998 }}
            >
              <RadioGroupItem 
                value={option.value} 
                id={`${question.id}-${option.value}`}
                className={`mt-1 ${
                  isSelected 
                    ? 'border-liberty-primary text-liberty-primary' 
                    : 'border-liberty-secondary/50'
                }`}
              />
              <div className="flex-1">
                <Label 
                  htmlFor={`${question.id}-${option.value}`}
                  className={`cursor-pointer font-medium text-base transition-colors ${
                    isSelected 
                      ? 'text-liberty-primary' 
                      : 'text-liberty-standard'
                  }`}
                >
                  {option.label}
                </Label>
                {option.description && (
                  <p className="text-sm text-liberty-standard/60 mt-1">{option.description}</p>
                )}
                {option.link && (
                  <a 
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-liberty-primary hover:underline mt-1 inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Learn more about {option.label} →
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </RadioGroup>
    </div>
  );
}

export function TextInput({ question, value, onChange, type = "text" }: SharedInputProps & { type?: string }) {
  const stringValue = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
  
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium text-liberty-standard">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {question.description && (
        <p className="text-sm text-liberty-standard/60">{question.description}</p>
      )}
      <Input
        type={type}
        value={stringValue}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        min={question.validation?.min}
        max={question.validation?.max}
        placeholder={type === "number" ? "Enter number" : `Enter ${type === 'email' ? 'email address' : type === 'tel' ? 'phone number' : 'your answer'}`}
        className="border-liberty-secondary focus-visible:border-liberty-primary focus-visible:ring-liberty-primary/20"
        required={question.required}
      />
    </div>
  );
}

export function CheckboxInput({ question, value, onChange, onCheckboxChange }: SharedInputProps) {
  if (question.options && question.options.length > 1) {
    // Multiple checkbox options - value should be string[]
    const currentValues: string[] = Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
    
    return (
      <div className="space-y-4">
        <Label className="text-base font-medium text-liberty-standard">
          {question.question}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {question.description && (
          <p className="text-sm text-liberty-standard/60">{question.description}</p>
        )}
        <div className="space-y-3">
          {question.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <Checkbox
                id={`${question.id}-${option.value}`}
                checked={currentValues.includes(option.value)}
                onCheckedChange={(checked) => 
                  onCheckboxChange?.(question.id, option.value, checked as boolean)
                }
                className="border-liberty-secondary data-[state=checked]:border-liberty-primary data-[state=checked]:bg-liberty-primary data-[state=checked]:text-white shadow-xs"
              />
              <Label 
                htmlFor={`${question.id}-${option.value}`}
                className="cursor-pointer text-base text-liberty-standard"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    // Single checkbox - value should be boolean
    const isChecked = Boolean(value);
    
    return (
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Checkbox
            id={question.id}
            checked={isChecked}
            onCheckedChange={(checked) => onChange(Boolean(checked))}
            className="mt-1 border-liberty-secondary data-[state=checked]:border-liberty-primary data-[state=checked]:bg-liberty-primary data-[state=checked]:text-white shadow-xs"
          />
          <div className="flex-1">
            <Label 
              htmlFor={question.id}
              className="cursor-pointer text-base font-medium text-liberty-standard"
            >
              {question.question}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {question.description && (
              <p className="text-sm text-liberty-standard/60 mt-1">{question.description}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export function FileInput({ question, onChange }: SharedInputProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium text-liberty-standard">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {question.description && (
        <p className="text-sm text-liberty-standard/60">{question.description}</p>
      )}
      <div className="border-2 border-dashed border-liberty-secondary/30 rounded-lg p-6 text-center hover:border-liberty-secondary/50 transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-liberty-standard/40 mx-auto mb-3" />
        <p className="text-sm text-liberty-standard/60 mb-2">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-liberty-standard/40">
          {question.validation?.acceptedTypes?.join(", ")} up to {question.validation?.maxSize}
        </p>
        <input
          type="file"
          className="hidden"
          accept={question.validation?.acceptedTypes?.join(",")}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange(file);
          }}
        />
      </div>
    </div>
  );
}
