import { CheckCircle2, AlertCircle, Info } from "lucide-react";

// Shared utility functions that both questionnaire components use
export const getAlertVariant = (type: string) => {
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

export const getAlertIcon = (type: string) => {
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
