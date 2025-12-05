/**
 * Utility functions for SabPaisa Design System MCP
 *
 * Color conversion, validation, and helper functions
 */

import tinycolor from 'tinycolor2';
import { dataLoader } from './data-loader.js';
import { logger } from './logger.js';

/**
 * Color conversion utilities
 */
export class ColorUtils {
  /**
   * Convert color to different formats
   * @param color - Color value (hex, rgb, token name)
   * @param toFormat - Target format
   * @param opacity - Optional opacity for rgba (0-1)
   */
  static convert(
    color: string,
    toFormat: 'hex' | 'rgb' | 'hsl' | 'rgba' | 'cssVar' | 'tailwind',
    opacity?: number
  ): string {
    // Check if it's a token name first
    const tokenColor = this.resolveToken(color);
    const colorValue = tokenColor || color;

    const tc = tinycolor(colorValue);

    if (!tc.isValid()) {
      throw new Error(`Invalid color: ${color}`);
    }

    switch (toFormat) {
      case 'hex':
        return tc.toHexString();

      case 'rgb':
        return tc.toRgbString();

      case 'hsl':
        return tc.toHslString();

      case 'rgba':
        if (opacity !== undefined) {
          return tc.setAlpha(opacity).toRgbString();
        }
        return tc.toRgbString();

      case 'cssVar':
        return this.findCssVar(colorValue);

      case 'tailwind':
        return this.findTailwindClass(colorValue);

      default:
        throw new Error(`Unknown format: ${toFormat}`);
    }
  }

  /**
   * Get contrast ratio between two colors
   */
  static getContrastRatio(foreground: string, background: string): number {
    const fg = this.resolveToken(foreground) || foreground;
    const bg = this.resolveToken(background) || background;

    return tinycolor.readability(fg, bg);
  }

  /**
   * Check if color combination meets WCAG AA standards
   */
  static isWCAG_AA(
    foreground: string,
    background: string,
    textSize: 'normal' | 'large' = 'normal'
  ): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    return textSize === 'normal' ? ratio >= 4.5 : ratio >= 3;
  }

  /**
   * Check if color combination meets WCAG AAA standards
   */
  static isWCAG_AAA(
    foreground: string,
    background: string,
    textSize: 'normal' | 'large' = 'normal'
  ): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    return textSize === 'normal' ? ratio >= 7 : ratio >= 4.5;
  }

  /**
   * Resolve token name to color value
   */
  private static resolveToken(color: string): string | null {
    // Check if it looks like a token (no # or rgb/hsl prefix)
    if (
      color.startsWith('#') ||
      color.startsWith('rgb') ||
      color.startsWith('hsl')
    ) {
      return null;
    }

    try {
      const enhanced = dataLoader.getEnhanced();

      // Search through color palettes
      if (enhanced.colors) {
        for (const palette of Object.values(enhanced.colors) as any[]) {
          if (palette.shades) {
            for (const shade of Object.values(palette.shades) as any[]) {
              if (shade.name === color || shade.tailwind === color) {
                return shade.hex;
              }
            }
          }
        }
      }
    } catch (error) {
      logger.error('Error resolving token:', error);
    }

    return null;
  }

  /**
   * Find CSS variable name for a color
   */
  private static findCssVar(colorValue: string): string {
    try {
      const enhanced = dataLoader.getEnhanced();

      if (enhanced.colors) {
        for (const palette of Object.values(enhanced.colors) as any[]) {
          if (palette.shades) {
            for (const shade of Object.values(palette.shades) as any[]) {
              if (shade.hex === colorValue) {
                return shade.cssVar || `--color-${palette.name}-${shade.shade}`;
              }
            }
          }
        }
      }
    } catch (error) {
      logger.error('Error finding CSS var:', error);
    }

    return `--color-unknown`;
  }

  /**
   * Find Tailwind class name for a color
   */
  private static findTailwindClass(colorValue: string): string {
    try {
      const enhanced = dataLoader.getEnhanced();

      if (enhanced.colors) {
        for (const palette of Object.values(enhanced.colors) as any[]) {
          if (palette.shades) {
            for (const shade of Object.values(palette.shades) as any[]) {
              if (shade.hex === colorValue) {
                return shade.tailwind || `${palette.name}-${shade.shade}`;
              }
            }
          }
        }
      }
    } catch (error) {
      logger.error('Error finding Tailwind class:', error);
    }

    return 'unknown';
  }

  /**
   * Find color by query (name, hex, etc.)
   */
  static findColor(query: string, wcagLevel?: 'AA' | 'AAA'): any[] {
    const results: any[] = [];

    try {
      const enhanced = dataLoader.getEnhanced();

      // Use designTokens.colors instead of colors
      if (enhanced.designTokens?.colors) {
        for (const [paletteName, palette] of Object.entries(enhanced.designTokens.colors) as any[]) {
          if (palette.shades) {
            for (const [shadeName, shade] of Object.entries(palette.shades) as any[]) {
              // Check if matches query
              const matches =
                palette.name?.toLowerCase().includes(query.toLowerCase()) ||
                shade.hex?.toLowerCase() === query.toLowerCase() ||
                shade.tailwind?.toLowerCase().includes(query.toLowerCase()) ||
                shade.usage?.toLowerCase().includes(query.toLowerCase()) ||
                paletteName.toLowerCase().includes(query.toLowerCase()) ||
                shadeName.toLowerCase().includes(query.toLowerCase());

              if (matches) {
                // Filter by WCAG level if specified
                if (wcagLevel) {
                  const meetsStandard =
                    wcagLevel === 'AA' ? shade.wcagAA : shade.wcagAAA;
                  if (!meetsStandard) continue;
                }

                results.push({
                  name: `${palette.name || paletteName} ${shadeName}`,
                  palette: paletteName,
                  shade: shadeName,
                  hex: shade.hex,
                  rgb: shade.rgb,
                  hsl: shade.hsl,
                  rgba: shade.rgba,
                  cssVar: shade.cssVar,
                  tailwind: shade.tailwind,
                  usage: shade.usage,
                  wcagAA: shade.wcagAA,
                  wcagAAA: shade.wcagAAA,
                  contrastRatios: shade.contrastRatios
                });
              }
            }
          }
        }
      }
    } catch (error) {
      logger.error('Error finding color:', error);
    }

    return results;
  }
}

/**
 * Code generation utilities
 */
export class CodeGenerator {
  /**
   * Generate component code
   */
  static generateComponent(
    componentId: string,
    variant: string = 'primary',
    framework: 'react' | 'vue' | 'angular' | 'html' = 'react',
    includeImports: boolean = true
  ): string {
    const templates: Record<string, Record<string, (v: string) => string>> = {
      react: {
        button: (v: string) => `${includeImports ? "import { Button } from '@/components/ui';\n\n" : ''}<Button variant="${v}" size="md">\n  Button Text\n</Button>`,
        card: (v: string) => `${includeImports ? "import { Card } from '@/components/ui';\n\n" : ''}<Card variant="${v}">\n  <Card.Header>\n    <h3>Card Title</h3>\n  </Card.Header>\n  <Card.Content>\n    Card content\n  </Card.Content>\n</Card>`,
        input: (v: string) => `${includeImports ? "import { TextField } from '@/components/ui';\n\n" : ''}<TextField\n  variant="${v}"\n  label="Label"\n  placeholder="Enter value"\n  helperText="Helper text"\n/>`
      },
      vue: {
        button: (v: string) => `<sp-button variant="${v}" size="md">\n  Button Text\n</sp-button>`,
        card: (v: string) => `<sp-card variant="${v}">\n  <template #header>\n    <h3>Card Title</h3>\n  </template>\n  <template #content>\n    Card content\n  </template>\n</sp-card>`,
        input: (v: string) => `<sp-text-field\n  variant="${v}"\n  label="Label"\n  placeholder="Enter value"\n  helper-text="Helper text"\n/>`
      },
      html: {
        button: (v: string) => `<button class="sp-button sp-button--${v} sp-button--md">\n  Button Text\n</button>`,
        card: (v: string) => `<div class="sp-card sp-card--${v}">\n  <div class="sp-card__header">\n    <h3>Card Title</h3>\n  </div>\n  <div class="sp-card__content">\n    Card content\n  </div>\n</div>`,
        input: (v: string) => `<div class="sp-text-field sp-text-field--${v}">\n  <label class="sp-text-field__label">Label</label>\n  <input type="text" class="sp-text-field__input" placeholder="Enter value">\n  <span class="sp-text-field__helper">Helper text</span>\n</div>`
      },
      angular: {
        button: (v: string) => `<sp-button variant="${v}" size="md">\n  Button Text\n</sp-button>`,
        card: (v: string) => `<sp-card variant="${v}">\n  <sp-card-header>\n    <h3>Card Title</h3>\n  </sp-card-header>\n  <sp-card-content>\n    Card content\n  </sp-card-content>\n</sp-card>`,
        input: (v: string) => `<sp-text-field\n  variant="${v}"\n  label="Label"\n  placeholder="Enter value"\n  helperText="Helper text">\n</sp-text-field>`
      }
    };

    const frameworkTemplates = templates[framework];
    if (!frameworkTemplates) {
      throw new Error(`Unknown framework: ${framework}`);
    }

    const componentTemplate = frameworkTemplates[componentId];
    if (!componentTemplate) {
      throw new Error(`Unknown component: ${componentId}`);
    }

    return componentTemplate(variant);
  }
}
