#!/usr/bin/env tsx

/**
 * Extract structured data from SABPAISA_COB_DESIGN_MASTER.md
 *
 * This script parses the 10,716-line design master document and extracts:
 * - Design tokens (colors, typography, spacing, effects, animations)
 * - Component specifications (25+ components)
 * - Patterns and workflows
 * - Implementation guides
 *
 * Output: 30+ JSON files organized by atomic design levels
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Configuration
const DESIGN_MASTER_PATH = '/Users/sabadmin/Documents/SABPAISA_COB_DESIGN_MASTER.md';
const OUTPUT_BASE_PATH = '/Users/sabadmin/Documents/mcp-servers/sabpaisa-design-system-mcp/data-enhanced';

// Part boundaries (line numbers from grep)
const PART_BOUNDARIES = {
  PART_1_META: { start: 78, end: 295, dir: '1-meta' },
  PART_2_ATOMS: { start: 296, end: 1616, dir: '2-atoms' },
  PART_3_MOLECULES: { start: 1617, end: 4938, dir: '3-molecules' },
  PART_4_ORGANISMS: { start: 4939, end: 6981, dir: '4-organisms' },
  PART_5_TEMPLATES: { start: 6982, end: 8131, dir: '5-templates' },
  PART_6_UX_PATTERNS: { start: 8132, end: 9125, dir: '6-ux-patterns' },
  PART_7_IMPLEMENTATION: { start: 9126, end: 9534, dir: '7-implementation' },
  PART_8_APPENDICES: { start: 9535, end: 10716, dir: '8-appendices' },
};

// Section mapping to output files
const SECTION_MAPPING = {
  // PART 1: Meta
  1: { file: '1-meta/how-to-use.json', title: 'How to Use This Document' },
  2: { file: '1-meta/quick-reference.json', title: 'Quick Reference Cards' },
  3: { file: '1-meta/changelog.json', title: 'Document Changelog & Version' },

  // PART 2: Atoms (Design Tokens)
  4: { file: '2-atoms/colors.json', title: 'Color Token System' },
  5: { file: '2-atoms/typography.json', title: 'Typography Token System' },
  6: { file: '2-atoms/spacing.json', title: 'Spacing & Layout Tokens' },
  7: { file: '2-atoms/effects.json', title: 'Effect Tokens' },
  8: { file: '2-atoms/animations.json', title: 'Motion & Animation Tokens' },

  // PART 3: Molecules (Basic Components)
  9: { file: '3-molecules/button.json', title: 'Button Component' },
  10: { file: '3-molecules/textfield.json', title: 'TextField Component' },
  11: { file: '3-molecules/card.json', title: 'Card Component' },
  12: { file: '3-molecules/badge.json', title: 'Badge Component' },
  13: { file: '3-molecules/toast.json', title: 'Toast/Notification Component' },
  14: { file: '3-molecules/otp-input.json', title: 'OtpInput Component' },

  // PART 4: Organisms (Complex Components)
  15: { file: '4-organisms/modal.json', title: 'Modal/Dialog Component' },
  16: { file: '4-organisms/file-upload.json', title: 'FileUpload Component' },
  17: { file: '4-organisms/navigation.json', title: 'Navigation/Sidebar Component' },
  18: { file: '4-organisms/form-patterns.json', title: 'Form Composition Patterns' },
  19: { file: '4-organisms/data-display.json', title: 'Data Display Patterns' },

  // PART 5: Templates
  20: { file: '5-templates/layout-patterns.json', title: 'Layout Patterns' },
  21: { file: '5-templates/user-flows.json', title: 'Complete User Flows' },

  // PART 6: UX Patterns & Fintech
  22: { file: '6-ux-patterns/animations.json', title: 'Animation & Motion Patterns' },
  23: { file: '6-ux-patterns/loading-states.json', title: 'Loading States & Skeletons' },
  24: { file: '6-ux-patterns/error-handling.json', title: 'Error Handling UX' },
  25: { file: '6-ux-patterns/micro-interactions.json', title: 'Micro-Interactions' },
  26: { file: '6-ux-patterns/fintech-patterns.json', title: 'Fintech-Specific Patterns' },
  27: { file: '6-ux-patterns/data-viz.json', title: 'Data Visualization Patterns' },
  28: { file: '6-ux-patterns/responsive.json', title: 'Responsive Design Patterns' },
  29: { file: '6-ux-patterns/accessibility.json', title: 'Accessibility Patterns (WCAG 2.2 AA)' },
  30: { file: '6-ux-patterns/performance.json', title: 'Performance Optimization Patterns' },

  // PART 7: Implementation Guides
  31: { file: '7-implementation/component-selection.json', title: 'Component Selection Guide' },
  32: { file: '7-implementation/color-usage.json', title: 'Color Usage Guide' },
  33: { file: '7-implementation/typography-selection.json', title: 'Typography Selection Guide' },
  34: { file: '7-implementation/state-management.json', title: 'State Management Patterns' },
  35: { file: '7-implementation/anti-patterns.json', title: 'Anti-Patterns Consolidated' },
};

interface ExtractedSection {
  sectionNumber: number;
  title: string;
  content: string;
  startLine: number;
  endLine: number;
  codeBlocks: CodeBlock[];
  tables: Table[];
}

interface CodeBlock {
  language: string;
  code: string;
  lineNumber: number;
}

interface Table {
  headers: string[];
  rows: string[][];
  lineNumber: number;
}

/**
 * Parse markdown content into lines
 */
function parseMarkdown(content: string): string[] {
  return content.split('\n');
}

/**
 * Find section boundaries
 */
function findSections(lines: string[]): Map<number, { start: number; end: number; title: string }> {
  const sections = new Map<number, { start: number; end: number; title: string }>();
  const sectionPattern = /^## Section (\d+): (.+)$/;

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(sectionPattern);
    if (match) {
      const sectionNum = parseInt(match[1]);
      const title = match[2];

      // Find end of section (next section or end of file)
      let end = lines.length - 1;
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].match(sectionPattern) || lines[j].match(/^# PART \d+:/)) {
          end = j - 1;
          break;
        }
      }

      sections.set(sectionNum, { start: i, end, title });
    }
  }

  return sections;
}

/**
 * Extract code blocks from section
 */
function extractCodeBlocks(lines: string[], startLine: number, endLine: number): CodeBlock[] {
  const codeBlocks: CodeBlock[] = [];
  let inCodeBlock = false;
  let currentBlock: { language: string; lines: string[]; startLine: number } | null = null;

  for (let i = startLine; i <= endLine; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        // Start of code block
        const language = line.slice(3).trim() || 'text';
        currentBlock = { language, lines: [], startLine: i };
        inCodeBlock = true;
      } else {
        // End of code block
        if (currentBlock) {
          codeBlocks.push({
            language: currentBlock.language,
            code: currentBlock.lines.join('\n'),
            lineNumber: currentBlock.startLine,
          });
        }
        currentBlock = null;
        inCodeBlock = false;
      }
    } else if (inCodeBlock && currentBlock) {
      currentBlock.lines.push(line);
    }
  }

  return codeBlocks;
}

/**
 * Extract tables from section
 */
function extractTables(lines: string[], startLine: number, endLine: number): Table[] {
  const tables: Table[] = [];
  let inTable = false;
  let currentTable: { headers: string[]; rows: string[][]; startLine: number } | null = null;

  for (let i = startLine; i <= endLine; i++) {
    const line = lines[i].trim();

    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim());

      if (!inTable) {
        // First row - headers
        currentTable = { headers: cells, rows: [], startLine: i };
        inTable = true;
      } else if (currentTable && !line.includes('---')) {
        // Data row
        currentTable.rows.push(cells);
      }
    } else if (inTable && currentTable) {
      // End of table
      if (currentTable.rows.length > 0) {
        tables.push({
          headers: currentTable.headers,
          rows: currentTable.rows,
          lineNumber: currentTable.startLine,
        });
      }
      currentTable = null;
      inTable = false;
    }
  }

  // Handle table at end of section
  if (inTable && currentTable && currentTable.rows.length > 0) {
    tables.push({
      headers: currentTable.headers,
      rows: currentTable.rows,
      lineNumber: currentTable.startLine,
    });
  }

  return tables;
}

/**
 * Extract a section with all its content
 */
function extractSection(
  lines: string[],
  sectionNum: number,
  start: number,
  end: number,
  title: string
): ExtractedSection {
  const content = lines.slice(start, end + 1).join('\n');
  const codeBlocks = extractCodeBlocks(lines, start, end);
  const tables = extractTables(lines, start, end);

  return {
    sectionNumber: sectionNum,
    title,
    content,
    startLine: start,
    endLine: end,
    codeBlocks,
    tables,
  };
}

/**
 * Convert extracted section to JSON structure
 */
function sectionToJSON(section: ExtractedSection): any {
  return {
    section: section.sectionNumber,
    title: section.title,
    metadata: {
      startLine: section.startLine,
      endLine: section.endLine,
      codeBlockCount: section.codeBlocks.length,
      tableCount: section.tables.length,
      extractedAt: new Date().toISOString(),
    },
    codeBlocks: section.codeBlocks.map((block, idx) => ({
      id: `code-${section.sectionNumber}-${idx}`,
      language: block.language,
      code: block.code,
      lineNumber: block.lineNumber,
    })),
    tables: section.tables.map((table, idx) => ({
      id: `table-${section.sectionNumber}-${idx}`,
      headers: table.headers,
      rows: table.rows,
      lineNumber: table.lineNumber,
    })),
    content: section.content,
  };
}

/**
 * Main extraction function
 */
async function main() {
  console.log('🚀 Starting extraction from SABPAISA_COB_DESIGN_MASTER.md...\n');

  // Read design master file
  console.log(`📖 Reading ${DESIGN_MASTER_PATH}...`);
  const content = readFileSync(DESIGN_MASTER_PATH, 'utf-8');
  const lines = parseMarkdown(content);
  console.log(`✅ Loaded ${lines.length} lines\n`);

  // Find all sections
  console.log('🔍 Finding sections...');
  const sections = findSections(lines);
  console.log(`✅ Found ${sections.size} sections\n`);

  // Extract each section
  console.log('📦 Extracting sections...\n');
  let extractedCount = 0;

  for (const [sectionNum, boundaries] of sections.entries()) {
    const mapping = SECTION_MAPPING[sectionNum as keyof typeof SECTION_MAPPING];
    if (!mapping) {
      console.log(`⚠️  No mapping for section ${sectionNum}, skipping...`);
      continue;
    }

    console.log(`  [${sectionNum}/35] ${mapping.title}...`);

    const extracted = extractSection(
      lines,
      sectionNum,
      boundaries.start,
      boundaries.end,
      boundaries.title
    );

    const jsonData = sectionToJSON(extracted);
    const outputPath = join(OUTPUT_BASE_PATH, mapping.file);

    writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), 'utf-8');

    console.log(`      ✅ Saved to ${mapping.file}`);
    console.log(`      📊 ${extracted.codeBlocks.length} code blocks, ${extracted.tables.length} tables\n`);

    extractedCount++;
  }

  // Create index file
  console.log('📋 Creating index file...');
  const indexData = {
    version: '1.0.0',
    extractedAt: new Date().toISOString(),
    sourcePath: DESIGN_MASTER_PATH,
    totalSections: extractedCount,
    sections: Object.entries(SECTION_MAPPING).map(([num, mapping]) => ({
      section: parseInt(num),
      title: mapping.title,
      file: mapping.file,
    })),
  };

  writeFileSync(
    join(OUTPUT_BASE_PATH, 'index.json'),
    JSON.stringify(indexData, null, 2),
    'utf-8'
  );
  console.log('✅ Index created\n');

  // Summary
  console.log('=' .repeat(60));
  console.log('✨ Extraction Complete!');
  console.log('=' .repeat(60));
  console.log(`📊 Sections extracted: ${extractedCount}/35`);
  console.log(`📁 Output directory: ${OUTPUT_BASE_PATH}`);
  console.log('=' .repeat(60));
}

// Run extraction
main().catch((error) => {
  console.error('❌ Extraction failed:', error);
  process.exit(1);
});
