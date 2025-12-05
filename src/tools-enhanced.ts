/**
 * Enhanced MCP Tools for SabPaisa Design System
 *
 * Provides advanced querying and generation capabilities
 * for the extracted design system data.
 */

import { enhancedDataLoader } from './data-loader-enhanced.js';
import { logger } from './logger.js';

/**
 * Tool: query_section
 * Get a specific section by number or search
 */
export function querySectionTool(args: any): any {
  const { section, search } = args;

  if (section) {
    // Get section by number
    const sectionNum = parseInt(section);
    if (isNaN(sectionNum) || sectionNum < 1 || sectionNum > 35) {
      throw new Error('Section number must be between 1 and 35');
    }

    const data = enhancedDataLoader.loadSection(sectionNum);
    return {
      success: true,
      section: sectionNum,
      title: data.title,
      metadata: data.metadata,
      codeBlockCount: data.codeBlocks?.length || 0,
      tableCount: data.tables?.length || 0,
      data,
    };
  }

  if (search) {
    // Search sections by title
    const results = enhancedDataLoader.searchSections(search);
    return {
      success: true,
      query: search,
      resultsCount: results.length,
      results,
    };
  }

  throw new Error('Either section number or search query is required');
}

/**
 * Tool: query_component_specs
 * Get complete specifications for a component
 */
export function queryComponentSpecsTool(args: any): any {
  const { component } = args;

  if (!component) {
    throw new Error('Component name is required');
  }

  const data = enhancedDataLoader.getComponent(component);

  // Extract key information
  const codeExamples = data.codeBlocks?.map((block: any) => ({
    id: block.id,
    language: block.language,
    code: block.code,
  })) || [];

  return {
    success: true,
    component,
    section: data.section,
    title: data.title,
    metadata: data.metadata,
    codeExamples: {
      count: codeExamples.length,
      languages: [...new Set(codeExamples.map((ex: any) => ex.language))],
      examples: codeExamples,
    },
    tables: data.tables || [],
  };
}

/**
 * Tool: query_design_tokens
 * Get design tokens with filtering
 */
export function queryDesignTokensTool(args: any): any {
  const { type } = args;

  const tokenTypes: { [key: string]: () => any } = {
    colors: () => enhancedDataLoader.getColors(),
    typography: () => enhancedDataLoader.getTypography(),
    spacing: () => enhancedDataLoader.getSpacing(),
    effects: () => enhancedDataLoader.getEffects(),
    animations: () => enhancedDataLoader.getAnimations(),
  };

  if (type && tokenTypes[type]) {
    const data = tokenTypes[type]();
    return {
      success: true,
      tokenType: type,
      section: data.section,
      title: data.title,
      data,
    };
  }

  // Return all token types
  const allTokens = {
    colors: enhancedDataLoader.getColors(),
    typography: enhancedDataLoader.getTypography(),
    spacing: enhancedDataLoader.getSpacing(),
    effects: enhancedDataLoader.getEffects(),
    animations: enhancedDataLoader.getAnimations(),
  };

  return {
    success: true,
    tokenTypes: Object.keys(allTokens),
    data: allTokens,
  };
}

/**
 * Tool: query_patterns
 * Get UX patterns and workflows
 */
export function queryPatternsTool(args: any): any {
  const { pattern } = args;

  const patternMap: { [key: string]: number } = {
    animations: 22,
    loading: 23,
    errors: 24,
    'micro-interactions': 25,
    fintech: 26,
    'data-viz': 27,
    responsive: 28,
    accessibility: 29,
    performance: 30,
  };

  if (pattern && patternMap[pattern]) {
    const sectionNum = patternMap[pattern];
    const data = enhancedDataLoader.loadSection(sectionNum);
    return {
      success: true,
      pattern,
      section: sectionNum,
      title: data.title,
      data,
    };
  }

  // Return list of available patterns
  return {
    success: true,
    availablePatterns: Object.keys(patternMap),
    message: 'Specify a pattern name to get details',
  };
}

/**
 * Tool: query_implementation_guide
 * Get implementation guides and decision trees
 */
export function queryImplementationGuideTool(args: any): any {
  const { guide } = args;

  const guideMap: { [key: string]: number } = {
    'component-selection': 31,
    'color-usage': 32,
    'typography-selection': 33,
    'state-management': 34,
    'anti-patterns': 35,
  };

  if (guide && guideMap[guide]) {
    const sectionNum = guideMap[guide];
    const data = enhancedDataLoader.loadSection(sectionNum);
    return {
      success: true,
      guide,
      section: sectionNum,
      title: data.title,
      data,
    };
  }

  // Return list of available guides
  return {
    success: true,
    availableGuides: Object.keys(guideMap),
    message: 'Specify a guide name to get details',
  };
}

/**
 * Tool: get_quick_reference
 * Get quick reference cards
 */
export function getQuickReferenceTool(): any {
  const data = enhancedDataLoader.getQuickReference();

  // Extract tables (quick reference cards)
  const quickRefCards = data.tables?.map((table: any) => ({
    id: table.id,
    headers: table.headers,
    rows: table.rows,
  })) || [];

  return {
    success: true,
    section: 2,
    title: data.title,
    cards: {
      count: quickRefCards.length,
      list: quickRefCards,
    },
    data,
  };
}

/**
 * Tool: extract_code_examples
 * Extract all code examples from a section
 */
export function extractCodeExamplesTool(args: any): any {
  const { section, language } = args;

  if (!section) {
    throw new Error('Section number is required');
  }

  const sectionNum = parseInt(section);
  const data = enhancedDataLoader.loadSection(sectionNum);

  let codeBlocks = data.codeBlocks || [];

  // Filter by language if specified
  if (language) {
    codeBlocks = codeBlocks.filter((block: any) =>
      block.language.toLowerCase() === language.toLowerCase()
    );
  }

  return {
    success: true,
    section: sectionNum,
    title: data.title,
    totalCodeBlocks: data.codeBlocks?.length || 0,
    filteredCodeBlocks: codeBlocks.length,
    language: language || 'all',
    codeExamples: codeBlocks.map((block: any) => ({
      id: block.id,
      language: block.language,
      code: block.code,
      lineNumber: block.lineNumber,
    })),
  };
}

/**
 * Tool: search_design_system_enhanced
 * Enhanced search across all extracted content
 */
export function searchDesignSystemEnhancedTool(args: any): any {
  const { query, section, type } = args;

  if (!query) {
    throw new Error('Search query is required');
  }

  const lowerQuery = query.toLowerCase();
  const results: any[] = [];

  // Get sections to search
  let sectionsToSearch = enhancedDataLoader.getAllSections();

  // Filter by section number if specified
  if (section) {
    const sectionNum = parseInt(section);
    sectionsToSearch = sectionsToSearch.filter((s: any) => s.section === sectionNum);
  }

  // Filter by type if specified
  if (type) {
    const typeMap: { [key: string]: string } = {
      atoms: '2-atoms',
      molecules: '3-molecules',
      organisms: '4-organisms',
      templates: '5-templates',
      patterns: '6-ux-patterns',
      guides: '7-implementation',
    };

    const prefix = typeMap[type];
    if (prefix) {
      sectionsToSearch = sectionsToSearch.filter((s: any) =>
        s.file.startsWith(prefix)
      );
    }
  }

  // Search in each section
  sectionsToSearch.forEach((sectionMeta: any) => {
    const data = enhancedDataLoader.loadSection(sectionMeta.section);

    // Search in title
    if (data.title.toLowerCase().includes(lowerQuery)) {
      results.push({
        section: data.section,
        title: data.title,
        matchType: 'title',
        file: sectionMeta.file,
      });
    }

    // Search in code blocks
    data.codeBlocks?.forEach((block: any) => {
      if (block.code.toLowerCase().includes(lowerQuery)) {
        results.push({
          section: data.section,
          title: data.title,
          matchType: 'code',
          codeBlockId: block.id,
          language: block.language,
          snippet: block.code.substring(0, 200) + '...',
        });
      }
    });

    // Search in content
    if (data.content.toLowerCase().includes(lowerQuery)) {
      const contentSnippet = extractSnippet(data.content, lowerQuery);
      results.push({
        section: data.section,
        title: data.title,
        matchType: 'content',
        snippet: contentSnippet,
      });
    }
  });

  return {
    success: true,
    query,
    filters: { section, type },
    resultsCount: results.length,
    results: results.slice(0, 50), // Limit to 50 results
  };
}

/**
 * Tool: get_cache_stats
 * Get cache statistics
 */
export function getCacheStatsTool(): any {
  const stats = enhancedDataLoader.getCacheStats();
  return {
    success: true,
    cache: stats,
  };
}

/**
 * Helper: Extract snippet around search term
 */
function extractSnippet(content: string, query: string, contextLength: number = 100): string {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);

  if (index === -1) return '';

  const start = Math.max(0, index - contextLength);
  const end = Math.min(content.length, index + query.length + contextLength);

  let snippet = content.substring(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';

  return snippet;
}

/**
 * Define enhanced tool schemas
 */
export const enhancedToolSchemas = [
  {
    name: 'query_section',
    description: 'Query a specific section by number (1-35) or search by title',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'number',
          description: 'Section number (1-35)',
        },
        search: {
          type: 'string',
          description: 'Search query for section titles',
        },
      },
    },
  },
  {
    name: 'query_component_specs',
    description: 'Get complete specifications for a component (button, card, modal, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Component name (button, textfield, card, badge, toast, otp-input, modal, file-upload, navigation)',
          enum: ['button', 'textfield', 'card', 'badge', 'toast', 'otp-input', 'modal', 'file-upload', 'navigation'],
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'query_design_tokens',
    description: 'Get design tokens (colors, typography, spacing, effects, animations)',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Token type to query',
          enum: ['colors', 'typography', 'spacing', 'effects', 'animations'],
        },
      },
    },
  },
  {
    name: 'query_patterns',
    description: 'Get UX patterns (animations, loading, errors, fintech, accessibility, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        pattern: {
          type: 'string',
          description: 'Pattern type',
          enum: ['animations', 'loading', 'errors', 'micro-interactions', 'fintech', 'data-viz', 'responsive', 'accessibility', 'performance'],
        },
      },
    },
  },
  {
    name: 'query_implementation_guide',
    description: 'Get implementation guides and decision trees',
    inputSchema: {
      type: 'object',
      properties: {
        guide: {
          type: 'string',
          description: 'Guide type',
          enum: ['component-selection', 'color-usage', 'typography-selection', 'state-management', 'anti-patterns'],
        },
      },
    },
  },
  {
    name: 'get_quick_reference',
    description: 'Get quick reference cards for colors, spacing, typography, animations',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'extract_code_examples',
    description: 'Extract all code examples from a section, optionally filtered by language',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'number',
          description: 'Section number (1-35)',
        },
        language: {
          type: 'string',
          description: 'Programming language (tsx, css, javascript, typescript, etc.)',
        },
      },
      required: ['section'],
    },
  },
  {
    name: 'search_design_system_enhanced',
    description: 'Search across all design system content (titles, code, content)',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query',
        },
        section: {
          type: 'number',
          description: 'Optional: Limit search to specific section',
        },
        type: {
          type: 'string',
          description: 'Optional: Limit search to section type',
          enum: ['atoms', 'molecules', 'organisms', 'templates', 'patterns', 'guides'],
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_cache_stats',
    description: 'Get cache statistics (size, memory usage, hit rate)',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

/**
 * Handle enhanced tool calls
 */
export function handleEnhancedToolCall(toolName: string, args: any): any {
  logger.debug(`Handling enhanced tool: ${toolName}`, args);

  const toolHandlers: { [key: string]: (args: any) => any } = {
    query_section: querySectionTool,
    query_component_specs: queryComponentSpecsTool,
    query_design_tokens: queryDesignTokensTool,
    query_patterns: queryPatternsTool,
    query_implementation_guide: queryImplementationGuideTool,
    get_quick_reference: getQuickReferenceTool,
    extract_code_examples: extractCodeExamplesTool,
    search_design_system_enhanced: searchDesignSystemEnhancedTool,
    get_cache_stats: getCacheStatsTool,
  };

  const handler = toolHandlers[toolName];
  if (!handler) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  return handler(args);
}
