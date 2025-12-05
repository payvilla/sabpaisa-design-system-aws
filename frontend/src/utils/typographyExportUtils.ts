import { typography } from '../data/designSystemData';
import { downloadTextFile, downloadJSON, downloadFile } from './downloadUtils';
import JSZip from 'jszip';

/**
 * Export typography specifications as JSON
 */
export const exportTypographyJSON = (): void => {
  const typographyData = {
    fontFamilies: typography.fontFamilies.map((font) => ({
      name: font.name,
      value: font.value,
      class: font.class,
      usage: font.usage,
    })),
    fontSizes: typography.fontSizes.map((size) => ({
      name: size.name,
      value: size.value,
      pixels: size.pixels,
      class: size.class,
      usage: size.usage,
    })),
    fontWeights: typography.fontWeights.map((weight) => ({
      name: weight.name,
      value: weight.value,
      class: weight.class,
      usage: weight.usage,
    })),
  };

  downloadJSON(typographyData, 'sabpaisa-typography.json');
};

/**
 * Generate CSS for typography with utility classes
 */
export const exportTypographyCSS = (): void => {
  let css = '/* SabPaisa Design System - Typography */\n\n';

  // Font families
  css += '/* Font Families */\n';
  typography.fontFamilies.forEach((font) => {
    css += `.${font.class} {\n`;
    css += `  font-family: ${font.value};\n`;
    css += `}\n\n`;
  });

  // Font sizes
  css += '/* Font Sizes */\n';
  typography.fontSizes.forEach((size) => {
    css += `.${size.class} {\n`;
    css += `  font-size: ${size.value}; /* ${size.pixels} */\n`;
    css += `}\n\n`;
  });

  // Font weights
  css += '/* Font Weights */\n';
  typography.fontWeights.forEach((weight) => {
    css += `.${weight.class} {\n`;
    css += `  font-weight: ${weight.value};\n`;
    css += `}\n\n`;
  });

  downloadTextFile(css, 'sabpaisa-typography.css', 'text/css');
};

/**
 * Download font files as a ZIP package
 * Note: This downloads available font files from the public/brand/fonts folder
 */
export const downloadFontFiles = async (): Promise<void> => {
  try {
    const zip = new JSZip();
    const fontsFolder = zip.folder('fonts');

    if (!fontsFolder) {
      console.error('Failed to create fonts folder in ZIP');
      return;
    }

    // Font files that may be available
    const fontFiles = [
      'Neusharp-Bold.ttf',
      'Neusharp-Bold.woff',
      'Neusharp-Bold.woff2',
      'SofiaPro-Regular.ttf',
      'SofiaPro-Regular.woff',
      'SofiaPro-Regular.woff2',
      'SofiaPro-Medium.ttf',
      'SofiaPro-Medium.woff',
      'SofiaPro-Medium.woff2',
      'SofiaPro-Semibold.ttf',
      'SofiaPro-Semibold.woff',
      'SofiaPro-Semibold.woff2',
      'SofiaPro-Bold.ttf',
      'SofiaPro-Bold.woff',
      'SofiaPro-Bold.woff2',
    ];

    // Add README with font information
    const readme = `SabPaisa Typography Fonts

Brand Fonts:
- Neusharp Bold: For headings and marketing materials
- Sofia Pro: For body text and communications (Regular, Medium, Semibold, Bold)

Usage:
1. Install the font files on your system or add them to your web project
2. Reference them in your CSS using @font-face rules
3. Use the typography CSS file (sabpaisa-typography.css) for utility classes

For web projects, use the WOFF2 format for best performance and browser support.
`;
    fontsFolder.file('README.txt', readme);

    // Try to fetch and add each font file
    let filesAdded = 0;
    for (const fontFile of fontFiles) {
      try {
        const response = await fetch(`/brand/fonts/${fontFile}`);
        if (response.ok) {
          const blob = await response.blob();
          fontsFolder.file(fontFile, blob);
          filesAdded++;
        }
      } catch (error) {
        // Skip files that don't exist
        console.log(`Skipping ${fontFile} - not found`);
      }
    }

    if (filesAdded === 0) {
      alert('No font files found. Please add font files to public/brand/fonts/ directory.');
      return;
    }

    // Generate the ZIP file
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    downloadFile(url, 'sabpaisa-fonts.zip');
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error creating font package:', error);
    alert('Failed to create font package. Please try again.');
  }
};
