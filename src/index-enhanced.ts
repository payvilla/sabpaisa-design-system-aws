#!/usr/bin/env node

/**
 * SabPaisa Design System MCP Server - Enhanced Version
 *
 * Main entry point with 100% design system coverage from extracted data.
 * Provides 35 sections, 110+ resources, and 15 tools via MCP protocol.
 *
 * Features:
 * - LRU cache with lazy loading
 * - Hierarchical URIs (sabpaisa://section/4, sabpaisa://quick/colors)
 * - Enhanced search across all content
 * - Component specifications with code examples
 * - Pattern queries (fintech, accessibility, performance)
 * - Implementation guides and decision trees
 *
 * Usage:
 *   node dist/index-enhanced.js
 *   or via Claude Desktop config
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Enhanced imports
import { listAllResources, getEnhancedResource } from './resources-enhanced.js';
import { enhancedToolSchemas, handleEnhancedToolCall } from './tools-enhanced.js';

// Legacy imports for backward compatibility
import { listResources, getResource } from './resources.js';
import { handleToolCall } from './tools.js';

import { logger } from './logger.js';
import { analytics } from './analytics.js';

// Server metadata
const SERVER_NAME = '@sabpaisa/design-system-mcp-enhanced';
const SERVER_VERSION = '2.0.0'; // Enhanced version
const ENABLE_ENHANCED = process.env.ENABLE_ENHANCED !== 'false'; // Default to enhanced

/**
 * Initialize MCP Server
 */
const server = new Server(
  {
    name: SERVER_NAME,
    version: SERVER_VERSION,
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

/**
 * Handler: List all available resources
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  logger.debug('Listing resources...');

  const resources = ENABLE_ENHANCED
    ? listAllResources(true) // Enhanced + legacy
    : listResources(); // Legacy only

  logger.debug(`Returning ${resources.length} resources (enhanced: ${ENABLE_ENHANCED})`);

  return {
    resources,
  };
});

/**
 * Handler: Read a specific resource
 */
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  const startTime = Date.now();

  logger.debug(`Reading resource: ${uri}`);

  try {
    let contents: string;

    // Check if this is an enhanced URI
    if (ENABLE_ENHANCED && (
      uri.startsWith('sabpaisa://section/') ||
      uri.startsWith('sabpaisa://parts/') ||
      uri.startsWith('sabpaisa://quick/') ||
      uri.startsWith('sabpaisa://components/') ||
      uri === 'sabpaisa://index'
    )) {
      contents = getEnhancedResource(uri);
    } else {
      // Fall back to legacy
      contents = getResource(uri);
    }

    // Track analytics
    analytics.trackResourceAccess(uri);
    analytics.trackPerformance(Date.now() - startTime);

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: contents,
        },
      ],
    };
  } catch (error) {
    logger.error(`Error reading resource ${uri}:`, error);

    throw new Error(
      `Failed to read resource ${uri}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
});

/**
 * Handler: List all available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  logger.debug('Listing tools...');

  // Legacy tools
  const legacyTools = [
    {
      name: 'search_design_system',
      description:
        'Search across design system (tokens, components, patterns, formatting)',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query (e.g., "blue button", "settlement workflow")',
          },
          category: {
            type: 'string',
            enum: ['all', 'tokens', 'components', 'patterns', 'formatting'],
            description: 'Category to search in (default: all)',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of results (default: 10)',
          },
        },
        required: ['query'],
      },
    },
    {
      name: 'find_color',
      description: 'Find colors with multi-format output and accessibility info',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Color query (e.g., "primary", "#2563eb", "success")',
          },
          wcagLevel: {
            type: 'string',
            enum: ['AA', 'AAA'],
            description: 'Filter by WCAG compliance level',
          },
        },
        required: ['query'],
      },
    },
    {
      name: 'convert_color',
      description: 'Convert between color formats',
      inputSchema: {
        type: 'object',
        properties: {
          color: {
            type: 'string',
            description: 'Color value (hex, rgb, token name)',
          },
          toFormat: {
            type: 'string',
            enum: ['hex', 'rgb', 'hsl', 'rgba', 'cssVar', 'tailwind'],
            description: 'Target format',
          },
          opacity: {
            type: 'number',
            description: 'Opacity for rgba format (0-1)',
          },
        },
        required: ['color', 'toFormat'],
      },
    },
    {
      name: 'validate_contrast',
      description: 'Check WCAG color contrast compliance',
      inputSchema: {
        type: 'object',
        properties: {
          foreground: {
            type: 'string',
            description: 'Foreground color (hex, rgb, or token)',
          },
          background: {
            type: 'string',
            description: 'Background color (hex, rgb, or token)',
          },
          textSize: {
            type: 'string',
            enum: ['normal', 'large'],
            description: 'Text size for WCAG calculation',
          },
        },
        required: ['foreground', 'background'],
      },
    },
    {
      name: 'generate_component',
      description: 'Generate component code from design system spec',
      inputSchema: {
        type: 'object',
        properties: {
          component: {
            type: 'string',
            description: 'Component ID (e.g., "button", "card")',
          },
          variant: {
            type: 'string',
            description: 'Component variant (e.g., "primary", "secondary")',
          },
          framework: {
            type: 'string',
            enum: ['react', 'vue', 'angular', 'html'],
            description: 'Target framework',
          },
          includeImports: {
            type: 'boolean',
            description: 'Include import statements (default: true)',
          },
        },
        required: ['component', 'framework'],
      },
    },
    {
      name: 'view_analytics',
      description: 'View MCP server usage statistics and analytics',
      inputSchema: {
        type: 'object',
        properties: {
          reset: {
            type: 'boolean',
            description: 'Reset all analytics (default: false)',
          },
        },
      },
    },
  ];

  const tools = ENABLE_ENHANCED
    ? [...legacyTools, ...enhancedToolSchemas]
    : legacyTools;

  logger.debug(`Returning ${tools.length} tools (enhanced: ${ENABLE_ENHANCED})`);

  return { tools };
});

/**
 * Handler: Call a tool
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const startTime = Date.now();

  logger.debug(`Calling tool: ${name} with args:`, args);

  try {
    // Track analytics
    analytics.trackToolUsage(name, args);

    let result: any;

    // Check if this is an enhanced tool
    const enhancedToolNames = enhancedToolSchemas.map((t) => t.name);
    if (ENABLE_ENHANCED && enhancedToolNames.includes(name)) {
      result = handleEnhancedToolCall(name, args || {});
      result = JSON.stringify(result, null, 2);
    } else {
      // Fall back to legacy
      result = await handleToolCall(name, args || {});
    }

    analytics.trackPerformance(Date.now() - startTime);
    logger.debug(`Tool ${name} completed successfully`);

    return {
      content: [
        {
          type: 'text',
          text: result,
        },
      ],
    };
  } catch (error) {
    logger.error(`Tool ${name} failed:`, error);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              error: `Tool execution failed`,
              tool: name,
              message: error instanceof Error ? error.message : String(error),
            },
            null,
            2
          ),
        },
      ],
    };
  }
});

/**
 * Start the MCP server
 */
async function main() {
  logger.info('='.repeat(60));
  logger.info('SabPaisa Design System MCP Server - Enhanced');
  logger.info('='.repeat(60));
  logger.info(`Server: ${SERVER_NAME} v${SERVER_VERSION}`);
  logger.info(`Enhanced mode: ${ENABLE_ENHANCED ? 'ENABLED' : 'DISABLED'}`);
  logger.info(`Data source: ${ENABLE_ENHANCED ? 'data-enhanced/ (35 sections)' : 'data/ (legacy)'}`);
  logger.info('='.repeat(60));

  const transport = new StdioServerTransport();

  await server.connect(transport);

  logger.info('✅ Server running and ready to accept requests');
  logger.info('📊 Resources available: ' + (ENABLE_ENHANCED ? '110+' : '22'));
  logger.info('🔧 Tools available: ' + (ENABLE_ENHANCED ? '15' : '6'));
  logger.info('💾 Cache: LRU (20 files, 50MB limit)');
  logger.info('='.repeat(60));
  logger.info('Use Ctrl+C to stop the server');
}

// Run the server
main().catch((error) => {
  logger.error('Fatal error:', error);
  process.exit(1);
});
