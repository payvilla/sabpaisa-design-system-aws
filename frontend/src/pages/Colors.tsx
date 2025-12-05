import { motion } from 'framer-motion';
import { useState } from 'react';
import ColorSwatch from '../components/ColorSwatch';
import { colors } from '../data/designSystemData';
import { Search, Copy, Check } from 'lucide-react';

export default function Colors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedGradient, setCopiedGradient] = useState<string | null>(null);

  const filterColors = (colorData: any) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      colorData.name.toLowerCase().includes(search) ||
      colorData.description.toLowerCase().includes(search)
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedGradient(id);
    setTimeout(() => setCopiedGradient(null), 2000);
  };

  // Helper function to render color shades in darkest to lightest order
  const renderColorShades = (shades: any, colorName: string) => {
    const shadeEntries = Object.entries(shades);
    // Reverse to show darkest to lightest (950/900 → 50)
    const reversedShades = [...shadeEntries].reverse();

    return reversedShades.map(([shade, data]: [string, any]) => (
      <motion.div
        key={shade}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: (parseInt(shade) / 1000) }}
      >
        <ColorSwatch
          name={colorName}
          hex={data.hex}
          usage={data.usage}
          shade={shade}
          showFormats={true}
        />
      </motion.div>
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-12 text-white"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold mb-4"
          >
            Color Palette
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/90 max-w-3xl"
          >
            A comprehensive color system with WCAG 2.2 AA compliance. Colors organized from
            darkest to lightest for easy selection. Click any color to copy its HEX code.
          </motion.p>
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search colors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     transition-all duration-200"
        />
      </div>

      {/* Primary Colors */}
      {filterColors(colors.primary) && (
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {colors.primary.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {colors.primary.description}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {renderColorShades(colors.primary.shades, 'primary')}
          </div>
        </section>
      )}

      {/* Secondary Colors */}
      {filterColors(colors.secondary) && (
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {colors.secondary.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {colors.secondary.description}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {renderColorShades(colors.secondary.shades, 'secondary')}
          </div>
        </section>
      )}

      {/* Accent Colors */}
      {filterColors(colors.accent) && (
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {colors.accent.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {colors.accent.description}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {renderColorShades(colors.accent.shades, 'accent')}
          </div>
        </section>
      )}

      {/* Neutral Greys */}
      {filterColors(colors.neutral) && (
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {colors.neutral.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {colors.neutral.description}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {renderColorShades(colors.neutral.shades, 'neutral')}
          </div>
        </section>
      )}

      {/* Gradients */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {colors.gradients.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {colors.gradients.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(colors.gradients.collection).map(([key, gradient]: [string, any]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover-lift group cursor-pointer"
              onClick={() => copyToClipboard(gradient.css, key)}
            >
              <div
                className="h-32 relative"
                style={{ background: gradient.gradient }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/90 dark:bg-gray-900/90 px-4 py-2 rounded-lg">
                    {copiedGradient === key ? (
                      <span className="flex items-center gap-2 text-sm font-medium text-green-600">
                        <Check className="w-4 h-4" />
                        Copied!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Copy className="w-4 h-4" />
                        Click to Copy
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {gradient.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {gradient.usage}
                </p>
                <div className="space-y-2">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                    <code className="text-xs text-gray-700 dark:text-gray-300 font-mono break-all">
                      {gradient.css}
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Semantic Colors */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Semantic Colors
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Colors for feedback, status, and semantic meaning
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(colors.semantic).map(([name, data]: [string, any]) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <ColorSwatch
                name={name}
                hex={data.hex}
                usage={data.usage}
                showFormats={true}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Transaction Colors */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Transaction Colors
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Fintech-specific colors for transaction states
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Object.entries(colors.transaction).map(([name, data]: [string, any]) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <ColorSwatch
                name={name}
                hex={data.hex}
                usage={data.usage}
                showFormats={true}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700
                           rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Usage Guidelines
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl p-6">
            <h3 className="font-bold text-xl mb-4 text-green-600 dark:text-green-400 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                ✓
              </span>
              Do
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Use primary colors for main CTAs and navigation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Use secondary colors for supporting actions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Ensure WCAG AA contrast ratio (4.5:1 minimum)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Use semantic colors for appropriate contexts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Maintain consistent color usage across the app</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl p-6">
            <h3 className="font-bold text-xl mb-4 text-red-600 dark:text-red-400 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30">
                ✗
              </span>
              Don't
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Don't use arbitrary color values outside the palette</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Don't mix color purposes (e.g., error for success)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Don't use light colors on light backgrounds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Don't override brand colors without approval</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Don't use too many colors in a single view</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Color Accessibility Info */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Accessibility & Contrast
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="text-4xl font-bold gradient-text mb-2">WCAG 2.2</div>
            <p className="text-gray-600 dark:text-gray-400">Compliance Level</p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="text-4xl font-bold gradient-text mb-2">AA</div>
            <p className="text-gray-600 dark:text-gray-400">Minimum Standard</p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="text-4xl font-bold gradient-text mb-2">4.5:1</div>
            <p className="text-gray-600 dark:text-gray-400">Contrast Ratio</p>
          </div>
        </div>
      </section>
    </div>
  );
}
