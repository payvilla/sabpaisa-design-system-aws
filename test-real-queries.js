/**
 * Real-world testing for SabPaisa Design System MCP Server
 *
 * Tests the server with realistic hackathon queries to validate:
 * 1. All tools work correctly
 * 2. Visual features render properly
 * 3. Analytics track usage
 * 4. Performance is acceptable
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test queries that hackathon teams might use
const REAL_WORLD_QUERIES = [
  {
    name: 'Find primary blue color',
    tool: 'find_color',
    args: { query: 'primary' },
    validate: (response) => {
      const data = JSON.parse(response);
      return data.count > 0 && data.visualization && data.results.length > 0;
    },
  },
  {
    name: 'Search for button component',
    tool: 'search_design_system',
    args: { query: 'button', category: 'components' },
    validate: (response) => {
      const data = JSON.parse(response);
      return data.count > 0;
    },
  },
  {
    name: 'Convert color to RGB',
    tool: 'convert_color',
    args: { color: '#2563eb', toFormat: 'rgb' },
    validate: (response) => {
      const data = JSON.parse(response);
      return data.result && data.visualization;
    },
  },
  {
    name: 'Check contrast for primary on white',
    tool: 'validate_contrast',
    args: { foreground: '#2563eb', background: '#ffffff', textSize: 'normal' },
    validate: (response) => {
      const data = JSON.parse(response);
      return data.result && data.visualization;
    },
  },
  {
    name: 'Generate React button',
    tool: 'generate_component',
    args: { component: 'button', variant: 'primary', framework: 'react' },
    validate: (response) => {
      const data = JSON.parse(response);
      return data.code && data.visualization;
    },
  },
  {
    name: 'Search for KYC pattern',
    tool: 'search_design_system',
    args: { query: 'kyc', category: 'patterns' },
    validate: (response) => {
      const data = JSON.parse(response);
      return data.count > 0;
    },
  },
  {
    name: 'Find success color for payment confirmation',
    tool: 'find_color',
    args: { query: 'success', wcagLevel: 'AA' },
    validate: (response) => {
      const data = JSON.parse(response);
      return data.count >= 0; // May or may not find, but should not error
    },
  },
  {
    name: 'Generate Vue input component',
    tool: 'generate_component',
    args: { component: 'input', framework: 'vue', includeImports: true },
    validate: (response) => {
      const data = JSON.parse(response);
      return data.code && data.language === 'vue';
    },
  },
  {
    name: 'View analytics',
    tool: 'view_analytics',
    args: {},
    validate: (response) => {
      const data = JSON.parse(response);
      return data.summary && data.summary.totalRequests > 0;
    },
  },
];

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Start MCP server
 */
function startServer() {
  const serverPath = join(__dirname, 'dist', 'index.js');
  const server = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env, DEBUG: '0' }, // Production mode
  });

  return server;
}

/**
 * Send MCP request
 */
async function sendMCPRequest(server, toolName, args) {
  return new Promise((resolve, reject) => {
    const request = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args,
      },
    };

    let responseData = '';

    server.stdout.on('data', (data) => {
      responseData += data.toString();
      try {
        const response = JSON.parse(responseData);
        if (response.id === request.id) {
          resolve(response);
        }
      } catch (e) {
        // Partial data, wait for more
      }
    });

    server.stdin.write(JSON.stringify(request) + '\n');

    setTimeout(() => reject(new Error('Request timeout')), 10000);
  });
}

/**
 * Run all tests
 */
async function runTests() {
  console.log(
    `${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`
  );
  console.log(
    `${colors.blue}║${colors.reset}  SabPaisa Design System MCP - Real-World Testing      ${colors.blue}║${colors.reset}`
  );
  console.log(
    `${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`
  );

  console.log(`${colors.cyan}Starting MCP server...${colors.reset}`);
  const server = startServer();

  // Wait for server to be ready
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log(`${colors.green}✓ Server started${colors.reset}\n`);

  let passed = 0;
  let failed = 0;
  const results = [];

  for (const query of REAL_WORLD_QUERIES) {
    console.log(`${colors.cyan}Testing: ${query.name}${colors.reset}`);
    console.log(`  Tool: ${query.tool}`);
    console.log(`  Args: ${JSON.stringify(query.args)}`);

    try {
      const startTime = Date.now();
      const response = await sendMCPRequest(server, query.tool, query.args);
      const duration = Date.now() - startTime;

      const responseText =
        response.result?.content?.[0]?.text ||
        JSON.stringify(response.result);

      const isValid = query.validate(responseText);

      if (isValid) {
        console.log(`  ${colors.green}✓ PASS${colors.reset} (${duration}ms)`);
        passed++;
        results.push({ name: query.name, status: 'PASS', duration });
      } else {
        console.log(`  ${colors.red}✗ FAIL${colors.reset} - Invalid response`);
        failed++;
        results.push({ name: query.name, status: 'FAIL', duration });
      }
    } catch (error) {
      console.log(`  ${colors.red}✗ FAIL${colors.reset} - ${error.message}`);
      failed++;
      results.push({
        name: query.name,
        status: 'FAIL',
        error: error.message,
      });
    }

    console.log('');
  }

  // Print summary
  console.log(
    `${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`
  );
  console.log(
    `${colors.blue}║${colors.reset}  Test Summary                                           ${colors.blue}║${colors.reset}`
  );
  console.log(
    `${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`
  );

  console.log(`Total Tests:  ${REAL_WORLD_QUERIES.length}`);
  console.log(`${colors.green}Passed:       ${passed}${colors.reset}`);
  if (failed > 0) {
    console.log(`${colors.red}Failed:       ${failed}${colors.reset}`);
  } else {
    console.log(`Failed:       ${failed}`);
  }

  const avgDuration =
    results.reduce((sum, r) => sum + (r.duration || 0), 0) / results.length;
  console.log(`Avg Duration: ${avgDuration.toFixed(2)}ms\n`);

  // Cleanup
  server.kill();

  const exitCode = failed > 0 ? 1 : 0;
  process.exit(exitCode);
}

// Run tests
runTests().catch((error) => {
  console.error(`${colors.red}Test execution failed:${colors.reset}`, error);
  process.exit(1);
});
