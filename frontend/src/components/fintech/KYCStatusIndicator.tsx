import { CheckCircle, Circle, Clock, XCircle } from 'lucide-react';

export interface KYCStep {
  id: string;
  label: string;
  description?: string;
  status: 'completed' | 'current' | 'pending' | 'failed';
}

export interface KYCStatusIndicatorProps {
  steps: KYCStep[];
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export default function KYCStatusIndicator({
  steps,
  orientation = 'vertical',
  className = '',
}: KYCStatusIndicatorProps) {
  const getStepIcon = (status: KYCStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />;
      case 'current':
        return <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />;
      case 'failed':
        return <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />;
      case 'pending':
        return <Circle className="w-6 h-6 text-gray-400 dark:text-gray-600" />;
    }
  };

  const getStepColor = (status: KYCStep['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400';
      case 'current':
        return 'text-blue-600 dark:text-blue-400';
      case 'failed':
        return 'text-red-600 dark:text-red-400';
      case 'pending':
        return 'text-gray-400 dark:text-gray-600';
    }
  };

  const getConnectorColor = (status: KYCStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600 dark:bg-green-400';
      case 'current':
        return 'bg-blue-600 dark:bg-blue-400';
      case 'failed':
        return 'bg-red-600 dark:bg-red-400';
      case 'pending':
        return 'bg-gray-300 dark:bg-gray-700';
    }
  };

  if (orientation === 'horizontal') {
    return (
      <div className={`flex items-center ${className}`}>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">{getStepIcon(step.status)}</div>
              <p className={`text-sm font-medium ${getStepColor(step.status)}`}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {step.description}
                </p>
              )}
            </div>
            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 ${getConnectorColor(steps[index].status)}`}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((step, index) => (
        <div key={step.id} className="relative flex gap-4">
          {/* Icon and Connector */}
          <div className="relative flex flex-col items-center">
            <div className="flex-shrink-0">{getStepIcon(step.status)}</div>
            {index < steps.length - 1 && (
              <div
                className={`absolute top-8 w-0.5 h-full ${getConnectorColor(step.status)}`}
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-8">
            <h4 className={`text-base font-semibold mb-1 ${getStepColor(step.status)}`}>
              {step.label}
            </h4>
            {step.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            )}
            {step.status === 'current' && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  In Progress
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
