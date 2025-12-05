import { CheckCircle, Clock, RotateCcw, XCircle, AlertCircle, Loader } from 'lucide-react';

export type TransactionStatus = 'pending' | 'settled' | 'failed' | 'refunded' | 'processing';
export type KYCStatus = 'pending' | 'approved' | 'rejected' | 'under_review';

export interface StatusBadgeProps {
  status: TransactionStatus | KYCStatus | string;
  type?: 'transaction' | 'kyc';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export default function StatusBadge({
  status,
  type = 'transaction',
  size = 'md',
  showIcon = true,
  className = '',
}: StatusBadgeProps) {
  // Status configurations
  const transactionStatuses = {
    pending: {
      label: 'Pending',
      icon: Clock,
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    },
    processing: {
      label: 'Processing',
      icon: Loader,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    },
    settled: {
      label: 'Settled',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    },
    failed: {
      label: 'Failed',
      icon: XCircle,
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    },
    refunded: {
      label: 'Refunded',
      icon: RotateCcw,
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    },
  };

  const kycStatuses = {
    pending: {
      label: 'Pending',
      icon: Clock,
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    },
    under_review: {
      label: 'Under Review',
      icon: AlertCircle,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    },
    approved: {
      label: 'Approved',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    },
    rejected: {
      label: 'Rejected',
      icon: XCircle,
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    },
  };

  const statusConfigs = type === 'transaction' ? transactionStatuses : kycStatuses;
  const statusConfig = statusConfigs[status as keyof typeof statusConfigs] || {
    label: status,
    icon: AlertCircle,
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  };

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

  const Icon = statusConfig.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${sizeClasses[size]}
        ${statusConfig.color}
        ${className}
      `}
    >
      {showIcon && <Icon className={`${iconSizes[size]} ${status === 'processing' ? 'animate-spin' : ''}`} />}
      {statusConfig.label}
    </span>
  );
}

// Convenience components
export function TransactionStatusBadge({ status, ...props }: Omit<StatusBadgeProps, 'type'>) {
  return <StatusBadge status={status} type="transaction" {...props} />;
}

export function KYCStatusBadge({ status, ...props }: Omit<StatusBadgeProps, 'type'>) {
  return <StatusBadge status={status} type="kyc" {...props} />;
}
