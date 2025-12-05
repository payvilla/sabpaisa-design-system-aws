/**
 * AWS Lambda HTTP Handler for SabPaisa Design System MCP Server
 *
 * This handler wraps the existing MCP server to work with AWS Lambda + API Gateway.
 * Converts HTTP requests to MCP protocol and returns HTTP responses.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { listResources, getResource } from './resources.js';
import { handleToolCall } from './tools.js';
import { logger } from './logger.js';
import { analytics } from './analytics.js';

// Types for Lambda (supports both v1 and v2 payload formats)
interface APIGatewayProxyEvent {
  path?: string; // v1
  rawPath?: string; // v2
  httpMethod?: string; // v1
  requestContext?: {
    http?: {
      method: string; // v2
      path: string; // v2
    };
  };
  body: string | null;
  headers: Record<string, string | undefined>;
}

interface APIGatewayProxyResult {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

// Server metadata
const SERVER_NAME = '@sabpaisa/design-system-mcp';
const SERVER_VERSION = '1.0.0';

// Global server instance (persists across Lambda invocations)
// @ts-ignore - Temporarily unused while we disable caching
let mcpServer: Server | null = null;

/**
 * Initialize MCP Server (called once per Lambda container)
 */
function initializeServer(): Server {
  // Force fresh initialization to ensure updated tools are loaded
  mcpServer = null;

  logger.info('Initializing MCP server for Lambda...');

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

  // Register handlers
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    logger.debug('Listing resources...');
    const resources = listResources();
    logger.debug(`Returning ${resources.length} resources`);
    return { resources };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    const startTime = Date.now();
    logger.debug(`Reading resource: ${uri}`);

    try {
      const contents = getResource(uri);
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

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    logger.debug('Listing tools...');
    return {
      tools: [
        {
          name: 'search_design_system',
          description:
            'Search across design system (tokens, components, patterns, formatting)',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Search query' },
              category: {
                type: 'string',
                enum: ['all', 'tokens', 'components', 'patterns', 'formatting', 'templates'],
                description: 'Category to search in',
              },
              limit: { type: 'number', description: 'Max results' },
            },
            required: ['query'],
          },
        },
        {
          name: 'find_color',
          description: 'Find colors with accessibility info and multi-format output',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Color query' },
              wcagLevel: {
                type: 'string',
                enum: ['AA', 'AAA'],
                description: 'WCAG level',
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'convert_color',
          description: 'Convert between color formats (hex, rgb, hsl, rgba, cssVar, tailwind)',
          inputSchema: {
            type: 'object',
            properties: {
              color: { type: 'string', description: 'Color value (hex, rgb, token name)' },
              toFormat: {
                type: 'string',
                enum: ['hex', 'rgb', 'hsl', 'rgba', 'cssVar', 'tailwind'],
                description: 'Target format',
              },
              opacity: { type: 'number', description: 'Opacity for rgba (0-1)' },
            },
            required: ['color', 'toFormat'],
          },
        },
        {
          name: 'validate_contrast',
          description: 'Check WCAG color contrast compliance for accessibility',
          inputSchema: {
            type: 'object',
            properties: {
              foreground: { type: 'string', description: 'Foreground color' },
              background: { type: 'string', description: 'Background color' },
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
          description: 'Generate component code from design system spec (React, Vue, Angular, HTML)',
          inputSchema: {
            type: 'object',
            properties: {
              component: { type: 'string', description: 'Component name (button, card, input)' },
              variant: { type: 'string', description: 'Variant (primary, secondary, etc)' },
              framework: {
                type: 'string',
                enum: ['react', 'vue', 'angular', 'html'],
                description: 'Target framework',
              },
              includeImports: { type: 'boolean', description: 'Include import statements' },
            },
            required: ['component', 'framework'],
          },
        },
        {
          name: 'view_analytics',
          description: 'View MCP server usage statistics and popular resources',
          inputSchema: {
            type: 'object',
            properties: {
              reset: { type: 'boolean', description: 'Reset analytics data' },
            },
          },
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const startTime = Date.now();
    logger.debug(`Calling tool: ${request.params.name}`);

    try {
      const result = await handleToolCall(request.params.name, request.params.arguments || {});
      analytics.trackPerformance(Date.now() - startTime);
      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    } catch (error) {
      logger.error(`Error calling tool ${request.params.name}:`, error);
      throw error;
    }
  });

  mcpServer = server;
  logger.info('MCP server initialized successfully');
  return server;
}

/**
 * AWS Lambda Handler
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Support both v1 and v2 payload formats
  const path = event.rawPath || event.path || '';
  const method = event.requestContext?.http?.method || event.httpMethod || '';

  console.log(`Received ${method} ${path}`, JSON.stringify(event, null, 2));

  // Health check endpoint
  if (path === '/health' && method === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: 'healthy',
        version: SERVER_VERSION,
        server: SERVER_NAME,
        resources: 64,
        tools: 6,
        timestamp: new Date().toISOString(),
      }),
    };
  }

  // MCP endpoint - GET returns info page
  if (path === '/mcp' && method === 'GET') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SabPaisa Design System MCP Server</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1f2937; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 2rem; }
    .container { max-width: 900px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; }
    .header { background: linear-gradient(135deg, #5AB0FF 0%, #4A9FEE 100%); color: white; padding: 3rem 2rem; text-align: center; }
    .header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; font-weight: 700; }
    .header p { font-size: 1.1rem; opacity: 0.95; }
    .status { display: inline-block; background: rgba(255,255,255,0.2); padding: 0.5rem 1rem; border-radius: 20px; margin-top: 1rem; font-weight: 600; }
    .status::before { content: '✓'; margin-right: 0.5rem; }
    .content { padding: 2rem; }
    .section { margin-bottom: 2.5rem; }
    .section h2 { color: #5AB0FF; font-size: 1.5rem; margin-bottom: 1rem; border-bottom: 3px solid #5AB0FF; padding-bottom: 0.5rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem; }
    .card { background: #f9fafb; padding: 1.5rem; border-radius: 12px; border: 2px solid #e5e7eb; }
    .card h3 { color: #1f2937; margin-bottom: 0.75rem; font-size: 1.1rem; }
    .card p { color: #6b7280; font-size: 0.95rem; }
    .stat { font-size: 2rem; font-weight: 700; color: #5AB0FF; }
    .code-block { background: #1f2937; color: #f9fafb; padding: 1.5rem; border-radius: 8px; overflow-x: auto; margin-top: 1rem; font-family: 'Monaco', 'Courier New', monospace; font-size: 0.9rem; line-height: 1.5; }
    .code-block code { color: #10b981; }
    .endpoints { background: #eff6ff; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #5AB0FF; }
    .endpoint { margin-bottom: 1rem; }
    .endpoint-url { font-family: monospace; color: #5AB0FF; font-weight: 600; font-size: 0.95rem; }
    .endpoint-desc { color: #6b7280; font-size: 0.9rem; margin-top: 0.25rem; }
    .btn { display: inline-block; background: #5AB0FF; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 1rem; transition: background 0.2s; }
    .btn:hover { background: #4A9FEE; }
    .footer { background: #f9fafb; padding: 2rem; text-align: center; color: #6b7280; border-top: 2px solid #e5e7eb; }
    .badge { display: inline-block; background: #10b981; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.85rem; font-weight: 600; margin-left: 0.5rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎨 SabPaisa Design System MCP</h1>
      <p>Model Context Protocol Server for Design System Integration</p>
      <div class="status">Server Online</div>
    </div>

    <div class="content">
      <div class="section">
        <h2>📊 Server Status</h2>
        <div class="grid">
          <div class="card">
            <h3>Version</h3>
            <div class="stat">${SERVER_VERSION}</div>
          </div>
          <div class="card">
            <h3>Resources</h3>
            <div class="stat">64</div>
            <p>Design tokens, components, patterns</p>
          </div>
          <div class="card">
            <h3>Tools</h3>
            <div class="stat">15</div>
            <p>Search, generate, validate</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>🔗 Endpoints</h2>
        <div class="endpoints">
          <div class="endpoint">
            <div class="endpoint-url">POST ${event.rawPath || '/mcp'}</div>
            <div class="endpoint-desc">JSON-RPC 2.0 endpoint for MCP requests (requires bridge script)</div>
          </div>
          <div class="endpoint">
            <div class="endpoint-url">GET /health</div>
            <div class="endpoint-desc">Health check endpoint returning server status</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>🚀 Quick Start</h2>
        <p>This is an HTTP-based MCP server. To use it with Claude Code, you need a local bridge script:</p>
        <div class="code-block">mkdir -p ~/.sabpaisa-mcp
cat > ~/.sabpaisa-mcp/mcp-bridge.mjs &lt;&lt;'EOF'
#!/usr/bin/env node
import * as readline from 'readline';
const endpoint = '${event.headers.host ? `https://${event.headers.host}/mcp` : 'https://suanrlo9yc.execute-api.ap-south-1.amazonaws.com/mcp'}';
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', async (line) => {
  try {
    const request = JSON.parse(line);
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(request) });
    console.log(JSON.stringify(response.ok ? await response.json() : { jsonrpc: '2.0', id: request.id, error: { code: -32603, message: \`HTTP \${response.status}\` }}));
  } catch (error) { console.log(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32603, message: error.message }})); }
});
EOF
chmod +x ~/.sabpaisa-mcp/mcp-bridge.mjs</div>
      </div>

      <div class="section">
        <h2>⚙️ Claude Code Configuration</h2>
        <p>Add to <code>.claude/mcp.json</code> in your project:</p>
        <div class="code-block">{
  "mcpServers": {
    "sabpaisa-design-system": {
      "command": "node",
      "args": [
        "/Users/YOUR_USERNAME/.sabpaisa-mcp/mcp-bridge.mjs"
      ],
      "description": "SabPaisa Design System"
    }
  }
}</div>
      </div>

      <div class="section">
        <h2>🧪 Test Endpoint</h2>
        <p>Test the MCP server with curl:</p>
        <div class="code-block">curl -X POST ${event.headers.host ? `https://${event.headers.host}/mcp` : 'https://suanrlo9yc.execute-api.ap-south-1.amazonaws.com/mcp'} \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"resources/list","id":1,"params":{}}'</div>
        <a href="/health" class="btn">Check Server Health →</a>
        <a href="http://sabpaisa-design-system-frontend-428169664322.s3-website.ap-south-1.amazonaws.com" class="btn" style="background: #764ba2;">View Full Documentation →</a>
      </div>
    </div>

    <div class="footer">
      <p><strong>SabPaisa Design System MCP Server</strong> v${SERVER_VERSION}</p>
      <p>For hackathon support, visit the documentation site above</p>
    </div>
  </div>
</body>
</html>`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
      },
      body: html,
    };
  }

  // MCP request endpoint
  if (path === '/mcp' && method === 'POST') {
    try {
      // Parse request body
      if (!event.body) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ error: 'Request body is required' }),
        };
      }

      const mcpRequest = JSON.parse(event.body);
      logger.debug('MCP request:', mcpRequest);

      // Initialize server (cached after first invocation)
      initializeServer();

      // Process MCP request
      // Note: We simulate the request/response cycle since Lambda doesn't use stdio
      let result: any;

      if (mcpRequest.method === 'resources/list') {
        const resources = listResources();
        result = {
          jsonrpc: '2.0',
          id: mcpRequest.id,
          result: { resources },
        };
      } else if (mcpRequest.method === 'resources/read') {
        const contents = getResource(mcpRequest.params.uri);
        result = {
          jsonrpc: '2.0',
          id: mcpRequest.id,
          result: {
            contents: [
              {
                uri: mcpRequest.params.uri,
                mimeType: 'application/json',
                text: contents,
              },
            ],
          },
        };
      } else if (mcpRequest.method === 'tools/list') {
        result = {
          jsonrpc: '2.0',
          id: mcpRequest.id,
          result: {
            tools: [
              { name: 'search_design_system', description: 'Search across design system (tokens, components, patterns, formatting)' },
              { name: 'find_color', description: 'Find colors with accessibility info and multi-format output' },
              { name: 'convert_color', description: 'Convert between color formats (hex, rgb, hsl, rgba, cssVar, tailwind)' },
              { name: 'validate_contrast', description: 'Check WCAG color contrast compliance for accessibility' },
              { name: 'generate_component', description: 'Generate component code from design system spec (React, Vue, Angular, HTML)' },
              { name: 'view_analytics', description: 'View MCP server usage statistics and popular resources' },
            ],
          },
        };
      } else if (mcpRequest.method === 'tools/call') {
        const toolResult = await handleToolCall(
          mcpRequest.params.name,
          mcpRequest.params.arguments || {}
        );
        result = {
          jsonrpc: '2.0',
          id: mcpRequest.id,
          result: toolResult,
        };
      } else {
        result = {
          jsonrpc: '2.0',
          id: mcpRequest.id,
          error: {
            code: -32601,
            message: `Method not found: ${mcpRequest.method}`,
          },
        };
      }

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(result),
      };
    } catch (error) {
      logger.error('Error processing MCP request:', error);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: error instanceof Error ? error.message : 'Internal server error',
          },
        }),
      };
    }
  }

  // 404 for unknown endpoints
  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ error: 'Not Found' }),
  };
};
