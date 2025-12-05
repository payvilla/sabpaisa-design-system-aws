import { CreditCard, Smartphone, Building2, Wallet, QrCode } from 'lucide-react';

export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet' | 'qr';

export interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  icon: typeof CreditCard;
  description: string;
  disabled?: boolean;
}

export interface PaymentMethodSelectorProps {
  selectedMethod?: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  disabledMethods?: PaymentMethod[];
  className?: string;
}

const paymentMethods: PaymentMethodOption[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, RuPay',
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: Smartphone,
    description: 'Google Pay, PhonePe, Paytm',
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: Building2,
    description: 'All major banks',
  },
  {
    id: 'wallet',
    name: 'Wallet',
    icon: Wallet,
    description: 'Paytm, PhonePe, Amazon Pay',
  },
  {
    id: 'qr',
    name: 'QR Code',
    icon: QrCode,
    description: 'Scan and pay',
  },
];

export default function PaymentMethodSelector({
  selectedMethod,
  onSelect,
  disabledMethods = [],
  className = '',
}: PaymentMethodSelectorProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Select Payment Method
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          const isDisabled = disabledMethods.includes(method.id);

          return (
            <button
              key={method.id}
              onClick={() => !isDisabled && onSelect(method.id)}
              disabled={isDisabled}
              className={`
                relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                text-left
                ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }
                ${
                  isDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:border-primary-400 dark:hover:border-primary-500 cursor-pointer'
                }
                ${isSelected ? 'shadow-md' : 'hover:shadow-sm'}
              `}
            >
              {/* Icon */}
              <div
                className={`
                  flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                  ${
                    isSelected
                      ? 'bg-primary-600 dark:bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }
                `}
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`
                    text-base font-semibold mb-0.5
                    ${
                      isSelected
                        ? 'text-primary-900 dark:text-primary-200'
                        : 'text-gray-900 dark:text-white'
                    }
                  `}
                >
                  {method.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {method.description}
                </p>
              </div>

              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
