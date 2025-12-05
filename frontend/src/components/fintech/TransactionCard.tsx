import { Calendar, ExternalLink } from 'lucide-react';
import AmountDisplay from './AmountDisplay';
import StatusBadge, { TransactionStatus } from './StatusBadge';

export interface TransactionCardProps {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  status: TransactionStatus;
  date: string;
  description: string;
  paymentMethod?: string;
  merchantName?: string;
  utr?: string;
  onViewDetails?: () => void;
  className?: string;
}

export default function TransactionCard({
  id,
  amount,
  type,
  status,
  date,
  description,
  paymentMethod,
  merchantName,
  utr,
  onViewDetails,
  className = '',
}: TransactionCardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
        p-4 hover:shadow-lg transition-shadow duration-200
        ${className}
      `}
    >
      {/* Header: Description and Amount */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            {description}
          </h3>
          {merchantName && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {merchantName}
            </p>
          )}
        </div>
        <AmountDisplay
          amount={amount}
          type={type}
          size="lg"
          bold
          showSign
          showIcon
        />
      </div>

      {/* Status and Date Row */}
      <div className="flex items-center justify-between mb-3">
        <StatusBadge status={status} type="transaction" size="sm" />
        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
          <Calendar className="w-3.5 h-3.5" />
          {date}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Transaction ID:</span>
          <span className="font-mono text-gray-900 dark:text-white">{id}</span>
        </div>
        {paymentMethod && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
            <span className="text-gray-900 dark:text-white">{paymentMethod}</span>
          </div>
        )}
        {utr && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">UTR:</span>
            <span className="font-mono text-gray-900 dark:text-white">{utr}</span>
          </div>
        )}
      </div>

      {/* View Details Button */}
      {onViewDetails && (
        <button
          onClick={onViewDetails}
          className="
            mt-3 w-full flex items-center justify-center gap-2
            px-4 py-2 text-sm font-medium
            text-primary-600 dark:text-primary-400
            hover:bg-primary-50 dark:hover:bg-primary-900/20
            rounded-lg transition-colors
          "
        >
          View Full Details
          <ExternalLink className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
