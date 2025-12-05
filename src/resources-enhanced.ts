/**
 * Enhanced MCP Resources for SabPaisa Design System
 *
 * Exposes all 35 sections from SABPAISA_COB_DESIGN_MASTER.md
 * via hierarchical URIs following atomic design methodology.
 */

import { Resource } from '@modelcontextprotocol/sdk/types.js';
import { enhancedDataLoader } from './data-loader-enhanced.js';
import { logger } from './logger.js';

/**
 * Generate all resources from the extracted design system
 */
export function listEnhancedResources(): Resource[] {
  const resources: Resource[] = [];

  // Get all sections from index
  const sections = enhancedDataLoader.getAllSections();

  // Add index resource
  resources.push({
    uri: 'sabpaisa://index',
    name: 'Design System Index',
    description: 'Master index of all 35 sections in the design system',
    mimeType: 'application/json',
  });

  // Add individual section resources
  sections.forEach((section) => {
    const uri = `sabpaisa://section/${section.section}`;
    resources.push({
      uri,
      name: section.title,
      description: `Section ${section.section}: ${section.title} (${section.file})`,
      mimeType: 'application/json',
    });
  });

  // Add part-level resources (grouped by atomic design level)
  const parts = [
    {
      uri: 'sabpaisa://parts/meta',
      name: 'Meta & Quick Reference',
      description: 'Sections 1-3: How to use, quick reference cards, changelog',
      dir: '1-meta',
    },
    {
      uri: 'sabpaisa://parts/atoms',
      name: 'Atoms - Design Tokens',
      description: 'Sections 4-8: Colors, typography, spacing, effects, animations',
      dir: '2-atoms',
    },
    {
      uri: 'sabpaisa://parts/molecules',
      name: 'Molecules - Basic Components',
      description: 'Sections 9-14: Button, TextField, Card, Badge, Toast, OTP',
      dir: '3-molecules',
    },
    {
      uri: 'sabpaisa://parts/organisms',
      name: 'Organisms - Complex Components',
      description: 'Sections 15-19: Modal, FileUpload, Navigation, Forms, Data Display',
      dir: '4-organisms',
    },
    {
      uri: 'sabpaisa://parts/templates',
      name: 'Templates - Page Patterns',
      description: 'Sections 20-21: Layout patterns, user flows',
      dir: '5-templates',
    },
    {
      uri: 'sabpaisa://parts/ux-patterns',
      name: 'UX Patterns & Fintech',
      description: 'Sections 22-30: Animations, loading, errors, fintech, accessibility, performance',
      dir: '6-ux-patterns',
    },
    {
      uri: 'sabpaisa://parts/implementation',
      name: 'Implementation Guides',
      description: 'Sections 31-35: Component selection, color usage, typography, state, anti-patterns',
      dir: '7-implementation',
    },
  ];

  parts.forEach((part) => {
    resources.push({
      uri: part.uri,
      name: part.name,
      description: part.description,
      mimeType: 'application/json',
    });
  });

  // Add shortcut resources for quick access
  const shortcuts = [
    {
      uri: 'sabpaisa://quick/colors',
      name: 'Colors Quick Access',
      description: 'Section 4: Complete color token system with 7 formats',
      section: 4,
    },
    {
      uri: 'sabpaisa://quick/typography',
      name: 'Typography Quick Access',
      description: 'Section 5: Typography token system',
      section: 5,
    },
    {
      uri: 'sabpaisa://quick/spacing',
      name: 'Spacing Quick Access',
      description: 'Section 6: Spacing and layout tokens',
      section: 6,
    },
    {
      uri: 'sabpaisa://quick/animations',
      name: 'Animations Quick Access',
      description: 'Section 8: Motion and animation tokens',
      section: 8,
    },
    {
      uri: 'sabpaisa://quick/button',
      name: 'Button Component',
      description: 'Section 9: Button component with 8 variants',
      section: 9,
    },
    {
      uri: 'sabpaisa://quick/card',
      name: 'Card Component',
      description: 'Section 11: Card component with glass/gradient variants',
      section: 11,
    },
    {
      uri: 'sabpaisa://quick/fintech-patterns',
      name: 'Fintech Patterns',
      description: 'Section 26: Settlement, KYC, reconciliation patterns',
      section: 26,
    },
    {
      uri: 'sabpaisa://quick/accessibility',
      name: 'Accessibility Patterns',
      description: 'Section 29: WCAG 2.2 AA compliance patterns',
      section: 29,
    },
    {
      uri: 'sabpaisa://quick/anti-patterns',
      name: 'Anti-Patterns',
      description: 'Section 35: Common mistakes and how to avoid them',
      section: 35,
    },
    {
      uri: 'sabpaisa://quick/reference',
      name: 'Quick Reference',
      description: 'Section 2: Quick reference cards for colors, spacing, typography',
      section: 2,
    },
  ];

  shortcuts.forEach((shortcut) => {
    resources.push({
      uri: shortcut.uri,
      name: shortcut.name,
      description: shortcut.description,
      mimeType: 'application/json',
    });
  });

  // Add component-specific resources
  const components = [
    { name: 'button', section: 9, title: 'Button Component' },
    { name: 'textfield', section: 10, title: 'TextField Component' },
    { name: 'card', section: 11, title: 'Card Component' },
    { name: 'badge', section: 12, title: 'Badge Component' },
    { name: 'toast', section: 13, title: 'Toast/Notification Component' },
    { name: 'otp-input', section: 14, title: 'OtpInput Component' },
    { name: 'modal', section: 15, title: 'Modal/Dialog Component' },
    { name: 'file-upload', section: 16, title: 'FileUpload Component' },
    { name: 'navigation', section: 17, title: 'Navigation/Sidebar Component' },
  ];

  components.forEach((component) => {
    resources.push({
      uri: `sabpaisa://components/${component.name}`,
      name: component.title,
      description: `Section ${component.section}: ${component.title} with variants, sizes, states, code examples`,
      mimeType: 'application/json',
    });
  });

  logger.debug(`Generated ${resources.length} enhanced resources`);
  return resources;
}

/**
 * Get resource contents by URI
 */
export function getEnhancedResource(uri: string): string {
  try {
    logger.debug(`Fetching enhanced resource: ${uri}`);

    // Parse URI (sabpaisa://path/to/resource)
    const path = uri.replace('sabpaisa:/', '');

    // Handle different URI patterns
    if (uri === 'sabpaisa://index') {
      const index = enhancedDataLoader.getAllSections();
      return JSON.stringify(
        {
          version: '1.0.0',
          totalSections: index.length,
          sections: index,
        },
        null,
        2
      );
    }

    // Section by number: sabpaisa://section/4
    if (path.startsWith('/section/')) {
      const sectionNum = parseInt(path.split('/')[2]);
      const data = enhancedDataLoader.loadSection(sectionNum);
      return JSON.stringify(data, null, 2);
    }

    // Part by name: sabpaisa://parts/atoms
    if (path.startsWith('/parts/')) {
      const partName = path.split('/')[2];
      const dirMap: { [key: string]: string } = {
        meta: '1-meta',
        atoms: '2-atoms',
        molecules: '3-molecules',
        organisms: '4-organisms',
        templates: '5-templates',
        'ux-patterns': '6-ux-patterns',
        implementation: '7-implementation',
      };

      const dir = dirMap[partName];
      if (!dir) {
        throw new Error(`Unknown part: ${partName}`);
      }

      const data = enhancedDataLoader.loadPart(dir);
      return JSON.stringify(
        {
          part: partName,
          sections: data,
        },
        null,
        2
      );
    }

    // Quick access: sabpaisa://quick/colors
    if (path.startsWith('/quick/')) {
      const quickName = path.split('/')[2];
      const quickMap: { [key: string]: number } = {
        colors: 4,
        typography: 5,
        spacing: 6,
        animations: 8,
        button: 9,
        card: 11,
        'fintech-patterns': 26,
        accessibility: 29,
        'anti-patterns': 35,
        reference: 2,
      };

      const sectionNum = quickMap[quickName];
      if (!sectionNum) {
        throw new Error(`Unknown quick access: ${quickName}`);
      }

      const data = enhancedDataLoader.loadSection(sectionNum);
      return JSON.stringify(data, null, 2);
    }

    // Component by name: sabpaisa://components/button
    if (path.startsWith('/components/')) {
      const componentName = path.split('/')[2];
      const data = enhancedDataLoader.getComponent(componentName);
      return JSON.stringify(data, null, 2);
    }

    throw new Error(`Unsupported URI pattern: ${uri}`);
  } catch (error) {
    logger.error(`Error fetching enhanced resource ${uri}:`, error);
    throw new Error(
      `Failed to fetch resource: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Combine with legacy resources for backward compatibility
 */
export function listAllResources(includeLegacy: boolean = true): Resource[] {
  const enhanced = listEnhancedResources();

  if (!includeLegacy) {
    return enhanced;
  }

  // Add legacy resources for backward compatibility
  const legacy: Resource[] = [
    {
      uri: 'sabpaisa://tokens/all',
      name: 'All Design Tokens (Legacy)',
      description: 'Legacy: Complete design token system',
      mimeType: 'application/json',
    },
    {
      uri: 'sabpaisa://patterns/all',
      name: 'All Fintech Patterns (Legacy)',
      description: 'Legacy: Complete fintech workflow patterns',
      mimeType: 'application/json',
    },
  ];

  return [...enhanced, ...legacy];
}
