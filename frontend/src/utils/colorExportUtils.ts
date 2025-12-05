import { colors } from '../data/designSystemData';
import { downloadTextFile, downloadJSON } from './downloadUtils';

/**
 * Generate CSS variables from design system colors
 */
export const generateCSSVariables = (): string => {
  let css = ':root {\n  /* SabPaisa Design System Colors */\n\n';

  // Primary colors
  css += '  /* Primary Colors */\n';
  Object.entries(colors.primary.shades).forEach(([shade, data]) => {
    css += `  --color-primary-${shade}: ${data.hex};\n`;
  });

  css += '\n  /* Secondary Colors */\n';
  Object.entries(colors.secondary.shades).forEach(([shade, data]) => {
    css += `  --color-secondary-${shade}: ${data.hex};\n`;
  });

  css += '\n  /* Accent Colors */\n';
  Object.entries(colors.accent.shades).forEach(([shade, data]) => {
    css += `  --color-accent-${shade}: ${data.hex};\n`;
  });

  css += '\n  /* Semantic Colors */\n';
  Object.entries(colors.semantic).forEach(([name, data]) => {
    css += `  --color-${name}: ${data.hex};\n`;
  });

  css += '\n  /* Transaction Colors */\n';
  Object.entries(colors.transaction).forEach(([name, data]) => {
    css += `  --color-transaction-${name}: ${data.hex};\n`;
  });

  return css + '}\n';
};

/**
 * Export colors as CSS file
 */
export const exportColorsCSS = (): void => {
  const css = generateCSSVariables();
  downloadTextFile(css, 'sabpaisa-colors.css', 'text/css');
};

/**
 * Export colors as JSON file
 */
export const exportColorsJSON = (): void => {
  const colorData = {
    primary: Object.fromEntries(
      Object.entries(colors.primary.shades).map(([shade, data]) => [shade, data.hex])
    ),
    secondary: Object.fromEntries(
      Object.entries(colors.secondary.shades).map(([shade, data]) => [shade, data.hex])
    ),
    accent: Object.fromEntries(
      Object.entries(colors.accent.shades).map(([shade, data]) => [shade, data.hex])
    ),
    semantic: Object.fromEntries(
      Object.entries(colors.semantic).map(([name, data]) => [name, data.hex])
    ),
    transaction: Object.fromEntries(
      Object.entries(colors.transaction).map(([name, data]) => [name, data.hex])
    ),
  };

  downloadJSON(colorData, 'sabpaisa-colors.json');
};

/**
 * Convert hex to RGB (0-1 range) for Sketch palette
 */
const hexToRgbNormalized = (hex: string): { red: number; green: number; blue: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { red: 0, green: 0, blue: 0 };

  return {
    red: parseInt(result[1], 16) / 255,
    green: parseInt(result[2], 16) / 255,
    blue: parseInt(result[3], 16) / 255,
  };
};

/**
 * Generate Sketch palette format
 */
export const exportSketchPalette = (): void => {
  const sketchColors: any[] = [];

  // Add all color shades
  Object.values(colors.primary.shades).forEach((data) => {
    const rgb = hexToRgbNormalized(data.hex);
    sketchColors.push({ ...rgb, alpha: 1.0 });
  });

  Object.values(colors.secondary.shades).forEach((data) => {
    const rgb = hexToRgbNormalized(data.hex);
    sketchColors.push({ ...rgb, alpha: 1.0 });
  });

  Object.values(colors.accent.shades).forEach((data) => {
    const rgb = hexToRgbNormalized(data.hex);
    sketchColors.push({ ...rgb, alpha: 1.0 });
  });

  const sketchData = {
    compatibleVersion: '2.0',
    pluginVersion: '2.22',
    colors: sketchColors,
  };

  downloadJSON(sketchData, 'sabpaisa-colors.sketchpalette');
};

/**
 * Generate Figma tokens format
 */
export const exportFigmaTokens = (): void => {
  const figmaData: any = { global: {} };

  // Primary colors
  figmaData.global.primary = {};
  Object.entries(colors.primary.shades).forEach(([shade, data]) => {
    figmaData.global.primary[shade] = {
      value: data.hex,
      type: 'color',
      description: data.usage,
    };
  });

  // Secondary colors
  figmaData.global.secondary = {};
  Object.entries(colors.secondary.shades).forEach(([shade, data]) => {
    figmaData.global.secondary[shade] = {
      value: data.hex,
      type: 'color',
      description: data.usage,
    };
  });

  // Accent colors
  figmaData.global.accent = {};
  Object.entries(colors.accent.shades).forEach(([shade, data]) => {
    figmaData.global.accent[shade] = {
      value: data.hex,
      type: 'color',
      description: data.usage,
    };
  });

  // Semantic colors
  figmaData.global.semantic = {};
  Object.entries(colors.semantic).forEach(([name, data]) => {
    figmaData.global.semantic[name] = {
      value: data.hex,
      type: 'color',
      description: data.usage,
    };
  });

  // Transaction colors
  figmaData.global.transaction = {};
  Object.entries(colors.transaction).forEach(([name, data]) => {
    figmaData.global.transaction[name] = {
      value: data.hex,
      type: 'color',
      description: data.usage,
    };
  });

  downloadJSON(figmaData, 'sabpaisa-colors-figma.json');
};
