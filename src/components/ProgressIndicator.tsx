import React from 'react';
import { Check } from 'lucide-react';
import { Step } from '../types';

interface ProgressIndicatorProps {
  currentStep: Step;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 'customer-name', label: '名前' },
    { id: 'amount', label: '金額' },
    { id: 'qr-code', label: 'QRコード' },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  const getStepStatus = (stepId: string) => {
    const currentIndex = getCurrentStepIndex();
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    
    if (stepIndex < currentIndex) {
      return 'completed';
    } else if (stepIndex === currentIndex) {
      return 'current';
    } else {
      return 'upcoming';
    }
  };

  return (
    <div className="w-full mb-8">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          
          return (
            <li key={step.id} className="flex items-center relative">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                status === 'completed' ? 'bg-blue-600 border-blue-600 text-white' :
                status === 'current' ? 'border-blue-600 text-blue-600' :
                'border-gray-300 text-gray-300'
              }`}>
                {status === 'completed' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {/* Step label */}
              <span className={`ml-2 text-sm ${
                status === 'completed' ? 'text-blue-600' :
                status === 'current' ? 'text-blue-600 font-medium' :
                'text-gray-500'
              }`}>
                {step.label}
              </span>
              
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  status === 'completed' ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ProgressIndicator;