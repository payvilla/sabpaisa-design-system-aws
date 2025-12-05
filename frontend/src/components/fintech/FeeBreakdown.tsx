import { Info, TrendingDown } from 'lucide-react';
import AmountDisplay from './AmountDisplay';

export interface FeeItem {
  label: string;
  amount: number;
  description?: string;
  percentage?: number;
}

export interface FeeBreakdownProps {
  transactionAmount: number;
  processingFee: FeeItem;
  gst: FeeItem;
  additionalFees?: FeeItem[];
  showPercentage?: boolean;
  className?: string;
}

export default function FeeBreakdown({
  transactionAmount,
  processingFee,
  gst,
  additionalFees = [],
  showPercentage = true,
  className = '',
}: FeeBreakdownProps) {
  const totalFees =
    processingFee.amount +
    gst.amount +
    additionalFees.reduce((sum, fee) => sum + fee.amount, 0);
  const netAmount = transactionAmount - totalFees;

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
        p-6
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingDown className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Fee Breakdown</h3>
      </div>

      {/* Transaction Amount */}
      <div className="mb-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
            Transaction Amount
          </span>
          <AmountDisplay amount={transactionAmount} type="neutral" size="md" bold />
        </div>
      </div>

      {/* Fee Items */}
      <div className="space-y-3 mb-4">
        {/* Processing Fee */}
        <FeeItem
          item={processingFee}
          showPercentage={showPercentage}
          baseAmount={transactionAmount}
        />

        {/* GST */}
        <FeeItem
          item={gst}
          showPercentage={showPercentage}
          baseAmount={processingFee.amount}
        />

        {/* Additional Fees */}
        {additionalFees.map((fee, index) => (
          <FeeItem
            key={index}
            item={fee}
            showPercentage={showPercentage}
            baseAmount={transactionAmount}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="border-t-2 border-gray-200 dark:border-gray-700 my-4" />

      {/* Total Fees */}
      <div className="mb-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-red-900 dark:text-red-200">
            Total Fees Deducted
          </span>
          <AmountDisplay amount={totalFees} type="debit" size="md" bold showSign />
        </div>
      </div>

      {/* Net Amount */}
      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-green-900 dark:text-green-200">
            You Receive
          </span>
          <AmountDisplay amount={netAmount} type="credit" size="lg" bold showIcon />
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
        <Info className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Fees are calculated based on your merchant category and pricing plan. Contact support
          for custom pricing options.
        </p>
      </div>
    </div>
  );
}

// Helper component for individual fee items
function FeeItem({
  item,
  showPercentage,
  baseAmount,
}: {
  item: FeeItem;
  showPercentage: boolean;
  baseAmount: number;
}) {
  const percentage = item.percentage || (item.amount / baseAmount) * 100;

  return (
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
          {showPercentage && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({percentage.toFixed(2)}%)
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
        )}
      </div>
      <AmountDisplay amount={item.amount} type="debit" size="sm" showSign={false} />
    </div>
  );
}
