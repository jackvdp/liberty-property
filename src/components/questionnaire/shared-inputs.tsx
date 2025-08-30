import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";

interface SharedInputProps {
  question: {
    id: string;
    question: string;
    description?: string;
    required?: boolean;
    options?: Array<{ value: string; label: string; description?: string }>;
    validation?: {
      min?: number;
      max?: number;
      acceptedTypes?: string[];
      maxSize?: string;
    };
  };
  value: any;
  onChange: (value: any) => void;
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
              </div>
            </motion.div>
          );
        })}
      </RadioGroup>
    </div>
  );
}

export function TextInput({ question, value, onChange, type = "text" }: SharedInputProps & { type?: string }) {
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
        value={value || ""}
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
    // Multiple checkbox options
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
                checked={(value || []).includes(option.value)}
                onCheckedChange={(checked) => 
                  onCheckboxChange?.(question.id, option.value, checked as boolean)
                }
                className="border-liberty-secondary/50 data-[state=checked]:border-liberty-primary data-[state=checked]:bg-liberty-primary data-[state=checked]:text-white"
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
    // Single checkbox
    return (
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Checkbox
            id={question.id}
            checked={!!value}
            onCheckedChange={onChange}
            className="mt-1 border-liberty-secondary/50 data-[state=checked]:border-liberty-primary data-[state=checked]:bg-liberty-primary data-[state=checked]:text-white"
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
          onChange={(e) => onChange(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
