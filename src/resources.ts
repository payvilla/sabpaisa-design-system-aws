/**
 * MCP Resources for SabPaisa Design System
 *
 * Defines all resources accessible via the MCP protocol.
 * Resources are organized by domain: tokens, components, patterns, formatting, guidelines.
 */

import { Resource } from '@modelcontextprotocol/sdk/types.js';
import { dataLoader } from './data-loader.js';
import { logger } from './logger.js';

/**
 * List all available resources
 */
export function listResources(): Resource[] {
  return [
    // Design Tokens
    {
      uri: 'sabpaisa://tokens/all',
      name: 'All Design Tokens',
      description: 'Complete design token system including colors, typography, spacing, shadows',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://tokens/colors',
      name: 'Color Tokens',
      description: 'Color palettes with hex, rgb, hsl, rgba, CSS vars, Tailwind classes, WCAG ratios',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://tokens/typography',
      name: 'Typography Tokens',
      description: 'Font families, sizes, weights, line heights, letter spacing',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://tokens/spacing',
      name: 'Spacing Tokens',
      description: 'Spacing scale based on 8pt grid system',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://tokens/shadows',
      name: 'Shadow Tokens',
      description: 'Elevation and shadow definitions for depth',
      mimeType: 'application/json'
    },

    // Components
    {
      uri: 'sabpaisa://components/all',
      name: 'All Components',
      description: 'Complete component library: atoms, molecules, organisms, fintech-specific',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://components/button',
      name: 'Button Component',
      description: 'Primary interaction element with variants, sizes, states',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://components/card',
      name: 'Card Component',
      description: 'Container component with glass/gradient variants',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://components/input',
      name: 'Input Component',
      description: 'Text input with validation, icons, states',
      mimeType: 'application/json'
    },

    // Fintech Patterns
    {
      uri: 'sabpaisa://patterns/all',
      name: 'All Fintech Patterns',
      description: 'Complete fintech workflow patterns and UI components',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://patterns/settlement',
      name: 'Settlement Pattern',
      description: 'Settlement processing workflow with fee calculations and T+2 cycles',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://patterns/kyc',
      name: 'KYC Management Pattern',
      description: 'KYC onboarding and verification workflow (7 steps)',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://patterns/reconciliation',
      name: 'Reconciliation Pattern',
      description: 'Daily reconciliation workflow with matching algorithms',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://patterns/refund-chargeback',
      name: 'Refund & Chargeback Pattern',
      description: 'Full/partial refund workflows and chargeback resolution',
      mimeType: 'application/json'
    },

    // Formatting
    {
      uri: 'sabpaisa://formatting/currency',
      name: 'Currency Formatting',
      description: 'Indian Rupee formatting with lakhs/crores numbering (en-IN)',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://formatting/datetime',
      name: 'Date/Time Formatting',
      description: 'Date and time formats in IST timezone with settlement date calculations',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://formatting/masking',
      name: 'Data Masking Patterns',
      description: 'PII masking for PAN, Aadhaar, phone, email, card numbers (DPDP Act 2023)',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://formatting/validation',
      name: 'Validation Patterns',
      description: 'Regex patterns for Indian identifiers: PAN, GSTIN, IFSC, UPI, mobile',
      mimeType: 'application/json'
    },

    // Guidelines
    {
      uri: 'sabpaisa://guidelines/accessibility',
      name: 'Accessibility Guidelines',
      description: 'WCAG 2.2 AA compliance requirements, ARIA patterns, keyboard navigation',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://guidelines/brand',
      name: 'Brand Guidelines',
      description: 'Logo usage, brand colors, voice & tone, iconography, animations',
      mimeType: 'application/json'
    },

    // Templates
    {
      uri: 'sabpaisa://templates/all',
      name: 'All Templates',
      description: 'Complete template library - page layouts, loaders, workflows, forms',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://templates/page-layouts',
      name: 'Page Layout Templates',
      description: 'Dashboard, form, table, detail view, and auth page layouts',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://templates/loading',
      name: 'Loading Animation Templates',
      description: 'Spinner, dots, pulse, progress ring, bars, brand loaders',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://templates/splash',
      name: 'Splash Screen Templates',
      description: 'Fade & zoom, particle burst, slide reveal, circular progress, wave morph, glitch neon',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://templates/fintech',
      name: 'Fintech Workflow Templates',
      description: 'Payment checkout, transaction history, KYC flows, settlement dashboards',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://templates/ui',
      name: 'UI Component Templates',
      description: 'Button, badge, switch, checkbox, radio, tooltip, select, modal, tabs variants',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://templates/forms',
      name: 'Form Pattern Templates',
      description: 'Multi-step forms, validation patterns, field groups',
      mimeType: 'application/json'
    },
    {
      uri: 'sabpaisa://templates/dashboards',
      name: 'Dashboard Pattern Templates',
      description: 'Widget layouts, metric cards, chart compositions',
      mimeType: 'application/json'
    }
  ];
}

/**
 * Get resource contents by URI
 * @param uri - Resource URI (e.g., 'sabpaisa://tokens/colors')
 * @returns Resource contents as JSON string
 */
export function getResource(uri: string): string {
  // Parse URI to determine which data to return
  const parts = uri.replace('sabpaisa://', '').split('/');
  const [domain, subdomain] = parts;

  try {
    switch (domain) {
      case 'tokens':
        return getTokenResource(subdomain);

      case 'components':
        return getComponentResource(subdomain);

      case 'patterns':
        return getPatternResource(subdomain);

      case 'formatting':
        return getFormattingResource(subdomain);

      case 'guidelines':
        return getGuidelineResource(subdomain);

      case 'templates':
        return getTemplateResource(subdomain);

      default:
        throw new Error(`Unknown resource domain: ${domain}`);
    }
  } catch (error) {
    logger.error(`Error fetching resource ${uri}:`, error);
    throw error;
  }
}

/**
 * Get design token resources
 */
function getTokenResource(subdomain: string): string {
  const designSystem = dataLoader.getDesignSystem();
  const enhanced = dataLoader.getEnhanced();

  switch (subdomain) {
    case 'all':
      return JSON.stringify({
        ...designSystem.tokens,
        enhanced: enhanced.designSystem?.tokens?.colors || enhanced.colors
      }, null, 2);

    case 'colors':
      return JSON.stringify(
        enhanced.designTokens?.colors || enhanced.colors || designSystem.tokens?.colors,
        null,
        2
      );

    case 'typography':
      return JSON.stringify(designSystem.tokens?.typography, null, 2);

    case 'spacing':
      return JSON.stringify(designSystem.tokens?.spacing, null, 2);

    case 'shadows':
      return JSON.stringify(designSystem.tokens?.shadows, null, 2);

    default:
      throw new Error(`Unknown token subdomain: ${subdomain}`);
  }
}

/**
 * Get component resources
 */
function getComponentResource(subdomain: string): string {
  const designSystem = dataLoader.getDesignSystem();

  if (subdomain === 'all') {
    return JSON.stringify(designSystem.components, null, 2);
  }

  // Find specific component
  const component = designSystem.components?.find((c: any) => c.id === subdomain);

  if (!component) {
    throw new Error(`Component not found: ${subdomain}`);
  }

  return JSON.stringify(component, null, 2);
}

/**
 * Get fintech pattern resources
 */
function getPatternResource(subdomain: string): string {
  const data = dataLoader.getPatterns();
  const patterns = data.fintechPatterns || data;

  if (subdomain === 'all') {
    return JSON.stringify(patterns, null, 2);
  }

  // Map subdomain to pattern key - try multiple variations
  // Special case mappings
  const keyMap: Record<string, string> = {
    'kyc': 'kycManagementPatterns',
    'settlement': 'settlementPatterns',
    'reconciliation': 'reconciliationPatterns',
    'refund-chargeback': 'refundChargebackPatterns',
  };

  // Try mapped key first
  if (keyMap[subdomain] && patterns[keyMap[subdomain]]) {
    return JSON.stringify(patterns[keyMap[subdomain]], null, 2);
  }

  // Try other variations
  const possibleKeys = [
    `${subdomain}Patterns`,                              // kyc -> kycPatterns
    `${subdomain}Pattern`,                               // kyc -> kycPattern
    `${subdomain}ManagementPatterns`,                    // kyc -> kycManagementPatterns
    subdomain.replace(/-/g, ''),                         // refund-chargeback -> refundchargeback
    `${subdomain.replace(/-/g, '')}Patterns`,            // refund-chargeback -> refundchargebackPatterns
    subdomain.replace(/-/g, '').replace(/^(.)/, (m) => m.toUpperCase()) + 'Patterns', // refund-chargeback -> RefundchargebackPatterns
  ];

  for (const key of possibleKeys) {
    if (patterns[key]) {
      return JSON.stringify(patterns[key], null, 2);
    }
  }

  throw new Error(`Pattern not found: ${subdomain}. Available: ${Object.keys(patterns).filter(k => k.endsWith('Patterns')).join(', ')}`);
}

/**
 * Get formatting resources
 */
function getFormattingResource(subdomain: string): string {
  const formatting = dataLoader.getFormatting();

  switch (subdomain) {
    case 'currency':
      return JSON.stringify(
        formatting.dataFormattingGuide?.currencyFormatting || formatting.currency,
        null,
        2
      );

    case 'datetime':
      return JSON.stringify(
        formatting.dataFormattingGuide?.datetimeFormatting || formatting.datetime,
        null,
        2
      );

    case 'masking':
      return JSON.stringify(
        formatting.dataFormattingGuide?.dataPrivacy || formatting.masking,
        null,
        2
      );

    case 'validation':
      return JSON.stringify(
        formatting.dataFormattingGuide?.validationPatterns || formatting.validation,
        null,
        2
      );

    default:
      throw new Error(`Unknown formatting subdomain: ${subdomain}`);
  }
}

/**
 * Get guideline resources
 */
function getGuidelineResource(subdomain: string): string {
  const designSystem = dataLoader.getDesignSystem();

  switch (subdomain) {
    case 'accessibility':
      return JSON.stringify(designSystem.accessibility, null, 2);

    case 'brand':
      return JSON.stringify(designSystem.brand, null, 2);

    default:
      throw new Error(`Unknown guideline subdomain: ${subdomain}`);
  }
}

/**
 * Get template resources
 */
function getTemplateResource(subdomain: string): string {
  const data = dataLoader.getTemplates();

  if (!data) {
    throw new Error('Templates data not available');
  }

  if (subdomain === 'all') {
    return JSON.stringify(data, null, 2);
  }

  // Get templates by category
  const categoryTemplates = data.templates.filter(
    (t: any) => t.category === subdomain
  );

  if (categoryTemplates.length === 0) {
    throw new Error(`No templates found for category: ${subdomain}`);
  }

  return JSON.stringify({
    category: subdomain,
    count: categoryTemplates.length,
    templates: categoryTemplates
  }, null, 2);
}
