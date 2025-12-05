/**
 * Visual utilities for SabPaisa Design System MCP
 *
 * Generates SVG visualizations for colors, components, and patterns
 */

import tinycolor from 'tinycolor2';

/**
 * Generate SVG color swatch
 * @param color - Color value (hex, rgb, etc.)
 * @param label - Optional label for the swatch
 * @param size - Swatch size in pixels (default: 100)
 */
export function generateColorSwatch(
  color: string,
  label?: string,
  size: number = 100
): string {
  const tc = tinycolor(color);

  if (!tc.isValid()) {
    return `<!-- Invalid color: ${color} -->`;
  }

  const hexColor = tc.toHexString();
  const isDark = tc.isDark();
  const textColor = isDark ? '#ffffff' : '#000000';

  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${hexColor}" rx="8"/>
  ${
    label
      ? `<text x="${size / 2}" y="${size / 2}" text-anchor="middle" dominant-baseline="middle"
         fill="${textColor}" font-family="system-ui, sans-serif" font-size="12" font-weight="600">
       ${label}
     </text>`
      : ''
  }
</svg>`;
}

/**
 * Generate color palette visualization
 * @param colors - Array of color objects with name and value
 */
export function generateColorPalette(
  colors: Array<{ name: string; value: string; shade?: string }>
): string {
  const swatchSize = 80;
  const gap = 10;
  const rows = Math.ceil(colors.length / 5);
  const cols = Math.min(colors.length, 5);

  const width = cols * swatchSize + (cols - 1) * gap;
  const height = rows * swatchSize + (rows - 1) * gap;

  let svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

  colors.forEach((color, index) => {
    const tc = tinycolor(color.value);
    if (!tc.isValid()) return;

    const row = Math.floor(index / 5);
    const col = index % 5;
    const x = col * (swatchSize + gap);
    const y = row * (swatchSize + gap);

    const hexColor = tc.toHexString();
    const isDark = tc.isDark();
    const textColor = isDark ? '#ffffff' : '#000000';

    svgContent += `
  <g transform="translate(${x}, ${y})">
    <rect width="${swatchSize}" height="${swatchSize}" fill="${hexColor}" rx="6"/>
    <text x="${swatchSize / 2}" y="${swatchSize / 2 - 8}" text-anchor="middle"
          fill="${textColor}" font-family="system-ui, sans-serif" font-size="11" font-weight="600">
      ${color.shade || color.name}
    </text>
    <text x="${swatchSize / 2}" y="${swatchSize / 2 + 8}" text-anchor="middle"
          fill="${textColor}" font-family="system-ui, sans-serif" font-size="9" opacity="0.8">
      ${hexColor.toUpperCase()}
    </text>
  </g>`;
  });

  svgContent += '</svg>';
  return svgContent;
}

/**
 * Generate WCAG contrast ratio visualization
 * @param foreground - Foreground color
 * @param background - Background color
 * @param contrastRatio - Calculated contrast ratio
 * @param passesAA - Whether it passes WCAG AA
 * @param passesAAA - Whether it passes WCAG AAA
 */
export function generateContrastVisualization(
  foreground: string,
  background: string,
  contrastRatio: number,
  passesAA: boolean,
  passesAAA: boolean
): string {
  const fgTc = tinycolor(foreground);
  const bgTc = tinycolor(background);

  if (!fgTc.isValid() || !bgTc.isValid()) {
    return '<!-- Invalid colors -->';
  }

  const fgHex = fgTc.toHexString();
  const bgHex = bgTc.toHexString();

  // Status colors
  const aaColor = passesAA ? '#10b981' : '#ef4444';
  const aaaColor = passesAAA ? '#10b981' : '#ef4444';

  return `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="400" height="200" fill="#f3f4f6" rx="8"/>

  <!-- Preview Section -->
  <rect x="10" y="10" width="180" height="180" fill="${bgHex}" rx="6"/>
  <text x="100" y="60" text-anchor="middle" fill="${fgHex}"
        font-family="system-ui, sans-serif" font-size="20" font-weight="600">
    Sample Text
  </text>
  <text x="100" y="90" text-anchor="middle" fill="${fgHex}"
        font-family="system-ui, sans-serif" font-size="14">
    Regular paragraph text
  </text>
  <text x="100" y="120" text-anchor="middle" fill="${fgHex}"
        font-family="system-ui, sans-serif" font-size="24" font-weight="700">
    Large Text
  </text>

  <!-- Info Section -->
  <g transform="translate(210, 20)">
    <!-- Contrast Ratio -->
    <text x="0" y="0" fill="#1f2937" font-family="system-ui, sans-serif" font-size="12" font-weight="600">
      Contrast Ratio
    </text>
    <text x="0" y="20" fill="#1f2937" font-family="system-ui, sans-serif" font-size="24" font-weight="700">
      ${contrastRatio.toFixed(2)}:1
    </text>

    <!-- WCAG AA -->
    <g transform="translate(0, 50)">
      <circle cx="5" cy="5" r="5" fill="${aaColor}"/>
      <text x="15" y="9" fill="#1f2937" font-family="system-ui, sans-serif" font-size="12">
        WCAG AA ${passesAA ? '✓' : '✗'}
      </text>
    </g>

    <!-- WCAG AAA -->
    <g transform="translate(0, 75)">
      <circle cx="5" cy="5" r="5" fill="${aaaColor}"/>
      <text x="15" y="9" fill="#1f2937" font-family="system-ui, sans-serif" font-size="12">
        WCAG AAA ${passesAAA ? '✓' : '✗'}
      </text>
    </g>

    <!-- Color Values -->
    <g transform="translate(0, 105)">
      <text x="0" y="0" fill="#6b7280" font-family="system-ui, sans-serif" font-size="10">
        Foreground: ${fgHex.toUpperCase()}
      </text>
      <text x="0" y="15" fill="#6b7280" font-family="system-ui, sans-serif" font-size="10">
        Background: ${bgHex.toUpperCase()}
      </text>
    </g>
  </g>
</svg>`;
}

/**
 * Generate component preview
 * @param componentType - Type of component (button, card, input)
 * @param variant - Component variant
 * @param colorPrimary - Primary color for the component
 */
export function generateComponentPreview(
  componentType: string,
  variant: string = 'primary',
  colorPrimary: string = '#2563eb'
): string {
  const tc = tinycolor(colorPrimary);
  const primaryHex = tc.toHexString();
  const hoverColor = tc.darken(10).toHexString();
  const textColor = tc.isDark() ? '#ffffff' : '#ffffff';

  switch (componentType.toLowerCase()) {
    case 'button':
      return generateButtonPreview(variant, primaryHex, hoverColor, textColor);
    case 'card':
      return generateCardPreview(variant, primaryHex);
    case 'input':
      return generateInputPreview(variant, primaryHex);
    default:
      return `<!-- Component preview not available for ${componentType} -->`;
  }
}

/**
 * Generate button preview
 */
function generateButtonPreview(
  variant: string,
  primaryColor: string,
  hoverColor: string,
  textColor: string
): string {
  // variant parameter used in configs and display text
  const configs: Record<
    string,
    { bg: string; border: string; text: string; hoverBg: string }
  > = {
    primary: {
      bg: primaryColor,
      border: primaryColor,
      text: textColor,
      hoverBg: hoverColor,
    },
    secondary: {
      bg: '#f3f4f6',
      border: '#d1d5db',
      text: '#1f2937',
      hoverBg: '#e5e7eb',
    },
    outline: {
      bg: 'transparent',
      border: primaryColor,
      text: primaryColor,
      hoverBg: primaryColor,
    },
  };

  const config = configs[variant] || configs.primary;

  return `<svg width="300" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="150" fill="#f9fafb" rx="8"/>

  <!-- Button States -->
  <g transform="translate(30, 30)">
    <!-- Default -->
    <rect width="100" height="40" fill="${config.bg}" stroke="${config.border}"
          stroke-width="2" rx="6"/>
    <text x="50" y="25" text-anchor="middle" fill="${config.text}"
          font-family="system-ui, sans-serif" font-size="14" font-weight="600">
      Default
    </text>
    <text x="50" y="60" text-anchor="middle" fill="#6b7280"
          font-family="system-ui, sans-serif" font-size="10">
      Normal State
    </text>
  </g>

  <g transform="translate(160, 30)">
    <!-- Hover -->
    <rect width="100" height="40" fill="${config.hoverBg}" stroke="${config.border}"
          stroke-width="2" rx="6"/>
    <text x="50" y="25" text-anchor="middle" fill="${config.text}"
          font-family="system-ui, sans-serif" font-size="14" font-weight="600">
      Hover
    </text>
    <text x="50" y="60" text-anchor="middle" fill="#6b7280"
          font-family="system-ui, sans-serif" font-size="10">
      Hover State
    </text>
  </g>

  <!-- Variant Label -->
  <text x="150" y="130" text-anchor="middle" fill="#1f2937"
        font-family="system-ui, sans-serif" font-size="12" font-weight="600">
    ${variant.charAt(0).toUpperCase() + variant.slice(1)} Button
  </text>
</svg>`;
}

/**
 * Generate card preview
 */
function generateCardPreview(_variant: string, accentColor: string): string {
  return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="200" fill="#f9fafb" rx="8"/>

  <!-- Card -->
  <g transform="translate(20, 20)">
    <rect width="260" height="160" fill="#ffffff" stroke="#e5e7eb" stroke-width="1" rx="8"/>

    <!-- Accent Bar -->
    <rect width="260" height="4" fill="${accentColor}" rx="8 8 0 0"/>

    <!-- Card Content -->
    <g transform="translate(16, 24)">
      <text x="0" y="0" fill="#1f2937" font-family="system-ui, sans-serif" font-size="16" font-weight="700">
        Card Title
      </text>
      <text x="0" y="24" fill="#6b7280" font-family="system-ui, sans-serif" font-size="12">
        Card description text goes here.
      </text>
      <text x="0" y="40" fill="#6b7280" font-family="system-ui, sans-serif" font-size="12">
        Multiple lines supported.
      </text>

      <!-- Action Button -->
      <rect x="0" y="70" width="80" height="32" fill="${accentColor}" rx="4"/>
      <text x="40" y="91" text-anchor="middle" fill="#ffffff"
            font-family="system-ui, sans-serif" font-size="12" font-weight="600">
        Action
      </text>
    </g>
  </g>
</svg>`;
}

/**
 * Generate input preview
 */
function generateInputPreview(_variant: string, focusColor: string): string {
  return `<svg width="300" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="180" fill="#f9fafb" rx="8"/>

  <!-- Input Default -->
  <g transform="translate(20, 20)">
    <text x="0" y="0" fill="#1f2937" font-family="system-ui, sans-serif" font-size="12" font-weight="600">
      Default State
    </text>
    <rect x="0" y="10" width="260" height="40" fill="#ffffff" stroke="#d1d5db"
          stroke-width="2" rx="6"/>
    <text x="12" y="35" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="14">
      Enter text...
    </text>
  </g>

  <!-- Input Focus -->
  <g transform="translate(20, 100)">
    <text x="0" y="0" fill="#1f2937" font-family="system-ui, sans-serif" font-size="12" font-weight="600">
      Focus State
    </text>
    <rect x="0" y="10" width="260" height="40" fill="#ffffff" stroke="${focusColor}"
          stroke-width="2" rx="6"/>
    <text x="12" y="35" fill="#1f2937" font-family="system-ui, sans-serif" font-size="14">
      Focused input
    </text>
    <rect x="84" y="26" width="1" height="16" fill="${focusColor}">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
    </rect>
  </g>
</svg>`;
}

/**
 * Encode SVG for data URI
 * @param svg - SVG string
 * @returns Data URI for embedding in markdown or HTML
 */
export function svgToDataUri(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Generate markdown-embeddable SVG
 * @param svg - SVG string
 * @param alt - Alt text for accessibility
 * @returns Markdown image syntax
 */
export function svgToMarkdown(svg: string, alt: string = 'Visual'): string {
  const dataUri = svgToDataUri(svg);
  return `![${alt}](${dataUri})`;
}
