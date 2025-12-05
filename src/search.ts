/**
 * Search functionality for SabPaisa Design System
 *
 * Provides fuzzy search across all design system resources using Fuse.js
 */

import Fuse from 'fuse.js';
import { dataLoader } from './data-loader.js';
import { searchLogger } from './logger.js';

export interface SearchResult {
  type: 'tokens' | 'components' | 'patterns' | 'formatting';
  name: string;
  description: string;
  uri: string;
  score: number;
  data?: any;
}

/**
 * Search across all design system resources
 */
export class DesignSystemSearch {
  private fuse: Fuse<SearchResult> | null = null;

  /**
   * Build search index from all design system data
   */
  private buildIndex(): Fuse<SearchResult> {
    const items: SearchResult[] = [];

    searchLogger.debug('Building search index...');

    // Add tokens
    try {
      const designSystem = dataLoader.getDesignSystem();
      const enhanced = dataLoader.getEnhanced();

      searchLogger.debug('Loaded JSON files successfully');

      // Color tokens from enhanced JSON
      if (enhanced.colorFormats) {
        items.push({
          type: 'tokens',
          name: 'Color Tokens',
          description: 'Complete color palette with multi-format support',
          uri: 'sabpaisa://tokens/colors',
          score: 0,
          data: enhanced.colorFormats
        });
      }

      // Design tokens
      if (enhanced.designTokens) {
        items.push({
          type: 'tokens',
          name: 'Design Tokens',
          description: 'Typography, spacing, shadows, and more',
          uri: 'sabpaisa://tokens/all',
          score: 0,
          data: enhanced.designTokens
        });
      }

      // Legacy tokens support
      if (designSystem.designTokens) {
        Object.keys(designSystem.designTokens).forEach(tokenType => {
          items.push({
            type: 'tokens',
            name: `${tokenType} tokens`,
            description: `Design tokens for ${tokenType}`,
            uri: `sabpaisa://tokens/${tokenType}`,
            score: 0,
            data: designSystem.designTokens[tokenType]
          });
        });
      }
    } catch (error) {
      searchLogger.error('Error indexing tokens:', error);
    }

    // Add components
    try {
      const designSystem = dataLoader.getDesignSystem();
      searchLogger.debug('Components found:', Array.isArray(designSystem.components) ? designSystem.components.length : 0);

      if (designSystem.components && Array.isArray(designSystem.components)) {
        designSystem.components.forEach((component: any) => {
          // Use name as identifier (lowercased for URI)
          const componentId = (component.name || '').toLowerCase().replace(/\s+/g, '-');
          searchLogger.debug('Indexing component:', component.name);
          items.push({
            type: 'components',
            name: component.name,
            description: component.description || `${component.name} component`,
            uri: `sabpaisa://components/${componentId}`,
            score: 0,
            data: component
          });
        });
      }
    } catch (error) {
      searchLogger.error('Error indexing components:', error);
    }

    // Add patterns
    try {
      const patterns = dataLoader.getPatterns();
      Object.keys(patterns).forEach(key => {
        const pattern = patterns[key];
        const uriKey = key.replace(/_/g, '-');
        items.push({
          type: 'patterns',
          name: pattern.name || key,
          description: pattern.description || `${key} pattern`,
          uri: `sabpaisa://patterns/${uriKey}`,
          score: 0,
          data: pattern
        });
      });
    } catch (error) {
      searchLogger.error('Error indexing patterns:', error);
    }

    // Add formatting
    try {
      const formatting = dataLoader.getFormatting();

      ['currency', 'datetime', 'masking', 'validation'].forEach(key => {
        if (formatting[key]) {
          items.push({
            type: 'formatting',
            name: `${key} formatting`,
            description: `${key} formatting rules and patterns`,
            uri: `sabpaisa://formatting/${key}`,
            score: 0,
            data: formatting[key]
          });
        }
      });
    } catch (error) {
      searchLogger.error('Error indexing formatting:', error);
    }

    searchLogger.debug('Total items indexed:', items.length);

    // Create Fuse instance with fuzzy search configuration
    return new Fuse(items, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'description', weight: 1 },
        { name: 'type', weight: 0.5 }
      ],
      threshold: 0.4, // 0 = perfect match, 1 = match anything
      includeScore: true,
      minMatchCharLength: 2
    });
  }

  /**
   * Search design system
   * @param query - Search query
   * @param category - Optional category filter
   * @param limit - Maximum number of results
   */
  search(query: string, category?: string, limit: number = 10): SearchResult[] {
    // Build index if not already built
    if (!this.fuse) {
      this.fuse = this.buildIndex();
    }

    searchLogger.debug('Searching for:', query, 'in category:', category);

    // Perform search
    const results = this.fuse.search(query);
    searchLogger.debug('Fuse returned:', results.length, 'results');

    if (results.length > 0) {
      searchLogger.debug('First result type:', results[0].item.type);
    }

    // Filter by category if specified
    let filtered = results;
    if (category && category !== 'all') {
      searchLogger.debug('Filtering by category:', category);
      filtered = results.filter(r => r.item.type === category);
      searchLogger.debug('After filter:', filtered.length, 'results');
    }

    // Map results and apply limit
    return filtered
      .slice(0, limit)
      .map(result => ({
        ...result.item,
        score: result.score || 0
      }));
  }

  /**
   * Clear the search index (useful for hot-reloading)
   */
  clearIndex(): void {
    this.fuse = null;
  }
}

// Export singleton instance
export const designSystemSearch = new DesignSystemSearch();
