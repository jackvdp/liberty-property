"use client";

import { useEffect, useState } from "react";
import { EligibilityData } from "@/components/questionnaire";

interface RMCProcessClientProps {
  eligibilityId?: string;
}

export function RMCProcessClient({ eligibilityId }: RMCProcessClientProps) {
  const [eligibilityData, setEligibilityData] = useState<EligibilityData | null>(null);
  
  useEffect(() => {
    if (eligibilityId && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(`liberty-bell-eligibility-${eligibilityId}`);
        if (stored) {
          const parsedData = JSON.parse(stored);
          setEligibilityData(parsedData);
          console.log('Loaded eligibility data for RMC process:', parsedData);
        }
      } catch (error) {
        console.error('Failed to load eligibility data:', error);
      }
    }
  }, [eligibilityId]);

  return (
    <div className="min-h-screen bg-liberty-base flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-reckless font-bold text-liberty-standard mb-6">
          RMC Process
        </h1>
        <p className="text-lg text-liberty-standard/70 mb-8">
          Since there's already a management structure in place, we can help you take control of it or make it work better for all leaseholders.
        </p>
        
        {eligibilityData && (
          <div className="bg-liberty-primary/10 rounded-lg p-4 border border-liberty-primary/20 mb-8">
            <h3 className="font-semibold text-liberty-primary mb-2">Based on your eligibility check:</h3>
            <div className="text-sm text-liberty-standard/70 space-y-1">
              <p>Building: {eligibilityData.derivedData?.flatCount} flats</p>
              <p>Status: {eligibilityData.derivedData?.rmcStatus}</p>
              <p>Path: {eligibilityData.derivedData?.provisionalPath}</p>
            </div>
          </div>
        )}
        
        <div className="bg-liberty-secondary/20 rounded-lg p-8 border border-liberty-secondary/30">
          <p className="text-liberty-standard/60">
            RMC takeover and improvement tools coming soon...
          </p>
          {process.env.NODE_ENV === 'development' && eligibilityData && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-xs">Debug: Eligibility Data</summary>
              <pre className="text-[10px] bg-gray-100 p-2 rounded mt-2 overflow-auto">
                {JSON.stringify(eligibilityData, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
