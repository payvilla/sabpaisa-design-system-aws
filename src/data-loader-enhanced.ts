/**
 * Enhanced Data Loader for SabPaisa Design System MCP
 *
 * Provides lazy loading, LRU caching, and reference resolution
 * for the extracted design system data (35 sections, 8 parts).
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { dataLogger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// LRU Cache configuration
const MAX_CACHE_SIZE = 20; // Maximum number of files in cache
const MAX_CACHE_MEMORY_MB = 50; // Maximum memory usage in MB

interface CacheEntry {
  data: any;
  size: number; // Size in bytes
  accessCount: number;
  lastAccessed: number;
}

interface SectionMetadata {
  section: number;
  title: string;
  file: string;
}

/**
 * LRU Cache implementation
 */
class LRUCache {
  private cache: Map<string, CacheEntry> = new Map();
  private maxSize: number;
  private maxMemoryBytes: number;
  private currentMemoryBytes: number = 0;

  constructor(maxSize: number, maxMemoryMB: number) {
    this.maxSize = maxSize;
    this.maxMemoryBytes = maxMemoryMB * 1024 * 1024;
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Update access time and count
    entry.lastAccessed = Date.now();
    entry.accessCount++;

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.data;
  }

  set(key: string, data: any): void {
    const size = JSON.stringify(data).length;

    // Remove least recently used items if cache is full
    while (
      this.cache.size >= this.maxSize ||
      this.currentMemoryBytes + size > this.maxMemoryBytes
    ) {
      this.evictLRU();
    }

    // Add new entry
    const entry: CacheEntry = {
      data,
      size,
      accessCount: 1,
      lastAccessed: Date.now(),
    };

    this.cache.set(key, entry);
    this.currentMemoryBytes += size;
  }

  private evictLRU(): void {
    if (this.cache.size === 0) return;

    // Get the first (least recently used) entry
    const firstKey = this.cache.keys().next().value as string | undefined;
    if (!firstKey) return;

    const entry = this.cache.get(firstKey);

    if (entry) {
      this.currentMemoryBytes -= entry.size;
      this.cache.delete(firstKey);
      dataLogger.debug(`Evicted ${firstKey} from cache`);
    }
  }

  clear(): void {
    this.cache.clear();
    this.currentMemoryBytes = 0;
  }

  getStats(): {
    size: number;
    memoryMB: number;
    maxSize: number;
    maxMemoryMB: number;
    files: string[];
    hitRate?: number;
  } {
    return {
      size: this.cache.size,
      memoryMB: this.currentMemoryBytes / (1024 * 1024),
      maxSize: this.maxSize,
      maxMemoryMB: this.maxMemoryBytes / (1024 * 1024),
      files: Array.from(this.cache.keys()),
    };
  }
}

/**
 * Enhanced Data Loader with LRU caching
 */
export class EnhancedDataLoader {
  private cache: LRUCache;
  private dataPath: string;
  private enhancedDataPath: string;
  private indexData: any = null;

  constructor() {
    this.cache = new LRUCache(MAX_CACHE_SIZE, MAX_CACHE_MEMORY_MB);
    this.dataPath = join(__dirname, '..', 'data');
    this.enhancedDataPath = join(__dirname, '..', 'data-enhanced');
  }

  /**
   * Load index file (always cached, never evicted)
   */
  private getIndex(): any {
    if (this.indexData) return this.indexData;

    try {
      const indexPath = join(this.enhancedDataPath, 'index.json');
      const content = readFileSync(indexPath, 'utf-8');
      this.indexData = JSON.parse(content);
      return this.indexData;
    } catch (error) {
      dataLogger.error('Error loading index:', error);
      throw new Error('Failed to load design system index');
    }
  }

  /**
   * Load a file with LRU caching
   */
  private load(filepath: string, useCache: boolean = true): any {
    // Check cache first
    if (useCache) {
      const cached = this.cache.get(filepath);
      if (cached) {
        dataLogger.debug(`Cache hit: ${filepath}`);
        return cached;
      }
    }

    try {
      // Read and parse JSON file
      const content = readFileSync(filepath, 'utf-8');
      const data = JSON.parse(content);

      // Cache the parsed data
      if (useCache) {
        this.cache.set(filepath, data);
      }

      dataLogger.debug(`Loaded: ${filepath}`);
      return data;
    } catch (error) {
      dataLogger.error(`Error loading ${filepath}:`, error);
      throw new Error(`Failed to load file: ${filepath}`);
    }
  }

  /**
   * Load a section by number (1-35)
   */
  loadSection(sectionNumber: number): any {
    const index = this.getIndex();
    const section = index.sections.find((s: SectionMetadata) => s.section === sectionNumber);

    if (!section) {
      throw new Error(`Section ${sectionNumber} not found`);
    }

    const filepath = join(this.enhancedDataPath, section.file);
    return this.load(filepath);
  }

  /**
   * Load a section by file path
   */
  loadByPath(path: string): any {
    const filepath = join(this.enhancedDataPath, path);

    if (!existsSync(filepath)) {
      throw new Error(`File not found: ${path}`);
    }

    return this.load(filepath);
  }

  /**
   * Load all sections in a part (e.g., all atoms)
   */
  loadPart(partDir: string): any[] {
    const index = this.getIndex();
    const sections = index.sections.filter((s: SectionMetadata) =>
      s.file.startsWith(partDir)
    );

    return sections.map((section: SectionMetadata) => this.loadSection(section.section));
  }

  /**
   * Get metadata for all sections
   */
  getAllSections(): SectionMetadata[] {
    const index = this.getIndex();
    return index.sections;
  }

  /**
   * Search sections by title or keywords
   */
  searchSections(query: string): SectionMetadata[] {
    const index = this.getIndex();
    const lowerQuery = query.toLowerCase();

    return index.sections.filter((section: SectionMetadata) =>
      section.title.toLowerCase().includes(lowerQuery) ||
      section.file.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get all color tokens from atoms
   */
  getColors(): any {
    return this.loadSection(4); // Section 4: Color Token System
  }

  /**
   * Get all typography tokens
   */
  getTypography(): any {
    return this.loadSection(5); // Section 5: Typography Token System
  }

  /**
   * Get all spacing tokens
   */
  getSpacing(): any {
    return this.loadSection(6); // Section 6: Spacing & Layout Tokens
  }

  /**
   * Get all effect tokens
   */
  getEffects(): any {
    return this.loadSection(7); // Section 7: Effect Tokens
  }

  /**
   * Get all animation tokens
   */
  getAnimations(): any {
    return this.loadSection(8); // Section 8: Motion & Animation Tokens
  }

  /**
   * Get a specific component by name
   */
  getComponent(name: string): any {
    const componentMap: { [key: string]: number } = {
      button: 9,
      textfield: 10,
      card: 11,
      badge: 12,
      toast: 13,
      'otp-input': 14,
      modal: 15,
      'file-upload': 16,
      navigation: 17,
    };

    const sectionNumber = componentMap[name.toLowerCase()];
    if (!sectionNumber) {
      throw new Error(`Component not found: ${name}`);
    }

    return this.loadSection(sectionNumber);
  }

  /**
   * Get all components (molecules + organisms)
   */
  getAllComponents(): any[] {
    const molecules = this.loadPart('3-molecules');
    const organisms = this.loadPart('4-organisms');
    return [...molecules, ...organisms];
  }

  /**
   * Get fintech patterns
   */
  getFintechPatterns(): any {
    return this.loadSection(26); // Section 26: Fintech-Specific Patterns
  }

  /**
   * Get accessibility patterns
   */
  getAccessibilityPatterns(): any {
    return this.loadSection(29); // Section 29: Accessibility Patterns (WCAG 2.2 AA)
  }

  /**
   * Get anti-patterns
   */
  getAntiPatterns(): any {
    return this.loadSection(35); // Section 35: Anti-Patterns Consolidated
  }

  /**
   * Get quick reference
   */
  getQuickReference(): any {
    return this.loadSection(2); // Section 2: Quick Reference Cards
  }

  /**
   * Legacy methods for backward compatibility
   */
  getDesignSystem(): any {
    return this.load(join(this.dataPath, 'design-system.json'));
  }

  getEnhanced(): any {
    return this.load(join(this.dataPath, 'design-system-enhanced.json'));
  }

  getPatterns(): any {
    return this.load(join(this.dataPath, 'fintech-patterns.json'));
  }

  getFormatting(): any {
    return this.load(join(this.dataPath, 'data-formatting-guide.json'));
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
    this.indexData = null;
    dataLogger.info('Cache cleared');
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): any {
    return this.cache.getStats();
  }

  /**
   * Preload commonly used sections
   */
  preload(): void {
    const commonSections = [
      2, // Quick Reference
      4, // Colors
      5, // Typography
      6, // Spacing
      9, // Button
      11, // Card
    ];

    commonSections.forEach((section) => {
      try {
        this.loadSection(section);
        dataLogger.debug(`Preloaded section ${section}`);
      } catch (error) {
        dataLogger.error(`Failed to preload section ${section}:`, error);
      }
    });
  }
}

// Export singleton instance
export const enhancedDataLoader = new EnhancedDataLoader();

// Preload common sections on initialization
if (process.env.NODE_ENV !== 'test') {
  enhancedDataLoader.preload();
}
