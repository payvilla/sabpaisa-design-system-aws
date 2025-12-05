import { Calendar, TrendingUp, Wallet, Receipt } from 'lucide-react';
import AmountDisplay from './AmountDisplay';

export interface SettlementSummaryProps {
  batchId: string;
  settlementDate: string;
  transactionCount: number;
  grossAmount: number;
  processingFee: number;
  gst: number;
  netAmount: number;
  utr?: string;
  status: 'pending' | 'processing' | 'completed';
  className?: string;
}

export default function SettlementSummary({
  batchId,
  settlementDate,
  transactionCount,
  grossAmount,
  processingFee,
  gst,
  netAmount,
  utr,
  status,
  className = '',
}: SettlementSummaryProps) {
  const statusConfig = {
    pending: {
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      label: 'Settlement Pending',
    },
    processing: {
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      label: 'Processing Settlement',
    },
    completed: {
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      label: 'Settled',
    },
  };

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
        p-6 space-y-6
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Settlement Summary
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Batch ID: <span className="font-mono">{batchId}</span>
          </p>
        </div>
        <span
          className={`
            px-3 py-1.5 rounded-full text-sm font-medium
            ${statusConfig[status].color}
          `}
        >
          {statusConfig[status].label}
        </span>
      </div>

      {/* Settlement Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Settlement Date</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {settlementDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <Receipt className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Transactions</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {transactionCount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Amount Breakdown */}
      <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Gross Amount</span>
          <AmountDisplay amount={grossAmount} type="neutral" size="sm" />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Processing Fee</span>
          <AmountDisplay amount={processingFee} type="debit" size="sm" showSign />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">GST (18%)</span>
          <AmountDisplay amount={gst} type="debit" size="sm" showSign />
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            Net Settlement
          </span>
          <AmountDisplay amount={netAmount} type="credit" size="lg" bold showIcon />
        </div>
      </div>

      {/* UTR (if available) */}
      {utr && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <Wallet className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-medium text-green-900 dark:text-green-200 mb-0.5">
              Payment Completed
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              UTR: <span className="font-mono">{utr}</span>
            </p>
          </div>
        </div>
      )}

      {/* T+2 Notice */}
      {status === 'pending' && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 dark:text-blue-300">
            Settlement follows T+2 cycle. Amount will be credited to your account within 2 business days.
          </p>
        </div>
      )}
    </div>
  );
}
