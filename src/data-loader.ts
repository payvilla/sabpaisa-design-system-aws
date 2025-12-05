/**
 * Data Loader for SabPaisa Design System MCP
 *
 * Provides lazy loading and caching for design system JSON files.
 * Implements efficient in-memory caching to minimize file I/O operations.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { dataLogger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Data loader class with caching capabilities
 */
export class DataLoader {
  private cache: Map<string, any> = new Map();
  private dataPath: string;

  constructor() {
    // Data directory is one level up from src, then into data/
    this.dataPath = join(__dirname, '..', 'data');
  }

  /**
   * Load a JSON file with caching
   * @param filename - Name of the JSON file to load
   * @returns Parsed JSON data
   */
  private load(filename: string): any {
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
      dataLogger.error(`Error loading ${filename}:`, error);
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
