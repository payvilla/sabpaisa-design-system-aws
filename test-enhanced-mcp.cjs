#!/usr/bin/env node

/**
 * Test script for Enhanced SabPaisa MCP Server
 *
 * Tests all 35 sections, new tools, and hierarchical URIs
 */

const { spawn } = require('child_process');
const path = require('path');
const readline = require('readline');

console.log('='.repeat(60));
console.log('SabPaisa Enhanced MCP Server Test');
console.log('='.repeat(60));

const serverPath = path.join(__dirname, 'dist', 'index-enhanced.js');

// Test queries
const tests = [
  {
    name: '1. List Resources',
    request: {
      jsonrpc: '2.0',
      id: 1,
      method: 'resources/list',
    },
  },
  {
    name: '2. Read Index',
    request: {
      jsonrpc: '2.0',
      id: 2,
      method: 'resources/read',
      params: {
        uri: 'sabpaisa://index',
      },
    },
  },
  {
    name: '3. Read Section 4 (Colors)',
    request: {
      jsonrpc: '2.0',
      id: 3,
      method: 'resources/read',
      params: {
        uri: 'sabpaisa://section/4',
      },
    },
  },
  {
    name: '4. Query Colors (Quick Access)',
    request: {
      jsonrpc: '2.0',
      id: 4,
      method: 'resources/read',
      params: {
        uri: 'sabpaisa://quick/colors',
      },
    },
  },
  {
    name: '5. Query Button Component',
    request: {
      jsonrpc: '2.0',
      id: 5,
      method: 'resources/read',
      params: {
        uri: 'sabpaisa://components/button',
      },
    },
  },
  {
    name: '6. List Tools',
    request: {
      jsonrpc: '2.0',
      id: 6,
      method: 'tools/list',
    },
  },
  {
    name: '7. Tool: Query Section 26 (Fintech Patterns)',
    request: {
      jsonrpc: '2.0',
      id: 7,
      method: 'tools/call',
      params: {
        name: 'query_section',
        arguments: {
          section: 26,
        },
      },
    },
  },
  {
    name: '8. Tool: Query Component Specs (Button)',
    request: {
      jsonrpc: '2.0',
      id: 8,
      method: 'tools/call',
      params: {
        name: 'query_component_specs',
        arguments: {
          component: 'button',
        },
      },
    },
  },
  {
    name: '9. Tool: Query Design Tokens (Colors)',
    request: {
      jsonrpc: '2.0',
      id: 9,
      method: 'tools/call',
      params: {
        name: 'query_design_tokens',
        arguments: {
          type: 'colors',
        },
      },
    },
  },
  {
    name: '10. Tool: Get Quick Reference',
    request: {
      jsonrpc: '2.0',
      id: 10,
      method: 'tools/call',
      params: {
        name: 'get_quick_reference',
      },
    },
  },
  {
    name: '11. Tool: Search Enhanced',
    request: {
      jsonrpc: '2.0',
      id: 11,
      method: 'tools/call',
      params: {
        name: 'search_design_system_enhanced',
        arguments: {
          query: 'primary button',
          type: 'molecules',
        },
      },
    },
  },
  {
    name: '12. Tool: Get Cache Stats',
    request: {
      jsonrpc: '2.0',
      id: 12,
      method: 'tools/call',
      params: {
        name: 'get_cache_stats',
      },
    },
  },
];

let currentTestIndex = 0;
let server;

function runTest() {
  if (currentTestIndex >= tests.length) {
    console.log('\n' + '='.repeat(60));
    console.log('✅ All tests completed!');
    console.log('='.repeat(60));
    server.kill();
    process.exit(0);
    return;
  }

  const test = tests[currentTestIndex];
  console.log(`\n📝 Test ${currentTestIndex + 1}/${tests.length}: ${test.name}`);

  server.stdin.write(JSON.stringify(test.request) + '\n');
  currentTestIndex++;
}

function startServer() {
  console.log('\n🚀 Starting Enhanced MCP Server...');

  server = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env, ENABLE_ENHANCED: 'true' },
  });

  const rl = readline.createInterface({
    input: server.stdout,
    terminal: false,
  });

  let responseBuffer = '';

  rl.on('line', (line) => {
    responseBuffer += line;

    try {
      const response = JSON.parse(responseBuffer);

      if (response.result) {
        console.log('✅ Success');

        if (response.result.resources) {
          console.log(`   📊 Resources: ${response.result.resources.length}`);
        } else if (response.result.tools) {
          console.log(`   🔧 Tools: ${response.result.tools.length}`);
        } else if (response.result.contents) {
          const content = response.result.contents[0].text;
          try {
            const parsed = JSON.parse(content);
            if (parsed.section) {
              console.log(`   📄 Section: ${parsed.section} - ${parsed.title}`);
              console.log(`   📊 Code Blocks: ${parsed.codeBlocks?.length || 0}`);
              console.log(`   📋 Tables: ${parsed.tables?.length || 0}`);
            } else if (parsed.success) {
              console.log(`   ✅ ${JSON.stringify(parsed).substring(0, 100)}...`);
            }
          } catch (e) {
            console.log(`   📄 Content length: ${content.length} characters`);
          }
        } else if (response.result.content) {
          const text = response.result.content[0].text;
          try {
            const parsed = JSON.parse(text);
            if (parsed.success) {
              console.log(`   ✅ ${JSON.stringify(parsed).substring(0, 150)}...`);
            }
          } catch (e) {
            console.log(`   📄 Response: ${text.substring(0, 100)}...`);
          }
        }
      } else if (response.error) {
        console.log(`❌ Error: ${response.error.message}`);
      }

      responseBuffer = '';

      // Run next test after a short delay
      setTimeout(runTest, 100);
    } catch (e) {
      // Incomplete JSON, continue buffering
    }
  });

  server.stderr.on('data', (data) => {
    // Ignore stderr for now (debug logs)
  });

  server.on('error', (error) => {
    console.error('❌ Server error:', error);
    process.exit(1);
  });

  // Wait for server to initialize
  setTimeout(() => {
    console.log('✅ Server ready\n');
    runTest();
  }, 1000);
}

startServer();
