/**
 * Data Loader for SabPaisa Design System MCP
 *
 * Provides lazy loading and caching for design system JSON files.
 * Implements efficient in-memory caching to minimize file I/O operations.
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Data loader class with caching capabilities
 */
export class DataLoader {
  private cache: Map<string, any> = new Map();
  private dataPath: string;

  private initialized: boolean = false;

  constructor() {
    // Don't initialize path here - do it lazily on first use
    this.dataPath = '';
  }

  private ensureInitialized(): void {
    if (this.initialized) {
      return;
    }

    // Data directory path - handle both local development and Lambda
    const possiblePaths = [
      join(process.cwd(), 'data'),            // Lambda: /var/task/data (FIRST - most reliable)
      join(__dirname, '..', 'data'),          // Local: dist/../data
      join(__dirname, '..', '..', 'data'),    // Alternative
    ];

    // Try each path until we find one that exists
    for (const dataPath of possiblePaths) {
      try {
        if (existsSync(dataPath)) {
          this.dataPath = dataPath;
          console.error(`[Data] Data path resolved to: ${dataPath}`);
          this.initialized = true;
          return;
        }
      } catch (e) {
        console.error(`[Data] Failed to check path ${dataPath}: ${e}`);
      }
    }

    // Use first path as default if none found
    this.dataPath = possiblePaths[0];
    console.error(`[Data] No data directory found. Using default: ${this.dataPath}`);
    this.initialized = true;
  }

  /**
   * Load a JSON file with caching
   * @param filename - Name of the JSON file to load
   * @returns Parsed JSON data
   */
  private load(filename: string): any {
    // Ensure data path is initialized
    this.ensureInitialized();

    // Check cache first
    if (this.cache.has(filename)) {
      return this.cache.get(filename);
    }

    try {
      // Read and parse JSON file
      const filePath = join(this.dataPath, filename);
      const content = readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);

      // Cache the parsed data
      this.cache.set(filename, data);

      return data;
    } catch (error) {
      console.error(`[Data] Error loading ${filename}:`, error);
      throw new Error(`Failed to load design system file: ${filename}`);
    }
  }

  /**
   * Get the base design system data
   * Contains core design tokens, components, and patterns
   */
  getDesignSystem(): any {
    return this.load('design-system.json');
  }

  /**
   * Get the enhanced design system with multi-format colors
   * Includes hex, rgb, hsl, rgba, CSS vars, Tailwind classes, and WCAG contrast ratios
   */
  getEnhanced(): any {
    return this.load('design-system-enhanced.json');
  }

  /**
   * Get fintech-specific patterns
   * Settlement, reconciliation, KYC, refund/chargeback workflows
   */
  getPatterns(): any {
    return this.load('fintech-patterns.json');
  }

  /**
   * Get data formatting guidelines
   * Currency, date/time, masking, validation patterns
   */
  getFormatting(): any {
    return this.load('data-formatting-guide.json');
  }

  /**
   * Get templates
   * Complete template library with code, installation, props, examples
   */
  getTemplates(): any {
    return this.load('design-templates.json');
  }

  /**
   * Clear the cache (useful for hot-reloading during development)
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; files: string[] } {
    return {
      size: this.cache.size,
      files: Array.from(this.cache.keys())
    };
  }
}

// Export singleton instance
export const dataLoader = new DataLoader();
