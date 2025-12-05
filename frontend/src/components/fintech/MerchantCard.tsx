import { Building2, Mail, Phone, MapPin, ExternalLink, CheckCircle } from 'lucide-react';
import { KYCStatusBadge } from './StatusBadge';
import { KYCStatus } from './StatusBadge';

export interface MerchantCardProps {
  merchantId: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  kycStatus: KYCStatus;
  verified?: boolean;
  onViewDetails?: () => void;
  className?: string;
}

export default function MerchantCard({
  merchantId,
  businessName,
  contactPerson,
  email,
  phone,
  address,
  kycStatus,
  verified = false,
  onViewDetails,
  className = '',
}: MerchantCardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
        p-6 hover:shadow-lg transition-shadow duration-200
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {/* Business Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>

          {/* Business Info */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {businessName}
              </h3>
              {verified && (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{contactPerson}</p>
          </div>
        </div>

        {/* KYC Status */}
        <KYCStatusBadge status={kycStatus} size="sm" />
      </div>

      {/* Merchant ID */}
      <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">Merchant ID</p>
        <p className="text-sm font-mono font-semibold text-gray-900 dark:text-white">
          {merchantId}
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-300 truncate">{email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-300">{phone}</span>
        </div>

        <div className="flex items-start gap-3 text-sm">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <span className="text-gray-700 dark:text-gray-300">{address}</span>
        </div>
      </div>

      {/* View Details Button */}
      {onViewDetails && (
        <button
          onClick={onViewDetails}
          className="
            w-full flex items-center justify-center gap-2 px-4 py-2.5
            text-sm font-medium text-primary-600 dark:text-primary-400
            hover:bg-primary-50 dark:hover:bg-primary-900/20
            rounded-lg transition-colors border border-primary-200 dark:border-primary-800
          "
        >
          View Merchant Details
          <ExternalLink className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
