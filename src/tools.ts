/**
 * MCP Tool Handlers for SabPaisa Design System
 *
 * Implements all 5 tools: search, find_color, convert_color, validate_contrast, generate_component
 */

import { designSystemSearch } from './search.js';
import { ColorUtils, CodeGenerator } from './utils.js';
import {
  generateColorPalette,
  generateColorSwatch,
  generateContrastVisualization,
  generateComponentPreview,
  svgToMarkdown,
} from './visual.js';
import { analytics } from './analytics.js';

/**
 * Tool: search_design_system
 * Search across all design system resources
 */
export async function handleSearchDesignSystem(args: {
  query: string;
  category?: string;
  limit?: number;
}): Promise<string> {
  const { query, category = 'all', limit = 10 } = args;

  try {
    const results = designSystemSearch.search(query, category, limit);

    if (results.length === 0) {
      return JSON.stringify(
        {
          query,
          category,
          results: [],
          message: `No results found for "${query}"`,
        },
        null,
        2
      );
    }

    return JSON.stringify(
      {
        query,
        category,
        count: results.length,
        results: results.map(r => ({
          type: r.type,
          name: r.name,
          description: r.description,
          uri: r.uri,
          relevance: (1 - r.score).toFixed(2), // Convert score to relevance percentage
        })),
      },
      null,
      2
    );
  } catch (error) {
    return JSON.stringify({
      error: 'Search failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

/**
 * Tool: find_color
 * Find colors with multi-format output and accessibility info
 */
export async function handleFindColor(args: {
  query: string;
  wcagLevel?: 'AA' | 'AAA';
}): Promise<string> {
  const { query, wcagLevel } = args;

  try {
    const colors = ColorUtils.findColor(query, wcagLevel);

    if (colors.length === 0) {
      return JSON.stringify({
        query,
        wcagLevel,
        results: [],
        message: `No colors found matching "${query}"`,
      });
    }

    // Generate color palette visualization
    const paletteColors = colors.map(color => ({
      name: color.name,
      value: color.hex,
      shade: color.shade,
    }));
    const paletteSvg = generateColorPalette(paletteColors);

    return JSON.stringify(
      {
        query,
        wcagLevel,
        count: colors.length,
        visualization: {
          type: 'svg',
          description: 'Color palette preview',
          svg: paletteSvg,
          markdown: svgToMarkdown(paletteSvg, `Color palette for "${query}"`),
        },
        results: colors.map(color => ({
          name: color.name,
          palette: color.palette,
          shade: color.shade,
          formats: {
            hex: color.hex,
            rgb: color.rgb,
            hsl: color.hsl,
            rgba: color.rgba,
          },
          tokens: {
            cssVar: color.cssVar,
            tailwind: color.tailwind,
          },
          accessibility: {
            wcagAA: color.wcagAA,
            wcagAAA: color.wcagAAA,
            contrastRatios: color.contrastRatios,
          },
          usage: color.usage,
          swatch: generateColorSwatch(color.hex, color.shade, 60),
        })),
      },
      null,
      2
    );
  } catch (error) {
    return JSON.stringify({
      error: 'Color search failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

/**
 * Tool: convert_color
 * Convert between color formats
 */
export async function handleConvertColor(args: {
  color: string;
  toFormat: 'hex' | 'rgb' | 'hsl' | 'rgba' | 'cssVar' | 'tailwind';
  opacity?: number;
}): Promise<string> {
  const { color, toFormat, opacity } = args;

  try {
    const converted = ColorUtils.convert(color, toFormat, opacity);

    // Generate color swatch for the input color
    const swatch = generateColorSwatch(color, toFormat.toUpperCase(), 80);

    return JSON.stringify(
      {
        input: color,
        format: toFormat,
        opacity,
        result: converted,
        visualization: {
          type: 'svg',
          description: `Color swatch for ${converted}`,
          svg: swatch,
          markdown: svgToMarkdown(swatch, `Color: ${converted}`),
        },
      },
      null,
      2
    );
  } catch (error) {
    return JSON.stringify({
      error: 'Color conversion failed',
      message: error instanceof Error ? error.message : String(error),
      input: color,
      format: toFormat,
    });
  }
}

/**
 * Tool: validate_contrast
 * Check WCAG color contrast compliance
 */
export async function handleValidateContrast(args: {
  foreground: string;
  background: string;
  textSize?: 'normal' | 'large';
}): Promise<string> {
  const { foreground, background, textSize = 'normal' } = args;

  try {
    const ratio = ColorUtils.getContrastRatio(foreground, background);
    const meetsAA = ColorUtils.isWCAG_AA(foreground, background, textSize);
    const meetsAAA = ColorUtils.isWCAG_AAA(foreground, background, textSize);

    // Determine required ratio based on text size
    const requiredAA = textSize === 'normal' ? 4.5 : 3;
    const requiredAAA = textSize === 'normal' ? 7 : 4.5;

    let recommendation = '';
    if (meetsAAA) {
      recommendation = 'Excellent! Meets WCAG AAA standards (highest level).';
    } else if (meetsAA) {
      recommendation = 'Good! Meets WCAG AA standards (minimum required).';
    } else {
      recommendation = `Poor contrast. Increase difference between colors to meet at least ${requiredAA}:1 ratio.`;
    }

    // Generate contrast visualization
    const visualization = generateContrastVisualization(
      foreground,
      background,
      ratio,
      meetsAA,
      meetsAAA
    );

    return JSON.stringify(
      {
        foreground,
        background,
        textSize,
        visualization: {
          type: 'svg',
          description: 'WCAG contrast ratio visualization with live preview',
          svg: visualization,
          markdown: svgToMarkdown(
            visualization,
            `Contrast: ${foreground} on ${background}`
          ),
        },
        result: {
          contrastRatio: parseFloat(ratio.toFixed(2)),
          wcagAA: {
            required: requiredAA,
            passes: meetsAA,
          },
          wcagAAA: {
            required: requiredAAA,
            passes: meetsAAA,
          },
          recommendation,
        },
      },
      null,
      2
    );
  } catch (error) {
    return JSON.stringify({
      error: 'Contrast validation failed',
      message: error instanceof Error ? error.message : String(error),
      foreground,
      background,
    });
  }
}

/**
 * Tool: generate_component
 * Generate component code from design system spec
 */
export async function handleGenerateComponent(args: {
  component: string;
  variant?: string;
  framework: 'react' | 'vue' | 'angular' | 'html';
  includeImports?: boolean;
}): Promise<string> {
  const {
    component,
    variant = 'primary',
    framework,
    includeImports = true,
  } = args;

  try {
    const code = CodeGenerator.generateComponent(
      component,
      variant,
      framework,
      includeImports
    );

    // Generate component preview
    const preview = generateComponentPreview(component, variant);

    return JSON.stringify(
      {
        component,
        variant,
        framework,
        includeImports,
        visualization: {
          type: 'svg',
          description: `Visual preview of ${variant} ${component}`,
          svg: preview,
          markdown: svgToMarkdown(
            preview,
            `${variant} ${component} component preview`
          ),
        },
        code,
        language: framework === 'html' ? 'html' : framework === 'vue' ? 'vue' : framework,
        usage: `Copy this code into your ${framework} project`,
      },
      null,
      2
    );
  } catch (error) {
    return JSON.stringify({
      error: 'Code generation failed',
      message: error instanceof Error ? error.message : String(error),
      component,
      framework,
      suggestion:
        'Supported components: button, card, input. Supported frameworks: react, vue, angular, html',
    });
  }
}

/**
 * Tool: view_analytics
 * View MCP server usage statistics
 */
export async function handleViewAnalytics(args: {
  reset?: boolean;
}): Promise<string> {
  const { reset = false } = args;

  try {
    if (reset) {
      analytics.reset();
      return JSON.stringify({
        message: 'Analytics reset successfully',
        timestamp: new Date().toISOString(),
      }, null, 2);
    }

    const summary = analytics.getSummary();

    return JSON.stringify(
      {
        title: 'SabPaisa Design System MCP - Usage Analytics',
        summary,
        note: 'Analytics are automatically saved every 5 minutes',
      },
      null,
      2
    );
  } catch (error) {
    return JSON.stringify({
      error: 'Analytics retrieval failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

/**
 * Route tool calls to appropriate handlers
 */
export async function handleToolCall(
  name: string,
  args: any
): Promise<string> {
  switch (name) {
    case 'search_design_system':
      return handleSearchDesignSystem(args);

    case 'find_color':
      return handleFindColor(args);

    case 'convert_color':
      return handleConvertColor(args);

    case 'validate_contrast':
      return handleValidateContrast(args);

    case 'generate_component':
      return handleGenerateComponent(args);

    case 'view_analytics':
      return handleViewAnalytics(args);

    default:
      return JSON.stringify({
        error: 'Unknown tool',
        message: `Tool "${name}" is not implemented`,
        availableTools: [
          'search_design_system',
          'find_color',
          'convert_color',
          'validate_contrast',
          'generate_component',
          'view_analytics',
        ],
      });
  }
}
