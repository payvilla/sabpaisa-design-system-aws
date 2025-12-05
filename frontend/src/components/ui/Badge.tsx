import { ReactNode } from 'react';
import { X } from 'lucide-react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'subtle';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onDismiss?: () => void;
  className?: string;
}

export default function Badge({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  onDismiss,
  className = '',
}: BadgeProps) {
  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  // Variant and color combinations
  const variantColorClasses = {
    solid: {
      primary: 'bg-primary-600 text-white dark:bg-primary-500',
      secondary: 'bg-secondary-600 text-white dark:bg-secondary-500',
      success: 'bg-green-600 text-white dark:bg-green-500',
      error: 'bg-red-600 text-white dark:bg-red-500',
      warning: 'bg-amber-600 text-white dark:bg-amber-500',
      info: 'bg-blue-600 text-white dark:bg-blue-500',
      gray: 'bg-gray-600 text-white dark:bg-gray-500',
    },
    outline: {
      primary: 'border-2 border-primary-600 text-primary-700 dark:text-primary-400 dark:border-primary-400',
      secondary: 'border-2 border-secondary-600 text-secondary-700 dark:text-secondary-400 dark:border-secondary-400',
      success: 'border-2 border-green-600 text-green-700 dark:text-green-400 dark:border-green-400',
      error: 'border-2 border-red-600 text-red-700 dark:text-red-400 dark:border-red-400',
      warning: 'border-2 border-amber-600 text-amber-700 dark:text-amber-400 dark:border-amber-400',
      info: 'border-2 border-blue-600 text-blue-700 dark:text-blue-400 dark:border-blue-400',
      gray: 'border-2 border-gray-600 text-gray-700 dark:text-gray-400 dark:border-gray-400',
    },
    subtle: {
      primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
      secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300',
      success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    },
  };

  const baseClasses = 'inline-flex items-center gap-1.5 font-medium rounded-full transition-colors';
  const colorClasses = variantColorClasses[variant][color];

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${colorClasses} ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <span className={`${iconSizes[size]} flex-shrink-0`}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={`${iconSizes[size]} flex-shrink-0`}>{icon}</span>
      )}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`${iconSizes[size]} flex-shrink-0 hover:opacity-70 transition-opacity`}
          aria-label="Dismiss"
        >
          <X className="w-full h-full" />
        </button>
      )}
    </span>
  );
}
