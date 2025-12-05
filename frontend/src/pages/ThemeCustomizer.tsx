import { motion } from 'framer-motion';
import { useState } from 'react';
import { Download, Copy, Check, RotateCcw, Palette, Type as TypeIcon, Maximize2 } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  error: string;
  warning: string;
  info: string;
}

interface ThemeConfig {
  colors: ThemeColors;
  borderRadius: string;
  fontSize: {
    base: string;
    scale: number;
  };
  spacing: {
    base: string;
    scale: number;
  };
}

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#3B82F6',
    secondary: '#14B8A6',
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#06B6D4',
  },
  borderRadius: '12px',
  fontSize: {
    base: '16px',
    scale: 1.25,
  },
  spacing: {
    base: '4px',
    scale: 1.5,
  },
};

const presetThemes = {
  default: {
    name: 'SabPaisa Default',
    description: 'Official SabPaisa brand colors',
    theme: defaultTheme,
  },
  fintech: {
    name: 'Fintech Pro',
    description: 'Professional financial services theme',
    theme: {
      ...defaultTheme,
      colors: {
        primary: '#1E40AF',
        secondary: '#0891B2',
        success: '#059669',
        error: '#DC2626',
        warning: '#D97706',
        info: '#0284C7',
      },
    },
  },
  modern: {
    name: 'Modern Banking',
    description: 'Contemporary banking interface',
    theme: {
      ...defaultTheme,
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        success: '#10B981',
        error: '#F43F5E',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      borderRadius: '16px',
    },
  },
  minimal: {
    name: 'Minimal Clean',
    description: 'Clean and minimal design',
    theme: {
      ...defaultTheme,
      colors: {
        primary: '#18181B',
        secondary: '#52525B',
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#06B6D4',
      },
      borderRadius: '8px',
    },
  },
};

export default function ThemeCustomizer() {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing'>('colors');

  const updateColor = (colorKey: keyof ThemeColors, value: string) => {
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        [colorKey]: value,
      },
    });
  };

  const applyPreset = (presetKey: keyof typeof presetThemes) => {
    setTheme(presetThemes[presetKey].theme);
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  const generateThemeCode = () => {
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${theme.colors.primary}',
          50: '#F0F9FF',
          100: '#E0F2FE',
          // ... generate full palette
        },
        secondary: {
          DEFAULT: '${theme.colors.secondary}',
          // ... generate full palette
        },
        success: '${theme.colors.success}',
        error: '${theme.colors.error}',
        warning: '${theme.colors.warning}',
        info: '${theme.colors.info}',
      },
      borderRadius: {
        DEFAULT: '${theme.borderRadius}',
        lg: '${parseFloat(theme.borderRadius) * 1.33}px',
        xl: '${parseFloat(theme.borderRadius) * 1.66}px',
      },
      fontSize: {
        base: '${theme.fontSize.base}',
        // Generate scale: sm, lg, xl, etc.
      },
      spacing: {
        // Base: ${theme.spacing.base}
        // Scale factor: ${theme.spacing.scale}
      },
    },
  },
}`;
  };

  const handleCopyCode = async () => {
    const code = generateThemeCode();
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadTheme = () => {
    const code = generateThemeCode();
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind.config.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Theme Customizer
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl">
          Customize your design system theme in real-time. Adjust colors, typography, spacing, and
          see instant preview. Export your configuration when ready.
        </p>
      </div>

      {/* Preset Themes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Preset Themes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(presetThemes).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key as keyof typeof presetThemes)}
              className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500
                         transition-all duration-200 text-left group"
            >
              <div className="flex gap-2 mb-3">
                {Object.values(preset.theme.colors).slice(0, 4).map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{preset.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{preset.description}</p>
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customization Panel */}
        <div className="space-y-6">
          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('colors')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'colors'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Palette className="w-5 h-5" />
                  Colors
                </div>
              </button>
              <button
                onClick={() => setActiveTab('typography')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'typography'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <TypeIcon className="w-5 h-5" />
                  Typography
                </div>
              </button>
              <button
                onClick={() => setActiveTab('spacing')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'spacing'
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Maximize2 className="w-5 h-5" />
                  Spacing
                </div>
              </button>
            </div>

            <div className="p-6">
              {/* Colors Tab */}
              {activeTab === 'colors' && (
                <div className="space-y-6">
                  {Object.entries(theme.colors).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                        {key}
                      </label>
                      <div className="flex gap-4">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                          className="w-16 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Typography Tab */}
              {activeTab === 'typography' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Base Font Size
                    </label>
                    <input
                      type="text"
                      value={theme.fontSize.base}
                      onChange={(e) =>
                        setTheme({
                          ...theme,
                          fontSize: { ...theme.fontSize, base: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type Scale Ratio
                    </label>
                    <input
                      type="range"
                      min="1.1"
                      max="1.5"
                      step="0.05"
                      value={theme.fontSize.scale}
                      onChange={(e) =>
                        setTheme({
                          ...theme,
                          fontSize: { ...theme.fontSize, scale: parseFloat(e.target.value) },
                        })
                      }
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Current: {theme.fontSize.scale.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Border Radius
                    </label>
                    <input
                      type="text"
                      value={theme.borderRadius}
                      onChange={(e) => setTheme({ ...theme, borderRadius: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              )}

              {/* Spacing Tab */}
              {activeTab === 'spacing' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Base Spacing Unit
                    </label>
                    <input
                      type="text"
                      value={theme.spacing.base}
                      onChange={(e) =>
                        setTheme({
                          ...theme,
                          spacing: { ...theme.spacing, base: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Spacing Scale
                    </label>
                    <input
                      type="range"
                      min="1.2"
                      max="2"
                      step="0.1"
                      value={theme.spacing.scale}
                      onChange={(e) =>
                        setTheme({
                          ...theme,
                          spacing: { ...theme.spacing, scale: parseFloat(e.target.value) },
                        })
                      }
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Current: {theme.spacing.scale.toFixed(1)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Export Theme</h3>
            <div className="flex gap-3">
              <button
                onClick={handleCopyCode}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                           bg-primary-600 hover:bg-primary-700 text-white font-medium
                           transition-colors duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Config
                  </>
                )}
              </button>
              <button
                onClick={handleDownloadTheme}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                           border-2 border-primary-600 text-primary-600 dark:text-primary-400 font-medium
                           hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
              <button
                onClick={resetTheme}
                className="px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600
                           text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                           transition-colors duration-200"
                title="Reset to default"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Live Preview</h2>

            <div className="space-y-6">
              {/* Buttons Preview */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Buttons
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    style={{
                      backgroundColor: theme.colors.primary,
                      borderRadius: theme.borderRadius,
                    }}
                    className="px-6 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    Primary
                  </button>
                  <button
                    style={{
                      backgroundColor: theme.colors.secondary,
                      borderRadius: theme.borderRadius,
                    }}
                    className="px-6 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    Secondary
                  </button>
                  <button
                    style={{
                      borderColor: theme.colors.primary,
                      color: theme.colors.primary,
                      borderRadius: theme.borderRadius,
                    }}
                    className="px-6 py-3 font-semibold border-2 hover:opacity-75 transition-opacity"
                  >
                    Outline
                  </button>
                </div>
              </div>

              {/* Badges Preview */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Status Badges
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span
                    style={{
                      backgroundColor: `${theme.colors.success}20`,
                      color: theme.colors.success,
                      borderRadius: theme.borderRadius,
                    }}
                    className="px-4 py-2 font-semibold text-sm"
                  >
                    Success
                  </span>
                  <span
                    style={{
                      backgroundColor: `${theme.colors.error}20`,
                      color: theme.colors.error,
                      borderRadius: theme.borderRadius,
                    }}
                    className="px-4 py-2 font-semibold text-sm"
                  >
                    Error
                  </span>
                  <span
                    style={{
                      backgroundColor: `${theme.colors.warning}20`,
                      color: theme.colors.warning,
                      borderRadius: theme.borderRadius,
                    }}
                    className="px-4 py-2 font-semibold text-sm"
                  >
                    Warning
                  </span>
                  <span
                    style={{
                      backgroundColor: `${theme.colors.info}20`,
                      color: theme.colors.info,
                      borderRadius: theme.borderRadius,
                    }}
                    className="px-4 py-2 font-semibold text-sm"
                  >
                    Info
                  </span>
                </div>
              </div>

              {/* Card Preview */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Card</h3>
                <div
                  style={{ borderRadius: theme.borderRadius }}
                  className="p-6 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                >
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Card Title
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    This is a preview of how your theme affects card components.
                  </p>
                  <button
                    style={{
                      backgroundColor: theme.colors.primary,
                      borderRadius: theme.borderRadius,
                    }}
                    className="px-4 py-2 text-white font-medium"
                  >
                    Card Action
                  </button>
                </div>
              </div>

              {/* Form Preview */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Form Input
                </h3>
                <input
                  type="text"
                  placeholder="Enter text..."
                  style={{ borderRadius: theme.borderRadius }}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:outline-none transition-colors"
                  onFocus={(e) => (e.target.style.borderColor = theme.colors.primary)}
                  onBlur={(e) => (e.target.style.borderColor = '')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
