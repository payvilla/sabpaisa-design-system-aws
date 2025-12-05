import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

const createIcon = (displayName: string, path: string | JSX.Element) => {
  const Icon = ({ size = 24, strokeWidth = 2, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {path}
    </svg>
  );
  Icon.displayName = displayName;
  return Icon;
};

// ==================== PAYMENT METHODS (12 icons) ====================

export const CreditCardIcon = createIcon(
  'CreditCardIcon',
  <>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </>
);

export const DebitCardIcon = createIcon(
  'DebitCardIcon',
  <>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <circle cx="6" cy="15" r="1" />
  </>
);

export const UPIIcon = createIcon(
  'UPIIcon',
  <>
    <path d="M12 2L2 7v10c0 5 10 5 10 5s10 0 10-5V7z" />
    <path d="M8 11h8M8 15h4" />
  </>
);

export const NetBankingIcon = createIcon(
  'NetBankingIcon',
  <>
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <path d="M9 9v12M15 9v12" />
    <circle cx="12" cy="7" r="2" />
  </>
);

export const WalletIcon = createIcon(
  'WalletIcon',
  <>
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </>
);

export const QRCodeIcon = createIcon(
  'QRCodeIcon',
  <>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" />
  </>
);

export const CashOnDeliveryIcon = createIcon(
  'CashOnDeliveryIcon',
  <>
    <circle cx="12" cy="12" r="8" />
    <path d="M9.5 14.5L12 12l2.5 2.5" />
    <path d="M12 16V8" />
    <path d="M16 20h6M18 18v4" />
  </>
);

export const EMIIcon = createIcon(
  'EMIIcon',
  <>
    <rect x="2" y="7" width="20" height="10" rx="2" />
    <path d="M6 11v2M10 11v2M14 11v2M18 11v2" />
    <path d="M2 14h20" />
  </>
);

export const InternationalCardIcon = createIcon(
  'InternationalCardIcon',
  <>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <circle cx="18" cy="15" r="2" />
  </>
);

export const TokenizedCardIcon = createIcon(
  'TokenizedCardIcon',
  <>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <path d="M15 15l2-2 2 2M17 13v4" />
  </>
);

export const RecurringPaymentIcon = createIcon(
  'RecurringPaymentIcon',
  <>
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M12 7v5l3 3" />
  </>
);

export const SavedCardIcon = createIcon(
  'SavedCardIcon',
  <>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <path d="M16 15l2 2 4-4" />
  </>
);

// ==================== TRANSACTION ICONS (15 icons) ====================

export const PaymentSuccessIcon = createIcon(
  'PaymentSuccessIcon',
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </>
);

export const PaymentFailedIcon = createIcon(
  'PaymentFailedIcon',
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </>
);

export const PaymentPendingIcon = createIcon(
  'PaymentPendingIcon',
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </>
);

export const PaymentRefundedIcon = createIcon(
  'PaymentRefundedIcon',
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8M12 8l-4 4 4 4" />
  </>
);

export const CreditArrowIcon = createIcon(
  'CreditArrowIcon',
  <>
    <path d="M12 19V5M5 12l7-7 7 7" />
    <circle cx="12" cy="19" r="2" />
  </>
);

export const DebitArrowIcon = createIcon(
  'DebitArrowIcon',
  <>
    <path d="M12 5v14M19 12l-7 7-7-7" />
    <circle cx="12" cy="5" r="2" />
  </>
);

export const SettlementIcon = createIcon(
  'SettlementIcon',
  <>
    <path d="M3 3v18h18" />
    <path d="M18 17V9l-5 5-4-4-3 3" />
  </>
);

export const ReconciliationIcon = createIcon(
  'ReconciliationIcon',
  <>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </>
);

export const ChargebackIcon = createIcon(
  'ChargebackIcon',
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M16 12H8M12 16l-4-4 4-4" />
  </>
);

export const DisputeIcon = createIcon(
  'DisputeIcon',
  <>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M12 8v4M12 16h.01" />
  </>
);

export const InvoiceIcon = createIcon(
  'InvoiceIcon',
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </>
);

export const ReceiptIcon = createIcon(
  'ReceiptIcon',
  <>
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6" />
  </>
);

export const StatementIcon = createIcon(
  'StatementIcon',
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
  </>
);

export const BatchIcon = createIcon(
  'BatchIcon',
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </>
);

export const TransactionHistoryIcon = createIcon(
  'TransactionHistoryIcon',
  <>
    <path d="M3 3v18h18" />
    <path d="M7 16l4-4 4 4 6-6" />
  </>
);

// ==================== BANKING ICONS (10 icons) ====================

export const BankAccountIcon = createIcon(
  'BankAccountIcon',
  <>
    <path d="M3 21h18" />
    <path d="M4 21V10l8-7 8 7v11" />
    <path d="M9 21v-8h6v8" />
    <circle cx="12" cy="7" r="2" />
  </>
);

export const IFSCCodeIcon = createIcon(
  'IFSCCodeIcon',
  <>
    <rect x="3" y="7" width="18" height="10" rx="2" />
    <path d="M7 11h2M11 11h2M15 11h2M7 15h2M11 15h2M15 15h2" />
  </>
);

export const AccountVerificationIcon = createIcon(
  'AccountVerificationIcon',
  <>
    <path d="M3 21h18" />
    <path d="M4 21V10l8-7 8 7v11" />
    <path d="M9 13l2 2 4-4" />
  </>
);

export const BankTransferIcon = createIcon(
  'BankTransferIcon',
  <>
    <path d="M3 21h18" />
    <path d="M4 21V10l8-7 8 7v11" />
    <path d="M16 11l-4 4-4-4M12 15V8" />
  </>
);

export const NEFTIcon = createIcon(
  'NEFTIcon',
  <>
    <path d="M21 12H3M3 12l4-4M3 12l4 4" />
    <path d="M21 6v12" />
  </>
);

export const RTGSIcon = createIcon(
  'RTGSIcon',
  <>
    <path d="M3 12h18M21 12l-4-4M21 12l-4 4" />
    <path d="M3 6v12" />
  </>
);

export const IMPSIcon = createIcon(
  'IMPSIcon',
  <>
    <path d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4" />
    <circle cx="12" cy="12" r="2" />
  </>
);

export const PayoutIcon = createIcon(
  'PayoutIcon',
  <>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </>
);

export const WithdrawalIcon = createIcon(
  'WithdrawalIcon',
  <>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M12 11v6M9 14l3 3 3-3" />
  </>
);

export const DepositIcon = createIcon(
  'DepositIcon',
  <>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M12 17v-6M15 14l-3-3-3 3" />
  </>
);

// ==================== MERCHANT/BUSINESS ICONS (8 icons) ====================

export const MerchantPortalIcon = createIcon(
  'MerchantPortalIcon',
  <>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
    <path d="M7 7h10M7 11h4" />
  </>
);

export const DashboardIcon = createIcon(
  'DashboardIcon',
  <>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </>
);

export const ReportsIcon = createIcon(
  'ReportsIcon',
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h2M8 17h6" />
  </>
);

export const AnalyticsIcon = createIcon(
  'AnalyticsIcon',
  <>
    <path d="M3 3v18h18" />
    <path d="M18 17V9M13 17v-3M8 17v-6" />
  </>
);

export const KYCDocumentIcon = createIcon(
  'KYCDocumentIcon',
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <circle cx="10" cy="13" r="2" />
    <path d="M6 18c0-1.5 2-2 4-2s4 .5 4 2" />
  </>
);

export const BusinessRegistrationIcon = createIcon(
  'BusinessRegistrationIcon',
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 11l2 2 4-4" />
    <path d="M8 3v18M16 3v18M3 8h18M3 16h18" />
  </>
);

export const APIKeyIcon = createIcon(
  'APIKeyIcon',
  <>
    <circle cx="12" cy="16" r="1" />
    <rect x="3" y="10" width="18" height="12" rx="2" />
    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
  </>
);

export const WebhookIcon = createIcon(
  'WebhookIcon',
  <>
    <path d="M18 16.5a2.5 2.5 0 0 1-2.5 2.5H8a2.5 2.5 0 0 1 0-5h7.5a2.5 2.5 0 0 1 0 5H8a2.5 2.5 0 0 1-2.5-2.5V7.5A2.5 2.5 0 0 1 8 5h7.5a2.5 2.5 0 0 1 0 5" />
  </>
);

// ==================== SECURITY ICONS (8 icons) ====================

export const TwoFactorAuthIcon = createIcon(
  'TwoFactorAuthIcon',
  <>
    <path d="M12 2L2 7v10c0 5 10 5 10 5s10 0 10-5V7z" />
    <path d="M9 12l2 2 4-4" />
  </>
);

export const OTPIcon = createIcon(
  'OTPIcon',
  <>
    <rect x="3" y="7" width="18" height="10" rx="2" />
    <path d="M7 11h2M11 11h2M15 11h2" />
  </>
);

export const BiometricIcon = createIcon(
  'BiometricIcon',
  <>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </>
);

export const EncryptionIcon = createIcon(
  'EncryptionIcon',
  <>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" />
  </>
);

export const SSLCertificateIcon = createIcon(
  'SSLCertificateIcon',
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 11l2 2 4-4" />
    <path d="M7 7h10M7 17h6" />
  </>
);

export const SecurityShieldIcon = createIcon(
  'SecurityShieldIcon',
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </>
);

export const FraudDetectionIcon = createIcon(
  'FraudDetectionIcon',
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4M12 16h.01" />
  </>
);

export const RiskScoreIcon = createIcon(
  'RiskScoreIcon',
  <>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" />
    <path d="M12 9v4M12 17h.01" />
  </>
);

// ==================== GENERAL FINTECH ICONS (10 icons) ====================

export const FeeIcon = createIcon(
  'FeeIcon',
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.5 14.5L12 12l2.5 2.5M12 16V8" />
  </>
);

export const CommissionIcon = createIcon(
  'CommissionIcon',
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6" />
  </>
);

export const GSTIcon = createIcon(
  'GSTIcon',
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 7h4M7 12h6M7 17h4" />
  </>
);

export const RupeeIcon = createIcon(
  'RupeeIcon',
  <>
    <path d="M6 3h12M6 8h12M6 8a4 4 0 0 0 4 4h4M10 12L6 21" />
  </>
);

export const AmountIcon = createIcon(
  'AmountIcon',
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6" />
  </>
);

export const CalendarIcon = createIcon(
  'CalendarIcon',
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </>
);

export const ClockIcon = createIcon(
  'ClockIcon',
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </>
);

export const NotificationIcon = createIcon(
  'NotificationIcon',
  <>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </>
);

export const ExchangeIcon = createIcon(
  'ExchangeIcon',
  <>
    <path d="M7 16L3 12l4-4M21 12H3M17 8l4 4-4 4" />
  </>
);

export const LimitIcon = createIcon(
  'LimitIcon',
  <>
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    <circle cx="12" cy="2" r="1" />
    <circle cx="12" cy="22" r="1" />
  </>
);
