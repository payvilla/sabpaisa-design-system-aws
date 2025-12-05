#!/usr/bin/env node

/**
 * Manual test script for SabPaisa Design System MCP Server
 *
 * This script tests the MCP server by simulating MCP client requests
 */

import { spawn } from 'child_process';
import { setTimeout } from 'timers/promises';

console.log('🧪 Testing SabPaisa Design System MCP Server\n');
console.log('═'.repeat(70));

// Test 1: Server Startup
console.log('\n✓ Test 1: Server Startup');
const server = spawn('node', ['dist/index.js'], {
  cwd: process.cwd(),
  stdio: ['pipe', 'pipe', 'pipe']
});

let serverOutput = '';
server.stderr.on('data', (data) => {
  const output = data.toString();
  serverOutput += output;
  // Print stderr in real-time for debugging
  if (output.includes('[Search]') || output.includes('Indexing')) {
    console.log('  [DEBUG]', output.trim());
  }
});

server.stdout.on('data', (data) => {
  console.log('  Server output:', data.toString().trim());
});

// Wait for server to start
await setTimeout(1000);

if (serverOutput.includes('Server running')) {
  console.log('  ✅ Server started successfully');
} else {
  console.log('  ❌ Server failed to start');
  console.log('  Output:', serverOutput);
}

// Test 2: List Resources Request
console.log('\n✓ Test 2: List Resources');
const listResourcesRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'resources/list',
  params: {}
};

server.stdin.write(JSON.stringify(listResourcesRequest) + '\n');

// Test 3: Read Resource Request
await setTimeout(500);
console.log('\n✓ Test 3: Read Resource (sabpaisa://tokens/colors)');
const readResourceRequest = {
  jsonrpc: '2.0',
  id: 2,
  method: 'resources/read',
  params: {
    uri: 'sabpaisa://tokens/colors'
  }
};

server.stdin.write(JSON.stringify(readResourceRequest) + '\n');

// Test 4: Call Tool - Search
await setTimeout(500);
console.log('\n✓ Test 4: Call Tool - search_design_system');
const searchToolRequest = {
  jsonrpc: '2.0',
  id: 3,
  method: 'tools/call',
  params: {
    name: 'search_design_system',
    arguments: {
      query: 'button',
      category: 'components',
      limit: 5
    }
  }
};

server.stdin.write(JSON.stringify(searchToolRequest) + '\n');

// Test 5: Call Tool - Find Color
await setTimeout(500);
console.log('\n✓ Test 5: Call Tool - find_color');
const findColorRequest = {
  jsonrpc: '2.0',
  id: 4,
  method: 'tools/call',
  params: {
    name: 'find_color',
    arguments: {
      query: 'primary',
      wcagLevel: 'AA'
    }
  }
};

server.stdin.write(JSON.stringify(findColorRequest) + '\n');

// Test 6: Call Tool - Convert Color
await setTimeout(500);
console.log('\n✓ Test 6: Call Tool - convert_color');
const convertColorRequest = {
  jsonrpc: '2.0',
  id: 5,
  method: 'tools/call',
  params: {
    name: 'convert_color',
    arguments: {
      color: '#2563eb',
      toFormat: 'rgb'
    }
  }
};

server.stdin.write(JSON.stringify(convertColorRequest) + '\n');

// Test 7: Call Tool - Validate Contrast
await setTimeout(500);
console.log('\n✓ Test 7: Call Tool - validate_contrast');
const validateContrastRequest = {
  jsonrpc: '2.0',
  id: 6,
  method: 'tools/call',
  params: {
    name: 'validate_contrast',
    arguments: {
      foreground: '#2563eb',
      background: '#ffffff',
      textSize: 'normal'
    }
  }
};

server.stdin.write(JSON.stringify(validateContrastRequest) + '\n');

// Test 8: Call Tool - Generate Component
await setTimeout(500);
console.log('\n✓ Test 8: Call Tool - generate_component');
const generateComponentRequest = {
  jsonrpc: '2.0',
  id: 7,
  method: 'tools/call',
  params: {
    name: 'generate_component',
    arguments: {
      component: 'button',
      variant: 'primary',
      framework: 'react',
      includeImports: true
    }
  }
};

server.stdin.write(JSON.stringify(generateComponentRequest) + '\n');

// Wait for responses
await setTimeout(2000);

console.log('\n═'.repeat(70));
console.log('\n🎉 Test Suite Completed\n');
console.log('Note: Actual responses are processed via stdio.');
console.log('Check server logs above for response details.\n');

// Cleanup
server.kill();
process.exit(0);
