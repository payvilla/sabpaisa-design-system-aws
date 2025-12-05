import * as SabPaisaIcons from '../icons/SabPaisaIcons';

export interface IconMetadata {
  name: string;
  component: React.ComponentType<any>;
  category: string;
  tags: string[];
  description: string;
}

export const iconCategories = [
  'All',
  'Payment Methods',
  'Transaction',
  'Banking',
  'Merchant',
  'Security',
  'General Fintech',
];

export const sabpaisaIcons: IconMetadata[] = [
  // ==================== PAYMENT METHODS ====================
  {
    name: 'CreditCard',
    component: SabPaisaIcons.CreditCardIcon,
    category: 'Payment Methods',
    tags: ['card', 'payment', 'credit', 'visa', 'mastercard'],
    description: 'Credit card payment method',
  },
  {
    name: 'DebitCard',
    component: SabPaisaIcons.DebitCardIcon,
    category: 'Payment Methods',
    tags: ['card', 'payment', 'debit', 'atm'],
    description: 'Debit card payment method',
  },
  {
    name: 'UPI',
    component: SabPaisaIcons.UPIIcon,
    category: 'Payment Methods',
    tags: ['upi', 'payment', 'instant', 'phonepe', 'googlepay'],
    description: 'UPI instant payment',
  },
  {
    name: 'NetBanking',
    component: SabPaisaIcons.NetBankingIcon,
    category: 'Payment Methods',
    tags: ['netbanking', 'bank', 'online', 'payment'],
    description: 'Net banking payment method',
  },
  {
    name: 'Wallet',
    component: SabPaisaIcons.WalletIcon,
    category: 'Payment Methods',
    tags: ['wallet', 'digital', 'payment', 'paytm'],
    description: 'Digital wallet payment',
  },
  {
    name: 'QRCode',
    component: SabPaisaIcons.QRCodeIcon,
    category: 'Payment Methods',
    tags: ['qr', 'scan', 'payment', 'quick'],
    description: 'QR code payment',
  },
  {
    name: 'CashOnDelivery',
    component: SabPaisaIcons.CashOnDeliveryIcon,
    category: 'Payment Methods',
    tags: ['cash', 'cod', 'delivery', 'payment'],
    description: 'Cash on delivery',
  },
  {
    name: 'EMI',
    component: SabPaisaIcons.EMIIcon,
    category: 'Payment Methods',
    tags: ['emi', 'installment', 'payment', 'monthly'],
    description: 'EMI payment option',
  },
  {
    name: 'InternationalCard',
    component: SabPaisaIcons.InternationalCardIcon,
    category: 'Payment Methods',
    tags: ['card', 'international', 'payment', 'global'],
    description: 'International card payment',
  },
  {
    name: 'TokenizedCard',
    component: SabPaisaIcons.TokenizedCardIcon,
    category: 'Payment Methods',
    tags: ['card', 'token', 'secure', 'payment'],
    description: 'Tokenized card payment',
  },
  {
    name: 'RecurringPayment',
    component: SabPaisaIcons.RecurringPaymentIcon,
    category: 'Payment Methods',
    tags: ['recurring', 'subscription', 'auto', 'payment'],
    description: 'Recurring payment setup',
  },
  {
    name: 'SavedCard',
    component: SabPaisaIcons.SavedCardIcon,
    category: 'Payment Methods',
    tags: ['card', 'saved', 'stored', 'payment'],
    description: 'Saved card for quick payment',
  },

  // ==================== TRANSACTION ====================
  {
    name: 'PaymentSuccess',
    component: SabPaisaIcons.PaymentSuccessIcon,
    category: 'Transaction',
    tags: ['success', 'completed', 'done', 'payment'],
    description: 'Successful payment',
  },
  {
    name: 'PaymentFailed',
    component: SabPaisaIcons.PaymentFailedIcon,
    category: 'Transaction',
    tags: ['failed', 'error', 'declined', 'payment'],
    description: 'Failed payment',
  },
  {
    name: 'PaymentPending',
    component: SabPaisaIcons.PaymentPendingIcon,
    category: 'Transaction',
    tags: ['pending', 'waiting', 'processing', 'payment'],
    description: 'Pending payment',
  },
  {
    name: 'PaymentRefunded',
    component: SabPaisaIcons.PaymentRefundedIcon,
    category: 'Transaction',
    tags: ['refund', 'returned', 'reversed', 'payment'],
    description: 'Refunded payment',
  },
  {
    name: 'CreditArrow',
    component: SabPaisaIcons.CreditArrowIcon,
    category: 'Transaction',
    tags: ['credit', 'incoming', 'receive', 'money'],
    description: 'Money received (credit)',
  },
  {
    name: 'DebitArrow',
    component: SabPaisaIcons.DebitArrowIcon,
    category: 'Transaction',
    tags: ['debit', 'outgoing', 'send', 'money'],
    description: 'Money sent (debit)',
  },
  {
    name: 'Settlement',
    component: SabPaisaIcons.SettlementIcon,
    category: 'Transaction',
    tags: ['settlement', 'batch', 'payout', 't2'],
    description: 'Settlement batch',
  },
  {
    name: 'Reconciliation',
    component: SabPaisaIcons.ReconciliationIcon,
    category: 'Transaction',
    tags: ['reconciliation', 'match', 'verify', 'accounts'],
    description: 'Transaction reconciliation',
  },
  {
    name: 'Chargeback',
    component: SabPaisaIcons.ChargebackIcon,
    category: 'Transaction',
    tags: ['chargeback', 'dispute', 'reverse', 'payment'],
    description: 'Payment chargeback',
  },
  {
    name: 'Dispute',
    component: SabPaisaIcons.DisputeIcon,
    category: 'Transaction',
    tags: ['dispute', 'issue', 'complaint', 'payment'],
    description: 'Transaction dispute',
  },
  {
    name: 'Invoice',
    component: SabPaisaIcons.InvoiceIcon,
    category: 'Transaction',
    tags: ['invoice', 'bill', 'document', 'payment'],
    description: 'Payment invoice',
  },
  {
    name: 'Receipt',
    component: SabPaisaIcons.ReceiptIcon,
    category: 'Transaction',
    tags: ['receipt', 'proof', 'document', 'payment'],
    description: 'Payment receipt',
  },
  {
    name: 'Statement',
    component: SabPaisaIcons.StatementIcon,
    category: 'Transaction',
    tags: ['statement', 'report', 'history', 'account'],
    description: 'Account statement',
  },
  {
    name: 'Batch',
    component: SabPaisaIcons.BatchIcon,
    category: 'Transaction',
    tags: ['batch', 'group', 'bulk', 'multiple'],
    description: 'Batch processing',
  },
  {
    name: 'TransactionHistory',
    component: SabPaisaIcons.TransactionHistoryIcon,
    category: 'Transaction',
    tags: ['history', 'past', 'transactions', 'log'],
    description: 'Transaction history',
  },

  // ==================== BANKING ====================
  {
    name: 'BankAccount',
    component: SabPaisaIcons.BankAccountIcon,
    category: 'Banking',
    tags: ['bank', 'account', 'savings', 'current'],
    description: 'Bank account',
  },
  {
    name: 'IFSCCode',
    component: SabPaisaIcons.IFSCCodeIcon,
    category: 'Banking',
    tags: ['ifsc', 'code', 'bank', 'routing'],
    description: 'IFSC code',
  },
  {
    name: 'AccountVerification',
    component: SabPaisaIcons.AccountVerificationIcon,
    category: 'Banking',
    tags: ['verify', 'account', 'bank', 'validation'],
    description: 'Account verification',
  },
  {
    name: 'BankTransfer',
    component: SabPaisaIcons.BankTransferIcon,
    category: 'Banking',
    tags: ['transfer', 'bank', 'send', 'money'],
    description: 'Bank transfer',
  },
  {
    name: 'NEFT',
    component: SabPaisaIcons.NEFTIcon,
    category: 'Banking',
    tags: ['neft', 'transfer', 'bank', 'electronic'],
    description: 'NEFT transfer',
  },
  {
    name: 'RTGS',
    component: SabPaisaIcons.RTGSIcon,
    category: 'Banking',
    tags: ['rtgs', 'transfer', 'bank', 'realtime'],
    description: 'RTGS transfer',
  },
  {
    name: 'IMPS',
    component: SabPaisaIcons.IMPSIcon,
    category: 'Banking',
    tags: ['imps', 'instant', 'transfer', 'bank'],
    description: 'IMPS instant transfer',
  },
  {
    name: 'Payout',
    component: SabPaisaIcons.PayoutIcon,
    category: 'Banking',
    tags: ['payout', 'disbursement', 'payment', 'merchant'],
    description: 'Merchant payout',
  },
  {
    name: 'Withdrawal',
    component: SabPaisaIcons.WithdrawalIcon,
    category: 'Banking',
    tags: ['withdrawal', 'cash', 'atm', 'money'],
    description: 'Cash withdrawal',
  },
  {
    name: 'Deposit',
    component: SabPaisaIcons.DepositIcon,
    category: 'Banking',
    tags: ['deposit', 'add', 'money', 'bank'],
    description: 'Cash deposit',
  },

  // ==================== MERCHANT ====================
  {
    name: 'MerchantPortal',
    component: SabPaisaIcons.MerchantPortalIcon,
    category: 'Merchant',
    tags: ['merchant', 'portal', 'dashboard', 'business'],
    description: 'Merchant portal',
  },
  {
    name: 'Dashboard',
    component: SabPaisaIcons.DashboardIcon,
    category: 'Merchant',
    tags: ['dashboard', 'overview', 'analytics', 'home'],
    description: 'Business dashboard',
  },
  {
    name: 'Reports',
    component: SabPaisaIcons.ReportsIcon,
    category: 'Merchant',
    tags: ['reports', 'documents', 'analytics', 'data'],
    description: 'Business reports',
  },
  {
    name: 'Analytics',
    component: SabPaisaIcons.AnalyticsIcon,
    category: 'Merchant',
    tags: ['analytics', 'stats', 'metrics', 'insights'],
    description: 'Business analytics',
  },
  {
    name: 'KYCDocument',
    component: SabPaisaIcons.KYCDocumentIcon,
    category: 'Merchant',
    tags: ['kyc', 'document', 'verification', 'identity'],
    description: 'KYC documents',
  },
  {
    name: 'BusinessRegistration',
    component: SabPaisaIcons.BusinessRegistrationIcon,
    category: 'Merchant',
    tags: ['registration', 'business', 'license', 'certificate'],
    description: 'Business registration',
  },
  {
    name: 'APIKey',
    component: SabPaisaIcons.APIKeyIcon,
    category: 'Merchant',
    tags: ['api', 'key', 'integration', 'developer'],
    description: 'API key management',
  },
  {
    name: 'Webhook',
    component: SabPaisaIcons.WebhookIcon,
    category: 'Merchant',
    tags: ['webhook', 'callback', 'api', 'integration'],
    description: 'Webhook integration',
  },

  // ==================== SECURITY ====================
  {
    name: 'TwoFactorAuth',
    component: SabPaisaIcons.TwoFactorAuthIcon,
    category: 'Security',
    tags: ['2fa', 'security', 'authentication', 'verification'],
    description: 'Two-factor authentication',
  },
  {
    name: 'OTP',
    component: SabPaisaIcons.OTPIcon,
    category: 'Security',
    tags: ['otp', 'code', 'verification', 'security'],
    description: 'One-time password',
  },
  {
    name: 'Biometric',
    component: SabPaisaIcons.BiometricIcon,
    category: 'Security',
    tags: ['biometric', 'fingerprint', 'face', 'security'],
    description: 'Biometric authentication',
  },
  {
    name: 'Encryption',
    component: SabPaisaIcons.EncryptionIcon,
    category: 'Security',
    tags: ['encryption', 'secure', 'lock', 'protected'],
    description: 'Data encryption',
  },
  {
    name: 'SSLCertificate',
    component: SabPaisaIcons.SSLCertificateIcon,
    category: 'Security',
    tags: ['ssl', 'certificate', 'https', 'secure'],
    description: 'SSL certificate',
  },
  {
    name: 'SecurityShield',
    component: SabPaisaIcons.SecurityShieldIcon,
    category: 'Security',
    tags: ['shield', 'protection', 'security', 'safe'],
    description: 'Security protection',
  },
  {
    name: 'FraudDetection',
    component: SabPaisaIcons.FraudDetectionIcon,
    category: 'Security',
    tags: ['fraud', 'detection', 'alert', 'security'],
    description: 'Fraud detection',
  },
  {
    name: 'RiskScore',
    component: SabPaisaIcons.RiskScoreIcon,
    category: 'Security',
    tags: ['risk', 'score', 'warning', 'assessment'],
    description: 'Risk assessment',
  },

  // ==================== GENERAL FINTECH ====================
  {
    name: 'Fee',
    component: SabPaisaIcons.FeeIcon,
    category: 'General Fintech',
    tags: ['fee', 'charge', 'cost', 'payment'],
    description: 'Processing fee',
  },
  {
    name: 'Commission',
    component: SabPaisaIcons.CommissionIcon,
    category: 'General Fintech',
    tags: ['commission', 'percentage', 'fee', 'earnings'],
    description: 'Commission amount',
  },
  {
    name: 'GST',
    component: SabPaisaIcons.GSTIcon,
    category: 'General Fintech',
    tags: ['gst', 'tax', 'government', 'india'],
    description: 'GST tax',
  },
  {
    name: 'Rupee',
    component: SabPaisaIcons.RupeeIcon,
    category: 'General Fintech',
    tags: ['rupee', 'currency', 'inr', 'money'],
    description: 'Indian rupee',
  },
  {
    name: 'Amount',
    component: SabPaisaIcons.AmountIcon,
    category: 'General Fintech',
    tags: ['amount', 'money', 'currency', 'value'],
    description: 'Money amount',
  },
  {
    name: 'Calendar',
    component: SabPaisaIcons.CalendarIcon,
    category: 'General Fintech',
    tags: ['calendar', 'date', 'schedule', 'time'],
    description: 'Date picker',
  },
  {
    name: 'Clock',
    component: SabPaisaIcons.ClockIcon,
    category: 'General Fintech',
    tags: ['clock', 'time', 'duration', 'schedule'],
    description: 'Time indicator',
  },
  {
    name: 'Notification',
    component: SabPaisaIcons.NotificationIcon,
    category: 'General Fintech',
    tags: ['notification', 'alert', 'bell', 'message'],
    description: 'Notification alert',
  },
  {
    name: 'Exchange',
    component: SabPaisaIcons.ExchangeIcon,
    category: 'General Fintech',
    tags: ['exchange', 'swap', 'convert', 'transfer'],
    description: 'Currency exchange',
  },
  {
    name: 'Limit',
    component: SabPaisaIcons.LimitIcon,
    category: 'General Fintech',
    tags: ['limit', 'threshold', 'maximum', 'cap'],
    description: 'Transaction limit',
  },
];

// Helper function to get icon count by category
export const getIconCountByCategory = (category: string): number => {
  if (category === 'All') return sabpaisaIcons.length;
  return sabpaisaIcons.filter((icon) => icon.category === category).length;
};

// Helper function to search icons
export const searchIcons = (query: string, category: string = 'All'): IconMetadata[] => {
  const lowerQuery = query.toLowerCase();
  return sabpaisaIcons.filter((icon) => {
    const matchesCategory = category === 'All' || icon.category === category;
    const matchesSearch =
      icon.name.toLowerCase().includes(lowerQuery) ||
      icon.description.toLowerCase().includes(lowerQuery) ||
      icon.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));
    return matchesCategory && matchesSearch;
  });
};
