/**
 * Analytics and monitoring for SabPaisa Design System MCP
 *
 * Tracks usage patterns, performance metrics, and popular resources
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { logger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface UsageMetrics {
  totalRequests: number;
  resourceRequests: number;
  toolCalls: number;
  startTime: string;
  lastActivity: string;

  // Resource access tracking
  resourceAccess: Record<string, number>;

  // Tool usage tracking
  toolUsage: Record<string, number>;

  // Performance metrics
  averageResponseTime: number;
  totalResponseTime: number;
  requestCount: number;

  // Popular queries
  searchQueries: Array<{ query: string; count: number; lastUsed: string }>;
  colorQueries: Array<{ query: string; count: number; lastUsed: string }>;
}

/**
 * Analytics tracking class
 */
export class Analytics {
  private metrics: UsageMetrics;
  private metricsFile: string;
  private autoSaveInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.metricsFile = join(__dirname, '..', '.analytics.json');
    this.metrics = this.loadMetrics();

    // Auto-save every 5 minutes
    this.autoSaveInterval = setInterval(() => {
      this.saveMetrics();
    }, 5 * 60 * 1000);
  }

  /**
   * Load metrics from file or create new
   */
  private loadMetrics(): UsageMetrics {
    try {
      if (existsSync(this.metricsFile)) {
        const data = readFileSync(this.metricsFile, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      logger.warn('Failed to load analytics, starting fresh:', error);
    }

    // Default metrics
    return {
      totalRequests: 0,
      resourceRequests: 0,
      toolCalls: 0,
      startTime: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      resourceAccess: {},
      toolUsage: {},
      averageResponseTime: 0,
      totalResponseTime: 0,
      requestCount: 0,
      searchQueries: [],
      colorQueries: [],
    };
  }

  /**
   * Save metrics to file
   */
  private saveMetrics(): void {
    try {
      writeFileSync(
        this.metricsFile,
        JSON.stringify(this.metrics, null, 2),
        'utf-8'
      );
      logger.debug('Analytics saved');
    } catch (error) {
      logger.error('Failed to save analytics:', error);
    }
  }

  /**
   * Track resource access
   */
  trackResourceAccess(uri: string): void {
    this.metrics.totalRequests++;
    this.metrics.resourceRequests++;
    this.metrics.lastActivity = new Date().toISOString();

    if (!this.metrics.resourceAccess[uri]) {
      this.metrics.resourceAccess[uri] = 0;
    }
    this.metrics.resourceAccess[uri]++;

    logger.debug(`Resource accessed: ${uri}`);
  }

  /**
   * Track tool usage
   */
  trackToolUsage(toolName: string, args?: any): void {
    this.metrics.totalRequests++;
    this.metrics.toolCalls++;
    this.metrics.lastActivity = new Date().toISOString();

    if (!this.metrics.toolUsage[toolName]) {
      this.metrics.toolUsage[toolName] = 0;
    }
    this.metrics.toolUsage[toolName]++;

    // Track specific queries
    if (toolName === 'search_design_system' && args?.query) {
      this.trackSearchQuery(args.query);
    }
    if (toolName === 'find_color' && args?.query) {
      this.trackColorQuery(args.query);
    }

    logger.debug(`Tool used: ${toolName}`);
  }

  /**
   * Track performance
   */
  trackPerformance(durationMs: number): void {
    this.metrics.totalResponseTime += durationMs;
    this.metrics.requestCount++;
    this.metrics.averageResponseTime =
      this.metrics.totalResponseTime / this.metrics.requestCount;
  }

  /**
   * Track search query
   */
  private trackSearchQuery(query: string): void {
    const existing = this.metrics.searchQueries.find(q => q.query === query);
    if (existing) {
      existing.count++;
      existing.lastUsed = new Date().toISOString();
    } else {
      this.metrics.searchQueries.push({
        query,
        count: 1,
        lastUsed: new Date().toISOString(),
      });
    }

    // Keep only top 20
    this.metrics.searchQueries.sort((a, b) => b.count - a.count);
    this.metrics.searchQueries = this.metrics.searchQueries.slice(0, 20);
  }

  /**
   * Track color query
   */
  private trackColorQuery(query: string): void {
    const existing = this.metrics.colorQueries.find(q => q.query === query);
    if (existing) {
      existing.count++;
      existing.lastUsed = new Date().toISOString();
    } else {
      this.metrics.colorQueries.push({
        query,
        count: 1,
        lastUsed: new Date().toISOString(),
      });
    }

    // Keep only top 20
    this.metrics.colorQueries.sort((a, b) => b.count - a.count);
    this.metrics.colorQueries = this.metrics.colorQueries.slice(0, 20);
  }

  /**
   * Get current metrics
   */
  getMetrics(): UsageMetrics {
    return { ...this.metrics };
  }

  /**
   * Get summary statistics
   */
  getSummary(): {
    uptime: string;
    totalRequests: number;
    resourceRequests: number;
    toolCalls: number;
    averageResponseTime: string;
    topResources: Array<{ uri: string; count: number }>;
    topTools: Array<{ tool: string; count: number }>;
    topSearches: Array<{ query: string; count: number }>;
    topColorQueries: Array<{ query: string; count: number }>;
  } {
    const startTime = new Date(this.metrics.startTime);
    const now = new Date();
    const uptimeMs = now.getTime() - startTime.getTime();

    // Calculate uptime
    const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));
    const uptime = `${days}d ${hours}h ${minutes}m`;

    // Top resources
    const topResources = Object.entries(this.metrics.resourceAccess)
      .map(([uri, count]) => ({ uri, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top tools
    const topTools = Object.entries(this.metrics.toolUsage)
      .map(([tool, count]) => ({ tool, count }))
      .sort((a, b) => b.count - a.count);

    // Top searches
    const topSearches = this.metrics.searchQueries
      .slice(0, 10)
      .map(({ query, count }) => ({ query, count }));

    // Top color queries
    const topColorQueries = this.metrics.colorQueries
      .slice(0, 10)
      .map(({ query, count }) => ({ query, count }));

    return {
      uptime,
      totalRequests: this.metrics.totalRequests,
      resourceRequests: this.metrics.resourceRequests,
      toolCalls: this.metrics.toolCalls,
      averageResponseTime: `${this.metrics.averageResponseTime.toFixed(2)}ms`,
      topResources,
      topTools,
      topSearches,
      topColorQueries,
    };
  }

  /**
   * Reset analytics
   */
  reset(): void {
    this.metrics = {
      totalRequests: 0,
      resourceRequests: 0,
      toolCalls: 0,
      startTime: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      resourceAccess: {},
      toolUsage: {},
      averageResponseTime: 0,
      totalResponseTime: 0,
      requestCount: 0,
      searchQueries: [],
      colorQueries: [],
    };
    this.saveMetrics();
  }

  /**
   * Cleanup on shutdown
   */
  shutdown(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
    this.saveMetrics();
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Graceful shutdown
process.on('SIGINT', () => {
  analytics.shutdown();
  process.exit(0);
});

process.on('SIGTERM', () => {
  analytics.shutdown();
  process.exit(0);
});
