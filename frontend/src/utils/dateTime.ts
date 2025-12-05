/**
 * Date & Time Utilities
 * Specialized for Indian fintech applications
 */

export type DateFormat =
  | 'short' // 12/25/2024
  | 'medium' // Dec 25, 2024
  | 'long' // December 25, 2024
  | 'full' // Wednesday, December 25, 2024
  | 'iso' // 2024-12-25
  | 'indian'; // 25-12-2024

export type TimeFormat = '12h' | '24h';

/**
 * Format date in various formats
 * @example formatDate(new Date(), 'medium') // "Dec 25, 2024"
 * @example formatDate(new Date(), 'indian') // "25-12-2024"
 */
export function formatDate(date: Date | string | number, format: DateFormat = 'medium'): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return 'Invalid Date';
  }

  switch (format) {
    case 'short':
      return d.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });

    case 'medium':
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

    case 'long':
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

    case 'full':
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

    case 'iso':
      return d.toISOString().split('T')[0];

    case 'indian':
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;

    default:
      return d.toLocaleDateString();
  }
}

/**
 * Format time
 * @example formatTime(new Date(), '12h') // "2:30 PM"
 * @example formatTime(new Date(), '24h') // "14:30"
 */
export function formatTime(date: Date | string | number, format: TimeFormat = '12h'): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return 'Invalid Time';
  }

  if (format === '12h') {
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } else {
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
}

/**
 * Format datetime
 * @example formatDateTime(new Date()) // "Dec 25, 2024, 2:30 PM"
 */
export function formatDateTime(
  date: Date | string | number,
  dateFormat: DateFormat = 'medium',
  timeFormat: TimeFormat = '12h'
): string {
  return `${formatDate(date, dateFormat)}, ${formatTime(date, timeFormat)}`;
}

/**
 * Get relative time (time ago)
 * @example getRelativeTime(Date.now() - 60000) // "1 minute ago"
 * @example getRelativeTime(Date.now() + 3600000) // "in 1 hour"
 */
export function getRelativeTime(date: Date | string | number): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const isFuture = diffMs < 0;
  const absDiffSecs = Math.abs(diffSecs);
  const absDiffMins = Math.abs(diffMins);
  const absDiffHours = Math.abs(diffHours);
  const absDiffDays = Math.abs(diffDays);
  const absDiffMonths = Math.abs(diffMonths);
  const absDiffYears = Math.abs(diffYears);

  if (absDiffSecs < 30) {
    return 'just now';
  }

  if (absDiffSecs < 60) {
    return isFuture ? `in ${absDiffSecs} seconds` : `${absDiffSecs} seconds ago`;
  }

  if (absDiffMins < 60) {
    const unit = absDiffMins === 1 ? 'minute' : 'minutes';
    return isFuture ? `in ${absDiffMins} ${unit}` : `${absDiffMins} ${unit} ago`;
  }

  if (absDiffHours < 24) {
    const unit = absDiffHours === 1 ? 'hour' : 'hours';
    return isFuture ? `in ${absDiffHours} ${unit}` : `${absDiffHours} ${unit} ago`;
  }

  if (absDiffDays < 30) {
    const unit = absDiffDays === 1 ? 'day' : 'days';
    return isFuture ? `in ${absDiffDays} ${unit}` : `${absDiffDays} ${unit} ago`;
  }

  if (absDiffMonths < 12) {
    const unit = absDiffMonths === 1 ? 'month' : 'months';
    return isFuture ? `in ${absDiffMonths} ${unit}` : `${absDiffMonths} ${unit} ago`;
  }

  const unit = absDiffYears === 1 ? 'year' : 'years';
  return isFuture ? `in ${absDiffYears} ${unit}` : `${absDiffYears} ${unit} ago`;
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string | number): boolean {
  const d = new Date(date);
  const today = new Date();

  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if date is yesterday
 */
export function isYesterday(date: Date | string | number): boolean {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Check if date is tomorrow
 */
export function isTomorrow(date: Date | string | number): boolean {
  const d = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  );
}

/**
 * Get smart date display
 * @example getSmartDate(new Date()) // "Today, 2:30 PM"
 * @example getSmartDate(yesterdayDate) // "Yesterday, 10:15 AM"
 * @example getSmartDate(oldDate) // "Dec 20, 2024"
 */
export function getSmartDate(date: Date | string | number): string {
  const d = new Date(date);

  if (isToday(d)) {
    return `Today, ${formatTime(d)}`;
  }

  if (isYesterday(d)) {
    return `Yesterday, ${formatTime(d)}`;
  }

  if (isTomorrow(d)) {
    return `Tomorrow, ${formatTime(d)}`;
  }

  const diffDays = Math.floor((new Date().getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 7 && diffDays > 0) {
    return d.toLocaleDateString('en-US', { weekday: 'long' }) + `, ${formatTime(d)}`;
  }

  return formatDate(d, 'medium');
}

/**
 * Calculate age from date of birth
 * @example calculateAge(new Date('1990-01-01')) // 34
 */
export function calculateAge(dob: Date | string | number): number {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/**
 * Get business days between two dates (excluding weekends)
 */
export function getBusinessDays(startDate: Date, endDate: Date): number {
  let count = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Not Sunday (0) or Saturday (6)
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}

/**
 * Add days to date
 */
export function addDays(date: Date | string | number, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add months to date
 */
export function addMonths(date: Date | string | number, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Add years to date
 */
export function addYears(date: Date | string | number, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Get start of day
 */
export function startOfDay(date: Date | string | number): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get end of day
 */
export function endOfDay(date: Date | string | number): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Get start of month
 */
export function startOfMonth(date: Date | string | number): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get end of month
 */
export function endOfMonth(date: Date | string | number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Format duration in human readable format
 * @example formatDuration(125) // "2 minutes 5 seconds"
 * @example formatDuration(3665) // "1 hour 1 minute 5 seconds"
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
  }

  if (secs > 0 || parts.length === 0) {
    parts.push(`${secs} ${secs === 1 ? 'second' : 'seconds'}`);
  }

  return parts.join(' ');
}

/**
 * Get financial year for Indian fiscal year (April - March)
 * @example getFiscalYear(new Date('2024-01-15')) // "FY 2023-24"
 * @example getFiscalYear(new Date('2024-04-15')) // "FY 2024-25"
 */
export function getFiscalYear(date: Date | string | number): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();

  if (month >= 3) {
    // April (3) onwards
    return `FY ${year}-${(year + 1).toString().slice(-2)}`;
  } else {
    // January - March
    return `FY ${year - 1}-${year.toString().slice(-2)}`;
  }
}

/**
 * Get quarter of the year
 * @example getQuarter(new Date('2024-01-15')) // "Q1"
 * @example getQuarter(new Date('2024-07-15')) // "Q3"
 */
export function getQuarter(date: Date | string | number): string {
  const d = new Date(date);
  const month = d.getMonth();
  const quarter = Math.floor(month / 3) + 1;
  return `Q${quarter}`;
}
