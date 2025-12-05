/**
 * Logger utility for SabPaisa Design System MCP Server
 *
 * Provides conditional logging based on DEBUG environment variable
 * - DEBUG=1: Verbose logging (development mode)
 * - DEBUG=0 or undefined: Error-only logging (production mode)
 */

// Check if debug mode is enabled
const DEBUG_MODE = process.env.DEBUG === '1' || process.env.DEBUG === 'true';

export class Logger {
  private prefix: string;

  constructor(prefix: string = '[MCP]') {
    this.prefix = prefix;
  }

  /**
   * Debug logs - only shown when DEBUG=1
   */
  debug(...args: any[]): void {
    if (DEBUG_MODE) {
      console.error(this.prefix, ...args);
    }
  }

  /**
   * Info logs - only shown when DEBUG=1
   */
  info(...args: any[]): void {
    if (DEBUG_MODE) {
      console.error(this.prefix, '[INFO]', ...args);
    }
  }

  /**
   * Warning logs - always shown
   */
  warn(...args: any[]): void {
    console.error(this.prefix, '[WARN]', ...args);
  }

  /**
   * Error logs - always shown
   */
  error(...args: any[]): void {
    console.error(this.prefix, '[ERROR]', ...args);
  }

  /**
   * Create a child logger with a different prefix
   */
  child(prefix: string): Logger {
    return new Logger(`${this.prefix} ${prefix}`);
  }
}

// Export singleton instances
export const logger = new Logger('[MCP]');
export const searchLogger = new Logger('[Search]');
export const dataLogger = new Logger('[Data]');
export const toolLogger = new Logger('[Tool]');
