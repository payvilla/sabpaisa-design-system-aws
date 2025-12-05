/**
 * Design Tokens Export Utility
 * Generate design tokens in various formats
 */

export interface DesignTokens {
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    accent: Record<string, string>;
    success: Record<string, string>;
    warning: Record<string, string>;
    error: Record<string, string>;
    gray: Record<string, string>;
  };
  spacing: Record<string, string>;
  typography: {
    fontFamily: Record<string, string>;
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  };
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}

export const designTokens: DesignTokens = {
  colors: {
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
    secondary: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },
    accent: {
      50: '#FDF4FF',
      100: '#FAE8FF',
      200: '#F5D0FE',
      300: '#F0ABFC',
      400: '#E879F9',
      500: '#D946EF',
      600: '#C026D3',
      700: '#A21CAF',
      800: '#86198F',
      900: '#701A75',
    },
    success: {
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
    },
    warning: {
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
    },
    error: {
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  spacing: {
    0: '0px',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      mono: '"Fira Code", monospace',
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  borderRadius: {
    none: '0px',
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
};

/**
 * Export as JSON
 */
export function exportAsJSON(): string {
  return JSON.stringify(designTokens, null, 2);
}

/**
 * Export as CSS Variables
 */
export function exportAsCSSVariables(): string {
  let css = ':root {\n';

  // Colors
  Object.entries(designTokens.colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      css += `  --color-${colorName}-${shade}: ${value};\n`;
    });
  });

  // Spacing
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    css += `  --spacing-${key}: ${value};\n`;
  });

  // Typography
  Object.entries(designTokens.typography.fontSize).forEach(([key, value]) => {
    css += `  --font-size-${key}: ${value};\n`;
  });

  Object.entries(designTokens.typography.fontWeight).forEach(([key, value]) => {
    css += `  --font-weight-${key}: ${value};\n`;
  });

  // Border Radius
  Object.entries(designTokens.borderRadius).forEach(([key, value]) => {
    css += `  --border-radius-${key}: ${value};\n`;
  });

  // Shadows
  Object.entries(designTokens.shadows).forEach(([key, value]) => {
    css += `  --shadow-${key}: ${value};\n`;
  });

  css += '}\n';
  return css;
}

/**
 * Export as SCSS Variables
 */
export function exportAsSCSS(): string {
  let scss = '// Design Tokens\n\n';

  // Colors
  scss += '// Colors\n';
  Object.entries(designTokens.colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      scss += `$color-${colorName}-${shade}: ${value};\n`;
    });
  });

  // Spacing
  scss += '\n// Spacing\n';
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    scss += `$spacing-${key}: ${value};\n`;
  });

  // Typography
  scss += '\n// Typography\n';
  Object.entries(designTokens.typography.fontSize).forEach(([key, value]) => {
    scss += `$font-size-${key}: ${value};\n`;
  });

  scss += '\n// Font Weights\n';
  Object.entries(designTokens.typography.fontWeight).forEach(([key, value]) => {
    scss += `$font-weight-${key}: ${value};\n`;
  });

  // Border Radius
  scss += '\n// Border Radius\n';
  Object.entries(designTokens.borderRadius).forEach(([key, value]) => {
    scss += `$border-radius-${key}: ${value};\n`;
  });

  // Shadows
  scss += '\n// Shadows\n';
  Object.entries(designTokens.shadows).forEach(([key, value]) => {
    scss += `$shadow-${key}: ${value};\n`;
  });

  return scss;
}

/**
 * Export as Tailwind Config
 */
export function exportAsTailwindConfig(): string {
  return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(designTokens.colors, null, 6)},
      spacing: ${JSON.stringify(designTokens.spacing, null, 6)},
      fontSize: ${JSON.stringify(designTokens.typography.fontSize, null, 6)},
      fontWeight: ${JSON.stringify(designTokens.typography.fontWeight, null, 6)},
      borderRadius: ${JSON.stringify(designTokens.borderRadius, null, 6)},
      boxShadow: ${JSON.stringify(designTokens.shadows, null, 6)},
    },
  },
};`;
}

/**
 * Download file helper
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
