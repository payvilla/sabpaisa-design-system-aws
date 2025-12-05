import { TrendingDown, TrendingUp } from 'lucide-react';

export interface AmountDisplayProps {
  amount: number;
  type?: 'credit' | 'debit' | 'neutral';
  currency?: 'INR' | 'USD' | 'EUR' | 'GBP';
  showSign?: boolean;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bold?: boolean;
  className?: string;
}

export default function AmountDisplay({
  amount,
  type = 'neutral',
  currency = 'INR',
  showSign = true,
  showIcon = false,
  size = 'md',
  bold = false,
  className = '',
}: AmountDisplayProps) {
  // Format amount based on currency
  const formatAmount = (value: number, curr: string) => {
    const locale = curr === 'INR' ? 'en-IN' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(value));
  };

  // Type colors (from design system transaction colors)
  const typeColors = {
    credit: 'text-green-600 dark:text-green-400',
    debit: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-900 dark:text-white',
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-2xl',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  // Determine sign
  const sign = showSign && type !== 'neutral' ? (type === 'credit' ? '+' : '-') : '';

  // Get icon
  const Icon = type === 'credit' ? TrendingUp : type === 'debit' ? TrendingDown : null;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        ${sizeClasses[size]}
        ${bold ? 'font-bold' : 'font-semibold'}
        ${typeColors[type]}
        ${className}
      `}
    >
      {showIcon && Icon && <Icon className={iconSizes[size]} />}
      <span>
        {sign}
        {formatAmount(amount, currency)}
      </span>
    </span>
  );
}

// Convenience components for common use cases
export function CreditAmount({ amount, ...props }: Omit<AmountDisplayProps, 'type'>) {
  return <AmountDisplay amount={amount} type="credit" {...props} />;
}

export function DebitAmount({ amount, ...props }: Omit<AmountDisplayProps, 'type'>) {
  return <AmountDisplay amount={amount} type="debit" {...props} />;
}
