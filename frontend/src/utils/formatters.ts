/**
 * Currency Formatting Utilities
 * Specialized for Indian fintech applications
 */

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyFormatOptions {
  currency?: Currency;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

/**
 * Format amount as currency
 * @example formatCurrency(5000) // "₹5,000"
 * @example formatCurrency(5000.50, { currency: 'USD' }) // "$5,000.50"
 */
export function formatCurrency(
  amount: number,
  options: CurrencyFormatOptions = {}
): string {
  const {
    currency = 'INR',
    locale = currency === 'INR' ? 'en-IN' : 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    useGrouping = true,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
  }).format(amount);
}

/**
 * Format amount in Indian number system (Lakhs, Crores)
 * @example formatIndianNumber(1500000) // "15,00,000" (15 lakhs)
 * @example formatIndianNumber(10000000) // "1,00,00,000" (1 crore)
 */
export function formatIndianNumber(amount: number): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  const formatted = absAmount.toLocaleString('en-IN');
  return isNegative ? `-${formatted}` : formatted;
}

/**
 * Format amount in words (Indian style)
 * @example formatAmountInWords(5000) // "Five Thousand"
 * @example formatAmountInWords(150000) // "One Lakh Fifty Thousand"
 */
export function formatAmountInWords(amount: number): string {
  if (amount === 0) return 'Zero';

  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.floor(amount));

  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const convertTwoDigit = (n: number): string => {
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + units[n % 10] : '');
  };

  const convertThreeDigit = (n: number): string => {
    if (n < 100) return convertTwoDigit(n);
    return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convertTwoDigit(n % 100) : '');
  };

  let result = '';
  let remaining = absAmount;

  // Crores
  if (remaining >= 10000000) {
    const crores = Math.floor(remaining / 10000000);
    result += convertThreeDigit(crores) + ' Crore ';
    remaining %= 10000000;
  }

  // Lakhs
  if (remaining >= 100000) {
    const lakhs = Math.floor(remaining / 100000);
    result += convertTwoDigit(lakhs) + ' Lakh ';
    remaining %= 100000;
  }

  // Thousands
  if (remaining >= 1000) {
    const thousands = Math.floor(remaining / 1000);
    result += convertTwoDigit(thousands) + ' Thousand ';
    remaining %= 1000;
  }

  // Hundreds, tens, units
  if (remaining > 0) {
    result += convertThreeDigit(remaining);
  }

  result = result.trim();
  return isNegative ? 'Minus ' + result : result;
}

/**
 * Abbreviate large numbers
 * @example abbreviateNumber(1500) // "1.5K"
 * @example abbreviateNumber(1500000) // "1.5M"
 * @example abbreviateNumber(15000000, true) // "1.5Cr" (Indian style)
 */
export function abbreviateNumber(amount: number, indianStyle: boolean = false): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  if (indianStyle) {
    // Indian style: K, L (Lakh), Cr (Crore)
    if (absAmount >= 10000000) {
      return (isNegative ? '-' : '') + (absAmount / 10000000).toFixed(1) + 'Cr';
    }
    if (absAmount >= 100000) {
      return (isNegative ? '-' : '') + (absAmount / 100000).toFixed(1) + 'L';
    }
    if (absAmount >= 1000) {
      return (isNegative ? '-' : '') + (absAmount / 1000).toFixed(1) + 'K';
    }
  } else {
    // International style: K, M, B, T
    if (absAmount >= 1000000000000) {
      return (isNegative ? '-' : '') + (absAmount / 1000000000000).toFixed(1) + 'T';
    }
    if (absAmount >= 1000000000) {
      return (isNegative ? '-' : '') + (absAmount / 1000000000).toFixed(1) + 'B';
    }
    if (absAmount >= 1000000) {
      return (isNegative ? '-' : '') + (absAmount / 1000000).toFixed(1) + 'M';
    }
    if (absAmount >= 1000) {
      return (isNegative ? '-' : '') + (absAmount / 1000).toFixed(1) + 'K';
    }
  }

  return amount.toString();
}

/**
 * Format percentage
 * @example formatPercentage(0.125) // "12.5%"
 * @example formatPercentage(12.5, { isDecimal: false }) // "12.5%"
 */
export function formatPercentage(
  value: number,
  options: { isDecimal?: boolean; decimals?: number } = {}
): string {
  const { isDecimal = true, decimals = 1 } = options;
  const percentage = isDecimal ? value * 100 : value;
  return percentage.toFixed(decimals) + '%';
}

/**
 * Format file size
 * @example formatFileSize(1024) // "1 KB"
 * @example formatFileSize(1048576) // "1 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format phone number (Indian)
 * @example formatPhoneNumber("9876543210") // "+91 98765 43210"
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }

  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }

  return phone;
}

/**
 * Format card number with masking
 * @example formatCardNumber("1234567890123456") // "1234 56** **** 3456"
 * @example formatCardNumber("1234567890123456", false) // "1234 5678 9012 3456"
 */
export function formatCardNumber(cardNumber: string, masked: boolean = true): string {
  const cleaned = cardNumber.replace(/\s/g, '');

  if (masked) {
    if (cleaned.length >= 16) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 6)}** **** ${cleaned.slice(-4)}`;
    }
    return cleaned;
  }

  // Format in groups of 4
  return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
}

/**
 * Parse formatted currency back to number
 * @example parseCurrency("₹5,000.50") // 5000.50
 * @example parseCurrency("$1,234") // 1234
 */
export function parseCurrency(formattedAmount: string): number {
  return parseFloat(formattedAmount.replace(/[^0-9.-]+/g, ''));
}

/**
 * Format transaction ID
 * @example formatTransactionId("TXN1234567890ABCD") // "TXN-1234-5678-90AB-CD"
 */
export function formatTransactionId(txnId: string): string {
  if (txnId.startsWith('TXN')) {
    const id = txnId.slice(3);
    const formatted = id.match(/.{1,4}/g)?.join('-') || id;
    return `TXN-${formatted}`;
  }
  return txnId.match(/.{1,4}/g)?.join('-') || txnId;
}

/**
 * Mask sensitive data
 * @example maskData("ABCDE1234F", 5, 1) // "ABCDE****F"
 * @example maskData("user@email.com", 3, 10) // "use***om"
 */
export function maskData(
  data: string,
  visibleStart: number = 4,
  visibleEnd: number = 4,
  maskChar: string = '*'
): string {
  if (data.length <= visibleStart + visibleEnd) {
    return data;
  }

  const start = data.slice(0, visibleStart);
  const end = data.slice(-visibleEnd);
  const maskLength = data.length - visibleStart - visibleEnd;

  return start + maskChar.repeat(maskLength) + end;
}
