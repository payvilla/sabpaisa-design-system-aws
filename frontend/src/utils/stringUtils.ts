/**
 * String & Text Utilities
 * Helper functions for text manipulation
 */

/**
 * Capitalize first letter
 * @example capitalize('hello') // "Hello"
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalize each word
 * @example capitalizeWords('hello world') // "Hello World"
 */
export function capitalizeWords(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Convert to camelCase
 * @example toCamelCase('hello world') // "helloWorld"
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, '');
}

/**
 * Convert to kebab-case
 * @example toKebabCase('Hello World') // "hello-world"
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert to snake_case
 * @example toSnakeCase('Hello World') // "hello_world"
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Truncate string with ellipsis
 * @example truncate('Hello World', 8) // "Hello..."
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Truncate to word boundary
 * @example truncateWords('Hello beautiful world', 15) // "Hello beautiful..."
 */
export function truncateWords(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;

  const truncated = str.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + suffix;
  }

  return truncated + suffix;
}

/**
 * Slugify string (URL-friendly)
 * @example slugify('Hello World!') // "hello-world"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate initials from name
 * @example getInitials('John Doe') // "JD"
 */
export function getInitials(name: string, maxChars: number = 2): string {
  if (!name) return '';

  return name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, maxChars)
    .join('')
    .toUpperCase();
}

/**
 * Check if string contains only numbers
 * @example isNumeric('123') // true
 */
export function isNumeric(str: string): boolean {
  return /^-?\d+\.?\d*$/.test(str);
}

/**
 * Check if string is valid email
 * @example isEmail('test@example.com') // true
 */
export function isEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

/**
 * Check if string is valid URL
 * @example isURL('https://example.com') // true
 */
export function isURL(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extract numbers from string
 * @example extractNumbers('Price: $123.45') // "123.45"
 */
export function extractNumbers(str: string): string {
  return str.replace(/[^0-9.-]/g, '');
}

/**
 * Count words in string
 * @example countWords('Hello beautiful world') // 3
 */
export function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Pluralize word
 * @example pluralize('item', 5) // "items"
 * @example pluralize('child', 2, 'children') // "children"
 */
export function pluralize(
  singular: string,
  count: number,
  plural?: string
): string {
  if (count === 1) return singular;
  if (plural) return plural;

  // Simple pluralization rules
  if (singular.endsWith('y')) {
    return singular.slice(0, -1) + 'ies';
  }
  if (singular.endsWith('s') || singular.endsWith('x') || singular.endsWith('ch')) {
    return singular + 'es';
  }
  return singular + 's';
}

/**
 * Highlight search terms in text
 * @example highlightText('Hello World', 'world') // "Hello <mark>World</mark>"
 */
export function highlightText(
  text: string,
  search: string,
  tag: string = 'mark'
): string {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, 'gi');
  return text.replace(regex, `<${tag}>$1</${tag}>`);
}

/**
 * Remove HTML tags
 * @example stripHtml('<p>Hello</p>') // "Hello"
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Escape HTML special characters
 * @example escapeHtml('<script>') // "&lt;script&gt;"
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Generate random string
 * @example randomString(8) // "aB3xY9kL"
 */
export function randomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * Check if string is palindrome
 * @example isPalindrome('racecar') // true
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Reverse string
 * @example reverse('hello') // "olleh"
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Repeat string
 * @example repeat('ha', 3) // "hahaha"
 */
export function repeat(str: string, times: number): string {
  return str.repeat(times);
}

/**
 * Pad string to length
 * @example pad('5', 3, '0') // "005"
 */
export function pad(str: string, length: number, char: string = ' '): string {
  return str.padStart(length, char);
}

/**
 * Get reading time estimate
 * @example getReadingTime('Lorem ipsum...', 200) // "2 min read"
 */
export function getReadingTime(text: string, wordsPerMinute: number = 200): string {
  const words = countWords(text);
  const minutes = Math.ceil(words / wordsPerMinute);

  if (minutes < 1) {
    return '< 1 min read';
  }

  return `${minutes} min read`;
}

/**
 * Format name (First Last)
 * @example formatName('  john   DOE  ') // "John Doe"
 */
export function formatName(name: string): string {
  return capitalizeWords(name.trim().replace(/\s+/g, ' '));
}

/**
 * Validate strong password
 * @example isStrongPassword('Pass123!') // true
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

/**
 * Generate UUID v4
 * @example generateUUID() // "550e8400-e29b-41d4-a716-446655440000"
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Compare strings (case-insensitive)
 * @example compareStrings('Hello', 'hello') // true
 */
export function compareStrings(str1: string, str2: string): boolean {
  return str1.toLowerCase() === str2.toLowerCase();
}

/**
 * Sort strings array
 * @example sortStrings(['Banana', 'apple', 'Cherry']) // ['apple', 'Banana', 'Cherry']
 */
export function sortStrings(arr: string[], descending: boolean = false): string[] {
  const sorted = [...arr].sort((a, b) => a.localeCompare(b));
  return descending ? sorted.reverse() : sorted;
}
